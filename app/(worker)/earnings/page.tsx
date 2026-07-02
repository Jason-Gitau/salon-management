'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface Transaction {
  id: string
  date: string
  service: string
  client: string
  cut: string
}

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    date: 'Oct 26',
    service: 'Balayage & Trim',
    client: 'Sarah Jenkins',
    cut: '$100.00',
  },
  {
    id: 'tx-2',
    date: 'Oct 26',
    service: 'Full Highlights',
    client: 'Emily Roberts',
    cut: '$72.00',
  },
  {
    id: 'tx-3',
    date: 'Oct 25',
    service: 'Bridal Styling',
    client: 'Jessica Moore',
    cut: '$48.00',
  },
]

export default function EarningsLedgerPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions)

  const handleExportCSV = () => {
    alert('Exporting earnings data to CSV...')
  }

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] overflow-x-hidden selection:bg-[#ffdbce]">
        
        {/* FIXED LEFT SIDEBAR */}
        <aside className="fixed left-0 top-0 bottom-0 w-[80px] bg-[#f3ede4] border-r border-[#5f5e5e] flex flex-col items-center justify-between py-8 z-50">
          <div className="mb-10">
            <span className="material-symbols-outlined text-[#a83a00] text-[32px] select-none">
              content_cut
            </span>
          </div>

          <div className="mt-auto w-full flex flex-col items-center pb-8">
            <button 
              type="button"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="group flex flex-col items-center justify-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors rounded"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-mono text-[12px] mt-1 font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 ml-[80px] flex flex-col min-h-screen w-[calc(100%-80px)]">
          
          {/* TOP APP BAR */}
          <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] flex justify-between items-center px-8 border-b border-[#5f5e5e] z-40">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <span className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[#a83a00]">Luxe Salon Portal</span>
              </div>
              <nav className="flex items-center gap-6 font-mono text-sm">
                <Link href="/schedule" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Schedule</Link>
                <Link href="/earnings" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Earnings</Link>
                <Link href="/worker-profile" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Profile</Link>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <button className="px-6 py-2 bg-[#a83a00] text-white font-mono text-sm font-medium hover:opacity-90 transition-opacity rounded-sm shadow-sm">
                Check In
              </button>
              <div className="flex items-center gap-2 cursor-pointer group select-none">
                <div className="h-10 w-10 overflow-hidden border border-[#5f5e5e] bg-[#f3ede4]">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                    alt="Alex Rivera" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-base font-bold text-[#a83a00] group-hover:text-[#ff7033] transition-colors">Alex Rivera</span>
              </div>
            </div>
          </header>

          {/* CONTENT CANVAS */}
          <main className="mt-16 p-8 max-w-[1280px] mx-auto w-full pb-24">
            
            <div className="flex flex-col mb-10">
              <h1 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Earnings Ledger</h1>
              <p className="text-base text-[#5f5e5e] mt-1">Track your individual performance and payouts for October 2023.</p>
            </div>

            {/* Bento Grid: Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Total Earned</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">$1,240.50</div>
              </div>

              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Commission</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">$980.00</div>
              </div>

              <div className="bg-[#f3ede4] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#5f5e5e] uppercase tracking-wider">Tips</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">$260.50</div>
              </div>

              <div className="bg-[#ff7033] p-6 border border-[#5f5e5e] shadow-sm">
                <span className="font-mono text-xs text-[#601d00] uppercase font-bold tracking-wider">Pending Payout</span>
                <div className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#601d00] mt-2">$145.00</div>
              </div>
            </div>

            {/* Transactions Table Module */}
            <div className="bg-[#fff9ef] border border-[#5f5e5e] overflow-hidden shadow-sm">
              <div className="p-6 border-b border-[#5f5e5e] flex justify-between items-center bg-[#f9f3ea]">
                <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Recent Transactions</h2>
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-[#fff9ef] border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#f3ede4] transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#f3ede4] text-[#5f5e5e] font-mono text-xs">
                    <tr>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Date</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Service</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e]">Client</th>
                      <th className="px-6 py-4 border-b border-[#5f5e5e] text-right">Your Cut</th>
                    </tr>
                  </thead>
                  <tbody className="text-base divide-y divide-[#5f5e5e]/20">
                    {transactions.map((tx) => (
                      <tr 
                        key={tx.id} 
                        className="hover:bg-[#f9f3ea] transition-all duration-150 hover:translate-x-1 cursor-default group"
                      >
                        <td className="px-6 py-5 font-mono text-sm text-[#5f5e5e] group-hover:text-[#1d1b16]">{tx.date}</td>
                        <td className="px-6 py-5 font-bold text-[#1d1b16]">{tx.service}</td>
                        <td className="px-6 py-5 text-[#594139]">{tx.client}</td>
                        <td className="px-6 py-5 text-right font-mono text-sm font-bold text-[#a83a00]">{tx.cut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 bg-[#f9f3ea] border-t border-[#5f5e5e] flex justify-center">
                <button className="text-[#a83a00] font-mono text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4">
                  View All Transactions
                </button>
              </div>
            </div>

          </main>
        </div>

      </div>
    </>
  )
}
