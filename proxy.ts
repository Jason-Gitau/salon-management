import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { AUTH_SECRET } from './lib/auth-secret'
import type { Role } from './lib/auth-types'

const protectedRoutes = ['/dashboard', '/activities', '/service', '/staff', '/products', '/schedule', '/earnings', '/profile', '/worker-profile']

function getRoleHome(role: Role | undefined) {
  if (role === 'OWNER') return '/dashboard'
  if (role === 'WORKER') return '/schedule'
  return '/'
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request, secret: AUTH_SECRET })
  const role = token?.role as Role | undefined

  const onProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (!token && onProtectedRoute) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (token && ['/dashboard', '/activities', '/service', '/staff', '/products'].some((route) => pathname === route || pathname.startsWith(`${route}/`)) && role !== 'OWNER') {
    return NextResponse.redirect(new URL(getRoleHome(role), request.url))
  }

  if (token && ['/schedule', '/earnings', '/worker-profile'].some((route) => pathname === route || pathname.startsWith(`${route}/`)) && role !== 'WORKER') {
    return NextResponse.redirect(new URL(getRoleHome(role), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/signup', '/dashboard/:path*', '/activities/:path*', '/service/:path*', '/staff/:path*', '/products/:path*', '/schedule/:path*', '/earnings/:path*', '/profile/:path*', '/worker-profile/:path*'],
}
