'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types for our React State
interface CartItem {
  id: string
  name: string
  description: string
  unitPrice: number
  quantity: number
  image: string
}

const initialCart: CartItem[] = [
  {
    id: 'c1',
    name: 'Nourishing Shampoo',
    description: '250ml • Argan Oil Blend',
    unitPrice: 32.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'c2',
    name: 'Organic Hair Oil',
    description: '50ml • Rosehip & Jojoba',
    unitPrice: 48.00, // $96 total for 2 units
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1608248597359-0e6d509b69e7?auto=format&fit=crop&q=80&w=300',
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart)
  const [promoCode, setPromoCode] = useState('')

  // Cart Handlers
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + delta
          return nextQty > 0 ? { ...item, quantity: nextQty } : item
        }
        return item
      })
    )
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode) alert(`Validating Promo Code: ${promoCode}`)
  }

  // Financial Math Engine
  const subtotal = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
  const taxRate = 0.08 // 8% tax
  const estimatedTax = subtotal * taxRate
  const shipping = subtotal > 0 ? 5.00 : 0.00
  const total = subtotal + estimatedTax + shipping

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen flex flex-col antialiased selection:bg-[#ff7033] selection:text-[#601d00]">
        
        {/* DESKTOP TOP APP BAR */}
        <header className="hidden md:flex justify-between items-center px-8 py-4 w-full bg-[#f9f3ea] border-b border-[#5f5e5e] sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00]">
              Luxe Salon Portal
            </Link>
          </div>
          
          <nav className="flex gap-8 font-mono text-sm font-medium">
            <Link href="/" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Home</Link>
            <Link href="/services" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Services</Link>
            <Link href="/shop" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Shop</Link>
            <Link href="/contact" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border border-[#5f5e5e] overflow-hidden bg-[#e7e2d9]">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10 w-full pb-28 md:pb-12">
          
          {/* CART ITEMS SECTION */}
          <section className="flex-grow flex flex-col gap-6">
            <div>
              <h1 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-bold text-[#1d1b16] mb-1">
                Your Cart
              </h1>
              <p className="text-[#5f5e5e] text-base">
                You have {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items in your cart.
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#5f5e5e]/40 rounded-lg bg-[#f9f3ea]">
                <p className="font-mono text-sm text-[#5f5e5e] mb-4">Your shopping bag is completely empty.</p>
                <Link href="/" className="px-6 py-2.5 bg-[#a83a00] text-white font-mono text-xs uppercase tracking-widest font-bold">
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-[#5f5e5e] rounded-lg shadow-sm">
                    
                    <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0 border border-[#5f5e5e] bg-[#f3ede4]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover contrast-125" />
                    </div>

                    <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                      <div>
                        <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16]">
                          {item.name}
                        </h3>
                        <p className="text-[#5f5e5e] font-mono text-xs mt-0.5">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        
                        {/* Quantity Nudge Control */}
                        <div className="flex items-center border border-[#5f5e5e] rounded overflow-hidden h-8 bg-[#fff9ef] select-none">
                          <button 
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="px-2.5 hover:bg-[#e7e2d9] transition-colors text-[#5f5e5e] active:bg-[#dfd9d1]"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="px-3 font-mono text-xs font-bold border-x border-[#5f5e5e] h-full flex items-center bg-[#f9f3ea]">
                            {item.quantity}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="px-2.5 hover:bg-[#e7e2d9] transition-colors text-[#5f5e5e] active:bg-[#dfd9d1]"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>

                        <div className="font-mono text-sm font-bold text-[#1d1b16] w-20 text-right">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </div>

                        <button 
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>

                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            <div className="mt-2">
              <Link href="/" className="inline-flex items-center gap-1.5 text-[#a83a00] font-mono text-xs font-bold uppercase tracking-wider hover:underline">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </section>

          {/* ORDER SUMMARY SIDEBAR */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#e7e2d9] border border-[#5f5e5e] rounded-lg p-6 sticky top-24 shadow-sm">
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16] mb-6 border-b border-[#5f5e5e]/30 pb-3">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-6 font-mono text-xs">
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Subtotal</span>
                  <span className="font-bold font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Estimated Tax (8%)</span>
                  <span className="font-bold font-mono">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Shipping</span>
                  <span className="font-bold font-mono">${shipping.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <label className="block font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider mb-1.5" htmlFor="promo">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input 
                    id="promo" 
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code" 
                    className="flex-grow bg-white border border-[#5f5e5e] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] uppercase font-mono" 
                  />
                  <button type="submit" className="px-4 py-2 border border-[#5f5e5e] rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#dfd9d1] transition-colors bg-[#fff9ef]">
                    Apply
                  </button>
                </div>
              </form>

              <div className="border-t border-[#5f5e5e] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Total</span>
                  <span className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#a83a00]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <Link
                  href="/book/checkout"
                  className="w-full bg-[#ff7033] text-[#601d00] border border-[#1d1b16] rounded-lg py-3.5 font-['Space_Grotesk',sans-serif] text-lg font-bold tracking-wide hover:bg-[#a83a00] hover:text-white transition-all shadow-[2px_2px_0px_#1d1b16] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#ff7033] text-[#601d00] border border-[#1d1b16] rounded-lg py-3.5 font-['Space_Grotesk',sans-serif] text-lg font-bold tracking-wide hover:bg-[#a83a00] hover:text-white transition-all shadow-[2px_2px_0px_#1d1b16] flex items-center justify-center gap-2 opacity-50 pointer-events-none"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              )}

              <div className="mt-4 text-center flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-1 text-[#594139]">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Secure Checkout</span>
                </div>
                <span className="font-mono text-[11px] text-[#5f5e5e]">M-Pesa Express payment accepted</span>
              </div>

            </div>
          </aside>

        </main>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2.5 bg-[#fff9ef] border-t border-[#5f5e5e] rounded-t-xl z-50 shadow-lg">
          <Link href="/services" className="flex flex-col items-center justify-center text-[#5f5e5e] p-1.5 hover:bg-[#e7e2d9] rounded">
            <span className="material-symbols-outlined">spa</span>
            <span className="font-mono text-[10px] mt-1 font-medium">Services</span>
          </Link>
          <Link href="/shop" className="flex flex-col items-center justify-center text-[#5f5e5e] p-1.5 hover:bg-[#e7e2d9] rounded">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-mono text-[10px] mt-1 font-medium">Store</span>
          </Link>
          <Link href="/bookings" className="flex flex-col items-center justify-center text-[#5f5e5e] p-1.5 hover:bg-[#e7e2d9] rounded">
            <span className="material-symbols-outlined">event_available</span>
            <span className="font-mono text-[10px] mt-1 font-medium">Bookings</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center justify-center bg-[#ff7033] text-[#601d00] rounded-lg p-2 shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
            <span className="font-mono text-[10px] mt-1 font-bold">Cart ({cartItems.length})</span>
          </Link>
        </nav>

      </div>
    </>
  )
}
