import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_SECRET } from './auth-secret'
import type { Role, WorkerProfile } from './auth-types'

type AuthUser = {
  id: string
  email: string
  name: string
  phone: string
  role: Role
  salonId: string
  salonName: string
  salonSubdomain: string
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
  {
    email: 'worker@salon.local',
    password: 'worker1234',
    role: 'WORKER' as const,
    id: 'worker-placeholder',
    name: 'Worker User',
  },
] as const

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

        const account = PLACEHOLDER_ACCOUNTS.find(
          (entry) =>
            entry.email.toLowerCase() === credentials.email.toLowerCase().trim() &&
            entry.password === credentials.password
        )

        if (!account) {
          return null
        }

        return {
          id: account.id,
          email: account.email,
          name: account.name,
          phone: '',
          role: account.role,
          salonId: 'placeholder-salon',
          salonName: 'Luxe Salon',
          salonSubdomain: 'luxe',
          workerProfile: null,
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
        token.salonId = authUser.salonId
        token.salonName = authUser.salonName
        token.salonSubdomain = authUser.salonSubdomain
        token.phone = authUser.phone
        token.workerProfile = authUser.workerProfile
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.salonId = token.salonId as string
        session.user.salonName = token.salonName as string
        session.user.salonSubdomain = token.salonSubdomain as string
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
