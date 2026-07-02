import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { prisma } from './prisma'
import { redirect } from 'next/navigation'

async function getCurrentUserRecord(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      salon: true,
      workerProfile: true,
    },
  })
}

type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUserRecord>>>

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession()
  if (!session?.user?.id) return null

  return await getCurrentUserRecord(session.user.id)
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

export async function requireRole(role: 'OWNER' | 'WORKER' | 'CLIENT') {
  const user = await requireAuth()
  if (user.role !== role) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'OWNER') redirect('/dashboard')
    if (user.role === 'WORKER') redirect('/schedule')
    redirect('/')
  }
  return user
}

export function getSalonId(user: { salonId?: string | null } | null | undefined) {
  if (!user?.salonId) {
    throw new Error('User has no salonId')
  }
  return user.salonId
}
