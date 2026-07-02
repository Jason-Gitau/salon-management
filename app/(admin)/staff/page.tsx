'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types for our React state
interface PendingStaff {
  id: string
  name: string
  role: string
  email: string
  joined: string
  avatar: string
  approved?: boolean
}

interface ActiveStaff {
  id: string
  name: string
  email: string
  role: string
  commission: string
  status: 'On Duty' | 'Away'
  avatar: string
}

const initialPending: PendingStaff[] = [
  {
    id: 'p1',
    name: 'Sarah M.',
    role: 'Senior Stylist',
    email: 'sarah.m@example.com',
    joined: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'p2',
    name: 'David K.',
    role: 'Color Specialist',
    email: 'david.k@luxe.salon',
    joined: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
]

const initialActive: ActiveStaff[] = [
  {
    id: 'a1',
    name: 'Elena R.',
    email: 'elena.stylist@luxe.com',
    role: 'MASTER STYLIST',
    commission: '45%',
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'a2',
    name: 'Julian B.',
    email: 'julian.b@luxe.com',
    role: 'COLOR SPECIALIST',
    commission: '40%',
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'a3',
    name: 'Maya T.',
    email: 'maya.spa@luxe.com',
    role: 'AESTHETICIAN',
    commission: '35%',
    status: 'Away',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
  },
]

export default function StaffManagementPage() {
  const [pendingList, setPendingList] = useState<PendingStaff[]>(initialPending)
  const [activeList, setActiveList] = useState<ActiveStaff[]>(initialActive)
  const [roleFilter, setRoleFilter] = useState('All Roles')

  // Handler: Approve Applicant
  const handleApprove = (id: string) => {
    setPendingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, approved: true } : item))
    )
    setTimeout(() => {
      setPendingList((prev) => prev.filter((item) => item.id !== id))
    }, 800)
  }

  // Handler: Reject Applicant
  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this registration?')) {
      setPendingList((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // Handler: Fire Staff
  const handleFire = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to terminate ${name}?`)) {
      setActiveList((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const filteredActive = activeList.filter((staff) => 
    roleFilter === 'All Roles' ? true : staff.role.toLowerCase().includes(roleFilter.toLowerCase())
  )

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
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
        
        {/* SIDE NAVIGATION WRAPPER */}
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
            {/* ACTIVE TAB */}
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

        {/* TOP APP BAR */}
        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] thin-border flex justify-between items-center px-8 z-40">
          <div className="flex items-center space-x-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">Luxe Salon Portal</h1>
            <div className="hidden md:flex items-center bg-[#f3ede4] thin-border px-3 py-1.5 min-w-[300px]">
              <span className="material-symbols-outlined text-[#5f5e5e] text-sm mr-2">search</span>
              <input className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-[#5f5e5e]" placeholder="Search staff or services..." type="text" />
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

        {/* MAIN CONTENT CANVAS */}
        <main className="ml-[80px] pt-16 min-h-screen w-full px-8 pb-12">
          <div className="max-w-[1280px] mx-auto pt-6">
            
            {/* Page Header */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Staff Management</h2>
                <p className="text-[#5f5e5e] text-base mt-1">Configure access, approve new registrations, and manage commission rates.</p>
              </div>
              <button className="bg-[#ff7033] thin-border px-6 py-2.5 font-mono text-xs font-bold text-[#601d00] hover:brightness-95 transition-all flex items-center space-x-2 shadow-sm">
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>ADD STAFF MEMBER</span>
              </button>
            </div>

            {/* Bento Grid: Pending & Stats */}
            <section className="grid grid-cols-12 gap-5 mb-10">
              
              {/* Pending Approvals Module */}
              <div className="col-span-12 lg:col-span-8 bg-[#fff9ef] thin-border overflow-hidden shadow-sm">
                <div className="px-6 py-4 thin-border-b bg-[#f3ede4] flex justify-between items-center">
                  <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Pending Approval</h3>
                  <span className="bg-[#a83a00] text-white px-2 py-0.5 font-mono text-xs font-bold">
                    {pendingList.length} NEW
                  </span>
                </div>
                
                <div className="p-0">
                  {pendingList.length === 0 ? (
                    <div className="p-8 text-center font-mono text-sm text-[#5f5e5e]">No pending registrations.</div>
                  ) : (
                    <ul className="divide-y divide-[#5f5e5e]/20">
                      {pendingList.map((item) => (
                        <li 
                          key={item.id} 
                          className={`p-6 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 group ${
                            item.approved ? 'bg-green-100 opacity-40' : 'hover:bg-[#f9f3ea]'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 thin-border grayscale group-hover:grayscale-0 transition-all overflow-hidden shrink-0">
                              <img className="w-full h-full object-cover" src={item.avatar} alt={item.name} />
                            </div>
                            <div>
                              <h4 className="font-['Space_Grotesk',sans-serif] text-xl font-medium">{item.name}</h4>
                              <p className="text-[#5f5e5e] text-sm mt-0.5">Joined {item.joined} • {item.role} • {item.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            {item.approved ? (
                              <span className="font-mono text-xs font-bold text-green-700 flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">done_all</span> APPROVED
                              </span>
                            ) : (
                              <>
                                <button 
                                  onClick={() => handleApprove(item.id)}
                                  className="px-4 py-2 bg-[#ff7033] thin-border text-[#601d00] font-mono text-xs font-bold flex items-center space-x-1 hover:bg-[#a83a00] hover:text-white transition-all shadow-sm"
                                >
                                  <span className="material-symbols-outlined text-sm">check_circle</span>
                                  <span>APPROVE</span>
                                </button>
                                <button 
                                  onClick={() => handleReject(item.id)}
                                  className="px-4 py-2 thin-border text-[#5f5e5e] font-mono text-xs font-bold flex items-center space-x-1 hover:bg-[#ba1a1a] hover:text-white hover:border-[#ba1a1a] transition-all"
                                >
                                  <span className="material-symbols-outlined text-sm">cancel</span>
                                  <span>REJECT</span>
                                </button>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Metrics Sidebar */}
              <div className="col-span-12 lg:col-span-4 space-y-5">
                <div className="bg-[#fff9ef] thin-border p-6 shadow-sm">
                  <h4 className="font-mono text-xs font-bold text-[#5f5e5e] tracking-wider mb-3">STAFF RETENTION</h4>
                  <div className="flex items-end space-x-1">
                    <span className="font-['Space_Grotesk',sans-serif] text-5xl font-bold text-[#a83a00] leading-none">94%</span>
                    <span className="text-xs text-green-600 font-mono font-bold flex items-center mb-1">
                      <span className="material-symbols-outlined text-xs">arrow_upward</span> 2.4%
                    </span>
                  </div>
                  <p className="text-sm text-[#5f5e5e] mt-3">Active stylists are performing 12% above quarterly targets.</p>
                </div>

                <div className="bg-[#fff9ef] thin-border p-6 shadow-sm">
                  <h4 className="font-mono text-xs font-bold text-[#5f5e5e] tracking-wider mb-3">QUICK ACTIONS</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2.5 thin-border hover:bg-[#ebe1d4] transition-colors flex justify-between items-center font-mono text-xs font-medium">
                      <span>Edit Schedules</span>
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                    </button>
                    <button className="w-full text-left px-4 py-2.5 thin-border hover:bg-[#ebe1d4] transition-colors flex justify-between items-center font-mono text-xs font-medium">
                      <span>Commission Reports</span>
                      <span className="material-symbols-outlined text-base">payments</span>
                    </button>
                  </div>
                </div>
              </div>

            </section>

            {/* Active Staff Table */}
            <section className="bg-[#fff9ef] thin-border overflow-hidden shadow-sm">
              <div className="px-6 py-4 thin-border-b bg-[#f3ede4] flex justify-between items-center">
                <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Active Staff</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-[#fff9ef] px-3 py-1 thin-border">
                    <span className="material-symbols-outlined text-sm text-[#5f5e5e]">filter_list</span>
                    <select 
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="bg-transparent border-none text-xs font-mono font-medium focus:ring-0 py-0 pr-6 outline-none cursor-pointer"
                    >
                      <option value="All Roles">All Roles</option>
                      <option value="Stylist">Stylist</option>
                      <option value="Specialist">Specialist</option>
                      <option value="Aesthetician">Aesthetician</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f9f3ea] border-b border-[#5f5e5e]/20">
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Name</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Role</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Commission Rate</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Status</th>
                      <th className="p-5 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#5f5e5e]/10">
                    {filteredActive.map((staff) => (
                      <tr key={staff.id} className="hover:bg-[#f9f3ea] transition-colors group">
                        <td className="p-5">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 thin-border overflow-hidden shrink-0 bg-[#ebe1d4]">
                              <img className="w-full h-full object-cover" src={staff.avatar} alt={staff.name} />
                            </div>
                            <div>
                              <p className="font-bold text-[#1d1b16]">{staff.name}</p>
                              <p className="text-xs text-[#5f5e5e] font-mono mt-0.5">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <span className="px-2 py-0.5 thin-border font-mono text-[11px] bg-[#ebe1d4] text-[#1f1b13] font-semibold">
                            {staff.role}
                          </span>
                        </td>
                        <td className="p-5 font-mono text-sm font-semibold">{staff.commission}</td>
                        <td className="p-5">
                          <div className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${staff.status === 'On Duty' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                            <span className="text-sm font-medium">{staff.status}</span>
                          </div>
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end space-x-4">
                            <button className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors flex items-center space-x-1">
                              <span className="material-symbols-outlined text-sm">edit</span>
                              <span className="font-mono text-xs">Edit</span>
                            </button>
                            <button 
                              onClick={() => handleFire(staff.id, staff.name)}
                              className="text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors flex items-center space-x-1"
                            >
                              <span className="material-symbols-outlined text-sm">person_remove</span>
                              <span className="font-mono text-xs">Fire</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 thin-border-t bg-[#f9f3ea] flex justify-between items-center font-mono text-xs">
                <p className="text-[#5f5e5e]">Showing {filteredActive.length} of {activeList.length} employees</p>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 flex items-center justify-center thin-border bg-[#fff9ef] hover:bg-[#ff7033] transition-all">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center thin-border bg-[#ff7033] text-[#601d00] font-bold">1</button>
                  <button className="w-8 h-8 flex items-center justify-center thin-border bg-[#fff9ef] hover:bg-[#ff7033] transition-all">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  )
}
