'use client'

import { signOut } from 'next-auth/react'

type WorkerSignOutButtonProps = {
  className: string
  title?: string
  label?: string
}

export default function WorkerSignOutButton({
  className,
  title = 'Logout',
  label,
}: WorkerSignOutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className={className}
      title={title}
    >
      <span className="material-symbols-outlined">logout</span>
      {label ? <span className="font-mono text-[12px] mt-1 font-medium">{label}</span> : null}
    </button>
  )
}
