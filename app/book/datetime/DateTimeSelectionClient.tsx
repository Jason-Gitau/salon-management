'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  X,
  ChevronLeft,
  ChevronRight,
  SunMedium,
  Sunset,
  ArrowRight,
} from 'lucide-react'
import type { SlotAvailability } from '@/lib/scheduling'

type DateOption = {
  isoDate: string
  label: string
  dayNumber: string
  hasAvailability: boolean
  slots: SlotAvailability[]
}

type DateTimeSelectionClientProps = {
  service: {
    id: string
    name: string
    duration: number
    price: number
  }
  dates: DateOption[]
}

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function DateTimeSelectionClient({
  service,
  dates,
}: DateTimeSelectionClientProps) {
  const [selectedDate, setSelectedDate] = useState(dates[0]?.isoDate ?? '')
  const [selectedSlotIso, setSelectedSlotIso] = useState<string | null>(null)

  const activeDate = useMemo(
    () => dates.find((date) => date.isoDate === selectedDate) ?? dates[0],
    [dates, selectedDate]
  )

  const selectedSlot = useMemo(
    () => activeDate?.slots.find((slot) => slot.isoStart === selectedSlotIso) ?? null,
    [activeDate, selectedSlotIso]
  )

  const morningSlots = activeDate?.slots.filter((slot) => {
    const hour = new Date(slot.isoStart).getHours()
    return hour < 12
  }) ?? []

  const afternoonSlots = activeDate?.slots.filter((slot) => {
    const hour = new Date(slot.isoStart).getHours()
    return hour >= 12
  }) ?? []

  const continueHref =
    selectedSlot && activeDate
      ? `/book/summary?serviceId=${service.id}&date=${encodeURIComponent(activeDate.isoDate)}&start=${encodeURIComponent(selectedSlot.isoStart)}&workerId=${encodeURIComponent(selectedSlot.workerId ?? '')}`
      : '/book/summary'

  return (
    <>
      <header className="w-full bg-[#f9f3ea] border-b border-[#8d7167] px-6 py-4 flex justify-between items-center z-10 sticky top-0">
        <div className="font-bold text-xl text-[#a83a00] tracking-tight">Luxe Salon Portal</div>
        <Link href="/book/service" className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
          <X size={20} strokeWidth={2} />
          <span className="font-mono text-sm font-bold">Cancel Booking</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col md:flex-row w-full max-w-[1440px] mx-auto border-l border-r border-[#8d7167]">
        <aside className="w-full md:w-[320px] lg:w-[400px] border-b md:border-b-0 md:border-r border-[#8d7167] bg-[#f3ede4] p-8 md:p-10 pt-24 lg:pt-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-[#1d1b16] mt-10">
              Book an Appointment
            </h1>
            <p className="text-[#594139] mb-10 max-w-md leading-relaxed">
              Pick a time and the system will automatically assign the first available worker for <span className="font-semibold">{service.name}</span>.
            </p>

            <div className="mb-10 border border-[#8d7167] bg-[#fff9ef] p-4">
              <p className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest mb-2">Selected Service</p>
              <p className="text-lg font-bold text-[#1d1b16]">{service.name}</p>
              <div className="mt-3 flex justify-between font-mono text-sm text-[#5f5e5e]">
                <span>{service.duration} mins</span>
                <span>{formatKes(service.price)}</span>
              </div>
            </div>

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

        <section className="flex-1 p-8 md:p-12 bg-[#fff9ef] flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-8 border-b border-[#8d7167] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[#1d1b16]">Select Date</h2>
                  <div className="flex gap-2 opacity-50">
                    <button aria-label="Previous month" className="w-8 h-8 flex items-center justify-center border border-[#8d7167] text-[#5f5e5e]">
                      <ChevronLeft size={20} />
                    </button>
                    <button aria-label="Next month" className="w-8 h-8 flex items-center justify-center border border-[#8d7167] text-[#5f5e5e]">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dates.map((date) => {
                    const isSelected = date.isoDate === activeDate?.isoDate

                    return (
                      <button
                        key={date.isoDate}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date.isoDate)
                          setSelectedSlotIso(null)
                        }}
                        className={`border p-4 text-left transition-colors ${
                          isSelected
                            ? 'bg-[#a83a00] text-white border-[#1d1b16]'
                            : date.hasAvailability
                              ? 'bg-[#fff9ef] border-[#8d7167] hover:bg-[#e7e2d9]'
                              : 'bg-[#f9f3ea] border-[#8d7167] text-gray-400'
                        }`}
                      >
                        <div className="font-mono text-xs uppercase tracking-widest">
                          {date.label}
                        </div>
                        <div className="mt-2 text-2xl font-bold">{date.dayNumber}</div>
                        <div className="mt-3 font-mono text-xs">
                          {date.hasAvailability ? 'Slots available' : 'Fully booked'}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col border-t lg:border-t-0 lg:border-l border-[#8d7167] pt-10 lg:pt-0 lg:pl-10">
                <div className="flex items-center justify-between mb-8 border-b border-[#8d7167] pb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-[#1d1b16]">Available Times</h2>
                  <span className="font-mono text-xs font-bold text-[#5f5e5e] uppercase">{activeDate?.label}</span>
                </div>

                <div className="mb-8">
                  <h3 className="font-mono text-sm font-bold text-[#5f5e5e] mb-4 uppercase tracking-widest flex items-center gap-2">
                    <SunMedium size={16} /> Morning
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {morningSlots.map((slot) => {
                      const isSelected = slot.isoStart === selectedSlotIso
                      return (
                        <button
                          key={slot.isoStart}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlotIso(slot.isoStart)}
                          className={`py-2 px-3 text-center border transition-colors ${
                            !slot.available
                              ? 'border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50'
                              : isSelected
                                ? 'border-2 border-[#a83a00] bg-[#ffdbce] text-[#802a00] font-bold shadow-[2px_2px_0px_#a83a00]'
                                : 'border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30'
                          }`}
                        >
                          <span className={`font-mono text-xs md:text-sm font-bold ${!slot.available ? 'line-through' : ''}`}>
                            {slot.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-sm font-bold text-[#5f5e5e] mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Sunset size={16} /> Afternoon
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {afternoonSlots.map((slot) => {
                      const isSelected = slot.isoStart === selectedSlotIso
                      return (
                        <button
                          key={slot.isoStart}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlotIso(slot.isoStart)}
                          className={`py-2 px-3 text-center border transition-colors ${
                            !slot.available
                              ? 'border-[#8d7167] text-gray-400 bg-[#f9f3ea] cursor-not-allowed opacity-50'
                              : isSelected
                                ? 'border-2 border-[#a83a00] bg-[#ffdbce] text-[#802a00] font-bold shadow-[2px_2px_0px_#a83a00]'
                                : 'border-[#8d7167] text-[#1d1b16] hover:border-[#a83a00] hover:text-[#a83a00] hover:bg-[#ffdbce]/30'
                          }`}
                        >
                          <span className={`font-mono text-xs md:text-sm font-bold ${!slot.available ? 'line-through' : ''}`}>
                            {slot.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {selectedSlot?.workerName ? (
                  <div className="mt-8 border border-[#8d7167] bg-[#f3ede4] p-4">
                    <p className="font-mono text-xs font-bold text-[#594139] uppercase tracking-widest">Auto Assignment</p>
                    <p className="mt-2 text-sm text-[#1d1b16]">
                      This time will be assigned to <span className="font-semibold">{selectedSlot.workerName}</span>.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#8d7167]">
              <div className="md:hidden w-full flex justify-between items-end mb-2 pb-2 border-b border-[#8d7167]">
                <span className="text-base text-[#594139]">Estimated Total</span>
                <span className="text-2xl font-bold text-[#1d1b16]">{formatKes(service.price)}</span>
              </div>

              <Link href="/book/service" className="w-full md:w-auto px-8 py-3 border border-[#8d7167] text-[#1d1b16] bg-[#fff9ef] hover:bg-[#e7e2d9] transition-colors font-mono text-sm font-bold text-center">
                Back to Services
              </Link>

              <Link
                href={continueHref}
                aria-disabled={!selectedSlot}
                className={`w-full md:w-auto px-8 py-3 border border-[#8d7167] font-mono text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                  selectedSlot
                    ? 'bg-[#a83a00] text-white hover:bg-[#802a00]'
                    : 'bg-[#e7e2d9] text-[#5f5e5e] pointer-events-none'
                }`}
              >
                Continue to Summary
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
