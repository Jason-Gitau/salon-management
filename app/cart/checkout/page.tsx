import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, Info, ShoppingBag, UserRoundPlus } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { computeCartTotals, isGuestOrderEmail } from '@/lib/product-cart'
import {
  confirmProductOrderPaymentAction,
  createClientAccountForProductOrderAction,
} from '@/app/actions/product-actions'

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

export default async function ProductCheckoutPage({ searchParams }: PageProps) {
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
      client: true,
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

  const checkoutUser = isGuestOrderEmail(order.client.email) ? null : order.client
  const totals = computeCartTotals(
    order.items.map((item) => ({
      product: {
        price: Number(item.unitPrice),
      },
      quantity: item.quantity,
    }))
  )

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#1d1b16]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[#a83a00]">GLAMOUR</h1>
          <p className="mt-2 text-base text-[#5f5e5e]">
            {checkoutUser ? 'Finish paying for your saved product order.' : 'Create your client account to continue to product payment.'}
          </p>
        </header>

        <div className="relative overflow-hidden rounded-lg border border-[#8d7167] bg-white shadow-sm">
          <div className="absolute inset-0 -z-10 bg-[#f3ede4]" />
          <div className="absolute inset-[1px] -z-10 rounded-lg bg-[#fff9ef]" />

          <div className="border-b border-[#8d7167]/20 px-6 py-6 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#594139]">
              {checkoutUser ? 'Order Total' : 'Saved Cart'}
            </p>
            <p className="text-3xl font-semibold text-[#1d1b16]">{order.items.length} Product Types</p>
            <p className="mt-1 text-xs text-[#5f5e5e]">
              Order #{order.id.slice(0, 8)}
            </p>
            <p className="mt-4 text-5xl font-semibold text-[#1d1b16]">{formatKes(totals.total)}</p>
            <p className="mt-1 text-xs text-[#5f5e5e]">Includes tax and shipping</p>
          </div>

          <div className="px-6 py-5 border-b border-[#8d7167]/20">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#594139] mb-3">Order Items</p>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#1d1b16]">{item.product.name}</p>
                    <p className="text-xs text-[#5f5e5e]">Qty {item.quantity}</p>
                  </div>
                  <p className="font-mono text-sm">{formatKes(Number(item.unitPrice) * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          {checkoutUser ? (
            <form action={confirmProductOrderPaymentAction} className="space-y-6 px-6 py-6">
              <input type="hidden" name="orderId" value={order.id} />

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#1d1b16]">
                  Safaricom Phone Number
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-medium text-[#5f5e5e]">
                    +254
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    defaultValue={checkoutUser.phone.replace(/^\+?254/, '')}
                    placeholder="712 345 678"
                    className="w-full rounded border border-[#8d7167] bg-white px-12 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded border border-[#8d7167] bg-[#a83a00] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#ff7033] active:scale-95"
              >
                <ShoppingBag size={20} />
                Pay for Order
              </button>
            </form>
          ) : (
            <form action={createClientAccountForProductOrderAction} className="space-y-4 px-6 py-6">
              <input type="hidden" name="orderId" value={order.id} />

              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#1d1b16]">
                  Full Name
                </label>
                <input id="fullName" name="fullName" type="text" required className="w-full rounded border border-[#8d7167] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]" />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1d1b16]">
                  Email Address
                </label>
                <input id="email" name="email" type="email" required className="w-full rounded border border-[#8d7167] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]" />
              </div>

              <div>
                <label htmlFor="clientPhone" className="mb-2 block text-sm font-medium text-[#1d1b16]">
                  Phone Number
                </label>
                <input id="clientPhone" name="phone" type="tel" required className="w-full rounded border border-[#8d7167] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]" />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#1d1b16]">
                  Password
                </label>
                <input id="password" name="password" type="text" required className="w-full rounded border border-[#8d7167] bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]" />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded border border-[#8d7167] bg-[#a83a00] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#ff7033] active:scale-95"
              >
                <UserRoundPlus size={20} />
                Create Client Account
              </button>
            </form>
          )}

          <div className="m-6 flex items-start gap-3 rounded border border-[#8d7167]/10 bg-[#f3ede4] p-4">
            <Info size={24} className="shrink-0 text-[#a83a00]" />
            <p className="text-sm text-[#594139]">
              {checkoutUser
                ? 'For this demo, payment confirms the saved order and deducts stock from inventory immediately.'
                : 'For this demo, the order row is already saved before account creation. This step only attaches the real client account.'}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-[#5f5e5e] transition-colors hover:text-[#a83a00]">
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
