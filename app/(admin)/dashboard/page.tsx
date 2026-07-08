import Link from 'next/link'
import SignOutButton from '@/app/components/SignOutButton'
import {
  formatDateTime,
  formatKes,
  getDashboardSnapshot,
} from '@/lib/admin-insights'

export default async function OwnerDashboardPage() {
  const snapshot = await getDashboardSnapshot()

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2dfde; border-radius: 4px; }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] h-screen w-full flex overflow-hidden selection:bg-[#a83a00] selection:text-white">
        <nav className="hidden md:flex flex-col items-center py-6 w-[80px] h-screen border-r border-[#5f5e5e] bg-[#fff9ef] fixed left-0 top-0 z-40">
          <div className="mb-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-3xl text-[#a83a00]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>

          <div className="flex flex-col gap-2 w-full flex-grow">
            <Link href="/dashboard" className="flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 bg-[#a83a00] text-white border-[#370d00]">
              <span className="material-symbols-outlined mb-1 text-[20px]">dashboard</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Dashboard</span>
            </Link>
            <Link href="/service" className="flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">content_cut</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Services</span>
            </Link>
            <Link href="/staff" className="flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">groups</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Staff</span>
            </Link>
            <Link href="/products" className="flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">inventory_2</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Products</span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex flex-col md:ml-[80px] h-screen bg-[#f9f3ea] relative">
          <header className="flex justify-between items-center px-5 py-4 w-full bg-[#f9f3ea] border-b border-[#5f5e5e] sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <h1 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00] tracking-tight">{snapshot.salonName}</h1>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/activities" className="flex items-center gap-1 px-3 py-1.5 border border-[#5f5e5e] bg-white font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                Logs
              </Link>
              <SignOutButton
                className="flex items-center gap-1 px-3 py-1.5 border border-[#5f5e5e] bg-white font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors"
                label="Logout"
              />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-5 lg:p-8">
            <div className="max-w-[1280px] mx-auto space-y-10 pb-24 md:pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-[#5f5e5e] pb-4">
                <div>
                  <p className="font-mono text-xs font-medium text-[#5f5e5e] tracking-widest uppercase mb-1">{snapshot.todayLabel}</p>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-5xl font-semibold tracking-tight text-[#1d1b16]">Overview</h2>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 border border-[#5f5e5e] bg-white font-mono text-xs font-medium">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Today
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Today's Appointments</span>
                    <span className="material-symbols-outlined text-[#a83a00]">calendar_month</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">{snapshot.bookingsToday}</div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="material-symbols-outlined text-[14px]">{snapshot.yesterdayDelta >= 0 ? 'trending_up' : 'trending_down'}</span>
                      <span className="font-mono text-xs font-medium">
                        {snapshot.yesterdayDelta >= 0 ? '+' : ''}{snapshot.yesterdayDelta} vs yesterday
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ffb59a]/20 rounded-full blur-2xl group-hover:bg-[#ffb59a]/40 transition-colors pointer-events-none" />
                </div>

                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Daily Revenue</span>
                    <span className="material-symbols-outlined text-[#a83a00]">payments</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">{formatKes(snapshot.dailyRevenue)}</div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="font-mono text-xs font-medium">{snapshot.confirmedOrdersToday} paid product orders today</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ebe1d4]/40 rounded-full blur-2xl group-hover:bg-[#ebe1d4]/60 transition-colors pointer-events-none" />
                </div>

                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Active Staff</span>
                    <span className="material-symbols-outlined text-[#a83a00]">groups</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">
                      {snapshot.activeWorkers}<span className="text-2xl text-[#5f5e5e] ml-1">/ {snapshot.totalWorkers}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="font-mono text-xs font-medium">{snapshot.lowStockCount} low stock • {snapshot.outOfStockCount} out of stock</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#e5e2e1]/50 rounded-full blur-2xl group-hover:bg-[#e5e2e1]/80 transition-colors pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white border border-[#5f5e5e] flex flex-col min-h-[400px] shadow-sm">
                  <div className="border-b border-[#5f5e5e] p-4 flex justify-between items-center bg-[#f9f3ea]/50">
                    <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Revenue Trend</h3>
                    <span className="bg-transparent font-mono text-xs font-medium text-[#5f5e5e]">This Week</span>
                  </div>

                  <div className="flex-1 p-4 flex flex-col relative bg-white">
                    <div className="flex-1 flex items-end justify-between gap-1 lg:gap-4 pt-10 pb-4 relative border-b border-[#5f5e5e]/20">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4 opacity-20">
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                      </div>

                      {snapshot.trendDays.map((day, index) => (
                        <div
                          key={`${day.label}-${index}`}
                          className={`${index === snapshot.trendDays.length - 1 ? 'bg-[#ffdbce] hover:bg-[#ffb59a]' : 'bg-[#a83a00]/60 hover:bg-[#a83a00]/80'} w-full transition-colors border border-[#a83a00] relative group`}
                          style={{ height: `${day.heightPercent}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity whitespace-nowrap">
                            {formatKes(day.total)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-2 font-mono text-xs font-medium text-[#5f5e5e]">
                      {snapshot.trendDays.map((day, index) => (
                        <span key={`${day.label}-axis-${index}`}>{day.label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#5f5e5e] flex flex-col shadow-sm">
                  <div className="border-b border-[#5f5e5e] p-4 flex justify-between items-center bg-[#f9f3ea]/50">
                    <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Recent Activity</h3>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-[#5f5e5e]/20">
                    {snapshot.recentActivity.length > 0 ? snapshot.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-4 p-4 hover:bg-[#e7e2d9]/30 transition-colors">
                        <div className="w-10 h-10 rounded-full border border-[#5f5e5e] bg-[#f3ede4] text-[#594139] flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{activity.actorAvatarValue}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-base text-[#1d1b16]"><span className="font-bold">{activity.actorName}</span> {activity.details}</p>
                            <span className="font-mono text-xs text-[#5f5e5e] whitespace-nowrap ml-2">{formatDateTime(activity.timestamp)}</span>
                          </div>
                          <p className="font-mono text-xs text-[#5f5e5e] mt-0.5">{activity.refId}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="p-6 text-sm text-[#5f5e5e]">No recent system activity yet.</div>
                    )}
                  </div>

                  <div className="p-3 border-t border-[#5f5e5e] bg-[#f9f3ea]/50 text-center mt-auto">
                    <Link href="/activities" className="font-mono text-xs font-bold text-[#a83a00] hover:underline uppercase tracking-widest">
                      View All Logs
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#5f5e5e] shadow-sm">
                <div className="border-b border-[#5f5e5e] p-4 flex justify-between items-center bg-[#f9f3ea]/50">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Recent Paid Orders</h3>
                  <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Confirmed only</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#e7e2d9] border-b border-[#5f5e5e] font-mono text-xs font-bold text-[#1d1b16] uppercase tracking-wider">
                        <th className="p-4">Order</th>
                        <th className="p-4">Client</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Placed</th>
                        <th className="p-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#5f5e5e]/10">
                      {snapshot.recentPaidOrders.length > 0 ? snapshot.recentPaidOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#f9f3ea] transition-colors">
                          <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                          <td className="p-4 font-medium">{order.clientName}</td>
                          <td className="p-4 text-sm text-[#5f5e5e]">{order.itemSummary || 'No items recorded'}</td>
                          <td className="p-4 font-mono text-xs text-[#5f5e5e]">{formatDateTime(order.createdAt)}</td>
                          <td className="p-4 text-right font-mono font-bold text-[#a83a00]">{formatKes(order.totalAmount)}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-sm text-[#5f5e5e]">
                            No paid orders have been placed yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
