import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_SECRET } from './auth-secret'
import type { Role, WorkerProfile } from './auth-types'
import { prisma } from './prisma'

type AuthUser = {
  id: string
  email: string
  name: string
  phone: string
  role: Role
  salonName: string
  workerProfile: WorkerProfile | null
}

const PLACEHOLDER_ACCOUNTS = [
  {
    email: 'admin@salon.local',
    password: 'admin1234',
    role: 'OWNER' as const,
    id: 'admin-placeholder',
    name: 'Admin User',
  },
] as const

function toWorkerProfile(profile: {
  id: string
  userId: string
  commissionPct: number
  isAvailable: boolean
} | null): WorkerProfile | null {
  if (!profile) {
    return null
  }

  return {
    id: profile.id,
    userId: profile.userId,
    commissionPct: profile.commissionPct,
    isAvailable: profile.isAvailable,
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const normalizedEmail = credentials.email.toLowerCase().trim()

        const account = PLACEHOLDER_ACCOUNTS.find(
          (entry) =>
            entry.email.toLowerCase() === normalizedEmail &&
            entry.password === credentials.password
        )

        if (account?.role === 'OWNER') {
          return {
            id: account.id,
            email: account.email,
            name: account.name,
            phone: '',
            role: account.role,
            salonName: 'Luxe Salon',
            workerProfile: null,
          } satisfies AuthUser
        }

        const workerUser = await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
          include: {
            salon: true,
            workerProfile: true,
          },
        })

        if (
          !workerUser ||
          workerUser.role !== 'WORKER' ||
          workerUser.password !== credentials.password ||
          !workerUser.workerProfile
        ) {
          return null
        }

        return {
          id: workerUser.id,
          email: workerUser.email,
          name: workerUser.name,
          phone: workerUser.phone,
          role: 'WORKER',
          salonName: workerUser.salon.name,
          workerProfile: toWorkerProfile(workerUser.workerProfile),
        } satisfies AuthUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser
        token.id = authUser.id
        token.role = authUser.role
        token.salonName = authUser.salonName
        token.phone = authUser.phone
        token.workerProfile = authUser.workerProfile
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.salonName = token.salonName as string
        session.user.phone = token.phone as string
        session.user.workerProfile = token.workerProfile as WorkerProfile | null
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: AUTH_SECRET,
}
