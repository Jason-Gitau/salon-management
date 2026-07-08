import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function requireWorkerPortalContext() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'WORKER') {
    redirect('/login')
  }

  const workerUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      salon: true,
      workerProfile: true,
    },
  })

  if (!workerUser || workerUser.role !== 'WORKER' || !workerUser.workerProfile) {
    redirect('/login')
  }

  return {
    sessionUser: session.user,
    workerUser,
    workerProfile: workerUser.workerProfile,
    salon: workerUser.salon,
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDurationMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes} min`
  }

  if (minutes === 0) {
    return `${hours} hr${hours === 1 ? '' : 's'}`
  }

  return `${hours}.${Math.round((minutes / 60) * 100)
    .toString()
    .padStart(2, '0')} hrs`
}

export function getWorkerInitials(name: string) {
  const parts = name
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)

  return parts.map((part) => part[0]?.toUpperCase() ?? '').join('') || 'W'
}
