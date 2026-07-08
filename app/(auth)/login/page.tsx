'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import * as z from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true)
    try {
      const callbackUrl =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('callbackUrl')
          : null
      const normalizedEmail = values.email.toLowerCase().trim()
      const target = callbackUrl ?? (normalizedEmail === 'admin@salon.local' ? '/dashboard' : '/schedule')

      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: target,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Use the admin demo account or a worker account created from the staff page')
        return
      }

      toast.success('Login successful')
      router.push(result?.url ?? target)
    } catch {
      toast.error('An error occurred during login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style jsx global>{`
        ::selection {
          background: #a83a00;
          color: #fff9ef;
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <main className="min-h-screen bg-[#fff9ef] p-4 sm:p-6 text-[#1d1b16] font-['Manrope',sans-serif] selection:bg-[#a83a00] selection:text-white">
        <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl grid-cols-1 overflow-hidden border border-[#1d1b16] bg-[#fff9ef] shadow-[8px_8px_0px_#1d1b16] sm:min-h-[calc(100vh-3rem)] lg:grid-cols-12">
          <section className="relative border-b border-[#1d1b16] bg-[#f3ede4] px-6 py-8 sm:px-10 sm:py-10 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d1b1608_1px,transparent_1px),linear-gradient(to_bottom,#1d1b1608_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[28px] text-[#a83a00]">
                    spa
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5f5e5e]">
                      Luxe Salon Portal
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a83a00]">
                      Access terminal
                    </p>
                  </div>
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#5f5e5e] transition-colors hover:text-[#1d1b16]"
                >
                  <span>Home</span>
                  <span className="material-symbols-outlined text-[14px]">west</span>
                </Link>
              </div>

              <div className="max-w-md">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#a83a00]">
                  [ 01 - AUTHORIZED ENTRY ]
                </p>
                <h1 className="mt-4 font-['Space_Grotesk',sans-serif] text-5xl font-semibold tracking-tight text-[#1d1b16] sm:text-6xl">
                  Sign in
                  <span className="block italic font-medium text-[#5f5e5e]">
                    to the portal
                  </span>
                </h1>
                <p className="mt-5 max-w-sm text-base leading-7 text-[#5f5e5e]">
                  Admin still uses the demo credentials. Workers now sign in with the
                  email and password assigned when their account was created from the staff page.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="border border-[#1d1b16] bg-[#fff9ef] p-4 shadow-sm">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                      Admin
                    </p>
                    <p className="mt-2 font-semibold text-[#1d1b16]">admin@salon.local</p>
                    <p className="font-mono text-xs text-[#5f5e5e]">admin1234</p>
                  </div>
                  <div className="border border-[#1d1b16] bg-[#fff9ef] p-4 shadow-sm">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                      Worker
                    </p>
                    <p className="mt-2 font-semibold text-[#1d1b16]">Use assigned credentials</p>
                    <p className="font-mono text-xs text-[#5f5e5e]">Created from Staff page</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1d1b16]/15 pt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#5f5e5e]">
                <div className="flex items-center justify-between gap-4">
                  <span>Sys v4.02</span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#a83a00] animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center bg-[#fff9ef] px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:px-12">
            <div className="w-full max-w-xl">
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#1d1b16] pb-5">
                <div>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-3xl font-semibold tracking-tight text-[#1d1b16] sm:text-4xl">
                    Authenticate
                  </h2>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#5f5e5e]">
                    Email and password only
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 border border-[#1d1b16] bg-[#f9f3ea] px-3 py-2">
                  <span className="material-symbols-outlined text-[18px] text-[#a83a00]">
                    lock
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#5f5e5e]">
                    Mixed demo auth
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1d1b16]"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@salon.local"
                    className="w-full border border-[#1d1b16] bg-[#f9f3ea] px-4 py-3.5 text-sm text-[#1d1b16] placeholder:text-[#5f5e5e]/60 outline-none transition-colors focus:border-[#a83a00] focus:bg-[#fff9ef] focus:ring-1 focus:ring-[#a83a00]"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="pt-1 font-mono text-[11px] text-[#a83a00]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <label
                      className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1d1b16]"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                      Session handoff
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••••"
                      className="w-full border border-[#1d1b16] bg-[#f9f3ea] py-3.5 pl-4 pr-12 text-sm text-[#1d1b16] placeholder:text-[#5f5e5e]/60 outline-none transition-colors focus:border-[#a83a00] focus:bg-[#fff9ef] focus:ring-1 focus:ring-[#a83a00]"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#5f5e5e] transition-colors hover:text-[#1d1b16]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="pt-1 font-mono text-[11px] text-[#a83a00]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <label className="inline-flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-none border-[#1d1b16] text-[#a83a00] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-mono text-xs text-[#5f5e5e]">
                      Keep session active
                    </span>
                  </label>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                    No verification
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 border border-[#1d1b16] bg-[#a83a00] px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#fff9ef] shadow-[4px_4px_0px_#1d1b16] transition-all hover:bg-[#802a00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1d1b16] disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">
                        progress_activity
                      </span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Authorize Access
                      <span className="material-symbols-outlined text-[16px]">
                        east
                      </span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-[#1d1b16]/15 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#5f5e5e]">
                  Current routing
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="border border-[#1d1b16] bg-[#f3ede4] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                      Admin target
                    </p>
                    <p className="mt-2 font-semibold text-[#1d1b16]">/dashboard</p>
                  </div>
                  <div className="border border-[#1d1b16] bg-[#f3ede4] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#5f5e5e]">
                      Worker target
                    </p>
                    <p className="mt-2 font-semibold text-[#1d1b16]">/schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
