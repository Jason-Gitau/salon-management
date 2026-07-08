'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'
import {
  buildGuestOrderEmail,
  clearProductCartCookie,
  clearProductOrderDraftCookie,
  computeCartTotals,
  getCartProducts,
  getProductOrderDraftCookie,
  isGuestOrderEmail,
  readProductCartCookie,
  setProductOrderDraftCookie,
  writeProductCartCookie,
} from '@/lib/product-cart'

const CLIENT_COOKIE_NAME = 'booking_client_id'

type ProductFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const createProductSchema = z.object({
  name: z.string().trim().min(2, 'Product name must be at least 2 characters.'),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive('Price must be greater than 0.'),
  stockCount: z.coerce.number().int().min(0, 'Stock count cannot be negative.'),
  imageUrl: z.string().trim().optional(),
})

const updateProductSchema = createProductSchema.extend({
  productId: z.string().min(1),
})

const deleteProductSchema = z.object({
  productId: z.string().min(1),
})

const addToCartSchema = z.object({
  productId: z.string().min(1),
})

const updateCartQuantitySchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(0),
})

const orderAccountSchema = z.object({
  orderId: z.string().min(1),
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters.'),
  email: z.email('Please enter a valid email address.'),
  phone: z.string().trim().min(6, 'Phone number is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

const orderPaymentSchema = z.object({
  orderId: z.string().min(1),
  phone: z.string().trim().min(6, 'Phone number is required.'),
})

async function requireOwnerSession() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'OWNER') {
    throw new Error('Unauthorized')
  }
}

function revalidateProductViews() {
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/cart')
}

async function getClientUserIdFromCookie() {
  const cookieStore = await import('next/headers').then((mod) => mod.cookies())
  return cookieStore.get(CLIENT_COOKIE_NAME)?.value ?? null
}

async function setClientCookie(userId: string) {
  const cookieStore = await import('next/headers').then((mod) => mod.cookies())
  cookieStore.set(CLIENT_COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

async function resolveOrderById(orderId: string) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      salon: true,
      client: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    throw new Error('Order not found.')
  }

  return order
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    await requireOwnerSession()

    const parsed = createProductSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description') || undefined,
      price: formData.get('price'),
      stockCount: formData.get('stockCount'),
      imageUrl: formData.get('imageUrl') || undefined,
    })

    if (!parsed.success) {
      return {
        status: 'error',
        message: parsed.error.issues[0]?.message ?? 'Invalid product details.',
      }
    }

    const salon = await ensurePrimarySalon()

    await prisma.product.create({
      data: {
        id: crypto.randomUUID(),
        salonId: salon.id,
        name: parsed.data.name,
        description: parsed.data.description || null,
        imageUrl: parsed.data.imageUrl || null,
        price: new Prisma.Decimal(parsed.data.price),
        stockCount: parsed.data.stockCount,
      },
    })

    revalidateProductViews()

    return {
      status: 'success',
      message: 'Product created.',
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unable to create product.',
    }
  }
}

export async function updateProductAction(formData: FormData) {
  await requireOwnerSession()

  const parsed = updateProductSchema.parse({
    productId: formData.get('productId'),
    name: formData.get('name'),
    description: formData.get('description') || undefined,
    price: formData.get('price'),
    stockCount: formData.get('stockCount'),
    imageUrl: formData.get('imageUrl') || undefined,
  })

  await prisma.product.update({
    where: {
      id: parsed.productId,
    },
    data: {
      name: parsed.name,
      description: parsed.description || null,
      imageUrl: parsed.imageUrl || null,
      price: new Prisma.Decimal(parsed.price),
      stockCount: parsed.stockCount,
    },
  })

  revalidateProductViews()
}

export async function deleteProductAction(formData: FormData) {
  await requireOwnerSession()

  const parsed = deleteProductSchema.parse({
    productId: formData.get('productId'),
  })

  await prisma.product.delete({
    where: {
      id: parsed.productId,
    },
  })

  revalidateProductViews()
}

export async function addProductToCartAction(formData: FormData) {
  const parsed = addToCartSchema.parse({
    productId: formData.get('productId'),
  })

  const product = await prisma.product.findUnique({
    where: {
      id: parsed.productId,
    },
  })

  if (!product || product.stockCount <= 0) {
    throw new Error('This product is out of stock.')
  }

  const items = await readProductCartCookie()
  const existingItem = items.find((item) => item.productId === product.id)
  const nextQuantity = Math.min((existingItem?.quantity ?? 0) + 1, product.stockCount)

  const updatedItems = existingItem
    ? items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: nextQuantity }
          : item
      )
    : [...items, { productId: product.id, quantity: 1 }]

  await writeProductCartCookie(updatedItems)

  redirect('/cart')
}

export async function updateCartItemQuantityAction(formData: FormData) {
  const parsed = updateCartQuantitySchema.parse({
    productId: formData.get('productId'),
    quantity: formData.get('quantity'),
  })

  const items = await readProductCartCookie()
  const product = await prisma.product.findUnique({
    where: {
      id: parsed.productId,
    },
  })

  const boundedQuantity = product
    ? Math.min(parsed.quantity, Math.max(product.stockCount, 0))
    : 0

  const updatedItems =
    boundedQuantity <= 0
      ? items.filter((item) => item.productId !== parsed.productId)
      : items.map((item) =>
          item.productId === parsed.productId
            ? { ...item, quantity: boundedQuantity }
            : item
        )

  await writeProductCartCookie(updatedItems)
  redirect('/cart')
}

