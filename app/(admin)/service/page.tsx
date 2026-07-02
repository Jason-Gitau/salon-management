'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types for our React state
interface ServiceItem {
  id: string
  name: string
  description: string
  duration: string
  price: string
  category: 'Hair Styling' | 'Spa Treatments'
}

const initialServices: ServiceItem[] = [
  {
    id: 's1',
    name: 'Precision Cut',
    description: 'Classic cut with styling',
    duration: '60 MIN',
    price: '$85.00',
    category: 'Hair Styling',
  },
  {
    id: 's2',
    name: 'Cilaan Gloss',
    description: 'High-shine semi-permanent color',
    duration: '45 MIN',
    price: '$120.00',
    category: 'Hair Styling',
  },
  {
    id: 's3',
    name: 'Blowout & Style',
    description: 'Shampoo and signature blowout',
    duration: '45 MIN',
    price: '$55.00',
    category: 'Hair Styling',
  },
  {
    id: 's4',
    name: 'Deep Condition',
    description: 'Repairative protein treatment',
    duration: '30 MIN',
    price: '$40.00',
    category: 'Hair Styling',
  },
  {
    id: 's5',
    name: 'Scalp Massage',
    description: 'Aromatic oils with relaxation therapy',
    duration: '20 MIN',
    price: '$35.00',
    category: 'Spa Treatments',
  },
]

