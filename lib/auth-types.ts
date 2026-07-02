export type Role = 'OWNER' | 'WORKER' | 'CLIENT'

export type WorkerProfile = {
  id: string
  userId: string
  commissionPct: number
  isAvailable: boolean
}
