import Link from 'next/link'
import { markWorkerBookingCompleted } from '@/app/actions/worker-booking-actions'
import WorkerSignOutButton from '@/app/(worker)/WorkerSignOutButton'
import {
  formatCurrency,
  formatDurationMinutes,
  requireWorkerPortalContext,
} from '@/lib/worker-portal'
import { prisma } from '@/lib/prisma'

function getScheduleCardStatus(startTime: Date, endTime: Date, bookingStatus: 'PENDING_PAYMENT' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') {
  if (bookingStatus === 'COMPLETED') {
    return 'completed' as const
  }

  const now = new Date()

  if (startTime <= now && now < endTime) {
    return 'in-progress' as const
  }

  return 'upcoming' as const
}

export default async function WorkerSchedulePage() {
  const { workerUser, workerProfile, salon } = await requireWorkerPortalContext()

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const todayEnd = new Date(todayStart)
  todayEnd.setDate(todayEnd.getDate() + 1)

  const bookings = await prisma.booking.findMany({
    where: {
      salonId: salon.id,
      workerId: workerProfile.id,
      status: {
        not: 'CANCELLED',
      },
      startTime: {
        gte: todayStart,
        lt: todayEnd,
      },
    },
    include: {
      service: true,
      client: true,
      earnedCommission: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  })

  const appointmentCards = bookings.map((booking) => {
    const commissionValue =
      booking.earnedCommission?.amount != null
        ? Number(booking.earnedCommission.amount)
        : Number(booking.service.price) * (workerProfile.commissionPct / 100)

    return {
      id: booking.id,
      time: new Intl.DateTimeFormat('en-KE', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(booking.startTime),
      duration: formatDurationMinutes(booking.service.duration),
      service: booking.service.name,
      client: booking.client.name,
      status: getScheduleCardStatus(booking.startTime, booking.endTime, booking.status),
      commissionLabel: formatCurrency(commissionValue),
      statusLabel: booking.status.replace('_', ' '),
    }
  })

  const completedCount = bookings.filter((booking) => booking.status === 'COMPLETED').length
  const totalCount = bookings.length
  const bookedMinutes = bookings.reduce((sum, booking) => sum + booking.service.duration, 0)
  const earnedSoFar = bookings
    .filter((booking) => booking.status === 'COMPLETED')
    .reduce((sum, booking) => {
      const commission = booking.earnedCommission?.amount != null
        ? Number(booking.earnedCommission.amount)
        : Number(booking.service.price) * (workerProfile.commissionPct / 100)

      return sum + commission
    }, 0)

  const todayLabel = new Intl.DateTimeFormat('en-KE', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(todayStart)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#f9f3ea] text-[#1d1b16] font-['Manrope',sans-serif] antialiased min-h-screen flex flex-col overflow-x-hidden text-[15px] selection:bg-[#a83a00] selection:text-white">
        <aside className="fixed left-0 top-0 bottom-0 w-[80px] bg-[#ede7de] border-r border-[#5f5e5e] flex flex-col items-center justify-between py-6 z-[60]">
          <div className="flex flex-col items-center gap-10">
            <span className="material-symbols-outlined text-[#a83a00] text-[32px] select-none">
              content_cut
            </span>
          </div>

          <div className="flex flex-col items-center">
            <WorkerSignOutButton
              className="p-4 hover:bg-[#e7e2d9] transition-colors rounded-none text-[#5f5e5e] hover:text-[#a83a00]"
            />
          </div>
        </aside>

        <header className="bg-[#f9f3ea] border-b border-[#5f5e5e] flex justify-between items-center px-5 py-4 sticky top-0 z-50 ml-[80px] w-[calc(100%-80px)]">
          <div className="flex items-center gap-5">
            <span className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00]">
              {salon.name}
            </span>
            <nav className="hidden md:flex items-center gap-6 ml-10">
              <Link href="/schedule" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1 font-mono text-sm transition-colors">Schedules</Link>
              <Link href="/earnings" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors font-mono text-sm">Earnings</Link>
              <Link href="/worker-profile" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors font-mono text-sm">Profile</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="border border-[#5f5e5e] bg-[#fff9ef] px-4 py-2 font-mono text-sm">
              {workerUser.name}
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-[1280px] mx-auto px-5 md:px-8 py-10 ml-[80px] w-[calc(100%-80px)]">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#5f5e5e] pb-6">
            <div>
              <h1 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl text-[#1d1b16] font-semibold mb-1">
                My Schedule
              </h1>
              <p className="text-[#5f5e5e] text-base">{todayLabel} - {totalCount} Appointments</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5f5e5e]" style={{ fontVariationSettings: "'FILL' 0" }}>calendar_today</span>
              <span className="font-mono text-sm font-medium text-[#5f5e5e] uppercase tracking-wider">Today</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
            <div className="hidden lg:block absolute left-[120px] top-0 bottom-0 w-[1px] bg-[#5f5e5e] opacity-20 pointer-events-none" />

            <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
              {appointmentCards.length === 0 ? (
                <div className="border border-[#5f5e5e] bg-[#fff9ef] p-8">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">
                    No bookings for today
                  </h3>
                  <p className="mt-2 text-[#5f5e5e]">
                    When a customer books a slot that is assigned to you, it will appear here automatically.
                  </p>
                </div>
              ) : (
                appointmentCards.map((app) => {
                  if (app.status === 'completed') {
                    return (
                      <div key={app.id} className="flex flex-col lg:flex-row gap-4 lg:gap-10 relative group">
                        <div className="w-full lg:w-[100px] flex-shrink-0 pt-2">
                          <span className="font-mono text-sm font-medium text-[#5f5e5e] block">{app.time}</span>
                          <span className="font-mono text-xs text-[#5f5e5e]/60 block">{app.duration}</span>
                        </div>
                        <div className="flex-grow bg-[#fff9ef] border border-[#5f5e5e] p-4 opacity-60">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16] line-through decoration-[#5f5e5e]/50">
                                {app.service}
                              </h3>
                              <p className="text-base text-[#5f5e5e] mt-1">Client: {app.client}</p>
                            </div>
                            <div className="text-right">
                              <div className="border border-[#5f5e5e] px-2 py-1 font-mono text-xs text-[#5f5e5e] bg-[#f3ede4]">
                                Completed
                              </div>
                              <p className="mt-2 font-mono text-xs text-[#5f5e5e]">Earned: {app.commissionLabel}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  if (app.status === 'in-progress') {
                    return (
                      <div key={app.id} className="flex flex-col lg:flex-row gap-4 lg:gap-10 relative group">
                        <div className="w-full lg:w-[100px] flex-shrink-0 pt-2">
                          <span className="font-mono text-sm font-bold text-[#a83a00] block">{app.time}</span>
                          <span className="font-mono text-xs text-[#5f5e5e] block">{app.duration}</span>
                        </div>

                        <div className="hidden lg:block absolute left-[116px] top-[14px] w-[9px] h-[9px] bg-[#a83a00] border border-[#5f5e5e] z-10" />

                        <div className="flex-grow bg-[#fff9ef] border border-[#5f5e5e] p-6 relative overflow-hidden shadow-sm">
                          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#a83a00] border-r border-[#5f5e5e]" />

                          <div className="pl-2">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="border border-[#5f5e5e] px-2 py-0.5 font-mono text-xs text-[#1d1b16] bg-[#a83a00]/10 font-semibold uppercase">
                                    In Progress
                                  </span>
                                </div>
                                <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">
                                  {app.service}
                                </h3>
                                <p className="text-lg text-[#5f5e5e] mt-0.5">Client: {app.client}</p>
                              </div>

                              <form action={markWorkerBookingCompleted} className="w-full md:w-auto">
                                <input type="hidden" name="bookingId" value={app.id} />
                                <button
                                  type="submit"
                                  className="bg-[#a83a00] text-[#fff9ef] border border-[#5f5e5e] font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 hover:bg-[#802a00] transition-all shadow-[4px_4px_0px_0px_#5f5e5e] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] w-full md:w-auto flex items-center justify-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                  Mark Completed
                                </button>
                              </form>
                            </div>

                            <div className="border-t border-[#5f5e5e]/20 pt-4 mt-4 flex flex-wrap gap-6">
                              <div className="flex items-center gap-1.5 font-mono text-xs text-[#1d1b16]">
                                <span className="material-symbols-outlined text-[#5f5e5e] text-[18px]">payments</span>
                                <span>Est. Commission: {app.commissionLabel}</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-mono text-xs text-[#1d1b16]">
                                <span className="material-symbols-outlined text-[#5f5e5e] text-[18px]">info</span>
                                <span>Status: {app.statusLabel}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={app.id} className="flex flex-col lg:flex-row gap-4 lg:gap-10 relative group">
                      <div className="w-full lg:w-[100px] flex-shrink-0 pt-2">
                        <span className="font-mono text-sm font-medium text-[#1d1b16] block">{app.time}</span>
                        <span className="font-mono text-xs text-[#5f5e5e] block">{app.duration}</span>
                      </div>
                      <div className="flex-grow bg-[#fff9ef] border border-[#5f5e5e] p-4 hover:bg-[#e7e2d9] transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16]">
                              {app.service}
                            </h3>
                            <p className="text-base text-[#5f5e5e] mt-1">Client: {app.client}</p>
                          </div>
                          <div className="text-right">
                            <div className="border border-[#5f5e5e] px-2 py-1 font-mono text-xs text-[#1d1b16] bg-[#ede7de]">
                              Upcoming
                            </div>
                            <p className="mt-2 font-mono text-xs text-[#5f5e5e]">Est. {app.commissionLabel}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="col-span-1 lg:col-span-4 mt-10 lg:mt-0">
              <div className="bg-[#fff9ef] border border-[#5f5e5e] p-6 sticky top-[100px] shadow-sm">
                <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16] mb-4 border-b border-[#5f5e5e]/20 pb-3">
                  Daily Summary
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-[#5f5e5e]">Completed</span>
                    <span className="font-mono text-sm font-bold text-[#1d1b16]">{completedCount} / {totalCount}</span>
                  </div>

                  <div className="flex justify-between items-center text-base">
                    <span className="text-[#5f5e5e]">Hours Booked</span>
                    <span className="font-mono text-sm font-bold text-[#1d1b16]">{formatDurationMinutes(bookedMinutes)}</span>
                  </div>

                  <div className="flex justify-between items-center text-base">
                    <span className="text-[#5f5e5e]">Commission Rate</span>
                    <span className="font-mono text-sm font-bold text-[#1d1b16]">{workerProfile.commissionPct}%</span>
                  </div>

                  <div className="h-[1px] bg-[#5f5e5e]/20 my-1" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg text-[#1d1b16] font-semibold">Earned So Far</span>
                    <span className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00]">{formatCurrency(earnedSoFar)}</span>
                  </div>

                  <Link
                    href="/earnings"
                    className="mt-4 bg-transparent border border-[#5f5e5e] text-[#1d1b16] font-mono text-xs uppercase tracking-wider py-2.5 hover:bg-[#e7e2d9] transition-colors w-full flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    View Earnings Ledger
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
