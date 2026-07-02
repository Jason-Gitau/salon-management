'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types for our React State
interface PastBooking {
  id: string
  title: string
  date: string
  price: string
  status: 'Completed' | 'Cancelled'
}

interface OrderItem {
  id: string
  orderNumber: string
  title: string
  date: string
  price: string
  status: 'In Transit' | 'Delivered'
  image?: string
}

const pastBookingsData: PastBooking[] = [
  { id: 'pb-1', title: 'Root Retouch & Style', date: 'Sep 15, 2023 • 2:00 PM', price: '$145.00', status: 'Completed' },
  { id: 'pb-2', title: 'Signature Blowout', date: 'Aug 02, 2023 • 4:30 PM', price: '$65.00', status: 'Completed' },
  { id: 'pb-3', title: 'Consultation', date: 'Jul 10, 2023 • 11:00 AM', price: '-', status: 'Cancelled' },
]

const ordersData: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: 'Order #LM-9823',
    title: 'Nourishing Moisture Shampoo + 1 more',
    date: 'Placed on Oct 12, 2023',
    price: '$82.00',
    status: 'In Transit',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'ord-2',
    orderNumber: 'Order #LM-8441',
    title: 'Volumizing Texture Spray',
    date: 'Delivered on Sep 05, 2023',
    price: '$34.50',
    status: 'Delivered',
  },
]

