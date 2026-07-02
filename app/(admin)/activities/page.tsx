'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'

interface LogEntry {
  id: string
  time: string
  date: string
  actorName: string
  actorRole: string
  actorAvatarType: 'image' | 'icon'
  actorAvatarValue: string
  eventType: 'Booking' | 'Inventory' | 'Revenue' | 'Staff' | 'System'
  eventDotColor?: string
  eventUseIcon?: boolean
  details: ReactNode
  refId: string
  refIdAlert?: boolean
}

const initialLogs: LogEntry[] = [
  {
    id: 'log-1',
    time: 'Today, 14:32',
    date: 'Oct 26, 2023',
    actorName: 'Sarah Jenkins',
    actorRole: 'Front Desk',
    actorAvatarType: 'image',
    actorAvatarValue: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    eventType: 'Booking',
    eventDotColor: 'bg-blue-500',
    details: <>Created new appointment for <span className="font-medium text-[#a83a00]">Emma Watson</span> (Balayage &amp; Cut).</>,
    refId: 'Ref ID: #BKG-9021',
  },
  {
    id: 'log-2',
    time: 'Today, 11:15',
    date: 'Oct 26, 2023',
    actorName: 'System Auto',
    actorRole: 'Inventory Monitor',
    actorAvatarType: 'icon',
    actorAvatarValue: 'smart_toy',
    eventType: 'Inventory',
    eventDotColor: 'bg-amber-500',
    details: <>Low stock alert generated for <span className="font-medium">Olaplex No. 3</span> (Remaining: 2 units).</>,
    refId: 'Action Required',
    refIdAlert: true,
  },
  {
    id: 'log-3',
    time: 'Yesterday, 18:45',
    date: 'Oct 25, 2023',
    actorName: 'Marcus Cole',
    actorRole: 'Manager',
    actorAvatarType: 'image',
    actorAvatarValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    eventType: 'Revenue',
    eventDotColor: 'bg-[#a83a00]',
    details: <>Processed daily register closeout. Total: <span className="font-medium text-[#a83a00]">$4,250.00</span>.</>,
    refId: 'No discrepancies found.',
  },
  {
    id: 'log-4',
    time: 'Yesterday, 09:00',
    date: 'Oct 25, 2023',
    actorName: 'Marcus Cole',
    actorRole: 'Manager',
    actorAvatarType: 'image',
    actorAvatarValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    eventType: 'Staff',
    eventDotColor: 'bg-emerald-600',
    details: <>Updated schedule for <span className="font-medium">Jessica T.</span> (Shift swap approved).</>,
    refId: 'Effective: Next Week',
  },
  {
    id: 'log-5',
    time: '15:20',
    date: 'Oct 24, 2023',
    actorName: 'Admin Root',
    actorRole: 'System Administrator',
    actorAvatarType: 'icon',
    actorAvatarValue: 'admin_panel_settings',
    eventType: 'System',
    eventUseIcon: true,
    details: <>Modified global cancellation policy buffer from 24h to 48h.</>,
    refId: 'Policy ID: POL-02',
  },
]

