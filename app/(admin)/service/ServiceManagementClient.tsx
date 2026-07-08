'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { createServiceAction, deleteServiceAction } from '@/app/actions/service-actions'

type ServiceListItem = {
  id: string
  name: string
  duration: number
  price: number
}

type ServiceManagementClientProps = {
  salonName: string
  services: ServiceListItem[]
}

const initialServiceFormState = {
  status: 'idle' as const,
  message: '',
}

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(value)
}

export default function ServiceManagementClient({
  salonName,
  services,
}: ServiceManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [state, formAction, pending] = useActionState(
    createServiceAction,
    initialServiceFormState
  )

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalMenuValue = filteredServices.reduce((sum, service) => sum + service.price, 0)

  return (
    <>
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

        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] border-b border-[#5f5e5e] flex justify-between items-center px-8 z-40">
          <div className="flex items-center space-x-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">{salonName}</h1>
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

        <main className="ml-[80px] mt-16 p-8 max-w-[1280px] mx-auto pb-24">
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16] mb-2">Service Management</h2>
              <p className="text-[#645d53] text-base max-w-xl">
                Services are now loaded from the database. Add new rows here and they will appear in the booking flow automatically.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setShowCreateForm((value) => !value)}
                className="px-4 py-2 bg-[#ff7033] border border-[#5f5e5e] font-mono text-xs font-bold text-[#601d00] hover:bg-[#a83a00] hover:text-white transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>{showCreateForm ? 'Close Form' : 'Add New Service'}</span>
              </button>
            </div>
          </section>

          {showCreateForm ? (
            <section className="mb-8 border border-[#5f5e5e] bg-white p-6">
              <form action={formAction} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase text-[#594139]">Service Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a83a00]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase text-[#594139]">Duration (mins)</span>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    required
                    className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a83a00]"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase text-[#594139]">Price (KES)</span>
                  <input
                    type="number"
                    name="price"
                    min="1"
                    step="0.01"
                    required
                    className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a83a00]"
                  />
                </label>
                <button
                  type="submit"
                  disabled={pending}
                  className="h-[42px] px-4 bg-[#1f1b13] text-[#ebe1d4] font-mono text-xs font-medium hover:bg-[#a83a00] hover:text-white transition-colors disabled:opacity-60"
                >
                  {pending ? 'Saving...' : 'Save Service'}
                </button>
              </form>
              {state.message ? (
                <p className={`mt-4 text-sm ${state.status === 'error' ? 'text-[#ba1a1a]' : 'text-[#1d1b16]'}`}>
                  {state.message}
                </p>
              ) : null}
            </section>
          ) : null}

          <section className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16] border-l-4 border-[#a83a00] pl-4">All Services</h3>
              <div className="flex-grow h-px bg-[#5f5e5e] opacity-20" />
              <span className="font-mono text-xs font-medium text-[#645d53] tracking-wider shrink-0">{filteredServices.length} SERVICES</span>
            </div>

            {filteredServices.length > 0 ? (
              <div className="bento-grid">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white border border-[#5f5e5e] p-5 hover-card transition-all duration-300 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-[#1d1b16]">{service.name}</h4>
                          <p className="font-mono text-xs text-[#645d53] mt-0.5">{service.id}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-8 border-t border-[#5f5e5e]/10 pt-4">
                        <div className="flex flex-col">
                          <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Duration</span>
                          <span className="font-mono text-sm font-semibold mt-0.5">{service.duration} MIN</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-[11px] text-[#5f5e5e] uppercase">Price</span>
                          <span className="font-mono text-sm font-bold text-[#a83a00] mt-0.5">{formatKes(service.price)}</span>
                        </div>
                      </div>
                    </div>

                    <form
                      action={deleteServiceAction}
                      onSubmit={(event) => {
                        if (!window.confirm(`Delete "${service.name}" from the menu?`)) {
                          event.preventDefault()
                        }
                      }}
                      className="mt-6"
                    >
                      <input type="hidden" name="serviceId" value={service.id} />
                      <button
                        type="submit"
                        className="w-full py-2 text-center border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-colors"
                      >
                        Delete Service
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#f3ede4] border border-dashed border-[#5f5e5e]/50 p-8 text-center">
                <p className="font-mono text-sm text-[#594139]">
                  No services match the current search. Create one above to start populating the booking flow.
                </p>
              </div>
            )}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-[#ebe1d4] p-6 border border-[#5f5e5e] relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">content_cut</span>
              </div>
              <h4 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1f1b13] mb-2">Live Catalog</h4>
              <p className="text-base text-[#4c463c] mb-6 max-w-md">
                This page now reads directly from Postgres. Any service you add here becomes available to the public booking page after revalidation.
              </p>
              <Link href="/book/service" className="inline-flex px-4 py-2 bg-[#1f1b13] text-[#ebe1d4] font-mono text-xs font-medium hover:bg-[#a83a00] hover:text-white transition-colors">
                Preview Booking Menu
              </Link>
            </div>

            <div className="bg-[#ffdbce] p-6 border border-[#5f5e5e] flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs font-medium text-[#370d00] uppercase tracking-wider mb-1">Menu Value</h4>
                <span className="font-['Space_Grotesk',sans-serif] text-[42px] leading-none font-bold text-[#802a00]">
                  {formatKes(totalMenuValue)}
                </span>
              </div>
              <div className="mt-8">
                <div className="flex justify-between mb-2 font-mono text-xs">
                  <span>Visible Services</span>
                  <span className="font-bold">{filteredServices.length}</span>
                </div>
                <div className="w-full bg-[#370d00]/10 h-1">
                  <div
                    className="bg-[#a83a00] h-full transition-all"
                    style={{ width: `${Math.min(filteredServices.length * 20, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#a83a00] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform md:hidden z-50 rounded-full"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  )
}
