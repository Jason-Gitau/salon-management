import Link from 'next/link'
import WorkerSignOutButton from '@/app/(worker)/WorkerSignOutButton'
import { prisma } from '@/lib/prisma'
import {
  formatCurrency,
  getWorkerInitials,
  requireWorkerPortalContext,
} from '@/lib/worker-portal'

export default async function WorkerProfilePage() {
  const { workerUser, workerProfile, salon } = await requireWorkerPortalContext()

  const bookings = await prisma.booking.findMany({
    where: {
      salonId: salon.id,
      workerId: workerProfile.id,
      status: {
        not: 'CANCELLED',
      },
    },
    include: {
      service: true,
      earnedCommission: true,
    },
    orderBy: {
      startTime: 'desc',
    },
  })

  const totalBookings = bookings.length
  const completedBookings = bookings.filter((booking) => booking.status === 'COMPLETED').length
  const upcomingBookings = bookings.filter((booking) => booking.status !== 'COMPLETED').length
  const totalEarned = bookings
    .filter((booking) => booking.status === 'COMPLETED')
    .reduce((sum, booking) => {
      const commission =
        booking.earnedCommission?.amount != null
          ? Number(booking.earnedCommission.amount)
          : Number(booking.service.price) * (workerProfile.commissionPct / 100)

      return sum + commission
    }, 0)

  return (
    <main className="min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] p-6">
      <div className="mx-auto max-w-5xl rounded-xl border border-[#5f5e5e] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#5f5e5e] bg-[#f3ede4] font-mono text-2xl font-bold text-[#a83a00]">
              {getWorkerInitials(workerUser.name)}
            </div>
            <div>
              <h1 className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#a83a00]">Worker Profile</h1>
              <p className="mt-1 text-lg text-[#1d1b16]">{workerUser.name}</p>
              <p className="text-[#5f5e5e]">{workerUser.email}</p>
              <p className="text-[#5f5e5e]">{workerUser.phone}</p>
            </div>
          </div>

          <WorkerSignOutButton
            className="inline-flex items-center gap-2 border border-[#5f5e5e] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#f3ede4]"
            title="Log out"
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#5f5e5e] bg-[#f9f3ea] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Salon</p>
            <p className="mt-2 font-semibold">{salon.name}</p>
          </div>
          <div className="rounded-lg border border-[#5f5e5e] bg-[#f9f3ea] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Commission Rate</p>
            <p className="mt-2 font-semibold">{workerProfile.commissionPct}%</p>
          </div>
          <div className="rounded-lg border border-[#5f5e5e] bg-[#f9f3ea] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Availability</p>
            <p className="mt-2 font-semibold">{workerProfile.isAvailable ? 'Available for allocation' : 'Unavailable'}</p>
          </div>
          <div className="rounded-lg border border-[#5f5e5e] bg-[#f9f3ea] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Total Earned</p>
            <p className="mt-2 font-semibold">{formatCurrency(totalEarned)}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#5f5e5e] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Bookings</p>
            <p className="mt-2 text-2xl font-semibold">{totalBookings}</p>
          </div>
          <div className="rounded-lg border border-[#5f5e5e] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Completed</p>
            <p className="mt-2 text-2xl font-semibold">{completedBookings}</p>
          </div>
          <div className="rounded-lg border border-[#5f5e5e] p-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Upcoming</p>
            <p className="mt-2 text-2xl font-semibold">{upcomingBookings}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/schedule" className="rounded-lg border border-[#5f5e5e] p-4 hover:bg-[#f9f3ea]">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Navigate</p>
            <p className="mt-2 font-semibold">Go to Schedule</p>
          </Link>
          <Link href="/earnings" className="rounded-lg border border-[#5f5e5e] p-4 hover:bg-[#f9f3ea]">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Navigate</p>
            <p className="mt-2 font-semibold">Go to Earnings</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