export default function ActivityLogsPage() {
  const [logs] = useState<LogEntry[]>(initialLogs)
  const [searchQuery, setSearchQuery] = useState('')
  const [activePills, setActivePills] = useState(['Date: Last 7 Days'])

  // Interactive handler: Remove a filter pill
  const handleRemovePill = (pillToRemove: string) => {
    setActivePills((prev) => prev.filter((p) => p !== pillToRemove))
  }

  // Filter logs by search query
  const filteredLogs = logs.filter((log) =>
    log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.refId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExportCSV = () => {
    alert('Exporting system audit logs to CSV...')
  }

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .active-nav-fill { font-variation-settings: 'FILL' 1; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c8c6c5; border-radius: 4px; }
      `}</style>

      <div className="flex min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] antialiased selection:bg-[#ff7033] selection:text-[#601d00] overflow-x-hidden">
        
        {/* DESKTOP SIDEBAR NAVIGATION (Fixed 80px) */}
        <nav className="hidden md:flex w-[80px] h-screen border-r border-[#5f5e5e] bg-[#fff9ef] fixed left-0 top-0 flex-col items-center py-8 z-40">
          {/* Avatar Space */}
          <div className="mb-10 flex flex-col items-center justify-center w-full">
            <div className="w-10 h-10 rounded-full border border-[#5f5e5e] flex items-center justify-center bg-[#ff7033] text-[#601d00] font-['Space_Grotesk',sans-serif] text-xl font-bold select-none">
              G
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <div className="flex-1 flex flex-col items-center w-full gap-2">
            <Link href="/dashboard" className="w-full flex flex-col items-center justify-center py-2 bg-[#a83a00] text-white border-l-4 border-[#370d00] transition-transform">
              <span className="material-symbols-outlined active-nav-fill">arrow_back</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Back</span>
            </Link>
          </div>

          {/* Footer Navigation Tabs */}
          <div className="mt-auto flex flex-col items-center w-full gap-2 pb-2">
            <Link href="/settings" className="w-full flex flex-col items-center justify-center py-2 text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 hover:scale-100" title="Settings">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <Link href="/support" className="w-full flex flex-col items-center justify-center py-2 text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 hover:scale-100" title="Support">
              <span className="material-symbols-outlined">contact_support</span>
            </Link>
            <Link href="/api/auth/signout" className="w-full flex flex-col items-center justify-center py-2 text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 hover:scale-100" title="Logout">
              <span className="material-symbols-outlined">logout</span>
            </Link>
          </div>
        </nav>

        {/* MAIN CANVAS WRAPPER */}
        <main className="flex-1 md:ml-[80px] flex flex-col min-h-screen w-[calc(100%-80px)]">
          
          {/* TOP APP BAR */}
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

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center justify-center px-4 py-2 bg-[#ff7033] text-[#601d00] border border-[#5f5e5e] font-mono text-sm font-bold hover:brightness-95 rounded-sm shadow-sm">
                Check In
              </button>
              <button className="md:hidden p-2 text-[#5f5e5e] hover:text-[#a83a00]">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </header>

          {/* CONTENT AREA */}
          <div className="flex-1 p-8 max-w-[1280px] mx-auto w-full">
            
            {/* Page Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-bold text-[#1d1b16] mb-2">Activity Logs</h2>
                <p className="text-base text-[#5f5e5e] max-w-2xl">
                  Comprehensive audit trail of salon operations, staff actions, and system events.
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-[#fff9ef] text-[#1d1b16] border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#e7e2d9] flex items-center gap-2 rounded-sm shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#fff9ef]/70 backdrop-blur-md border border-[#5f5e5e] rounded-lg p-4 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-sm">
              <div className="flex-1 w-full relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] select-none text-[20px]">search</span>
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs, users, or details..." 
                  className="w-full bg-[#fff9ef] border border-[#5f5e5e] pl-10 pr-4 py-2 text-base text-[#1d1b16] focus:outline-none focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] rounded-sm placeholder:text-[#5f5e5e]/50" 
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto font-mono text-xs">
                <button className="px-3 py-2 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] flex items-center gap-2 hover:bg-[#e7e2d9] rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  <span>Last 7 Days</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
                
                <button className="px-3 py-2 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] flex items-center gap-2 hover:bg-[#e7e2d9] rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span>All Staff</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>

                <button className="px-3 py-2 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] flex items-center gap-2 hover:bg-[#e7e2d9] rounded-sm transition-colors">
                  <span className="material-symbols-outlined text-[16px]">filter_list</span>
                  <span>Event Type</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              </div>
            </div>

            {/* Active Filters Indicators */}
            <div className="flex items-center gap-2 mb-6 flex-wrap font-mono text-xs">
              <span className="text-[#5f5e5e]">Active Filters:</span>
              
              {activePills.map((pill) => (
                <span key={pill} className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#5f5e5e] rounded-full bg-[#e7e2d9] text-[#1d1b16]">
                  <span>{pill}</span>
                  <button type="button" onClick={() => handleRemovePill(pill)} className="hover:text-[#a83a00] flex items-center">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}

              {activePills.length > 0 && (
                <button type="button" onClick={() => setActivePills([])} className="text-[#5f5e5e] hover:text-[#a83a00] underline ml-2">
                  Clear All
                </button>
              )}
            </div>

            {/* Data Table Container */}
            <div className="bg-[#fff9ef] border border-[#5f5e5e] rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-[#5f5e5e] bg-[#e7e2d9] font-mono text-xs font-bold text-[#1d1b16]">
                      <th className="py-3.5 px-4 w-48 uppercase tracking-wider">Timestamp</th>
                      <th className="py-3.5 px-4 w-64 uppercase tracking-wider">User / Actor</th>
                      <th className="py-3.5 px-4 w-40 uppercase tracking-wider">Event Type</th>
                      <th className="py-3.5 px-4 uppercase tracking-wider">Details &amp; Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-base text-[#1d1b16] divide-y divide-[#5f5e5e]/15">
                    
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#f9f3ea] transition-colors group">
                        
                        {/* Timestamp */}
                        <td className="py-3.5 px-4">
                          <div className="text-sm font-medium text-[#1d1b16]">{log.time}</div>
                          <div className="text-xs text-[#5f5e5e] font-mono mt-0.5">{log.date}</div>
                        </td>

                        {/* User / Actor */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {log.actorAvatarType === 'image' ? (
                              <img src={log.actorAvatarValue} alt={log.actorName} className="w-8 h-8 rounded-full border border-[#5f5e5e] object-cover shrink-0" />
                            ) : (
                              <div className="w-8 h-8 rounded-full border border-[#5f5e5e] bg-[#a39b8f] flex items-center justify-center text-[#38332a] shrink-0">
                                <span className="material-symbols-outlined text-[16px]">{log.actorAvatarValue}</span>
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-bold text-[#1d1b16]">{log.actorName}</div>
                              <div className="text-xs text-[#5f5e5e] font-mono">{log.actorRole}</div>
                            </div>
                          </div>
                        </td>

                        {/* Event Type */}
                        <td className="py-3.5 px-4">
                          {log.eventUseIcon ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-sm border border-[#5f5e5e] bg-[#fff9ef] text-xs font-mono text-[#5f5e5e]">
                              <span className="material-symbols-outlined text-[14px] mr-1">settings</span>
                              <span>System</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-sm border border-[#5f5e5e] bg-[#fff9ef] text-xs font-mono text-[#1d1b16]">
                              <span className={`w-2 h-2 rounded-full mr-2 shrink-0 ${log.eventDotColor}`} />
                              <span>{log.eventType}</span>
                            </span>
                          )}
                        </td>

                        {/* Details & Actions */}
                        <td className="py-3.5 px-4">
                          <div className="text-sm leading-snug">{log.details}</div>
                          <div className={`text-xs font-mono mt-1 ${log.refIdAlert ? 'text-[#a83a00] font-bold' : 'text-[#5f5e5e]'}`}>
                            {log.refId}
                          </div>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="border-t border-[#5f5e5e] px-4 py-3 flex items-center justify-between bg-white font-mono text-xs">
                <div className="text-[#5f5e5e]">
                  Showing <span className="font-bold text-[#1d1b16]">1</span> to <span className="font-bold text-[#1d1b16]">{filteredLogs.length}</span> of <span className="font-bold text-[#1d1b16]">128</span> entries
                </div>
                
                <div className="flex gap-1 select-none">
                  <button type="button" disabled className="px-3 py-1 border border-[#5f5e5e] rounded-sm bg-[#fff9ef] text-[#5f5e5e] disabled:opacity-40">Prev</button>
                  <button type="button" className="px-3 py-1 border border-[#5f5e5e] rounded-sm bg-[#a83a00] text-white font-bold">1</button>
                  <button type="button" className="px-3 py-1 border border-[#5f5e5e] rounded-sm bg-[#fff9ef] hover:bg-[#e7e2d9] text-[#1d1b16]">2</button>
                  <button type="button" className="px-3 py-1 border border-[#5f5e5e] rounded-sm bg-[#fff9ef] hover:bg-[#e7e2d9] text-[#1d1b16]">3</button>
                  <span className="px-2 py-1 text-[#5f5e5e]">...</span>
                  <button type="button" className="px-3 py-1 border border-[#5f5e5e] rounded-sm bg-[#fff9ef] hover:bg-[#e7e2d9] text-[#1d1b16]">Next</button>
                </div>
              </div>

            </div>

          </div>
        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav className="md:hidden fixed bottom-0 w-full z-50 border-t border-[#5f5e5e] rounded-t-xl bg-[#fff9ef] shadow-lg flex justify-center items-center px-4 py-2">
          <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#ff7033] text-[#601d00] rounded-lg px-4 py-2 active:scale-95 transition-all shadow-sm font-mono text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
            <span>Back to Dashboard</span>
          </Link>
        </nav>

      </div>
    </>
  )
}
