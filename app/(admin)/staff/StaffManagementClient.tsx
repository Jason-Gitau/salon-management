'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { createWorkerAction, deleteWorkerAction } from '@/app/actions/worker-actions'

type WorkerListItem = {
  userId: string
  workerProfileId: string
  name: string
  email: string
  phone: string
  commissionPct: number
  isAvailable: boolean
}

type StaffManagementClientProps = {
  salonName: string
  workers: WorkerListItem[]
}

const initialWorkerFormState = {
  status: 'idle' as const,
  message: '',
}

export default function StaffManagementClient({
  salonName,
  workers,
}: StaffManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [state, formAction, pending] = useActionState(
    createWorkerAction,
    initialWorkerFormState
  )

  const filteredWorkers = workers.filter((worker) => {
    const query = searchQuery.toLowerCase()
    return (
      worker.name.toLowerCase().includes(query) ||
      worker.email.toLowerCase().includes(query) ||
      worker.phone.toLowerCase().includes(query)
    )
  })

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .thin-border { border: 1px solid #5f5e5e; }
        .thin-border-b { border-bottom: 1px solid #5f5e5e; }
        .thin-border-t { border-top: 1px solid #5f5e5e; }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen flex selection:bg-[#a83a00] selection:text-white">
        <nav className="fixed left-0 top-0 h-full w-[80px] bg-[#fff9ef] thin-border flex flex-col items-center py-6 space-y-4 z-50">
          <div className="mb-8">
            <div className="w-12 h-12 flex items-center justify-center thin-border bg-[#ff7033]">
              <span className="material-symbols-outlined text-[#601d00] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            </div>
          </div>

          <div className="flex flex-col items-center w-full space-y-2">
            <Link href="/dashboard" className="w-full flex flex-col items-center py-3 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Dashboard</span>
            </Link>
            <Link href="/service" className="w-full flex flex-col items-center py-3 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">content_cut</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Services</span>
            </Link>
            <Link href="/staff" className="w-full flex flex-col items-center py-3 bg-[#a83a00] text-white border-l-4 border-[#1d1b16]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Staff</span>
            </Link>
            <Link href="/products" className="w-full flex flex-col items-center py-3 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Products</span>
            </Link>
          </div>

          <div className="mt-auto flex flex-col items-center w-full">
            <Link href="/settings" className="w-full flex flex-col items-center py-3 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Settings</span>
            </Link>
          </div>
        </nav>

        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] thin-border flex justify-between items-center px-8 z-40">
          <div className="flex items-center space-x-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">{salonName}</h1>
            <div className="hidden md:flex items-center bg-[#f3ede4] thin-border px-3 py-1.5 min-w-[300px]">
              <span className="material-symbols-outlined text-[#5f5e5e] text-sm mr-2">search</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-[#5f5e5e]"
                placeholder="Search workers..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative scale-95 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[#594139]">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff7033] rounded-full" />
            </button>
            <div className="flex items-center space-x-4 border-l border-[#8d7167] pl-6">
              <div className="text-right">
                <p className="font-mono text-sm font-medium text-[#1d1b16] leading-none">Admin Profile</p>
                <p className="text-xs text-[#5f5e5e] mt-1">Salon Manager</p>
              </div>
              <div className="w-10 h-10 overflow-hidden thin-border bg-[#ebe1d4]">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=120" alt="Manager" />
              </div>
            </div>
          </div>
        </header>

        <main className="ml-[80px] pt-16 min-h-screen w-full px-8 pb-12">
          <div className="max-w-[1280px] mx-auto pt-6">
            <div className="flex justify-between items-end mb-10 gap-6">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Staff Management</h2>
                <p className="text-[#5f5e5e] text-base mt-1">Create worker accounts directly from the admin workspace for booking and schedule allocation.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateForm((value) => !value)}
                className="bg-[#ff7033] thin-border px-6 py-2.5 font-mono text-xs font-bold text-[#601d00] hover:brightness-95 transition-all flex items-center space-x-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>{showCreateForm ? 'CLOSE FORM' : 'ADD STAFF MEMBER'}</span>
              </button>
            </div>

            {showCreateForm ? (
              <section className="bg-[#fff9ef] thin-border overflow-hidden shadow-sm mb-10">
                <div className="px-6 py-4 thin-border-b bg-[#f3ede4]">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Create Worker Account</h3>
                </div>
                <form action={formAction} className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Name</span>
                    <input name="name" required className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Email</span>
                    <input name="email" type="email" required className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Phone</span>
                    <input name="phone" required className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Password</span>
                    <input name="password" type="text" required className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Commission %</span>
                    <input name="commissionPct" type="number" min="0" max="100" step="0.01" required className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Available for Booking</span>
                    <select name="isAvailable" defaultValue="true" className="thin-border bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </label>
                  <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={pending}
                      className="bg-[#a83a00] text-white thin-border px-6 py-2.5 font-mono text-xs font-bold hover:bg-[#802a00] transition-colors disabled:opacity-60"
                    >
                      {pending ? 'CREATING...' : 'CREATE WORKER'}
                    </button>
                    {state.message ? (
                      <p className={`text-sm ${state.status === 'error' ? 'text-[#ba1a1a]' : 'text-[#1d1b16]'}`}>
                        {state.message}
                      </p>
                    ) : null}
                  </div>
                </form>
              </section>
            ) : null}

            <section className="bg-[#fff9ef] thin-border overflow-hidden shadow-sm">
              <div className="px-6 py-4 thin-border-b bg-[#f3ede4] flex justify-between items-center">
                <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Active Workers</h3>
                <span className="font-mono text-xs font-bold text-[#5f5e5e]">{filteredWorkers.length} TOTAL</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9f3ea] border-b border-[#5f5e5e]/20">
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Name</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Contact</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Commission Rate</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Availability</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#5f5e5e]/10">
                    {filteredWorkers.length > 0 ? (
                      filteredWorkers.map((worker) => (
                        <tr key={worker.userId} className="hover:bg-[#f9f3ea] transition-colors group">
                          <td className="p-5">
                            <div>
                              <p className="font-bold text-[#1d1b16]">{worker.name}</p>
                              <p className="text-xs text-[#5f5e5e] font-mono mt-0.5">Worker ID: {worker.workerProfileId}</p>
                            </div>
                          </td>
                          <td className="p-5">
                            <p className="font-mono text-sm">{worker.email}</p>
                            <p className="text-xs text-[#5f5e5e] mt-1">{worker.phone}</p>
                          </td>
                          <td className="p-5 font-mono text-sm font-semibold">{worker.commissionPct}%</td>
                          <td className="p-5">
                            <div className="flex items-center space-x-2">
                              <span className={`w-2 h-2 rounded-full ${worker.isAvailable ? 'bg-green-500' : 'bg-yellow-500'}`} />
                              <span className="text-sm font-medium">{worker.isAvailable ? 'Available' : 'Unavailable'}</span>
                            </div>
                          </td>
                          <td className="p-5 text-right">
                            <form
                              action={deleteWorkerAction}
                              onSubmit={(event) => {
                                if (!window.confirm(`Delete worker account for ${worker.name}?`)) {
                                  event.preventDefault()
                                }
                              }}
                              className="inline-flex"
                            >
                              <input type="hidden" name="userId" value={worker.userId} />
                              <button
                                type="submit"
                                className="text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors flex items-center space-x-1"
                              >
                                <span className="material-symbols-outlined text-sm">person_remove</span>
                                <span className="font-mono text-xs">Delete</span>
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center font-mono text-sm text-[#5f5e5e]">
                          No worker accounts exist yet. Create one above to unlock booking availability and schedules.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
