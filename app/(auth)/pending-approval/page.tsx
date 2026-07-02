'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function PendingApprovalPage() {
  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main 
        className="min-h-screen flex flex-col md:flex-row bg-[#fff9ef] text-[#1d1b16] antialiased selection:bg-[#a83a00] selection:text-white"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        
        {/* LEFT: THE EDITORIAL CANVAS (Hidden on Mobile) */}
        <div className="hidden md:block md:w-1/2 relative bg-[#ede7de] border-r border-[#5f5e5e] h-screen overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center w-full h-full opacity-90 contrast-125 transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b16]/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 z-10 text-white">
            <h1 className="text-5xl font-bold tracking-tighter mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GLAMOUR
            </h1>
            <p className="text-lg text-[#e7e2d9] font-normal">
              Elevating professional standards.
            </p>
          </div>
        </div>

        {/* RIGHT: THE STATUS MODULE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 h-screen bg-[#fff9ef] relative">
          
          {/* Subtle Mobile Brand Anchor */}
          <div className="absolute top-8 left-8 flex items-center gap-2 md:hidden">
            <span className="material-symbols-outlined text-[#a83a00] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            <span className="text-2xl font-medium text-[#1d1b16]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>GLAMOUR</span>
          </div>

          {/* Approval Card Container */}
          <div className="max-w-[480px] w-full bg-[#fff9ef] border border-[#5f5e5e] rounded-xl p-8 shadow-sm relative overflow-hidden">
            
            {/* Top Decorative Orange Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#a83a00]" />

            <div className="flex flex-col items-center text-center">
              
              {/* Icon Highlight */}
              <div className="w-20 h-20 rounded-full bg-[#ede7de] border border-[#5f5e5e] flex items-center justify-center mb-6 relative">
                <span className="material-symbols-outlined text-[#a83a00] text-4xl select-none">
                  hourglass_empty
                </span>
                
                {/* Pulsing Status Dot */}
                <div className="absolute -right-1 -top-1 w-4 h-4 bg-[#a83a00] rounded-full animate-pulse border-2 border-[#fff9ef]" />
              </div>

              {/* Messaging */}
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[#1d1b16] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Account Under Review
              </h2>
              <p className="text-lg text-[#594139] leading-relaxed mb-6 max-w-md mx-auto">
                Your worker account has been successfully created and is currently awaiting administrator approval.
              </p>

              {/* Info Notice Box */}
              <div className="bg-[#f3ede4] border border-[#5f5e5e] rounded-lg p-4 mb-8 w-full text-left flex gap-3 items-start">
                <span className="material-symbols-outlined text-[#5f5e5e] mt-0.5 text-[20px] shrink-0 select-none">
                  info
                </span>
                <div>
                  <p className="text-base text-[#1d1b16] leading-snug">
                    We will notify you via email once your account is active and you can access your schedule.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full flex flex-col gap-2.5">
                <Link
                  href="/"
                  className="w-full py-3 px-6 bg-[#fff9ef] border border-[#5f5e5e] text-[#1d1b16] font-mono text-sm font-medium tracking-wide rounded hover:bg-[#e7e2d9] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">home</span>
                  Return to Home
                </Link>

                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full py-3 px-6 bg-transparent border border-transparent text-[#5f5e5e] font-mono text-sm font-medium tracking-wide rounded hover:text-[#1d1b16] transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Log Out
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </>
  )
}