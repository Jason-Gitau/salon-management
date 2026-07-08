import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'

type PageProps = {
  searchParams: Promise<{
    bookingId?: string
  }>
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams
  const bookingId = params.bookingId

  if (!bookingId) {
    redirect('/book/service')
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      service: true,
      worker: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!booking) {
    redirect('/book/service')
  }

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#1d1b16] flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full border border-[#8d7167] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ede4] text-[#a83a00]">
          <CheckCircle2 size={34} />
        </div>
        <h1 className="text-3xl font-bold text-[#1d1b16]">Booking Created</h1>
        <p className="mt-3 text-[#594139]">
          The booking was saved earlier in the flow. This step has now confirmed the booking and marked the deposit as paid for the demo.
        </p>

        <div className="mt-8 border border-[#8d7167] bg-[#f9f3ea] p-5 text-left">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#594139]">Summary</p>
          <p className="mt-3 font-semibold">{booking.service.name}</p>
          <p className="mt-1 text-sm text-[#594139]">{formatDateTime(booking.startTime)}</p>
          <p className="mt-1 text-sm text-[#594139]">Assigned worker: {booking.worker.user.name}</p>
          <p className="mt-1 text-sm text-[#594139]">Status: {booking.status.replace('_', ' ')}</p>
          <p className="mt-3 font-mono text-xs text-[#5f5e5e]">Booking ID: {booking.id}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/book/service"
            className="w-full border border-[#8d7167] bg-[#a83a00] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#802a00]"
          >
            Book Another Appointment
          </Link>
          <Link
            href="/profile"
            className="w-full border border-[#8d7167] bg-[#fff9ef] px-4 py-3 text-sm font-medium text-[#1d1b16] transition-colors hover:bg-[#e7e2d9]"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
