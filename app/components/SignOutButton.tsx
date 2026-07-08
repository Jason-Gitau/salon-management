'use client'

import { signOut } from 'next-auth/react'

type SignOutButtonProps = {
  className: string
  title?: string
  label?: string
}

export default function SignOutButton({
  className,
  title = 'Logout',
  label,
}: SignOutButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className={className}
      title={title}
    >
      <span className="material-symbols-outlined">logout</span>
      {label ? <span>{label}</span> : null}
    </button>
  )
}
