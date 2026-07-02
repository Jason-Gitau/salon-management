'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlusCircle, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

export default function BookServicePage() {
  return (
    <div className="bg-[#f9f3ea] text-[#1d1b16] font-sans antialiased min-h-screen flex flex-col items-center justify-center p-4 md:p-10">
      
      {/* Structured Main Container */}
      <main className="w-full max-w-7xl bg-[#fff9ef] border border-[#8d7167] flex flex-col lg:flex-row overflow-hidden relative min-h-[85vh]">
        
        {/* Top Nav / Back (Mobile only, absolute on Web) */}
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10 lg:w-5/12">
          {/* Note: In a real app, you might use router.back() here */}
          <Link href="/" className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#a83a00] transition-colors font-mono text-sm font-bold">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back</span>
          </Link>
          <div className="font-bold text-xl text-[#a83a00] tracking-tight lg:hidden">
            Luxe Salon
          </div>
        </div>

        {/* Left Panel: Context & Branding */}
        <section className="w-full lg:w-5/12 bg-[#f3ede4] border-b lg:border-b-0 lg:border-r border-[#8d7167] p-8 md:p-10 pt-24 lg:pt-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1d1b16] mb-4 tracking-tight mt-10">
              Book an Appointment
            </h1>
            <p className="text-[#594139] mb-10 max-w-md leading-relaxed">
              Select your desired services to begin. You can mix and match multiple treatments for a comprehensive salon experience.
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
              
              <div className="flex items-center gap-4 opacity-50 grayscale">
                <div className="w-8 h-8 bg-[#fff9ef] border border-[#8d7167] text-[#5f5e5e] flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-sm text-[#5f5e5e] font-bold tracking-wide uppercase">Date & Time</span>
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

          {/* Stylized Graphic/Image */}
          <div className="mt-10 hidden lg:block aspect-square w-full relative border border-[#8d7167] bg-[#ebe1d4] overflow-hidden">
            <img 
              className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Editorial salon styling tools" 
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </section>

        {/* Right Panel: Service Selection Canvas */}
        <section className="w-full lg:w-7/12 bg-[#fff9ef] p-6 md:p-10 flex flex-col h-[75vh] lg:h-auto max-h-[800px]">
          
          <div className="flex items-center justify-between mb-8 pt-6 lg:pt-0 border-b border-[#8d7167] pb-4">
            <h2 className="text-2xl font-bold text-[#1d1b16] tracking-tight">Select Services</h2>
            <div className="font-mono text-xs font-bold text-[#5f5e5e] bg-[#e7e2d9] px-3 py-1 border border-[#8d7167]">
              2 Selected
            </div>
          </div>

          {/* Scrollable Catalog */}
          {/* Custom minimal scrollbar classes added via arbitrary Tailwind or relying on browser defaults */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-10 pb-10">
            
            {/* Category 1 */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-4 border-b border-[#8d7167]/20 pb-2">
                Hair Styling
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Selected Card */}
                <button className="text-left bg-[#f3ede4] border-2 border-[#a83a00] p-4 flex flex-col justify-between min-h-[140px] relative group hover:bg-[#e7e2d9] transition-colors">
                  <div className="absolute top-4 right-4 text-[#a83a00]">
                    <CheckCircle2 size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1d1b16] mb-1">Signature Cut</h4>
                    <p className="text-sm text-[#594139]">Tailored haircut, wash, and premium blowout.</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                      <Clock size={14} /> 60 Min
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1d1b16]">$65</span>
                  </div>
                </button>

                {/* Unselected Card */}
                <button className="text-left bg-[#fff9ef] border border-[#8d7167] p-4 flex flex-col justify-between min-h-[140px] relative group hover:bg-[#f3ede4] transition-colors">
                  <div className="absolute top-4 right-4 text-[#5f5e5e] opacity-0 group-hover:opacity-50 transition-opacity">
                    <PlusCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1d1b16] mb-1">Blowout & Style</h4>
                    <p className="text-sm text-[#594139]">Professional wash and styled blowout.</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                      <Clock size={14} /> 45 Min
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1d1b16]">$45</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Category 2 */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-4 border-b border-[#8d7167]/20 pb-2">
                Color Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Unselected Card */}
                <button className="text-left bg-[#fff9ef] border border-[#8d7167] p-4 flex flex-col justify-between min-h-[140px] relative group hover:bg-[#f3ede4] transition-colors">
                  <div className="absolute top-4 right-4 text-[#5f5e5e] opacity-0 group-hover:opacity-50 transition-opacity">
                    <PlusCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1d1b16] mb-1">Full Highlights</h4>
                    <p className="text-sm text-[#594139]">Complete foil highlights for dimensional color.</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                      <Clock size={14} /> 120 Min
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1d1b16]">$180</span>
                  </div>
                </button>

                {/* Selected Card */}
                <button className="text-left bg-[#f3ede4] border-2 border-[#a83a00] p-4 flex flex-col justify-between min-h-[140px] relative group hover:bg-[#e7e2d9] transition-colors">
                  <div className="absolute top-4 right-4 text-[#a83a00]">
                    <CheckCircle2 size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1d1b16] mb-1">Gloss Treatment</h4>
                    <p className="text-sm text-[#594139]">Enhance shine and refresh tone.</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                      <Clock size={14} /> 30 Min
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1d1b16]">$50</span>
                  </div>
                </button>

                {/* Unselected Card */}
                <button className="text-left bg-[#fff9ef] border border-[#8d7167] p-4 flex flex-col justify-between min-h-[140px] relative group hover:bg-[#f3ede4] transition-colors">
                  <div className="absolute top-4 right-4 text-[#5f5e5e] opacity-0 group-hover:opacity-50 transition-opacity">
                    <PlusCircle size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1d1b16] mb-1">Root Retouch</h4>
                    <p className="text-sm text-[#594139]">Single process color for regrowth.</p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                      <Clock size={14} /> 60 Min
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1d1b16]">$85</span>
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="pt-6 mt-auto border-t border-[#8d7167] bg-[#fff9ef] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase">Total (Estimated)</span>
              <span className="font-mono text-2xl text-[#1d1b16] font-bold">$115</span>
            </div>
            
            <Link 
              href="/book/datetime" 
              className="bg-[#a83a00] text-white border border-[#8d7167] px-8 py-3 font-mono text-sm font-bold hover:bg-[#802a00] transition-colors flex items-center gap-3"
            >
              Continue to Date
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>

        </section>

      </main>
    </div>
  );
}
