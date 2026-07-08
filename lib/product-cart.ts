import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const PRODUCT_CART_COOKIE_NAME = 'product_cart'
export const PRODUCT_ORDER_DRAFT_COOKIE_NAME = 'product_order_draft_id'
export const GUEST_ORDER_EMAIL_PREFIX = 'guest-order-'

export type ProductCartCookieItem = {
  productId: string
  quantity: number
}

export async function readProductCartCookie(): Promise<ProductCartCookieItem[]> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(PRODUCT_CART_COOKIE_NAME)?.value

  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((item) => {
        if (
          !item ||
          typeof item !== 'object' ||
          typeof item.productId !== 'string' ||
          typeof item.quantity !== 'number'
        ) {
          return null
        }

        return {
          productId: item.productId,
          quantity: Math.max(0, Math.floor(item.quantity)),
        }
      })
      .filter((item): item is ProductCartCookieItem => item !== null && item.quantity > 0)
  } catch {
    return []
  }
}

export async function writeProductCartCookie(items: ProductCartCookieItem[]) {
  const cookieStore = await cookies()
  cookieStore.set(PRODUCT_CART_COOKIE_NAME, JSON.stringify(items), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
}

export async function clearProductCartCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(PRODUCT_CART_COOKIE_NAME)
}

export async function setProductOrderDraftCookie(orderId: string) {
  const cookieStore = await cookies()
  cookieStore.set(PRODUCT_ORDER_DRAFT_COOKIE_NAME, orderId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function getProductOrderDraftCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(PRODUCT_ORDER_DRAFT_COOKIE_NAME)?.value ?? null
}

export async function clearProductOrderDraftCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(PRODUCT_ORDER_DRAFT_COOKIE_NAME)
}

export async function getCartProducts() {
  const items = await readProductCartCookie()

  if (items.length === 0) {
    return []
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },
    },
  })

  const productMap = new Map(products.map((product) => [product.id, product]))

  return items
    .map((item) => {
      const product = productMap.get(item.productId)

      if (!product) {
        return null
      }

      return {
        product,
        quantity: item.quantity,
      }
    })
    .filter((item): item is { product: (typeof products)[number]; quantity: number } => Boolean(item))
}

export function computeCartTotals(
  items: Array<{
    product: {
      price: { toString(): string } | number
    }
    quantity: number
  }>
) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
  const estimatedTax = subtotal * 0.08
  const shipping = subtotal > 0 ? 5 : 0
  const total = subtotal + estimatedTax + shipping

  return {
    subtotal,
    estimatedTax,
    shipping,
    total,
  }
}

export function buildGuestOrderEmail() {
  return `${GUEST_ORDER_EMAIL_PREFIX}${crypto.randomUUID()}@salon.local`
}

export function isGuestOrderEmail(email: string) {
  return email.startsWith(GUEST_ORDER_EMAIL_PREFIX)
}