export default function ClientHistoryPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'orders'>('bookings')

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
          line-height: 1;
        }
        .active-nav-fill { font-variation-settings: 'FILL' 1; }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #fff9ef; }
        ::-webkit-scrollbar-thumb { background: #cfc5b9; border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: #5f5e5e; }

        @keyframes editorialFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-editorial {
          animation: editorialFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen flex flex-col antialiased selection:bg-[#ff7033] selection:text-[#601d00]">
        
        {/* DESKTOP TOP APP BAR */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 w-full border-b border-[#5f5e5e] bg-[#f9f3ea] sticky top-0 z-40">
          <div className="flex items-center">
            <Link href="/" className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00]">
              Luxe Salon Portal
            </Link>
          </div>
          
          <nav className="flex items-center gap-8 font-mono text-sm font-medium">
            <Link href="/" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Home</Link>
            <Link href="/services" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Services</Link>
            <Link href="/shop" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Shop</Link>
            <Link href="/contact" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center justify-end">
            <div className="w-10 h-10 rounded-full border border-[#5f5e5e] overflow-hidden bg-[#e7e2d9]">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                alt="Client Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-10 flex flex-col gap-8 pb-24 md:pb-12">
          
          {/* Page Header */}
          <div className="flex flex-col gap-2">
            <h1 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1b16]">
              My History
            </h1>
            <p className="text-base text-[#594139] max-w-2xl">
              Review your past and upcoming appointments, along with your product purchase history.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-[#5f5e5e]/15 w-full font-mono text-sm font-semibold select-none">
            <button 
              type="button"
              onClick={() => setActiveTab('bookings')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'bookings' 
                  ? 'border-[#a83a00] text-[#a83a00]' 
                  : 'border-transparent text-[#5f5e5e] hover:text-[#1d1b16]'
              }`}
            >
              Bookings
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'orders' 
                  ? 'border-[#a83a00] text-[#a83a00]' 
                  : 'border-transparent text-[#5f5e5e] hover:text-[#1d1b16]'
              }`}
            >
              Orders
            </button>
          </div>

          {/* ================= TAB 1: BOOKINGS ================= */}
          {activeTab === 'bookings' && (
            <div className="animate-editorial flex flex-col gap-8">
              
              {/* Featured Upcoming Booking */}
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-widest border-b border-[#5f5e5e]/15 pb-2">
                  Upcoming
                </h2>
                
                <div className="bg-[#f3ede4] rounded-lg border border-[#5f5e5e] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#a83a00]" />
                  
                  <div className="flex gap-5 items-start pl-2">
                    <div className="bg-[#a83a00]/10 p-4 rounded flex items-center justify-center border border-[#a83a00]/20 shrink-0 text-[#a83a00]">
                      <span className="material-symbols-outlined text-[32px]">calendar_month</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#a83a00]/10 text-[#a83a00] border border-[#a83a00]/20 font-mono text-xs w-fit mb-1.5 font-semibold uppercase">
                        Confirmed
                      </span>
                      <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16]">
                        Balayage &amp; Trim
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-[#594139] mt-2 font-medium">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-[#5f5e5e]">event</span> Thu, Oct 26</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-[#5f5e5e]">schedule</span> 10:00 AM - 1:30 PM</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-[#5f5e5e]">person</span> Stylist: Emma W.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 shrink-0 pl-2 md:pl-0">
                    <button className="bg-[#fff9ef] border border-[#5f5e5e] hover:border-[#a83a00] text-[#1d1b16] hover:text-[#a83a00] font-mono text-xs font-bold py-2.5 px-5 rounded transition-colors uppercase tracking-wider shadow-sm">
                      Manage Booking
                    </button>
                  </div>
                </div>
              </section>

              {/* Past Bookings Grid */}
              <section className="flex flex-col gap-4 mt-2">
                <h2 className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-widest border-b border-[#5f5e5e]/15 pb-2">
                  Past Appointments
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pastBookingsData.map((booking) => (
                    <div 
                      key={booking.id}
                      className={`bg-[#fff9ef] rounded border border-[#5f5e5e] p-5 flex flex-col justify-between transition-colors shadow-sm ${
                        booking.status === 'Cancelled' ? 'opacity-75 hover:opacity-100' : 'hover:bg-[#f9f3ea]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <div>
                          <h4 className={`text-lg font-semibold text-[#1d1b16] ${booking.status === 'Cancelled' ? 'line-through decoration-[#5f5e5e]/60' : ''}`}>
                            {booking.title}
                          </h4>
                          <span className="font-mono text-xs text-[#5f5e5e] block mt-1">{booking.date}</span>
                        </div>

                        <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] font-semibold border uppercase shrink-0 ${
                          booking.status === 'Completed' 
                            ? 'bg-[#645d53]/10 text-[#645d53] border-[#645d53]/20'
                            : 'bg-[#ba1a1a]/10 text-[#ba1a1a] border-[#ba1a1a]/20'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="border-t border-[#5f5e5e]/15 pt-4 mt-auto flex justify-between items-center font-mono text-xs">
                        <span className="text-sm font-bold text-[#594139]">{booking.price}</span>
                        
                        {booking.status === 'Completed' ? (
                          <button className="text-[#a83a00] font-bold hover:underline flex items-center gap-1">
                            <span>View Details</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        ) : (
                          <button className="text-[#5f5e5e] hover:text-[#a83a00] font-bold flex items-center gap-1 transition-colors">
                            <span>Rebook</span>
                            <span className="material-symbols-outlined text-[16px]">refresh</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* ================= TAB 2: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="animate-editorial flex flex-col gap-6">
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-widest border-b border-[#5f5e5e]/15 pb-2">
                  Recent Orders
                </h2>

                <div className="flex flex-col gap-4">
                  {ordersData.map((order) => (
                    <div key={order.id} className="bg-[#fff9ef] rounded border border-[#5f5e5e] p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between shadow-sm">
                      
                      <div className="flex gap-5 items-center w-full md:w-auto">
                        <div className="w-16 h-16 rounded border border-[#5f5e5e] bg-[#f3ede4] flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                          {order.image ? (
                            <img src={order.image} alt={order.title} className="w-full h-full object-cover contrast-125" />
                          ) : (
                            <span className="material-symbols-outlined text-[#5f5e5e] text-[28px]">inventory_2</span>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-[#5f5e5e] font-semibold">{order.orderNumber}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase border ${
                              order.status === 'In Transit'
                                ? 'bg-[#a83a00]/10 text-[#a83a00] border-[#a83a00]/20'
                                : 'bg-[#645d53]/10 text-[#645d53] border-[#645d53]/20'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-[#1d1b16] leading-snug">{order.title}</h4>
                          <span className="font-mono text-xs text-[#5f5e5e] mt-1">{order.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end w-full md:w-auto border-t border-[#5f5e5e]/15 md:border-none pt-3 md:pt-0 shrink-0 font-mono text-xs">
                        <span className="font-sans text-xl font-bold text-[#1d1b16] mb-0 md:mb-2">{order.price}</span>
                        
                        {order.status === 'In Transit' ? (
                          <button className="bg-[#fff9ef] border border-[#5f5e5e] hover:border-[#a83a00] text-[#1d1b16] hover:text-[#a83a00] font-bold py-1.5 px-3 rounded transition-colors uppercase tracking-wider">
                            Track Package
                          </button>
                        ) : (
                          <button className="text-[#a83a00] font-bold hover:underline uppercase tracking-wider">
                            Buy Again
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#fff9ef] border-t border-[#5f5e5e] z-50 flex justify-around items-center h-16 px-4 shadow-lg">
          <Link href="/shop" className="flex flex-col items-center justify-center w-full h-full text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center justify-center w-full h-full text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </Link>
          <Link href="/history" className="flex flex-col items-center justify-center w-full h-full text-[#a83a00] border-t-2 border-[#a83a00] pt-[2px] bg-[#a83a00]/5">
            <span className="material-symbols-outlined text-[24px] active-nav-fill">person</span>
          </Link>
        </nav>

      </div>
    </>
  )
}