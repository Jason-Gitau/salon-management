import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'

type PageProps = {
  searchParams: Promise<{
    orderId?: string
  }>
}

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default async function ProductCheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams
  const orderId = params.orderId

  if (!orderId) {
    redirect('/cart')
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    redirect('/cart')
  }

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#1d1b16] flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full border border-[#8d7167] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ede4] text-[#a83a00]">
          <CheckCircle2 size={34} />
        </div>
        <h1 className="text-3xl font-bold text-[#1d1b16]">Order Confirmed</h1>
        <p className="mt-3 text-[#594139]">
          The order is now confirmed and inventory has been reduced automatically.
        </p>

        <div className="mt-8 border border-[#8d7167] bg-[#f9f3ea] p-5 text-left">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#594139]">Summary</p>
          <p className="mt-3 font-semibold">{order.items.length} product types</p>
          <p className="mt-1 text-sm text-[#594139]">Status: {order.status.replace('_', ' ')}</p>
          <p className="mt-1 text-sm text-[#594139]">Total: {formatKes(Number(order.totalAmount))}</p>
          <p className="mt-3 font-mono text-xs text-[#5f5e5e]">Order ID: {order.id}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/#shop" className="w-full border border-[#8d7167] bg-[#a83a00] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#802a00]">
            Continue Shopping
          </Link>
          <Link href="/cart" className="w-full border border-[#8d7167] bg-[#fff9ef] px-4 py-3 text-sm font-medium text-[#1d1b16] transition-colors hover:bg-[#e7e2d9]">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
