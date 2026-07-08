'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const markCompletedSchema = z.object({
  bookingId: z.string().min(1),
})

export async function markWorkerBookingCompleted(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'WORKER') {
    throw new Error('Unauthorized')
  }

  const parsed = markCompletedSchema.parse({
    bookingId: formData.get('bookingId'),
  })

  const workerUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      workerProfile: true,
    },
  })

  if (!workerUser?.workerProfile) {
    throw new Error('Worker profile not found.')
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: parsed.bookingId,
      workerId: workerUser.workerProfile.id,
      status: {
        not: 'CANCELLED',
      },
    },
    include: {
      service: true,
    },
  })

  if (!booking) {
    throw new Error('Booking not found.')
  }

  const commissionAmount = Number(booking.service.price) * (workerUser.workerProfile.commissionPct / 100)

  await prisma.$transaction([
    prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: 'COMPLETED',
      },
    }),
    prisma.earnedCommission.upsert({
      where: {
        bookingId: booking.id,
      },
      update: {
        amount: commissionAmount,
      },
      create: {
        id: crypto.randomUUID(),
        bookingId: booking.id,
        amount: commissionAmount,
        createdAt: new Date(),
      },
    }),
  ])

  revalidatePath('/schedule')
  revalidatePath('/earnings')
  revalidatePath('/worker-profile')
}
