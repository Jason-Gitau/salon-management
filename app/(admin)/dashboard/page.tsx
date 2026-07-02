'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function OwnerDashboardPage() {
  const [trendRange, setTrendRange] = useState('This Week')
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        /* Custom scrollbar for sleekness */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2dfde; border-radius: 4px; }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] h-screen w-full flex overflow-hidden selection:bg-[#a83a00] selection:text-white">
        
        {/* DESKTOP SIDEBAR NAVIGATION */}
        <nav className="hidden md:flex flex-col items-center py-6 w-[80px] h-screen border-r border-[#5f5e5e] bg-[#fff9ef] fixed left-0 top-0 z-40">
          {/* Brand Area */}
          <div className="mb-10 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-3xl text-[#a83a00]" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>

          {/* Main Tabs */}
          <div className="flex flex-col gap-2 w-full flex-grow">
            <Link
              href="/dashboard"
              aria-current={isActive('/dashboard') ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 ${
                isActive('/dashboard')
                  ? 'bg-[#a83a00] text-white border-[#370d00]'
                  : 'text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent'
              }`}
            >
              <span className="material-symbols-outlined mb-1 text-[20px]">dashboard</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Dashboard</span>
            </Link>

            <Link
              href="/service"
              aria-current={isActive('/service') ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 ${
                isActive('/service')
                  ? 'bg-[#a83a00] text-white border-[#370d00]'
                  : 'text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent'
              }`}
            >
              <span className="material-symbols-outlined mb-1 text-[20px]">content_cut</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Services</span>
            </Link>

            <Link
              href="/staff"
              aria-current={isActive('/staff') ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 ${
                isActive('/staff')
                  ? 'bg-[#a83a00] text-white border-[#370d00]'
                  : 'text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent'
              }`}
            >
              <span className="material-symbols-outlined mb-1 text-[20px]">groups</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Staff</span>
            </Link>

            <Link
              href="/products"
              aria-current={isActive('/products') ? 'page' : undefined}
              className={`flex flex-col items-center justify-center py-2 w-full transition-all scale-95 active:scale-90 border-l-4 ${
                isActive('/products')
                  ? 'bg-[#a83a00] text-white border-[#370d00]'
                  : 'text-[#5f5e5e] hover:bg-[#e7e2d9] border-transparent'
              }`}
            >
              <span className="material-symbols-outlined mb-1 text-[20px]">inventory_2</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Products</span>
            </Link>
          </div>

          {/* Footer Tabs */}
          <div className="flex flex-col gap-2 w-full mt-auto">
            <Link href="/settings" className="flex flex-col items-center justify-center py-2 w-full text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 active:scale-90 border-l-4 border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">settings</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Settings</span>
            </Link>
            <Link href="/support" className="flex flex-col items-center justify-center py-2 w-full text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 active:scale-90 border-l-4 border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">contact_support</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Support</span>
            </Link>
            <Link href="/api/auth/signout" className="flex flex-col items-center justify-center py-2 w-full text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors scale-95 active:scale-90 border-l-4 border-transparent">
              <span className="material-symbols-outlined mb-1 text-[20px]">logout</span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Logout</span>
            </Link>
          </div>
        </nav>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col md:ml-[80px] h-screen bg-[#f9f3ea] relative">
          
          {/* TOP APP BAR */}
          <header className="flex justify-between items-center px-5 py-4 w-full bg-[#f9f3ea] border-b border-[#5f5e5e] sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <h1 className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00] tracking-tight">Luxe Salon Portal</h1>
            </div>

            <div className="hidden lg:flex items-center gap-5 h-full">
              <nav className="flex gap-4 h-full items-center font-mono text-sm font-medium">
                <Link href="#" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Schedules</Link>
                <Link href="#" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Earnings</Link>
                <Link href="#" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Messages</Link>
                <Link href="#" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Profile</Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-1 text-[#5f5e5e] hover:text-[#a83a00] transition-colors opacity-80 active:opacity-100">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="bg-[#a83a00] text-white border border-[#5f5e5e] px-4 py-2 font-mono text-sm font-medium hover:opacity-90 transition-opacity rounded-sm shadow-sm">
                Check In
              </button>
            </div>
          </header>

          {/* SCROLLABLE DASHBOARD CONTENT */}
          <main className="flex-1 overflow-y-auto p-5 lg:p-8">
            <div className="max-w-[1280px] mx-auto space-y-10 pb-24 md:pb-0">
              
              {/* Page Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-[#5f5e5e] pb-4">
                <div>
                  <p className="font-mono text-xs font-medium text-[#5f5e5e] tracking-widest uppercase mb-1">Tuesday, Oct 24</p>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-5xl font-semibold tracking-tight text-[#1d1b16]">Overview</h2>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-[#5f5e5e] bg-white font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> Today
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-[#5f5e5e] bg-white font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span> Export
                  </button>
                </div>
              </div>

              {/* Bento Grid: Top Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat 1 */}
                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Today's Appointments</span>
                    <span className="material-symbols-outlined text-[#a83a00]">calendar_month</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">42</div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span className="font-mono text-xs font-medium">+12% vs yesterday</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ffb59a]/20 rounded-full blur-2xl group-hover:bg-[#ffb59a]/40 transition-colors pointer-events-none" />
                </div>

                {/* Stat 2 */}
                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Daily Revenue</span>
                    <span className="material-symbols-outlined text-[#a83a00]">payments</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">KSh 128.5k</div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span className="font-mono text-xs font-medium">+5% vs avg</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ebe1d4]/40 rounded-full blur-2xl group-hover:bg-[#ebe1d4]/60 transition-colors pointer-events-none" />
                </div>

                {/* Stat 3 */}
                <div className="bg-white border border-[#5f5e5e] p-4 flex flex-col justify-between h-[160px] relative overflow-hidden group shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm font-medium text-[#5f5e5e]">Active Staff</span>
                    <span className="material-symbols-outlined text-[#a83a00]">groups</span>
                  </div>
                  <div className="z-10">
                    <div className="font-['Space_Grotesk',sans-serif] text-3xl font-medium text-[#1d1b16]">
                      14<span className="text-2xl text-[#5f5e5e] ml-1">/ 18</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[#645d53]">
                      <span className="font-mono text-xs font-medium">4 staff on leave</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#e5e2e1]/50 rounded-full blur-2xl group-hover:bg-[#e5e2e1]/80 transition-colors pointer-events-none" />
                </div>
              </div>

              {/* Main Content Area: Chart & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Chart Section (Spans 2 columns) */}
                <div className="lg:col-span-2 bg-white border border-[#5f5e5e] flex flex-col min-h-[400px] shadow-sm">
                  <div className="border-b border-[#5f5e5e] p-4 flex justify-between items-center bg-[#f9f3ea]/50">
                    <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Revenue Trend</h3>
                    <select 
                      value={trendRange}
                      onChange={(e) => setTrendRange(e.target.value)}
                      className="bg-transparent border-none font-mono text-xs font-medium text-[#5f5e5e] focus:ring-0 cursor-pointer outline-none"
                    >
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>

                  <div className="flex-1 p-4 flex flex-col relative bg-white">
                    {/* Abstract Flexbox Chart */}
                    <div className="flex-1 flex items-end justify-between gap-1 lg:gap-4 pt-10 pb-4 relative border-b border-[#5f5e5e]/20">
                      
                      {/* Background Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4 opacity-20">
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                        <div className="border-t border-[#5f5e5e] w-full" />
                      </div>

                      {/* Bars */}
                      <div className="w-full bg-[#a83a00]/20 hover:bg-[#a83a00]/40 transition-colors border border-[#a83a00] relative group" style={{ height: '40%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">45k</div>
                      </div>
                      <div className="w-full bg-[#a83a00]/40 hover:bg-[#a83a00]/60 transition-colors border border-[#a83a00] relative group" style={{ height: '65%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">72k</div>
                      </div>
                      <div className="w-full bg-[#a83a00]/80 hover:bg-[#a83a00] transition-colors border border-[#a83a00] relative group" style={{ height: '50%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">55k</div>
                      </div>
                      <div className="w-full bg-[#a83a00] hover:bg-[#a83a00]/80 transition-colors border border-[#a83a00] relative group" style={{ height: '90%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">110k</div>
                      </div>
                      <div className="w-full bg-[#a83a00]/60 hover:bg-[#a83a00]/80 transition-colors border border-[#a83a00] relative group" style={{ height: '75%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">85k</div>
                      </div>
                      <div className="w-full bg-[#a83a00]/30 hover:bg-[#a83a00]/50 transition-colors border border-[#a83a00] relative group" style={{ height: '85%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">95k</div>
                      </div>
                      <div className="w-full bg-[#ffdbce] hover:bg-[#ffb59a] transition-colors border border-[#a83a00] relative group" style={{ height: '100%' }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#32302a] text-[#f6f0e7] font-mono text-xs px-2 py-0.5 rounded transition-opacity">128k</div>
                      </div>

                    </div>

                    {/* X Axis Labels */}
                    <div className="flex justify-between pt-2 font-mono text-xs font-medium text-[#5f5e5e]">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white border border-[#5f5e5e] flex flex-col shadow-sm">
                  <div className="border-b border-[#5f5e5e] p-4 flex justify-between items-center bg-[#f9f3ea]/50">
                    <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">Recent Activity</h3>
                    <button className="p-1 hover:bg-[#e7e2d9] transition-colors rounded-sm">
                      <span className="material-symbols-outlined text-[20px] text-[#5f5e5e]">more_horiz</span>
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-[#5f5e5e]/20">
                    {/* Activity Item 1 */}
                    <div className="flex gap-4 p-4 hover:bg-[#e7e2d9]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full border border-[#5f5e5e] overflow-hidden flex-shrink-0 bg-[#f3ede4]">
                        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" alt="Sarah M." />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-base text-[#1d1b16]"><span className="font-bold">Sarah M.</span> completed a Balayage.</p>
                          <span className="font-mono text-xs text-[#5f5e5e] whitespace-nowrap ml-2">10m ago</span>
                        </div>
                        <p className="font-mono text-xs text-[#5f5e5e] mt-0.5">Earned KSh 3,500</p>
                      </div>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="flex gap-4 p-4 hover:bg-[#e7e2d9]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full border border-[#5f5e5e] bg-[#ff7033] text-[#601d00] flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">event_available</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-base text-[#1d1b16]">New booking: <span className="font-bold">Bridal Package</span></p>
                          <span className="font-mono text-xs text-[#5f5e5e] whitespace-nowrap ml-2">45m ago</span>
                        </div>
                        <div className="mt-1 inline-block border border-[#8d7167] bg-[#ebe1d4] text-[#1f1b13] px-2 py-0.5 rounded-sm font-mono text-xs">
                          Confirmed
                        </div>
                      </div>
                    </div>

                    {/* Activity Item 3 */}
                    <div className="flex gap-4 p-4 hover:bg-[#e7e2d9]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full border border-[#5f5e5e] overflow-hidden flex-shrink-0 bg-[#f3ede4]">
                        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="David K." />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-base text-[#1d1b16]"><span className="font-bold">David K.</span> clocked in.</p>
                          <span className="font-mono text-xs text-[#5f5e5e] whitespace-nowrap ml-2">2h ago</span>
                        </div>
                        <p className="font-mono text-xs text-[#5f5e5e] mt-0.5">Shift: 09:00 - 17:00</p>
                      </div>
                    </div>

                    {/* Activity Item 4 */}
                    <div className="flex gap-4 p-4 hover:bg-[#e7e2d9]/30 transition-colors">
                      <div className="w-10 h-10 rounded-full border border-[#5f5e5e] bg-[#dfd9d1] text-[#594139] flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-base text-[#1d1b16]">Low stock alert: <span className="font-bold">Olaplex No.3</span></p>
                          <span className="font-mono text-xs text-[#5f5e5e] whitespace-nowrap ml-2">3h ago</span>
                        </div>
                        <p className="font-mono text-xs text-[#ba1a1a] font-medium mt-0.5">Only 2 left in inventory</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-t border-[#5f5e5e] bg-[#f9f3ea]/50 text-center mt-auto">
                    <Link href="/activities" className="font-mono text-xs font-bold text-[#a83a00] hover:underline uppercase tracking-widest">
                      View All Logs
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </main>
        </div>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-[#fff9ef] z-50 border-t border-[#5f5e5e] rounded-t-xl shadow-lg">
          <Link href="/service" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 hover:bg-[#e7e2d9] active:scale-95 transition-all">
            <span className="material-symbols-outlined mb-1">content_cut</span>
            <span className="font-mono text-xs font-medium">Services</span>
          </Link>
          <Link href="/staff" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 hover:bg-[#e7e2d9] active:scale-95 transition-all">
            <span className="material-symbols-outlined mb-1">groups</span>
            <span className="font-mono text-xs font-medium">Staff</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center justify-center bg-[#ff7033] text-[#601d00] rounded-lg p-2 active:scale-95 transition-all shadow-sm">
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="font-mono text-xs font-medium font-bold">Dashboard</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 hover:bg-[#e7e2d9] active:scale-95 transition-all">
            <span className="material-symbols-outlined mb-1">inventory_2</span>
            <span className="font-mono text-xs font-medium">Products</span>
          </Link>
        </nav>

      </div>
    </>
  )
}
