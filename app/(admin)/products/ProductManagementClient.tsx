'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from '@/app/actions/product-actions'

type ProductListItem = {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  stockCount: number
}

type ProductManagementClientProps = {
  salonName: string
  products: ProductListItem[]
}

const initialProductFormState = {
  status: 'idle' as const,
  message: '',
}

function formatKes(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(value)
}

export default function ProductManagementClient({
  salonName,
  products,
}: ProductManagementClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [state, formAction, pending] = useActionState(
    createProductAction,
    initialProductFormState
  )

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  })

  const activeCount = filteredProducts.filter((product) => product.stockCount > 0).length
  const lowStockCount = filteredProducts.filter((product) => product.stockCount > 0 && product.stockCount <= 5).length
  const totalStockValue = filteredProducts.reduce((sum, product) => sum + product.price * product.stockCount, 0)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Manrope:wght@200..800&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
          line-height: 1;
        }
        .active-nav-fill { font-variation-settings: 'FILL' 1; }
        .hairline-border { border: 1px solid rgba(29, 27, 22, 0.15); }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen overflow-x-hidden selection:bg-[#ffdbce]">
        <aside className="fixed left-0 top-0 h-full w-[80px] bg-[#fff9ef] border-r border-[#5f5e5e] flex flex-col items-center py-6 space-y-4 z-50">
          <div className="mb-8">
            <span className="material-symbols-outlined text-[#a83a00] text-3xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
          </div>

          <nav className="flex flex-col items-center space-y-4 w-full px-1">
            <Link href="/dashboard" className="group relative flex flex-col items-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] rounded transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Dashboard</span>
            </Link>
            <Link href="/service" className="group relative flex flex-col items-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] rounded transition-colors">
              <span className="material-symbols-outlined">content_cut</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Services</span>
            </Link>
            <Link href="/staff" className="group relative flex flex-col items-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] rounded transition-colors">
              <span className="material-symbols-outlined">group</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Staff</span>
            </Link>
            <Link href="/products" className="group relative flex flex-col items-center w-full py-2 bg-[#a83a00] text-white border-l-4 border-[#1d1b16] rounded">
              <span className="material-symbols-outlined active-nav-fill">inventory_2</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Products</span>
            </Link>
          </nav>
        </aside>

        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] border-b border-[#5f5e5e] flex justify-between items-center px-8 z-40">
          <div className="flex items-center gap-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">{salonName}</h1>
            <div className="hidden md:flex items-center hairline-border rounded-lg bg-[#f9f3ea] px-3 py-1 ml-6">
              <span className="material-symbols-outlined text-[#5f5e5e] mr-1 text-sm select-none">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent border-none focus:outline-none font-mono text-xs w-64 placeholder:text-[#5f5e5e]"
              />
            </div>
          </div>
        </header>

        <main className="ml-[80px] pt-16 min-h-screen">
          <div className="max-w-[1280px] mx-auto px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Product Inventory</h2>
                <p className="text-[#594139] text-base mt-1">Products are now loaded from the database for both admin inventory and client shopping.</p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateForm((value) => !value)}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#ff7033] text-[#601d00] border border-[#1d1b16] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-95 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>{showCreateForm ? 'Close Form' : 'Add New Product'}</span>
              </button>
            </div>

            {showCreateForm ? (
              <section className="mb-8 border border-[#5f5e5e] bg-white p-6">
                <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase text-[#594139]">Product Name</span>
                    <input name="name" required className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase text-[#594139]">Price (KES)</span>
                    <input name="price" type="number" min="1" step="0.01" required className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase text-[#594139]">Stock Count</span>
                    <input name="stockCount" type="number" min="0" required className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase text-[#594139]">Image URL</span>
                    <input name="imageUrl" className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <label className="md:col-span-2 flex flex-col gap-2">
                    <span className="font-mono text-xs uppercase text-[#594139]">Description</span>
                    <textarea name="description" rows={3} className="border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                  </label>
                  <button type="submit" disabled={pending} className="h-[42px] px-4 bg-[#1f1b13] text-[#ebe1d4] font-mono text-xs font-medium hover:bg-[#a83a00] hover:text-white transition-colors disabled:opacity-60">
                    {pending ? 'Saving...' : 'Save Product'}
                  </button>
                </form>
                {state.message ? (
                  <p className={`mt-4 text-sm ${state.status === 'error' ? 'text-[#ba1a1a]' : 'text-[#1d1b16]'}`}>
                    {state.message}
                  </p>
                ) : null}
              </section>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <div className="bg-[#f3ede4] p-6 border border-[#1d1b16] shadow-sm">
                <p className="font-mono text-xs font-medium text-[#5f5e5e] uppercase tracking-wider">Total Stock Value</p>
                <p className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">{formatKes(totalStockValue)}</p>
              </div>
              <div className="bg-[#f9f3ea] p-6 border border-[#1d1b16] shadow-sm">
                <p className="font-mono text-xs font-medium text-[#5f5e5e] uppercase tracking-wider">Active Items</p>
                <p className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">{activeCount}</p>
              </div>
              <div className="bg-[#ffdbce] p-6 border border-[#1d1b16] shadow-sm">
                <p className="font-mono text-xs font-medium text-[#802a00] uppercase tracking-wider">Low Stock Alerts</p>
                <p className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#802a00] mt-2">{lowStockCount} Items</p>
              </div>
            </div>

            <div className="bento-grid">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stockCount <= 0
                const isEditing = editingProductId === product.id

                return (
                  <div
                    key={product.id}
                    className={`bg-white border border-[#1d1b16] flex flex-col group overflow-hidden shadow-sm transition-all duration-300 ${
                      isOutOfStock ? 'opacity-75' : 'hover:-translate-y-1 hover:border-[#a83a00]'
                    }`}
                  >
                    <div className="h-48 overflow-hidden bg-[#e7e2d9] relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'grayscale' : ''}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#5f5e5e] font-mono text-xs">
                          No product image
                        </div>
                      )}

                      {isOutOfStock ? (
                        <div className="absolute inset-0 bg-[#1d1b16]/20 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-[#1d1b16] text-white font-mono text-xs font-bold px-3 py-1 tracking-widest uppercase">
                            Out of Stock
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      {isEditing ? (
                        <form action={updateProductAction} className="space-y-3">
                          <input type="hidden" name="productId" value={product.id} />
                          <input name="name" defaultValue={product.name} required className="w-full border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                          <textarea name="description" defaultValue={product.description} rows={3} className="w-full border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                          <input name="imageUrl" defaultValue={product.imageUrl} placeholder="Image URL" className="w-full border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                          <div className="grid grid-cols-2 gap-3">
                            <input name="price" type="number" min="1" step="0.01" defaultValue={product.price} className="w-full border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                            <input name="stockCount" type="number" min="0" defaultValue={product.stockCount} className="w-full border border-[#5f5e5e] bg-[#fff9ef] px-3 py-2 text-sm focus:outline-none" />
                          </div>
                          <div className="flex gap-3">
                            <button type="submit" className="flex-1 py-2 text-center border border-[#5f5e5e] font-mono text-xs font-medium bg-[#a83a00] text-white hover:bg-[#802a00] transition-colors">
                              Save
                            </button>
                            <button type="button" onClick={() => setEditingProductId(null)} className="flex-1 py-2 text-center border border-[#5f5e5e] font-mono text-xs font-medium hover:bg-[#f3ede4] transition-colors">
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div>
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16] leading-snug">
                                {product.name}
                              </h3>
                              <span className="font-mono text-sm text-[#a83a00] font-bold shrink-0">{formatKes(product.price)}</span>
                            </div>
                            <p className="text-[#594139] text-sm mb-4 min-h-10">
                              {product.description || 'No description yet.'}
                            </p>
                            <p className="text-[#594139] font-mono text-xs mb-4">
                              {product.stockCount} units in stock
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-[#5f5e5e]/15 mt-auto">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setEditingProductId(product.id)}
                                className="material-symbols-outlined text-[#5f5e5e] hover:text-[#a83a00] transition-colors text-[20px]"
                                title="Edit"
                              >
                                edit
                              </button>

                              <form
                                action={deleteProductAction}
                                onSubmit={(event) => {
                                  if (!window.confirm(`Delete "${product.name}" from inventory?`)) {
                                    event.preventDefault()
                                  }
                                }}
                              >
                                <input type="hidden" name="productId" value={product.id} />
                                <button
                                  type="submit"
                                  className="material-symbols-outlined text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors text-[20px]"
                                  title="Delete"
                                >
                                  delete
                                </button>
                              </form>
                            </div>

                            <div className="text-right">
                              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isOutOfStock ? 'text-[#ba1a1a]' : 'text-[#5f5e5e]'}`}>
                                {isOutOfStock ? 'Out Of Stock' : product.stockCount <= 5 ? 'Low Stock' : 'In Stock'}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