export async function removeCartItemAction(formData: FormData) {
  const parsed = deleteProductSchema.parse({
    productId: formData.get('productId'),
  })

  const items = await readProductCartCookie()
  await writeProductCartCookie(items.filter((item) => item.productId !== parsed.productId))
  redirect('/cart')
}

export async function beginProductCheckoutAction() {
  const items = await getCartProducts()

  if (items.length === 0) {
    throw new Error('Your cart is empty.')
  }

  for (const item of items) {
    if (item.quantity > item.product.stockCount) {
      throw new Error(`${item.product.name} no longer has enough stock.`)
    }
  }

  const salon = await ensurePrimarySalon()
  const clientUserId = await getClientUserIdFromCookie()
  const existingDraftId = await getProductOrderDraftCookie()
  const client =
    clientUserId
      ? await prisma.user.findFirst({
          where: {
            id: clientUserId,
            salonId: salon.id,
          },
        })
      : null

  const attachedClient =
    client ??
    (await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: buildGuestOrderEmail(),
        password: crypto.randomUUID(),
        name: 'Guest Product Order',
        phone: '',
        role: 'CLIENT',
        salonId: salon.id,
        createdAt: new Date(),
      },
    }))

  const totals = computeCartTotals(items)
  let orderId = existingDraftId

  if (existingDraftId) {
    const existingOrder = await prisma.order.findFirst({
      where: {
        id: existingDraftId,
        status: {
          in: ['PENDING_ACCOUNT', 'PENDING_PAYMENT'],
        },
      },
      include: {
        client: true,
      },
    })

    if (!existingOrder) {
      orderId = null
    } else {
      await prisma.$transaction([
        prisma.orderItem.deleteMany({
          where: {
            orderId: existingOrder.id,
          },
        }),
        prisma.order.update({
          where: {
            id: existingOrder.id,
          },
          data: {
            clientId: attachedClient.id,
            status: client ? 'PENDING_PAYMENT' : 'PENDING_ACCOUNT',
            totalAmount: new Prisma.Decimal(totals.total),
          },
        }),
        ...items.map((item) =>
          prisma.orderItem.create({
            data: {
              id: crypto.randomUUID(),
              orderId: existingOrder.id,
              productId: item.product.id,
              quantity: item.quantity,
              unitPrice: new Prisma.Decimal(Number(item.product.price)),
            },
          })
        ),
      ])

      if (isGuestOrderEmail(existingOrder.client.email) && existingOrder.client.id !== attachedClient.id) {
        await prisma.user.delete({
          where: {
            id: existingOrder.client.id,
          },
        })
      }
    }
  }

  if (!orderId) {
    const order = await prisma.order.create({
      data: {
        id: crypto.randomUUID(),
        salonId: salon.id,
        clientId: attachedClient.id,
        status: client ? 'PENDING_PAYMENT' : 'PENDING_ACCOUNT',
        totalAmount: new Prisma.Decimal(totals.total),
        createdAt: new Date(),
        items: {
          create: items.map((item) => ({
            id: crypto.randomUUID(),
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: new Prisma.Decimal(Number(item.product.price)),
          })),
        },
      },
    })

    orderId = order.id
  }

  await setProductOrderDraftCookie(orderId)
  redirect(`/cart/checkout?orderId=${encodeURIComponent(orderId)}`)
}

export async function createClientAccountForProductOrderAction(formData: FormData) {
  const parsed = orderAccountSchema.safeParse({
    orderId: formData.get('orderId'),
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid client details.')
  }

  const order = await resolveOrderById(parsed.data.orderId)

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  })

  if (existingUser && existingUser.salonId !== order.salonId) {
    throw new Error('This email belongs to another salon account.')
  }

  const clientUser =
    existingUser ??
    (await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.fullName,
        phone: parsed.data.phone,
        role: 'CLIENT',
        salonId: order.salonId,
        createdAt: new Date(),
      },
    }))

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      clientId: clientUser.id,
      status: 'PENDING_PAYMENT',
    },
  })

  if (isGuestOrderEmail(order.client.email)) {
    await prisma.user.delete({
      where: {
        id: order.client.id,
      },
    })
  }

  await setClientCookie(clientUser.id)
  await setProductOrderDraftCookie(order.id)
  redirect(`/cart/checkout?orderId=${encodeURIComponent(order.id)}`)
}

export async function confirmProductOrderPaymentAction(formData: FormData) {
  const parsed = orderPaymentSchema.safeParse({
    orderId: formData.get('orderId'),
    phone: formData.get('phone'),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid payment details.')
  }

  const order = await resolveOrderById(parsed.data.orderId)

  if (isGuestOrderEmail(order.client.email)) {
    throw new Error('Create a client account before payment.')
  }

  await prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      const currentProduct = await tx.product.findUnique({
        where: {
          id: item.productId,
        },
      })

      if (!currentProduct || currentProduct.stockCount < item.quantity) {
        throw new Error(`${item.product.name} is no longer available in the requested quantity.`)
      }

      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stockCount: {
            decrement: item.quantity,
          },
        },
      })
    }

    await tx.user.update({
      where: {
        id: order.client.id,
      },
      data: {
        phone: parsed.data.phone,
      },
    })

    await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'CONFIRMED',
      },
    })
  })

  await clearProductCartCookie()
  await clearProductOrderDraftCookie()
  revalidateProductViews()
  redirect(`/cart/checkout/success?orderId=${encodeURIComponent(order.id)}`)
}
