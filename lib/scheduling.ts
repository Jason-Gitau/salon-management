type BookingWindow = {
  startTime: Date
  endTime: Date
  workerId: string
}

type WorkerOption = {
  id: string
  name: string
}

export type SlotAvailability = {
  isoStart: string
  label: string
  available: boolean
  workerId: string | null
  workerName: string | null
}

const SLOT_INTERVAL_MINUTES = 30
const WORK_DAY_START_HOUR = 9
const WORK_DAY_END_HOUR = 17

function setTime(date: Date, hour: number, minute: number) {
  const next = new Date(date)
  next.setHours(hour, minute, 0, 0)
  return next
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000)
}

function overlaps(
  candidateStart: Date,
  candidateEnd: Date,
  bookingStart: Date,
  bookingEnd: Date
) {
  return bookingStart < candidateEnd && bookingEnd > candidateStart
}

export function formatSlotLabel(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatLongDateLabel(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function getBookableDates(days = 7) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)
    return date
  })
}

export function buildDaySlots(params: {
  date: Date
  serviceDuration: number
  workers: WorkerOption[]
  bookings: BookingWindow[]
}) {
  const { date, serviceDuration, workers, bookings } = params
  const dayStart = setTime(date, WORK_DAY_START_HOUR, 0)
  const dayEnd = setTime(date, WORK_DAY_END_HOUR, 0)
  const slots: SlotAvailability[] = []

  for (
    let cursor = new Date(dayStart);
    addMinutes(cursor, serviceDuration) <= dayEnd;
    cursor = addMinutes(cursor, SLOT_INTERVAL_MINUTES)
  ) {
    const slotStart = new Date(cursor)
    const slotEnd = addMinutes(slotStart, serviceDuration)

    const freeWorker = workers.find((worker) => {
      const workerBookings = bookings.filter((booking) => booking.workerId === worker.id)
      return !workerBookings.some((booking) =>
        overlaps(slotStart, slotEnd, booking.startTime, booking.endTime)
      )
    })

    slots.push({
      isoStart: slotStart.toISOString(),
      label: formatSlotLabel(slotStart),
      available: Boolean(freeWorker),
      workerId: freeWorker?.id ?? null,
      workerName: freeWorker?.name ?? null,
    })
  }

  return slots
}
