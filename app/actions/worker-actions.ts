'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'

type WorkerFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const createWorkerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().trim().min(6, 'Phone number is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  commissionPct: z.coerce.number().min(0, 'Commission cannot be negative.').max(100, 'Commission cannot exceed 100%.'),
  isAvailable: z.union([z.literal('true'), z.literal('false')]),
})

const deleteWorkerSchema = z.object({
  userId: z.string().min(1),
})

async function requireOwnerSession() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'OWNER') {
    throw new Error('Unauthorized')
  }
}

function revalidateWorkerViews() {
  revalidatePath('/staff')
}

export async function createWorkerAction(
  _prevState: WorkerFormState,
  formData: FormData
): Promise<WorkerFormState> {
  try {
    await requireOwnerSession()

    const parsed = createWorkerSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      commissionPct: formData.get('commissionPct'),
      isAvailable: formData.get('isAvailable'),
    })

    if (!parsed.success) {
      return {
        status: 'error',
        message: parsed.error.issues[0]?.message ?? 'Invalid worker details.',
      }
    }

    const salon = await ensurePrimarySalon()

    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
    })

    if (existingUser) {
      return {
        status: 'error',
        message: 'A user with that email already exists.',
      }
    }

    const userId = crypto.randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.name,
        phone: parsed.data.phone,
        role: 'WORKER',
        salonId: salon.id,
        createdAt: new Date(),
        workerProfile: {
          create: {
            id: crypto.randomUUID(),
            commissionPct: parsed.data.commissionPct,
            isAvailable: parsed.data.isAvailable === 'true',
          },
        },
      },
    })

    revalidateWorkerViews()

    return {
      status: 'success',
      message: 'Worker account created.',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to create worker.',
    }
  }
}

export async function deleteWorkerAction(formData: FormData) {
  await requireOwnerSession()

  const parsed = deleteWorkerSchema.parse({
    userId: formData.get('userId'),
  })

  await prisma.user.delete({
    where: {
      id: parsed.userId,
    },
  })

  revalidateWorkerViews()
}
