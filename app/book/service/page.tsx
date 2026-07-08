import { prisma } from '@/lib/prisma'
import { getPrimarySalon } from '@/lib/salon'
import ServiceSelectionClient from './ServiceSelectionClient'

export default async function BookServicePage() {
  const salon = await getPrimarySalon()
  const services = await prisma.service.findMany({
    where: salon
      ? {
          salonId: salon.id,
        }
      : undefined,
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <ServiceSelectionClient
      salonName={salon?.name ?? 'Luxe Salon'}
      services={services.map((service) => ({
        id: service.id,
        name: service.name,
        duration: service.duration,
        price: Number(service.price),
      }))}
    />
  )
}
