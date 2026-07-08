'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, PlusCircle } from 'lucide-react'

type ServiceListItem = {
  id: string
  name: string
  duration: number
  price: number
}

type ServiceSelectionClientProps = {
  salonName: string
  services: ServiceListItem[]
}

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ServiceSelectionClient({
  salonName,
  services,
}: ServiceSelectionClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedId) ?? null,
    [services, selectedId]
  )

  const estimatedTotal = selectedService?.price ?? 0
  const hasServices = services.length > 0
  const hasSelection = Boolean(selectedId)

  function toggleService(serviceId: string) {
    setSelectedId((current) => (current === serviceId ? null : serviceId))
  }

  return (
    <div className="bg-[#f9f3ea] text-[#1d1b16] font-sans antialiased min-h-screen flex flex-col items-center justify-center p-4 md:p-10">
      <main className="w-full max-w-7xl bg-[#fff9ef] border border-[#8d7167] flex flex-col lg:flex-row overflow-hidden relative min-h-[85vh]">
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10 lg:w-5/12">
          <Link href="/" className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#a83a00] transition-colors font-mono text-sm font-bold">
            <ArrowLeft size={18} strokeWidth={2.5} />
            <span>Back</span>
          </Link>
          <div className="font-bold text-xl text-[#a83a00] tracking-tight lg:hidden">
            {salonName}
          </div>
        </div>

        <section className="w-full lg:w-5/12 bg-[#f3ede4] border-b lg:border-b-0 lg:border-r border-[#8d7167] p-8 md:p-10 pt-24 lg:pt-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1d1b16] mb-4 tracking-tight mt-10">
              Book an Appointment
            </h1>
            <p className="text-[#594139] mb-10 max-w-md leading-relaxed">
              Choose from the live service menu below. Selected services are highlighted so the current basket stays obvious.
            </p>

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

          <div className="mt-10 hidden lg:block aspect-square w-full relative border border-[#8d7167] bg-[#ebe1d4] overflow-hidden">
            <img
              className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
              alt="Editorial salon styling tools"
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </section>

        <section className="w-full lg:w-7/12 bg-[#fff9ef] p-6 md:p-10 flex flex-col h-[75vh] lg:h-auto max-h-[800px]">
          <div className="flex items-center justify-between mb-8 pt-6 lg:pt-0 border-b border-[#8d7167] pb-4">
            <h2 className="text-2xl font-bold text-[#1d1b16] tracking-tight">Select Services</h2>
            <div className="font-mono text-xs font-bold text-[#5f5e5e] bg-[#e7e2d9] px-3 py-1 border border-[#8d7167]">
              {selectedId ? '1 Selected' : '0 Selected'}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-10 pb-10">
            <div>
              <h3 className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-4 border-b border-[#8d7167]/20 pb-2">
                Live Service Menu
              </h3>

              {hasServices ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const isSelected = selectedId === service.id

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`text-left p-4 flex flex-col justify-between min-h-[140px] relative transition-colors ${
                          isSelected
                            ? 'bg-[#f3ede4] border-2 border-[#a83a00] hover:bg-[#e7e2d9]'
                            : 'bg-[#fff9ef] border border-[#8d7167] hover:bg-[#f3ede4]'
                        }`}
                      >
                        <div className={`absolute top-4 right-4 ${isSelected ? 'text-[#a83a00]' : 'text-[#5f5e5e]'}`}>
                          {isSelected ? (
                            <CheckCircle2 size={24} strokeWidth={2} />
                          ) : (
                            <PlusCircle size={24} strokeWidth={1.5} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-[#1d1b16] mb-1">{service.name}</h4>
                          <p className="text-sm text-[#594139]">
                            Service ID: <span className="font-mono text-xs">{service.id}</span>
                          </p>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                          <span className="font-mono text-xs font-bold text-[#5f5e5e] flex items-center gap-1">
                            <Clock size={14} /> {service.duration} Min
                          </span>
                          <span className="font-mono text-lg font-bold text-[#1d1b16]">
                            {formatKes(service.price)}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-[#8d7167] bg-[#f3ede4] p-8 text-center">
                  <h4 className="text-xl font-bold text-[#1d1b16]">No services in the database yet</h4>
                  <p className="mt-3 text-sm text-[#594139] max-w-lg mx-auto">
                    The hardcoded catalog has been removed. Add real rows to the <span className="font-mono">Service</span> table and they will appear here automatically.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 mt-auto border-t border-[#8d7167] bg-[#fff9ef] flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase">Selected Total</span>
              <span className="font-mono text-2xl text-[#1d1b16] font-bold">
                {formatKes(estimatedTotal)}
              </span>
            </div>

            <Link
              href={selectedId ? `/book/datetime?serviceId=${encodeURIComponent(selectedId)}` : '/book/datetime'}
              aria-disabled={!hasSelection}
              className={`px-8 py-3 font-mono text-sm font-bold transition-colors flex items-center gap-3 border border-[#8d7167] ${
                hasSelection
                  ? 'bg-[#a83a00] text-white hover:bg-[#802a00]'
                  : 'bg-[#e7e2d9] text-[#5f5e5e] pointer-events-none'
              }`}
            >
              Continue to Date
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
