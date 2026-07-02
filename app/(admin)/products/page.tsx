'use client'

import { useState } from 'react'
import Link from 'next/link'

// Types for our React Inventory State
interface Product {
  id: string
  name: string
  sku: string
  category: 'Retail' | 'Professional'
  price: string
  size: string
  stock: number
  inStock: boolean
  image: string
}

const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Nourishing Shampoo',
    sku: 'NS-250-01',
    category: 'Retail',
    price: '$32.00',
    size: '250ml',
    stock: 18,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'prod-2',
    name: 'Organic Hair Oil',
    sku: 'OH-100-05',
    category: 'Professional',
    price: '$45.00',
    size: '100ml',
    stock: 4,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1608248597359-0e6d509b69e7?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'prod-3',
    name: 'Repair Mask',
    sku: 'RM-500-02',
    category: 'Retail',
    price: '$28.00',
    size: '500ml',
    stock: 0,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'prod-4',
    name: 'Sea Salt Spray',
    sku: 'SS-200-08',
    category: 'Retail',
    price: '$24.00',
    size: '200ml',
    stock: 12,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1626926866847-b8c19951167b?auto=format&fit=crop&q=80&w=600',
  },
]

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Handler: Toggle Stock Status
  const handleToggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = !item.inStock
          return {
            ...item,
            inStock: nextStatus,
            stock: nextStatus && item.stock === 0 ? 10 : nextStatus ? item.stock : 0,
          }
        }
        return item
      })
    )
  }

  // Handler: Delete Product
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from inventory?`)) {
      setProducts((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // Handler: Edit Product (Modal trigger placeholder)
  const handleEdit = (name: string) => {
    alert(`Trigger Edit Modal for: ${name}`)
  }

  // Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Derived Summary Metrics
  const activeCount = products.filter((p) => p.inStock).length
  const lowStockCount = products.filter((p) => p.inStock && p.stock <= 5).length

  return (
    <>
      {/* Auto-injected Fonts & Material Symbols */}
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
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>

      <div className="bg-[#fff9ef] text-[#1d1b16] font-['Manrope',sans-serif] min-h-screen overflow-x-hidden selection:bg-[#ffdbce]">
        
        {/* SIDE NAVIGATION BAR */}
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
            {/* ACTIVE TAB */}
            <Link href="/products" className="group relative flex flex-col items-center w-full py-2 bg-[#a83a00] text-white border-l-4 border-[#1d1b16] rounded">
              <span className="material-symbols-outlined active-nav-fill">inventory_2</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Products</span>
            </Link>
          </nav>

          <div className="mt-auto w-full flex flex-col items-center space-y-4 px-1">
            <Link href="/settings" className="group relative flex flex-col items-center w-full py-2 text-[#5f5e5e] hover:bg-[#ff7033] hover:text-[#601d00] rounded transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-mono text-[11px] mt-1 font-medium">Settings</span>
            </Link>
          </div>
        </aside>

        {/* TOP APP BAR */}
        <header className="fixed top-0 right-0 w-[calc(100%-80px)] h-16 bg-[#fff9ef] border-b border-[#5f5e5e] flex justify-between items-center px-8 z-40">
          <div className="flex items-center gap-4">
            <h1 className="font-['Space_Grotesk',sans-serif] text-xl font-bold text-[#a83a00]">Luxe Salon Portal</h1>
            
            <div className="hidden md:flex items-center hairline-border rounded-lg bg-[#f9f3ea] px-3 py-1 ml-6 focus-within:border-[#ff7033]">
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

          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#594139] hover:text-[#a83a00] transition-transform active:scale-90">notifications</button>
            <div className="flex items-center gap-2 pl-4 border-l border-[#8d7167]/20">
              <span className="hidden lg:block font-mono text-xs text-[#594139]">Profile</span>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" 
                alt="Admin" 
                className="w-8 h-8 rounded-full bg-cover bg-center hairline-border object-cover" 
              />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="ml-[80px] pt-16 min-h-screen">
          <div className="max-w-[1280px] mx-auto px-8 py-10">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-4xl font-bold text-[#1d1b16]">Product Inventory</h2>
                <p className="text-[#594139] text-base mt-1">Manage your retail storefront and professional back-bar supplies.</p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Mode Toggle Buttons */}
                <div className="flex border border-[#1d1b16] bg-[#fff9ef] rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#1d1b16] text-[#fff9ef]' : 'text-[#5f5e5e] hover:text-[#1d1b16]'}`}
                    title="Grid View"
                  >
                    <span className="material-symbols-outlined text-sm">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-[#1d1b16] text-[#fff9ef]' : 'text-[#5f5e5e] hover:text-[#1d1b16]'}`}
                    title="Table View"
                  >
                    <span className="material-symbols-outlined text-sm">view_list</span>
                  </button>
                </div>

                <button 
                  onClick={() => alert('Open Add Product Modal')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ff7033] text-[#601d00] border border-[#1d1b16] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-95 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Stats Overview (Asymmetric Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <div className="bg-[#f3ede4] p-6 border border-[#1d1b16] shadow-sm">
                <p className="font-mono text-xs font-medium text-[#5f5e5e] uppercase tracking-wider">Total Stock Value</p>
                <p className="font-['Space_Grotesk',sans-serif] text-3xl font-bold text-[#1d1b16] mt-2">$14,820.50</p>
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

            {/* RENDER: GRID VIEW */}
            {viewMode === 'grid' && (
              <div className="bento-grid">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`bg-white border border-[#1d1b16] flex flex-col group overflow-hidden shadow-sm transition-all duration-300 ${
                      !product.inStock ? 'opacity-75' : 'hover:-translate-y-1 hover:border-[#a83a00]'
                    }`}
                  >
                    <div className="h-48 overflow-hidden bg-[#e7e2d9] relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? 'grayscale' : ''}`}
                      />
                      
                      <div className="absolute top-2 right-2">
                        <span className="bg-[#fff9ef] px-2 py-0.5 border border-[#1d1b16] font-mono text-xs font-semibold">
                          {product.category}
                        </span>
                      </div>

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-[#1d1b16]/20 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-[#1d1b16] text-white font-mono text-xs font-bold px-3 py-1 tracking-widest uppercase">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1 gap-2">
                          <h3 className="font-['Space_Grotesk',sans-serif] text-xl font-medium text-[#1d1b16] leading-snug">
                            {product.name}
                          </h3>
                          <span className="font-mono text-sm text-[#a83a00] font-bold shrink-0">{product.price}</span>
                        </div>
                        <p className="text-[#594139] font-mono text-xs mb-4">
                          {product.size} • {product.stock} units in stock
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#5f5e5e]/15 mt-auto">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleEdit(product.name)}
                            className="material-symbols-outlined text-[#5f5e5e] hover:text-[#a83a00] transition-colors text-[20px]" 
                            title="Edit"
                          >
                            edit
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id, product.name)}
                            className="material-symbols-outlined text-[#5f5e5e] hover:text-[#ba1a1a] transition-colors text-[20px]" 
                            title="Delete"
                          >
                            delete
                          </button>
                        </div>

                        {/* Interactive Pill Switch */}
                        <div className="flex items-center gap-2 select-none">
                          <span className="font-mono text-xs text-[#5f5e5e]">In Stock</span>
                          <button 
                            type="button"
                            onClick={() => handleToggleStock(product.id)}
                            className={`w-10 h-5 rounded-full relative transition-colors border border-[#1d1b16]/30 ${
                              product.inStock ? 'bg-[#ff7033]' : 'bg-[#e2dfde]'
                            }`}
                          >
                            <div className={`absolute top-[1px] w-4 h-4 bg-white rounded-full transition-all shadow-sm ${
                              product.inStock ? 'right-[1px]' : 'left-[1px]'
                            }`} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RENDER: TABLE VIEW */}
            {viewMode === 'table' && (
              <div className="overflow-hidden border border-[#1d1b16] bg-white shadow-sm">
                <table className="w-full text-left font-['Manrope',sans-serif] border-collapse">
                  <thead>
                    <tr className="bg-[#ede7de] border-b border-[#1d1b16]">
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Product Name</th>
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">SKU</th>
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Category</th>
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider">Stock</th>
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider text-right">Price</th>
                      <th className="p-4 font-mono text-xs font-bold text-[#5f5e5e] uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#5f5e5e]/15">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#ff7033]/10 transition-colors">
                        <td className="p-4 font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#1d1b16]">
                          {product.name}
                        </td>
                        <td className="p-4 font-mono text-xs text-[#5f5e5e]">{product.sku}</td>
                        <td className="p-4 font-mono text-xs text-[#594139]">
                          <span className="bg-[#f9f3ea] px-2 py-1 border border-[#8d7167]/30 rounded">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs font-semibold">
                          <span className={product.stock === 0 ? 'text-[#ba1a1a] font-bold' : ''}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="p-4 font-mono text-sm font-bold text-[#a83a00] text-right">{product.price}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={() => handleEdit(product.name)}
                              className="material-symbols-outlined text-[#5f5e5e] hover:text-[#a83a00] text-[20px]"
                            >
                              edit
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id, product.name)}
                              className="material-symbols-outlined text-[#5f5e5e] hover:text-[#ba1a1a] text-[20px]"
                            >
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  )
}
