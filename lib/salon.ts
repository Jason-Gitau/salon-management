import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export const getPrimarySalon = cache(async () => {
  return prisma.salon.findUnique({
    where: {
      subdomain: 'main',
    },
  })
})

export const ensurePrimarySalon = cache(async () => {
  return prisma.salon.upsert({
    where: {
      subdomain: 'main',
    },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: 'Luxe Salon',
      subdomain: 'main',
      createdAt: new Date(),
    },
  })
})
