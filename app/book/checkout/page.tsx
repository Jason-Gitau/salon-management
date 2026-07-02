import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, Info, WalletCards } from 'lucide-react'
import { authOptions } from '@/lib/auth'

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/book/checkout')
  }

  return (
    <div className="min-h-screen bg-[#fff9ef] text-[#1d1b16]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[#a83a00]">GLAMOUR</h1>
          <p className="mt-2 text-base text-[#5f5e5e]">Secure your booking with a 30% deposit.</p>
        </header>

        <div className="relative overflow-hidden rounded-lg border border-[#8d7167] bg-white shadow-sm">
          <div className="absolute inset-0 -z-10 bg-[#f3ede4]" />
          <div className="absolute inset-[1px] -z-10 rounded-lg bg-[#fff9ef]" />

          <div className="border-b border-[#8d7167]/20 px-6 py-6 text-center">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#594139]">
              Deposit Amount
            </p>
            <p className="text-5xl font-semibold text-[#1d1b16]">KES 1,500</p>
            <p className="mt-1 text-xs text-[#5f5e5e]">30% of total KES 5,000</p>
          </div>

          <form className="space-y-6 px-6 py-6">
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
                  placeholder="712 345 678"
                  className="w-full rounded border border-[#8d7167] bg-white px-12 py-3 text-sm outline-none transition-colors focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded border border-[#8d7167] bg-[#a83a00] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#ff7033] active:scale-95"
            >
              <WalletCards size={20} />
              Pay via M-Pesa
            </button>
          </form>

          <div className="m-6 flex items-start gap-3 rounded border border-[#8d7167]/10 bg-[#f3ede4] p-4">
            <Info size={24} className="shrink-0 text-[#a83a00]" />
            <p className="text-sm text-[#594139]">
              You will receive an STK Push on your phone shortly. Enter your M-Pesa PIN to
              complete the payment securely.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5f5e5e] transition-colors hover:text-[#a83a00]"
          >
            <ArrowLeft size={16} />
            Cancel Booking
          </Link>
        </div>
      </div>
    </div>
  )
}
