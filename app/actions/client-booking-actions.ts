'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getPrimarySalon } from '@/lib/salon'

const CLIENT_COOKIE_NAME = 'booking_client_id'
const BOOKING_DRAFT_COOKIE_NAME = 'booking_draft_id'
const GUEST_EMAIL_PREFIX = 'guest-booking-'

const checkoutContextSchema = z.object({
  serviceId: z.string().min(1),
  workerId: z.string().min(1),
  start: z.string().min(1),
})

const draftBookingSchema = checkoutContextSchema

const clientAccountSchema = z.object({
  bookingId: z.string().min(1),
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z.string().trim().min(6, 'Phone number is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

const bookingCreationSchema = z.object({
  bookingId: z.string().min(1),
  phone: z.string().trim().min(6, 'Phone number is required.'),
})

async function getClientUserIdFromCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(CLIENT_COOKIE_NAME)?.value ?? null
}

async function setClientCookie(userId: string) {
  const cookieStore = await cookies()
  cookieStore.set(CLIENT_COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

async function getDraftBookingIdFromCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(BOOKING_DRAFT_COOKIE_NAME)?.value ?? null
}

async function setDraftBookingCookie(bookingId: string) {
  const cookieStore = await cookies()
  cookieStore.set(BOOKING_DRAFT_COOKIE_NAME, bookingId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

function isGuestBookingEmail(email: string) {
  return email.startsWith(GUEST_EMAIL_PREFIX)
}

async function resolveCheckoutEntities(input: z.infer<typeof checkoutContextSchema>) {
  const salon = await getPrimarySalon()

  if (!salon) {
    throw new Error('Salon not found.')
  }

  const [service, worker] = await Promise.all([
    prisma.service.findFirst({
      where: {
        id: input.serviceId,
        salonId: salon.id,
      },
    }),
    prisma.workerProfile.findFirst({
      where: {
        id: input.workerId,
      },
      include: {
        user: true,
      },
    }),
  ])

  if (!service || !worker) {
    throw new Error('Booking context is invalid.')
  }

  const startTime = new Date(input.start)
  if (Number.isNaN(startTime.getTime())) {
    throw new Error('Selected start time is invalid.')
  }

  const endTime = new Date(startTime.getTime() + service.duration * 60_000)

  return { salon, service, worker, startTime, endTime }
}

async function resolveDraftBookingById(bookingId: string) {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      salon: true,
      service: true,
      worker: {
        include: {
          user: true,
        },
      },
      client: true,
    },
  })

  if (!booking) {
    throw new Error('Booking draft not found.')
  }

  return booking
}

async function maybeReuseDraftBooking(input: z.infer<typeof checkoutContextSchema>) {
  const draftBookingId = await getDraftBookingIdFromCookie()

  if (!draftBookingId) {
    return null
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: draftBookingId,
      serviceId: input.serviceId,
      workerId: input.workerId,
      startTime: new Date(input.start),
      status: {
        in: ['PENDING_PAYMENT', 'CONFIRMED'],
      },
    },
  })

  return booking
}

export async function beginCheckoutBooking(formData: FormData) {
  const parsed = draftBookingSchema.safeParse({
    serviceId: formData.get('serviceId'),
    workerId: formData.get('workerId'),
    start: formData.get('start'),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid booking details.')
  }

  const reusableBooking = await maybeReuseDraftBooking(parsed.data)

  if (reusableBooking) {
    await setDraftBookingCookie(reusableBooking.id)
    redirect(`/book/checkout?bookingId=${encodeURIComponent(reusableBooking.id)}`)
  }

  const clientUserId = await getClientUserIdFromCookie()
  const { salon, service, worker, startTime, endTime } = await resolveCheckoutEntities(parsed.data)

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      workerId: worker.id,
      status: {
        not: 'CANCELLED',
      },
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  })

  if (conflictingBooking) {
    throw new Error('That time slot is no longer available. Please choose another slot.')
  }

  const attachedClient =
    clientUserId
      ? await prisma.user.findFirst({
          where: {
            id: clientUserId,
            salonId: salon.id,
          },
        })
      : null

  const guestClient =
    attachedClient ??
    (await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: `${GUEST_EMAIL_PREFIX}${crypto.randomUUID()}@salon.local`,
        password: crypto.randomUUID(),
        name: 'Guest Booking',
        phone: '',
        role: 'CLIENT',
        salonId: salon.id,
        createdAt: new Date(),
      },
    }))

  const booking = await prisma.booking.create({
    data: {
      id: crypto.randomUUID(),
      salonId: salon.id,
      clientId: guestClient.id,
      workerId: worker.id,
      serviceId: service.id,
      startTime,
      endTime,
      status: 'PENDING_PAYMENT',
      createdAt: new Date(),
    },
  })

  await setDraftBookingCookie(booking.id)

  redirect(`/book/checkout?bookingId=${encodeURIComponent(booking.id)}`)
}

export async function createClientAccountForCheckout(formData: FormData) {
  const parsed = clientAccountSchema.safeParse({
    bookingId: formData.get('bookingId'),
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid client details.')
  }

  const booking = await resolveDraftBookingById(parsed.data.bookingId)
  const { salon } = booking

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  })

  if (existingUser && existingUser.salonId !== salon.id) {
    throw new Error('This email belongs to another salon account.')
  }

  const clientUser =
    existingUser ??
    (await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.fullName,
        phone: parsed.data.phone,
        role: 'CLIENT',
        salonId: salon.id,
        createdAt: new Date(),
      },
    }))

  await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      clientId: clientUser.id,
    },
  })

  if (isGuestBookingEmail(booking.client.email)) {
    await prisma.user.delete({
      where: {
        id: booking.client.id,
      },
    })
  }

  await setClientCookie(clientUser.id)
  await setDraftBookingCookie(booking.id)

  redirect(`/book/checkout?bookingId=${encodeURIComponent(booking.id)}`)
}

export async function createBookingAndStartPayment(formData: FormData) {
  const parsed = bookingCreationSchema.safeParse({
    bookingId: formData.get('bookingId'),
    phone: formData.get('phone'),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid payment details.')
  }

  const booking = await resolveDraftBookingById(parsed.data.bookingId)

  if (isGuestBookingEmail(booking.client.email)) {
    throw new Error('Create a client account before payment.')
  }

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      workerId: booking.workerId,
      id: {
        not: booking.id,
      },
      status: {
        not: 'CANCELLED',
      },
      startTime: {
        lt: booking.endTime,
      },
      endTime: {
        gt: booking.startTime,
      },
    },
  })

  if (conflictingBooking) {
    throw new Error('That time slot is no longer available. Please choose another slot.')
  }

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: booking.client.id,
      },
      data: {
        phone: parsed.data.phone,
      },
    }),
    prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: 'CONFIRMED',
      },
    }),
  ])

  redirect(`/book/checkout/success?bookingId=${encodeURIComponent(booking.id)}`)
}
