import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'
import ServiceManagementClient from './ServiceManagementClient'

export default async function ServiceManagementPage() {
  const salon = await ensurePrimarySalon()
  const services = await prisma.service.findMany({
    where: {
      salonId: salon.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <ServiceManagementClient
      salonName={salon.name}
      services={services.map((service) => ({
        id: service.id,
        name: service.name,
        duration: service.duration,
        price: Number(service.price),
      }))}
    />
  )
}
