import Link from 'next/link'
import WorkerSignOutButton from '@/app/(worker)/WorkerSignOutButton'
import { prisma } from '@/lib/prisma'
import {
  formatCurrency,
  getWorkerInitials,
  requireWorkerPortalContext,
} from '@/lib/worker-portal'

export default async function EarningsLedgerPage() {
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
      client: true,
      earnedCommission: true,
    },
    orderBy: {
      startTime: 'desc',
    },
  })

  const transactions = bookings.map((booking) => {
    const commissionValue =
      booking.earnedCommission?.amount != null
        ? Number(booking.earnedCommission.amount)
        : Number(booking.service.price) * (workerProfile.commissionPct / 100)

    return {
      id: booking.id,
      date: new Intl.DateTimeFormat('en-KE', {
        month: 'short',
        day: 'numeric',
      }).format(booking.startTime),
      service: booking.service.name,
      client: booking.client.name,
      cut: commissionValue,
      status: booking.status,
    }
  })

  const totalEarned = transactions
    .filter((transaction) => transaction.status === 'COMPLETED')
    .reduce((sum, transaction) => sum + transaction.cut, 0)

  const completedCommission = totalEarned

  const pendingPayout = transactions
    .filter((transaction) => transaction.status !== 'COMPLETED')
    .reduce((sum, transaction) => sum + transaction.cut, 0)

  const totalJobs = transactions.length

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
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

      <div className="flex min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] overflow-x-hidden selection:bg-[#ffdbce]">
        <aside className="fixed left-0 top-0 bottom-0 w-[80px] bg-[#f3ede4] border-r border-[#5f5e5e] flex flex-col items-center justify-between py-8 z-50">
          <div className="mb-10">
            <span className="material-symbols-outlined text-[#a83a00] text-[32px] select-none">
              content_cut
            </span>
          </div>

          <div className="mt-auto w-full flex flex-col items-center pb-8">
            <WorkerSignOutButton
              className="group flex flex-col items-center justify-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors rounded"
              label="Logout"
            />
          </div>
        </aside>

        <div className="flex-1 ml-[80px] flex flex-col min-h-screen w-[calc(100%-80px)]">
          <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] flex justify-between items-center px-8 border-b border-[#5f5e5e] z-40">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <span className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#a83a00]">
                  {salon.name}
                </span>
              </div>
              <nav className="flex items-center gap-6 font-mono text-sm">
                <Link href="/schedule" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Schedule</Link>
                <Link href="/earnings" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Earnings</Link>
                <Link href="/worker-profile" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Profile</Link>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="px-6 py-2 bg-[#a83a00] text-white font-mono text-sm font-medium rounded-sm shadow-sm">
                {workerProfile.commissionPct}% Commission
              </div>
              <div className="flex items-center gap-2 cursor-default select-none">
                <div className="h-10 w-10 overflow-hidden border border-[#5f5e5e] bg-[#f3ede4] flex items-center justify-center font-mono text-sm font-bold text-[#a83a00]">
                  {getWorkerInitials(workerUser.name)}
                </div>
                <span className="text-base font-bold text-[#a83a00]">{workerUser.name}</span>
              </div>
            </div>
          </header>

          <main className="mt-16 p-8 max-w-[1280px] mx-auto w-full pb-24">
            <div className="flex flex-col mb-10">
              <h1 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Earnings Ledger</h1>
              <p className="text-base text-[#5f5e5e] mt-1">Track your bookings, completed commissions, and pending earnings in one place.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Total Earned</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">{formatCurrency(totalEarned)}</div>
              </div>

              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Completed Commission</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">{formatCurrency(completedCommission)}</div>
              </div>

              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Total Jobs</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">{totalJobs}</div>
              </div>

              <div className="bg-[#ff7033] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#601d00] uppercase font-bold tracking-wider">Pending Payout</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#601d00] mt-2">{formatCurrency(pendingPayout)}</div>
              </div>
            </div>

            <div className="bg-[#fff9ef] border border-[#5f5e5e] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#5f5e5e] flex justify-between items-center bg-[#f9f3ea]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Recent Transactions</h2>
                <div className="font-mono text-xs text-[#5f5e5e] uppercase tracking-widest">
                  Auto-calculated from assigned bookings
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#f3ede4] text-[#5f5e5e] font-mono text-xs">
                    <tr>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Date</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Service</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Client</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Status</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e] text-right">Your Cut</th>
                    </tr>
                  </thead>
                  <tbody className="text-base divide-y divide-[#5f5e5e]/20">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-[#5f5e5e]">
                          No worker bookings have been assigned yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-[#f9f3ea] transition-all duration-150 hover:translate-x-1 cursor-default group"
                        >
                          <td className="px-6 py-5 font-mono text-sm text-[#5f5e5e] group-hover:text-[#1d1b16]">{tx.date}</td>
                          <td className="px-6 py-5 font-bold text-[#1d1b16]">{tx.service}</td>
                          <td className="px-6 py-5 text-[#594139]">{tx.client}</td>
                          <td className="px-6 py-5">
                            <span className="font-mono text-xs uppercase tracking-wider text-[#5f5e5e]">
                              {tx.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right font-mono text-sm font-bold text-[#a83a00]">{formatCurrency(tx.cut)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-5 bg-[#f9f3ea] border-t border-[#5f5e5e] flex justify-center">
                <Link href="/schedule" className="text-[#a83a00] font-mono text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4">
                  Back To Schedule
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
