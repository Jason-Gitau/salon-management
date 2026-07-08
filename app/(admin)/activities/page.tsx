import Link from 'next/link'
import {
  formatDateTime,
  formatFullDate,
  getSystemActivityLogs,
} from '@/lib/admin-insights'

type PageProps = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function ActivityLogsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const searchQuery = params.q?.trim() ?? ''
  const logs = await getSystemActivityLogs(80, searchQuery)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c8c6c5; border-radius: 4px; }
      `}</style>

      <div className="flex min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] antialiased selection:bg-[#ff7033] selection:text-[#601d00] overflow-x-hidden">
        <nav className="hidden md:flex w-[80px] h-screen border-r border-[#5f5e5e] bg-[#fff9ef] fixed left-0 top-0 flex-col items-center py-8 z-40">
          <div className="mb-10 flex flex-col items-center justify-center w-full">
            <div className="w-10 h-10 rounded-full border border-[#5f5e5e] flex items-center justify-center bg-[#ff7033] text-[#601d00] font-['Space_Grotesk',sans-serif] text-xl font-bold select-none">
              G
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center w-full gap-2">
            <Link href="/dashboard" className="w-full flex flex-col items-center justify-center py-2 bg-[#a83a00] text-white border-l-4 border-[#370d00] transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Back</span>
            </Link>
          </div>
        </nav>

        <main className="flex-1 md:ml-[80px] flex flex-col min-h-screen w-[calc(100%-80px)]">
          <header className="flex justify-between items-center px-8 py-4 w-full bg-[#f9f3ea] border-b border-[#5f5e5e] sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <h1 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00] tracking-tight">Luxe Salon Portal</h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-[#5f5e5e] bg-[#fff9ef] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1d1b16] hover:bg-[#e7e2d9] transition-colors rounded-sm shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </header>

          <div className="flex-1 p-8 max-w-[1280px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-bold text-[#1d1b16] mb-2">Activity Logs</h2>
                <p className="text-base text-[#5f5e5e] max-w-2xl">
                  Live system events derived from bookings, paid orders, worker creation, and completed commissions.
                </p>
              </div>
            </div>

            <div className="bg-[#fff9ef]/70 backdrop-blur-md border border-[#5f5e5e] rounded-lg p-4 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm">
              <form action="/activities" className="flex-1 w-full relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] select-none text-[20px]">search</span>
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search logs, users, or details..."
                  className="w-full bg-[#fff9ef] border border-[#5f5e5e] pl-10 pr-4 py-2 text-base text-[#1d1b16] focus:outline-none focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] rounded-sm placeholder:text-[#5f5e5e]/50"
                />
              </form>

              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="px-3 py-2 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] rounded-sm">
                  All Event Types
                </div>
                <div className="px-3 py-2 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] rounded-sm">
                  Last 80 Events
                </div>
              </div>
            </div>

            <div className="bg-[#fff9ef] border border-[#5f5e5e] rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[840px]">
                  <thead>
                    <tr className="border-b border-[#5f5e5e] bg-[#e7e2d9] font-mono text-xs font-bold text-[#1d1b16]">
                      <th className="py-3.5 px-4 w-48 uppercase tracking-wider">Timestamp</th>
                      <th className="py-3.5 px-4 w-64 uppercase tracking-wider">User / Actor</th>
                      <th className="py-3.5 px-4 w-40 uppercase tracking-wider">Event Type</th>
                      <th className="py-3.5 px-4 uppercase tracking-wider">Details &amp; Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-base text-[#1d1b16] divide-y divide-[#5f5e5e]/15">
                    {logs.length > 0 ? logs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#f9f3ea] transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="text-sm font-medium text-[#1d1b16]">{formatDateTime(log.timestamp)}</div>
                          <div className="text-xs text-[#5f5e5e] font-mono mt-0.5">{formatFullDate(log.timestamp)} • {formatDateTime(log.timestamp)}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-[#5f5e5e] bg-[#a39b8f] flex items-center justify-center text-[#38332a] shrink-0">
                              <span className="material-symbols-outlined text-[16px]">{log.actorAvatarValue}</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#1d1b16]">{log.actorName}</div>
                              <div className="text-xs text-[#5f5e5e] font-mono">{log.actorRole}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-sm border border-[#5f5e5e] bg-[#fff9ef] text-xs font-mono text-[#1d1b16]">
                            <span className={`w-2 h-2 rounded-full mr-2 shrink-0 ${log.eventDotColor}`} />
                            <span>{log.eventType}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-sm leading-snug">{log.details}</div>
                          <div className="text-xs font-mono mt-1 text-[#5f5e5e]">{log.refId}</div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-sm text-[#5f5e5e]">
                          No system logs matched the current query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#5f5e5e] px-4 py-3 flex items-center justify-between bg-white font-mono text-xs">
                <div className="text-[#5f5e5e]">
                  Showing <span className="font-bold text-[#1d1b16]">{logs.length}</span> recent entries
                </div>
                <div className="text-[#5f5e5e]">Live Prisma-backed system feed</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
