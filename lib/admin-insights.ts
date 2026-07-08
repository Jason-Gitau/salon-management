import { getServerSession } from 'next-auth'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'

type ActivityEventType = 'Booking' | 'Order' | 'Revenue' | 'Staff' | 'System'

export type AdminActivityEntry = {
  id: string
  timestamp: Date
  actorName: string
  actorRole: string
  actorAvatarType: 'icon'
  actorAvatarValue: string
  eventType: ActivityEventType
  eventDotColor: string
  details: string
  refId: string
}

export type DashboardSnapshot = {
  salonName: string
  todayLabel: string
  bookingsToday: number
  yesterdayDelta: number
  dailyRevenue: number
  activeWorkers: number
  totalWorkers: number
  confirmedOrdersToday: number
  lowStockCount: number
  outOfStockCount: number
  recentPaidOrders: Array<{
    id: string
    clientName: string
    totalAmount: number
    createdAt: Date
    itemSummary: string
  }>
  trendDays: Array<{
    label: string
    total: number
    heightPercent: number
  }>
  recentActivity: AdminActivityEntry[]
}

const getAdminContext = cache(async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'OWNER') {
    redirect('/login')
  }

  const salon = await ensurePrimarySalon()

  return {
    session,
    salon,
  }
})

export async function requireAdminContext() {
  return getAdminContext()
}

export function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

function startOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function endOfDay(date: Date) {
  const next = startOfDay(date)
  next.setDate(next.getDate() + 1)
  return next
}