export default function ServiceManagementPage() {
  const [services, setServices] = useState<ServiceItem[]>(initialServices)
  const [searchQuery, setSearchQuery] = useState('')

  // Handler: Delete Service
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      setServices((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // Handler: Edit Service (Placeholder for Modal)
  const handleEdit = (name: string) => {
    alert(`Trigger Edit Modal for: ${name}`)
  }

  // Handler: Add New Service (Placeholder)
  const handleAddService = (category?: string) => {
    alert(`Trigger Add Modal ${category ? `for ${category}` : ''}`)
  }

  // Filter logic based on search query
  const filteredServices = services.filter((s) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hairStylingList = filteredServices.filter((s) => s.category === 'Hair Styling')
  const spaTreatmentList = filteredServices.filter((s) => s.category === 'Spa Treatments')

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .active-nav-fill { font-variation-settings: 'FILL' 1; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e1bfb4; border-radius: 10px; }
        
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .hover-card:hover {
          transform: translateY(-2px);
          border-color: #a83a00;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen overflow-x-hidden selection:bg-[#a83a00] selection:text-white">
        
        {/* SIDE NAVIGATION SHELL */}
        <aside className="fixed left-0 top-0 h-full w-[80px] bg-[#fff9ef] border-r border-[#5f5e5e] flex flex-col items-center py-6 space-y-4 z-50">
          <div className="mb-8">
            <div className="w-12 h-12 flex items-center justify-center border border-[#5f5e5e] bg-[#ff7033]">
              <span className="material-symbols-outlined text-[#601d00] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </div>
          </div>

          <nav className="flex flex-col space-y-4 w-full px-1">
            <Link href="/dashboard" className="flex flex-col items-center py-2 rounded text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Dashboard</span>
            </Link>
            {/* ACTIVE TAB */}
            <Link href="/service" className="flex flex-col items-center py-2 rounded bg-[#a83a00] text-white border-l-4 border-[#1d1b16]">
              <span className="material-symbols-outlined active-nav-fill">content_cut</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Services</span>
            </Link>
            <Link href="/staff" className="flex flex-col items-center py-2 rounded text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">group</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Staff</span>
            </Link>
            <Link href="/products" className="flex flex-col items-center py-2 rounded text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Products</span>
            </Link>
          </nav>

          <div className="mt-auto flex flex-col space-y-4 w-full px-1">
            <Link href="/settings" className="flex flex-col items-center py-2 rounded text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Settings</span>
            </Link>
          </div>
        </aside>

        {/* TOP APP BAR SHELL */}
        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] border-b border-[#5f5e5e] flex justify-between items-center px-8 z-40">
          <div className="flex items-center space-x-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">Luxe Salon Portal</h1>
            <div className="hidden md:flex relative ml-10 focus-within:ring-1 focus-within:ring-[#a83a00]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5f5e5e] text-sm select-none">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..." 
                className="bg-[#fff9ef] border border-[#5f5e5e] rounded-none px-10 py-1 font-mono text-xs focus:outline-none w-64 placeholder:text-[#5f5e5e]" 
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-[#594139] hover:text-[#a83a00] transition-transform scale-95 active:scale-90">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#a83a00] rounded-full" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="hidden sm:block font-normal text-[#594139] text-sm">Admin Profile</span>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-[#8d7167] object-cover" 
              />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <main className="ml-[80px] mt-16 p-8 max-w-[1280px] mx-auto pb-24">
          
          {/* Header Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16] mb-2">Service Management</h2>
              <p className="text-[#645d53] text-base max-w-xl">
                Configure your salon's service menu. Define prices, durations, and categories to keep your booking system precise.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4 shrink-0">
              <button className="px-4 py-2 bg-[#fff9ef] border border-[#5f5e5e] font-mono text-xs font-medium text-[#1d1b16] hover:bg-[#e7e2d9] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>Filter</span>
              </button>
              <button 
                onClick={() => handleAddService()}
                className="px-4 py-2 bg-[#ff7033] border border-[#5f5e5e] font-mono text-xs font-bold text-[#601d00] hover:bg-[#a83a00] hover:text-white transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Add New Service</span>
              </button>
            </div>
          </section>

          {/* CATEGORY: Hair Styling */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16] border-l-4 border-[#a83a00] pl-4">Hair Styling</h3>
              <div className="flex-grow h-px bg-[#5f5e5e] opacity-20" />
              <span className="font-mono text-xs font-medium text-[#645d53] tracking-wider shrink-0">{hairStylingList.length} SERVICES</span>
            </div>

            <div className="bento-grid">
              {hairStylingList.map((service) => (
                <div key={service.id} className="bg-white border border-[#5f5e5e] p-5 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-[#1d1b16]">{service.name}</h4>
                        <p className="font-mono text-xs text-[#645d53] mt-0.5">{service.description}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#a83a00] cursor-pointer shrink-0">more_vert</span>
                    </div>

                    <div className="flex justify-between items-center mt-8 border-t border-[#5f5e5e]/10 pt-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Duration</span>
                        <span className="font-mono text-sm font-semibold mt-0.5">{service.duration}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Price</span>
                        <span className="font-mono text-sm font-bold text-[#a83a00] mt-0.5">{service.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 pt-2">
                    <button 
                      onClick={() => handleEdit(service.name)}
                      className="flex-1 py-1.5 text-center border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors"
                    >
                      Edit Service
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id, service.name)}
                      className="w-10 h-10 border border-[#5f5e5e] flex items-center justify-center hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORY: Treatments & Spa */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16] border-l-4 border-[#a83a00] pl-4">Spa Treatments</h3>
              <div className="flex-grow h-px bg-[#5f5e5e] opacity-20" />
              <span className="font-mono text-xs font-medium text-[#645d53] tracking-wider shrink-0">{spaTreatmentList.length} SERVICES</span>
            </div>

            <div className="bento-grid">
              {spaTreatmentList.map((service) => (
                <div key={service.id} className="bg-white border border-[#5f5e5e] p-5 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-[#1d1b16]">{service.name}</h4>
                        <p className="font-mono text-xs text-[#645d53] mt-0.5">{service.description}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#a83a00] cursor-pointer shrink-0">more_vert</span>
                    </div>

                    <div className="flex justify-between items-center mt-8 border-t border-[#5f5e5e]/10 pt-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Duration</span>
                        <span className="font-mono text-sm font-semibold mt-0.5">{service.duration}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Price</span>
                        <span className="font-mono text-sm font-bold text-[#a83a00] mt-0.5">{service.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 pt-2">
                    <button 
                      onClick={() => handleEdit(service.name)}
                      className="flex-1 py-1.5 text-center border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#e7e2d9] transition-colors"
                    >
                      Edit Service
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id, service.name)}
                      className="w-10 h-10 border border-[#5f5e5e] flex items-center justify-center hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Placeholder Card */}
              <div 
                onClick={() => handleAddService('Spa Treatments')}
                className="bg-[#f3ede4] border border-dashed border-[#5f5e5e]/50 flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-white hover:border-[#a83a00] transition-all min-h-[210px]"
              >
                <div className="w-12 h-12 bg-[#ff7033] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#601d00]">add</span>
                </div>
                <p className="font-mono text-xs font-medium text-[#594139]">Add new treatment to category</p>
              </div>
            </div>
          </section>

          {/* INSIGHTS SUMMARY MODULE */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-[#ebe1d4] p-6 border border-[#5f5e5e] relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">content_cut</span>
              </div>
              <h4 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1f1b13] mb-2">Menu Optimization</h4>
              <p className="text-base text-[#4c463c] mb-6 max-w-md">
                Your 'Cilaan Gloss' has been booked 40% more than other color services this month. Consider adding a 'Gloss &amp; Style' bundle.
              </p>
              <button className="px-4 py-2 bg-[#1f1b13] text-[#ebe1d4] font-mono text-xs font-medium hover:bg-[#a83a00] hover:text-white transition-colors">
                View Service Analytics
              </button>
            </div>

            <div className="bg-[#ffdbce] p-6 border border-[#5f5e5e] flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs font-medium text-[#370d00] uppercase tracking-wider mb-1">Revenue Potential</h4>
                <span className="font-['Space_Grotesk',sans-serif] text-[42px] leading-none font-bold text-[#802a00]">
                  $4,250 <span className="text-sm font-mono font-medium">/ wk</span>
                </span>
              </div>
              <div className="mt-8">
                <div className="flex justify-between mb-2 font-mono text-xs">
                  <span>Booking Capacity</span>
                  <span className="font-bold">82%</span>
                </div>
                <div className="w-full bg-[#370d00]/10 h-1">
                  <div className="bg-[#a83a00] h-full w-[82%]" />
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* FLOATING ACTION BUTTON (Mobile Quick Add) */}
        <button 
          onClick={() => handleAddService()}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#a83a00] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform md:hidden z-50 rounded-full"
        >
          <span className="material-symbols-outlined">add</span>
        </button>

      </div>
    </>
  )
}
