'use client';

import React from 'react';
import Link from 'next/link';
import {
X,
Calendar,
ArrowLeft
} from 'lucide-react';

export default function CheckoutSummaryPage() {
return (
<>


  {/* Top Navigation */}
  <header className="w-full bg-[#f9f3ea] border-b border-[#8d7167] px-6 py-4 flex justify-between items-center z-10 sticky top-0">
    <div className="font-bold text-xl text-[#a83a00] tracking-tight">Luxe Salon Portal</div>
    <Link href="/" className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
      <X size={20} strokeWidth={2} />
      <span className="font-mono text-sm font-bold">Cancel Booking</span>
    </Link>
  </header>

  {/* Main Content Layout */}
  <main className="flex-1 flex flex-col md:flex-row w-full max-w-[1440px] mx-auto border-l border-r border-[#8d7167] min-h-[calc(100vh-65px)]">
    
    {/* Left Column: Context & Branding */}
    <aside className="w-full md:w-[320px] lg:w-[400px] border-b md:border-b-0 md:border-r border-[#8d7167] bg-[#f3ede4] p-8 md:p-10 pt-24 lg:pt-10 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1d1b16] mt-10">
          Checkout
        </h1>
        <p className="text-[#594139] mb-10 max-w-md leading-relaxed">
          Review your appointment summary and complete the deposit payment. The booking flow keeps
          the same step rail as the service selection screen for consistency.
        </p>

        {/* Steps Indicator */}
        <div className="space-y-4 font-mono">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#a83a00] text-white flex items-center justify-center text-sm font-bold border border-[#8d7167]">
              1
            </div>
            <span className="text-sm text-[#a83a00] font-bold tracking-wide uppercase">Services</span>
          </div>

          <div className="w-px h-8 bg-[#8d7167] ml-4 opacity-30"></div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#a83a00] text-white flex items-center justify-center text-sm font-bold border border-[#8d7167]">
              2
            </div>
            <span className="text-sm text-[#a83a00] font-bold tracking-wide uppercase">Date & Time</span>
          </div>

          <div className="w-px h-8 bg-[#8d7167] ml-4 opacity-30"></div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#a83a00] text-white flex items-center justify-center text-sm font-bold border border-[#8d7167]">
              3
            </div>
            <span className="text-sm text-[#a83a00] font-bold tracking-wide uppercase">Details</span>
          </div>
        </div>
      </div>

      <div className="mt-10 hidden lg:block aspect-square w-full relative border border-[#8d7167] bg-[#ebe1d4] overflow-hidden">
        <img
          className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
          alt="Salon detail shot"
          src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800"
        />
      </div>
    </aside>

    {/* Right Column: Booking Summary & Payment */}
    <section className="flex-1 p-8 md:p-12 bg-[#fff9ef] flex flex-col overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        
        <h2 className="text-2xl font-bold text-[#1d1b16] mb-8 pb-4 border-b border-[#8d7167]">Booking Summary</h2>
        
        {/* Appointment Details Card */}
        <div className="bg-[#f9f3ea] border border-[#8d7167] p-6 mb-8 flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="flex-1">
            <p className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-2">Date & Time</p>
            <p className="text-lg text-[#1d1b16] font-bold flex items-center gap-2">
              <Calendar size={20} className="text-[#a83a00]" />
              Oct 24, 2024 at 2:30 PM
            </p>
          </div>
          <div className="flex-1 border-t md:border-t-0 md:border-l border-[#8d7167]/30 pt-4 md:pt-0 md:pl-6">
            <p className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-2">Stylist</p>
            <div className="flex items-center gap-3">
              <img 
                className="w-10 h-10 object-cover border border-[#8d7167]" 
                alt="Stylist portrait" 
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=200&h=200"
              />
              <p className="text-lg text-[#1d1b16] font-bold">Elena R.</p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-10 flex-grow">
          <h3 className="font-mono text-xs font-bold text-[#594139] mb-4 uppercase tracking-widest border-b border-[#8d7167]/20 pb-2">
            Services Selected
          </h3>
          <div className="space-y-2">
            {/* Service Item */}
            <div className="flex justify-between items-center py-3 border-b border-[#8d7167]/20 group hover:bg-[#f3ede4] px-2 -mx-2 transition-colors">
              <div>
                <p className="text-base text-[#1d1b16] font-bold">Balayage & Toner</p>
                <p className="font-mono text-xs text-[#5f5e5e]">120 mins</p>
              </div>
              <p className="font-mono text-base text-[#1d1b16] font-bold">$250.00</p>
            </div>
            {/* Service Item */}
            <div className="flex justify-between items-center py-3 border-b border-[#8d7167]/20 group hover:bg-[#f3ede4] px-2 -mx-2 transition-colors">
              <div>
                <p className="text-base text-[#1d1b16] font-bold">Olaplex Treatment</p>
                <p className="font-mono text-xs text-[#5f5e5e]">30 mins</p>
              </div>
              <p className="font-mono text-base text-[#1d1b16] font-bold">$45.00</p>
            </div>
            {/* Service Item */}
            <div className="flex justify-between items-center py-3 border-b border-[#8d7167]/20 group hover:bg-[#f3ede4] px-2 -mx-2 transition-colors">
              <div>
                <p className="text-base text-[#1d1b16] font-bold">Signature Blowout</p>
                <p className="font-mono text-xs text-[#5f5e5e]">45 mins</p>
              </div>
              <p className="font-mono text-base text-[#1d1b16] font-bold">$65.00</p>
            </div>
          </div>
        </div>

        {/* Total & Deposit Wrapper */}
        <div className="mt-auto">
          <div className="bg-[#f3ede4] border border-[#8d7167] p-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="font-mono text-sm text-[#594139]">Subtotal</p>
              <p className="font-mono text-sm text-[#1d1b16] font-bold">$360.00</p>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#8d7167]/30">
              <p className="font-mono text-sm text-[#594139]">Taxes & Fees</p>
              <p className="font-mono text-sm text-[#1d1b16] font-bold">$18.00</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl text-[#1d1b16] font-bold">Total</p>
              <p className="text-xl text-[#1d1b16] font-bold">$378.00</p>
            </div>
            
            <div className="pt-4 border-t-2 border-[#8d7167] border-dashed flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-mono text-sm text-[#a83a00] font-bold uppercase tracking-wide">30% Deposit Required Today</p>
                <p className="font-mono text-xs text-[#5f5e5e] mt-1">Remaining $264.60 due at salon</p>
              </div>
              <p className="text-3xl text-[#a83a00] font-bold tracking-tight">$113.40</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Link href="/book/checkout" className="w-full bg-[#a83a00] text-white font-mono text-sm font-bold uppercase tracking-wider py-4 border border-[#8d7167] hover:bg-[#802a00] transition-colors shadow-[2px_2px_0px_#1d1b16] active:translate-y-[2px] active:shadow-none flex justify-center items-center gap-2">
              <span>Pay Deposit with M-Pesa</span>
            </Link>
            
            <Link href="/book/datetime" className="md:hidden w-full flex justify-center items-center text-[#594139] hover:text-[#a83a00] transition-colors font-mono text-sm font-bold gap-2 py-4">
              <ArrowLeft size={16} />
              Back to Date & Time
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  </main>
 </>
);
}
