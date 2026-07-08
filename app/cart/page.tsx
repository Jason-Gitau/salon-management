import Link from 'next/link'
import {
  beginProductCheckoutAction,
  removeCartItemAction,
  updateCartItemQuantityAction,
} from '@/app/actions/product-actions'
import { computeCartTotals, getCartProducts } from '@/lib/product-cart'

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default async function CartPage() {
  const cartItems = await getCartProducts()
  const totals = computeCartTotals(cartItems)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen flex flex-col antialiased selection:bg-[#ff7033] selection:text-[#601d00]">
        <header className="hidden md:flex justify-between items-center px-8 py-4 w-full bg-[#f9f3ea] border-b border-[#5f5e5e] sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-['Space_Grotesk',sans-serif] text-2xl font-bold text-[#a83a00]">
              Luxe Salon Portal
            </Link>
          </div>

          <nav className="flex gap-8 font-mono text-sm font-medium">
            <Link href="/" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Home</Link>
            <Link href="/#services" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Services</Link>
            <Link href="/#shop" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">Shop</Link>
            <Link href="/#contact" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">Contact</Link>
          </nav>
        </header>

        <main className="flex-grow max-w-[1280px] mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10 w-full pb-28 md:pb-12">
          <section className="flex-grow flex flex-col gap-6">
            <div>
              <h1 className="font-['Space_Grotesk',sans-serif] text-3xl md:text-5xl font-bold text-[#1d1b16] mb-1">
                Your Cart
              </h1>
              <p className="text-[#5f5e5e] text-base">
                You have {cartCount} items in your cart.
              </p>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#5f5e5e]/40 rounded-lg bg-[#f9f3ea]">
                <p className="font-mono text-sm text-[#5f5e5e] mb-4">Your shopping bag is completely empty.</p>
                <Link href="/#shop" className="px-6 py-2.5 bg-[#a83a00] text-white font-mono text-xs uppercase tracking-widest font-bold">
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-[#5f5e5e] rounded-lg shadow-sm">
                    <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0 border border-[#5f5e5e] bg-[#f3ede4]">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover contrast-125" />
                      ) : null}
                    </div>

                    <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                      <div>
                        <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16]">
                          {product.name}
                        </h3>
                        <p className="text-[#5f5e5e] font-mono text-xs mt-0.5">{product.description || 'Premium salon retail product'}</p>
                        <p className="text-[#5f5e5e] font-mono text-xs mt-0.5">{product.stockCount} units available</p>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center border border-[#5f5e5e] rounded overflow-hidden h-8 bg-[#fff9ef] select-none">
                          <form action={updateCartItemQuantityAction}>
                            <input type="hidden" name="productId" value={product.id} />
                            <input type="hidden" name="quantity" value={Math.max(quantity - 1, 0)} />
                            <button type="submit" className="px-2.5 hover:bg-[#e7e2d9] transition-colors text-[#5f5e5e] active:bg-[#dfd9d1]">
                              <span className="material-symbols-outlined text-[16px]">remove</span>
                            </button>
                          </form>
                          <span className="px-3 font-mono text-xs font-bold border-x border-[#5f5e5e] h-full flex items-center bg-[#f9f3ea]">
                            {quantity}
                          </span>
                          <form action={updateCartItemQuantityAction}>
                            <input type="hidden" name="productId" value={product.id} />
                            <input type="hidden" name="quantity" value={quantity + 1} />
                            <button type="submit" className="px-2.5 hover:bg-[#e7e2d9] transition-colors text-[#5f5e5e] active:bg-[#dfd9d1]">
                              <span className="material-symbols-outlined text-[16px]">add</span>
                            </button>
                          </form>
                        </div>

                        <div className="font-mono text-sm font-bold text-[#1d1b16] w-28 text-right">
                          {formatKes(Number(product.price) * quantity)}
                        </div>

                        <form action={removeCartItemAction}>
                          <input type="hidden" name="productId" value={product.id} />
                          <button type="submit" className="text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors p-1" title="Remove item">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-2">
              <Link href="/#shop" className="inline-flex items-center gap-1.5 text-[#a83a00] font-mono text-xs font-bold uppercase tracking-wider hover:underline">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </section>

          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#e7e2d9] border border-[#5f5e5e] rounded-lg p-6 sticky top-24 shadow-sm">
              <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-medium text-[#1d1b16] mb-6 border-b border-[#5f5e5e]/30 pb-3">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-6 font-mono text-xs">
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Subtotal</span>
                  <span className="font-bold font-mono">{formatKes(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Estimated Tax (8%)</span>
                  <span className="font-bold font-mono">{formatKes(totals.estimatedTax)}</span>
                </div>
                <div className="flex justify-between text-base font-sans">
                  <span className="text-[#594139]">Shipping</span>
                  <span className="font-bold font-mono">{formatKes(totals.shipping)}</span>
                </div>
              </div>

              <div className="border-t border-[#5f5e5e] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-['Space_Grotesk',sans-serif] text-xl font-medium">Total</span>
                  <span className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#a83a00]">
                    {formatKes(totals.total)}
                  </span>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <form action={beginProductCheckoutAction}>
                  <button
                    type="submit"
                    className="w-full bg-[#ff7033] text-[#601d00] border border-[#1d1b16] rounded-lg py-3.5 font-['Space_Grotesk',sans-serif] text-lg font-bold tracking-wide hover:bg-[#a83a00] hover:text-white transition-all shadow-[2px_2px_0px_#1d1b16] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#ff7033] text-[#601d00] border border-[#1d1b16] rounded-lg py-3.5 font-['Space_Grotesk',sans-serif] text-lg font-bold tracking-wide flex items-center justify-center gap-2 opacity-50 pointer-events-none"
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
      </div>
    </>
  )
}
