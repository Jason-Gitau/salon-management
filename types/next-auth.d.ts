import 'next-auth'
import type { Role, WorkerProfile } from '@/lib/auth-types'

declare module 'next-auth' {
  interface User {
    id: string
    role: Role
    salonName: string
    phone: string
    workerProfile?: WorkerProfile | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      salonName: string
      phone: string
      workerProfile?: WorkerProfile | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    salonName: string
    phone: string
    workerProfile?: WorkerProfile | null
  }
}
