'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function WorkerProfilePage() {
  return (
    <main className="min-h-screen bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] p-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-[#5f5e5e] bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#a83a00]">Worker Profile</h1>
            <p className="mt-2 text-[#5f5e5e]">Placeholder worker profile page.</p>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="border border-[#5f5e5e] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#f3ede4]"
          >
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/schedule" className="rounded-lg border border-[#5f5e5e] p-4 hover:bg-[#f9f3ea]">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Navigate</p>
            <p className="mt-2 font-semibold">Go to Schedule</p>
          </Link>
          <Link href="/earnings" className="rounded-lg border border-[#5f5e5e] p-4 hover:bg-[#f9f3ea]">
            <p className="font-mono text-xs uppercase tracking-widest text-[#5f5e5e]">Navigate</p>
            <p className="mt-2 font-semibold">Go to Earnings</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
