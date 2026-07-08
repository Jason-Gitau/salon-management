'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'

type ServiceFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const createServiceSchema = z.object({
  name: z.string().trim().min(2, 'Service name must be at least 2 characters.'),
  duration: z.coerce.number().int().positive('Duration must be greater than 0.'),
  price: z.coerce.number().positive('Price must be greater than 0.'),
})

const deleteServiceSchema = z.object({
  serviceId: z.string().min(1),
})

async function requireOwnerSession() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'OWNER') {
    throw new Error('Unauthorized')
  }

  return session
}

function revalidateServiceViews() {
  revalidatePath('/service')
  revalidatePath('/book/service')
}

export async function createServiceAction(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  try {
    await requireOwnerSession()

    const parsed = createServiceSchema.safeParse({
      name: formData.get('name'),
      duration: formData.get('duration'),
      price: formData.get('price'),
    })

    if (!parsed.success) {
      return {
        status: 'error',
        message: parsed.error.issues[0]?.message ?? 'Invalid service details.',
      }
    }

    const salon = await ensurePrimarySalon()

    await prisma.service.create({
      data: {
        id: crypto.randomUUID(),
        salonId: salon.id,
        name: parsed.data.name,
        duration: parsed.data.duration,
        price: new Prisma.Decimal(parsed.data.price),
      },
    })

    revalidateServiceViews()

    return {
      status: 'success',
      message: 'Service created.',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to create service.',
    }
  }
}

export async function deleteServiceAction(formData: FormData) {
  await requireOwnerSession()

  const parsed = deleteServiceSchema.parse({
    serviceId: formData.get('serviceId'),
  })

  await prisma.service.delete({
    where: {
      id: parsed.serviceId,
    },
  })

  revalidateServiceViews()
}
