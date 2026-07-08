import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getPrimarySalon } from '@/lib/salon'
import {
  buildDaySlots,
  formatDateLabel,
  getBookableDates,
} from '@/lib/scheduling'
import DateTimeSelectionClient from './DateTimeSelectionClient'

type PageProps = {
  searchParams: Promise<{
    serviceId?: string
  }>
}

export default async function DateTimeSelectionPage({ searchParams }: PageProps) {
  const params = await searchParams
  const serviceId = params.serviceId

  if (!serviceId) {
    redirect('/book/service')
  }

  const salon = await getPrimarySalon()

  if (!salon) {
    notFound()
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      salonId: salon.id,
    },
  })

  if (!service) {
    redirect('/book/service')
  }

  const workers = await prisma.user.findMany({
    where: {
      salonId: salon.id,
      role: 'WORKER',
      workerProfile: {
        isAvailable: true,
      },
    },
    include: {
      workerProfile: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const bookableDates = getBookableDates(7)
  const rangeStart = new Date(bookableDates[0])
  rangeStart.setHours(0, 0, 0, 0)
  const rangeEnd = new Date(bookableDates[bookableDates.length - 1])
  rangeEnd.setHours(23, 59, 59, 999)

  const bookings = await prisma.booking.findMany({
    where: {
      salonId: salon.id,
      status: {
        not: 'CANCELLED',
      },
      startTime: {
        gte: rangeStart,
        lte: rangeEnd,
      },
    },
    select: {
      workerId: true,
      startTime: true,
      endTime: true,
    },
  })

  const dateOptions = bookableDates.map((date) => {
    const slots = buildDaySlots({
      date,
      serviceDuration: service.duration,
      workers: workers
        .filter((worker) => worker.workerProfile)
        .map((worker) => ({
          id: worker.workerProfile!.id,
          name: worker.name,
        })),
      bookings,
    })

    return {
      isoDate: date.toISOString(),
      label: formatDateLabel(date),
      dayNumber: String(date.getDate()),
      hasAvailability: slots.some((slot) => slot.available),
      slots,
    }
  })

  return (
    <DateTimeSelectionClient
      service={{
        id: service.id,
        name: service.name,
        duration: service.duration,
        price: Number(service.price),
      }}
      dates={dateOptions}
    />
  )
}
