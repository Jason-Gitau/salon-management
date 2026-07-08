import { prisma } from '@/lib/prisma'
import { ensurePrimarySalon } from '@/lib/salon'
import StaffManagementClient from './StaffManagementClient'

export default async function StaffManagementPage() {
  const salon = await ensurePrimarySalon()
  const workers = await prisma.user.findMany({
    where: {
      salonId: salon.id,
      role: 'WORKER',
    },
    include: {
      workerProfile: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return (
    <StaffManagementClient
      salonName={salon.name}
      workers={workers
        .filter((worker) => worker.workerProfile)
        .map((worker) => ({
          userId: worker.id,
          workerProfileId: worker.workerProfile!.id,
          name: worker.name,
          email: worker.email,
          phone: worker.phone,
          commissionPct: worker.workerProfile!.commissionPct,
          isAvailable: worker.workerProfile!.isAvailable,
        }))}
    />
  )
}
