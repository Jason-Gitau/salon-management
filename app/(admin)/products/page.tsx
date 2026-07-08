import ProductManagementClient from '@/app/(admin)/products/ProductManagementClient'
import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'

export default async function ProductManagementPage() {
  const salon = await ensurePrimarySalon()
  const products = await prisma.product.findMany({
    where: {
      salonId: salon.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <ProductManagementClient
      salonName={salon.name}
      products={products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description ?? '',
        imageUrl: product.imageUrl ?? '',
        price: Number(product.price),
        stockCount: product.stockCount,
      }))}
    />
  )
}
