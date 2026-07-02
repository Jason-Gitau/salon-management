'use client';

import React from 'react';
import Link from 'next/link';
import {
X,
ChevronLeft,
ChevronRight,
SunMedium,
Sunset,
ArrowRight
} from 'lucide-react';

export default function DateTimeSelectionPage() {
return (
<>

  {/* STREAMING_CHUNK: Rendering the top navigation bar... */}
  {/* Top Navigation Placeholder - Suppressed for transactional flow */}
  <header className="w-full bg-[#f9f3ea] border-b border-[#8d7167] px-6 py-4 flex justify-between items-center z-10 sticky top-0">
    <div className="font-bold text-xl text-[#a83a00] tracking-tight">Luxe Salon Portal</div>
    {/* In a real app, this cancels and returns to the salon storefront */}
      <Link href="/book/service" className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
      <X size={20} strokeWidth={2} />
      <span className="font-mono text-sm font-bold">Cancel Booking</span>
    </Link>
  </header>

  {/* Main Content Layout */}
  <main className="flex-1 flex flex-col md:flex-row w-full max-w-[1440px] mx-auto border-l border-r border-[#8d7167]">
    
    {/* Left Column: Context & Branding */}
    <aside className="w-full md:w-[320px] lg:w-[400px] border-b md:border-b-0 md:border-r border-[#8d7167] bg-[#f3ede4] p-8 md:p-10 pt-24 lg:pt-10 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1d1b16] mt-10">
          Book an Appointment
        </h1>
        <p className="text-[#594139] mb-10 max-w-md leading-relaxed">
          Pick your preferred date and time. The layout stays consistent through the booking flow
          so the steps feel familiar as you move forward.
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

          <div className="flex items-center gap-4 opacity-50 grayscale">
            <div className="w-8 h-8 bg-[#fff9ef] border border-[#8d7167] text-[#5f5e5e] flex items-center justify-center text-sm font-bold">
              3
            </div>
            <span className="text-sm text-[#5f5e5e] font-bold tracking-wide uppercase">Details</span>
          </div>
        </div>
      </div>

      <div className="mt-10 hidden lg:block aspect-square w-full relative border border-[#8d7167] bg-[#ebe1d4] overflow-hidden">
        <img
          className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
          alt="Editorial salon styling tools"
          src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800"
        />
      </div>
    </aside>

    {/* STREAMING_CHUNK: Rendering the main calendar section... */}
    {/* Right Column: Canvas for Date & Time Selection */}
    <section className="flex-1 p-8 md:p-12 bg-[#fff9ef] flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
          
          {/* Calendar View */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-[#8d7167] pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#1d1b16]">Select Date</h2>
              <div className="flex gap-2">
                <button aria-label="Previous month" className="w-8 h-8 flex items-center justify-center border border-[#8d7167] text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button aria-label="Next month" className="w-8 h-8 flex items-center justify-center border border-[#8d7167] text-[#5f5e5e] hover:bg-[#e7e2d9] transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="text-xl font-bold mb-4 text-center text-[#1d1b16]">October 2023</div>
            
            <div className="grid grid-cols-7 gap-px bg-[#8d7167] border border-[#8d7167] mb-8">
              {/* Days of Week Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-[#f3ede4] py-2 text-center font-mono text-xs font-bold text-[#5f5e5e] uppercase">
                  {day}
                </div>
              ))}

              {/* Calendar Days (Sample Grid) */}
              {/* Row 1 (Past/Disabled) */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(day => (
                <div key={`past-${day}`} className="bg-[#fff9ef] aspect-square p-2 flex flex-col justify-between text-gray-400 font-mono text-sm">
                  {day}
                </div>
              ))}

              {/* Row 2 (Available) */}
              {[10, 11, 12].map(day => (
                <button key={`avail-${day}`} className="bg-[#fff9ef] aspect-square p-2 flex flex-col justify-between hover:bg-[#e7e2d9] transition-colors text-[#1d1b16] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00] font-mono text-sm">
                  <span>{day}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a83a00] self-center mb-1"></span>
                </button>
              ))}

              {/* Selected Day */}
              <button className="bg-[#a83a00] aspect-square p-2 flex flex-col justify-between text-white cursor-pointer text-left focus:outline-none border-2 border-[#1d1b16] font-mono text-sm font-bold">
                <span>13</span>
              </button>

              {/* Remaining Available Days */}
              {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(day => (
                 <button key={`avail2-${day}`} className="bg-[#fff9ef] aspect-square p-2 flex flex-col justify-between hover:bg-[#e7e2d9] transition-colors text-[#1d1b16] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00] font-mono text-sm">
                  <span>{day}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a83a00] self-center mb-1"></span>
                </button>
              ))}

              {/* Next Month Overflow */}
              {[1, 2, 3, 4].map(day => (
                <div key={`next-${day}`} className="bg-[#fff9ef] aspect-square p-2 flex flex-col justify-between text-gray-400 opacity-50 font-mono text-sm">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* STREAMING_CHUNK: Rendering the time slot selection grid... */}
          {/* Time Slot Grid */}
          <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-[#8d7167] pt-10 lg:pt-0 lg:pl-10">
            <div className="flex items-center justify-between mb-8 border-b border-[#8d7167] pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#1d1b16]">Available Times</h2>
              <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase">Friday, Oct 13</span>
            </div>
            
            {/* Morning Block */}
            <div className="mb-8">
              <h3 className="font-mono text-sm font-bold text-[#5f5e5e] mb-4 uppercase tracking-widest flex items-center gap-2">
                <SunMedium size={16} /> Morning
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button className="py-2 px-3 text-center border border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50" disabled>
                  <span className="font-mono text-xs md:text-sm font-bold line-through">09:00 AM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">09:30 AM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">10:00 AM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50" disabled>
                  <span className="font-mono text-xs md:text-sm font-bold line-through">10:30 AM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">11:00 AM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">11:30 AM</span>
                </button>
              </div>
            </div>

            {/* Afternoon Block */}
            <div>
              <h3 className="font-mono text-sm font-bold text-[#5f5e5e] mb-4 uppercase tracking-widest flex items-center gap-2">
                <Sunset size={16} /> Afternoon
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">12:00 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50" disabled>
                  <span className="font-mono text-xs md:text-sm font-bold line-through">12:30 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50" disabled>
                  <span className="font-mono text-xs md:text-sm font-bold line-through">01:00 PM</span>
                </button>
                
                {/* Selected Time Slot */}
                <button className="py-2 px-3 text-center border-2 border-[#a83a00] bg-[#ffdbce] text-[#802a00] font-bold focus:outline-none shadow-[2px_2px_0px_#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">01:30 PM</span>
                </button>
                
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">02:00 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">02:30 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">03:00 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50" disabled>
                  <span className="font-mono text-xs md:text-sm font-bold line-through">03:30 PM</span>
                </button>
                <button className="py-2 px-3 text-center border border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a83a00]">
                  <span className="font-mono text-xs md:text-sm font-bold">04:00 PM</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STREAMING_CHUNK: Rendering the bottom action bar... */}
        {/* Bottom Action Bar */}
        <div className="mt-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#8d7167]">
          {/* Mobile Estimated Cost */}
          <div className="md:hidden w-full flex justify-between items-end mb-2 pb-2 border-b border-[#8d7167]">
            <span className="text-base text-[#594139]">Estimated Total</span>
            <span className="text-2xl font-bold text-[#1d1b16]">$185.00</span>
          </div>
          
          <Link href="/book/service" className="w-full md:w-auto px-8 py-3 border border-[#8d7167] text-[#1d1b16] bg-[#fff9ef] hover:bg-[#e7e2d9] transition-colors font-mono text-sm font-bold text-center">
            Back to Services
          </Link>
          
          <Link href="/book/summary" className="w-full md:w-auto px-8 py-3 bg-[#a83a00] border border-[#8d7167] text-white hover:bg-[#802a00] transition-colors font-mono text-sm font-bold flex items-center justify-center gap-2">
            Continue to Summary
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
        
      </div>
    </section>
  </main>
 </>
);
}