async function getSystemActivityLogsForSalon(
  salonId: string,
  limit = 40,
  searchQuery?: string
): Promise<AdminActivityEntry[]> {
  const [bookings, orders, workerUsers, commissions] = await Promise.all([
    prisma.booking.findMany({
      where: {
        salonId,
      },
      include: {
        client: true,
        service: true,
        worker: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }),
    prisma.order.findMany({
      where: {
        salonId,
      },
      include: {
        client: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }),
    prisma.user.findMany({
      where: {
        salonId,
        role: 'WORKER',
      },
      include: {
        workerProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }),
    prisma.earnedCommission.findMany({
      where: {
        booking: {
          salonId,
        },
      },
      include: {
        booking: {
          include: {
            client: true,
            service: true,
            worker: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    }),
  ])

  const entries: AdminActivityEntry[] = [
    ...bookings.map((booking) => ({
      id: `booking-${booking.id}`,
      timestamp: booking.createdAt,
      actorName: booking.client.name,
      actorRole: 'Client Booking',
      actorAvatarType: 'icon' as const,
      actorAvatarValue: 'event_available',
      eventType: 'Booking' as const,
      eventDotColor: booking.status === 'CONFIRMED' ? 'bg-blue-500' : 'bg-amber-500',
      details: `${booking.client.name} booked ${booking.service.name} with ${booking.worker.user.name}.`,
      refId: `${booking.status.replace('_', ' ')} • ${booking.id.slice(0, 8)}`,
    })),
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      timestamp: order.createdAt,
      actorName: order.client.name,
      actorRole: 'Retail Order',
      actorAvatarType: 'icon' as const,
      actorAvatarValue: 'shopping_bag',
      eventType: 'Order' as const,
      eventDotColor: order.status === 'CONFIRMED' ? 'bg-[#a83a00]' : 'bg-emerald-600',
      details: `${order.client.name} placed an order for ${order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s).`,
      refId: `${order.status.replace('_', ' ')} • ${order.id.slice(0, 8)}`,
    })),
    ...workerUsers.map((worker) => ({
      id: `worker-${worker.id}`,
      timestamp: worker.createdAt,
      actorName: worker.name,
      actorRole: 'Worker Account',
      actorAvatarType: 'icon' as const,
      actorAvatarValue: 'group',
      eventType: 'Staff' as const,
      eventDotColor: 'bg-emerald-600',
      details: `${worker.name} was created as a worker account with ${worker.workerProfile?.commissionPct ?? 0}% commission.`,
      refId: `${worker.email} • ${worker.workerProfile?.isAvailable ? 'Available' : 'Unavailable'}`,
    })),
    ...commissions.map((commission) => ({
      id: `commission-${commission.id}`,
      timestamp: commission.createdAt,
      actorName: commission.booking.worker.user.name,
      actorRole: 'Completed Service',
      actorAvatarType: 'icon' as const,
      actorAvatarValue: 'payments',
      eventType: 'Revenue' as const,
      eventDotColor: 'bg-[#a83a00]',
      details: `${commission.booking.worker.user.name} completed ${commission.booking.service.name} for ${commission.booking.client.name}.`,
      refId: `${formatKes(Number(commission.amount))} earned • ${commission.booking.id.slice(0, 8)}`,
    })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const normalizedQuery = searchQuery?.trim().toLowerCase()
  const filtered = normalizedQuery
    ? entries.filter((entry) =>
        [entry.actorName, entry.actorRole, entry.eventType, entry.details, entry.refId].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
    : entries

  return filtered.slice(0, limit)
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const { salon } = await requireAdminContext()
  const now = new Date()
  const todayStart = startOfDay(now)
  const tomorrowStart = endOfDay(now)
  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)

  const trendStart = new Date(todayStart)
  trendStart.setDate(trendStart.getDate() - 6)

  const [
    appointmentRows,
    bookingRevenueRows,
    orderRevenueRows,
    workers,
    products,
    recentPaidOrders,
    recentActivity,
  ] = await Promise.all([
    prisma.booking.findMany({
      where: {
        salonId: salon.id,
        status: {
          not: 'CANCELLED',
        },
        startTime: {
          gte: yesterdayStart,
          lt: tomorrowStart,
        },
      },
      select: {
        id: true,
        startTime: true,
      },
    }),
    prisma.booking.findMany({
      where: {
        salonId: salon.id,
        status: {
          in: ['CONFIRMED', 'COMPLETED'],
        },
        startTime: {
          gte: trendStart,
          lt: tomorrowStart,
        },
      },
      include: {
        service: true,
      },
    }),
    prisma.order.findMany({
      where: {
        salonId: salon.id,
        status: 'CONFIRMED',
        createdAt: {
          gte: trendStart,
          lt: tomorrowStart,
        },
      },
    }),
    prisma.user.findMany({
      where: {
        salonId: salon.id,
        role: 'WORKER',
      },
      include: {
        workerProfile: true,
      },
    }),
    prisma.product.findMany({
      where: {
        salonId: salon.id,
      },
    }),
    prisma.order.findMany({
      where: {
        salonId: salon.id,
        status: 'CONFIRMED',
      },
      include: {
        client: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    }),
    getSystemActivityLogsForSalon(salon.id, 6),
  ])

  const bookingsToday = appointmentRows.filter(
    (booking) => booking.startTime >= todayStart && booking.startTime < tomorrowStart
  ).length
  const bookingsYesterday = appointmentRows.filter(
    (booking) => booking.startTime >= yesterdayStart && booking.startTime < todayStart
  ).length
  const bookingRevenue = bookingRevenueRows
    .filter((booking) => booking.startTime >= todayStart && booking.startTime < tomorrowStart)
    .reduce((sum, booking) => sum + Number(booking.service.price), 0)
  const orderRevenue = orderRevenueRows
    .filter((order) => order.createdAt >= todayStart && order.createdAt < tomorrowStart)
    .reduce((sum, order) => sum + Number(order.totalAmount), 0)
  const dailyRevenue = bookingRevenue + orderRevenue
  const yesterdayDelta = bookingsToday - bookingsYesterday
  const activeWorkers = workers.filter((worker) => worker.workerProfile?.isAvailable).length
  const totalWorkers = workers.length
  const lowStockCount = products.filter((product) => product.stockCount > 0 && product.stockCount <= 5).length
  const outOfStockCount = products.filter((product) => product.stockCount <= 0).length
  const confirmedOrdersToday = orderRevenueRows.filter(
    (order) => order.createdAt >= todayStart && order.createdAt < tomorrowStart
  ).length

  const trendDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(trendStart)
    day.setDate(trendStart.getDate() + index)
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    const bookingTotal = bookingRevenueRows
      .filter((booking) => booking.startTime >= dayStart && booking.startTime < dayEnd)
      .reduce((sum, booking) => sum + Number(booking.service.price), 0)

    const orderTotal = orderRevenueRows
      .filter((order) => order.createdAt >= dayStart && order.createdAt < dayEnd)
      .reduce((sum, order) => sum + Number(order.totalAmount), 0)

    return {
      label: new Intl.DateTimeFormat('en-KE', { weekday: 'short' }).format(day),
      total: bookingTotal + orderTotal,
    }
  })

  const maxTrendValue = Math.max(...trendDays.map((day) => day.total), 1)

  return {
    salonName: salon.name,
    todayLabel: formatFullDate(now),
    bookingsToday,
    yesterdayDelta,
    dailyRevenue,
    activeWorkers,
    totalWorkers,
    confirmedOrdersToday,
    lowStockCount,
    outOfStockCount,
    recentPaidOrders: recentPaidOrders.map((order) => ({
      id: order.id,
      clientName: order.client.name,
      totalAmount: Number(order.totalAmount),
      createdAt: order.createdAt,
      itemSummary: order.items.map((item) => `${item.quantity}x ${item.product.name}`).join(', '),
    })),
    trendDays: trendDays.map((day) => ({
      ...day,
      heightPercent: Math.max(16, Math.round((day.total / maxTrendValue) * 100)),
    })),
    recentActivity,
  }
}

export async function getSystemActivityLogs(
  limit = 40,
  searchQuery?: string
): Promise<AdminActivityEntry[]> {
  const { salon } = await requireAdminContext()
  return getSystemActivityLogsForSalon(salon.id, limit, searchQuery)
}
