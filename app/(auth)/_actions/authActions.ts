'use server'

import { hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const createSalonSchema = z.object({
  salonName: z.string().trim().min(2).max(100),
  subdomain: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
  ownerName: z.string().trim().min(2).max(100),
  ownerEmail: z.string().trim().email(),
  ownerPhone: z.string().trim().min(10).regex(/^[0-9]+$/, 'Phone number should only contain digits'),
  ownerPassword: z.string().min(8),
})

export type CreateSalonActionResult =
  | {
      success: true
      message: string
      subdomain: string
    }
  | {
      success: false
      error: string
    }

export async function createSalonAndOwner(formData: FormData): Promise<CreateSalonActionResult> {
  try {
    const rawData = {
      salonName: formData.get('salonName'),
      subdomain: formData.get('subdomain'),
      ownerName: formData.get('ownerName'),
      ownerEmail: formData.get('ownerEmail'),
      ownerPhone: formData.get('ownerPhone'),
      ownerPassword: formData.get('ownerPassword'),
    }

    const parsed = createSalonSchema.safeParse(rawData)

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? 'Please review the form and try again.',
      }
    }

    const validated = parsed.data

    const [existingSalon, existingUser] = await Promise.all([
      prisma.salon.findUnique({
        where: { subdomain: validated.subdomain },
        select: { id: true },
      }),
      prisma.user.findUnique({
        where: { email: validated.ownerEmail },
        select: { id: true },
      }),
    ])

    if (existingSalon) {
      return {
        success: false,
        error: 'This subdomain is already taken. Please choose another.',
      }
    }

    if (existingUser) {
      return {
        success: false,
        error: 'This email is already registered. Please login instead.',
      }
    }

    const hashedPassword = await hash(validated.ownerPassword, 10)

    const salon = await prisma.salon.create({
      data: {
        name: validated.salonName,
        subdomain: validated.subdomain,
        users: {
          create: {
            email: validated.ownerEmail,
            password: hashedPassword,
            name: validated.ownerName,
            phone: validated.ownerPhone,
            role: 'OWNER',
          },
        },
      },
      include: {
        users: true,
      },
    })

    revalidatePath('/')

    return {
      success: true,
      message: 'Salon created successfully. Please log in with your new owner account.',
      subdomain: salon.subdomain,
    }
  } catch (error) {
    console.error('Failed to create salon and owner:', error)

    return {
      success: false,
      error: 'Failed to create salon. Please try again.',
    }
  }
}
