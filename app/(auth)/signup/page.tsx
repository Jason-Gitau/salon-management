'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import * as z from 'zod'

const registerSchema = z.object({
  role: z.enum(['client', 'worker']),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'client',
      fullName: '',
      email: '',
      password: '',
    },
  })

  const selectedRole = watch('role')

  async function onSubmit(values: RegisterFormValues) {
    setIsSubmitting(true)
    try {
      // REPLACE THIS with your actual Next.js API registration call:
      // const res = await fetch('/api/register', { method: 'POST', body: JSON.stringify(values) })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Account created successfully!')
      router.push('/login')
    } catch {
      toast.error('An error occurred during registration.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main
        className="min-h-screen flex items-center justify-center p-5 md:p-8 bg-[#ebe1d4] text-[#1d1b16]"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        <div className="w-full max-w-[480px] mx-auto bg-[#fff9ef] border border-[#5f5e5e] rounded-xl overflow-hidden shadow-sm p-8 md:p-10">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-[#a83a00] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GLAMOUR
            </h1>
            <h2 className="text-2xl font-medium text-[#1d1b16]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Create an account
            </h2>
            <p className="text-sm text-[#594139] mt-1">
              Start managing your salon experience today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-mono font-medium text-[#1d1b16] mb-3">I am a...</label>
              <div className="flex gap-4">

                {/* Client Card */}
                <label
                  onClick={() => setValue('role', 'client')}
                  className="flex-1 cursor-pointer select-none"
                >
                  <input type="radio" value="client" className="sr-only" {...register('role')} />
                  <div className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                    selectedRole === 'client'
                      ? 'bg-[#ff7033] border-[#a83a00] text-[#601d00] shadow-sm'
                      : 'bg-[#fff9ef] border-[#5f5e5e] text-[#594139] hover:bg-[#f3ede4]'
                  }`}>
                    <span className="material-symbols-outlined mb-1 text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>face</span>
                    <span className="text-sm font-mono font-medium">Client</span>
                  </div>
                </label>

                {/* Worker Card */}
                <label
                  onClick={() => setValue('role', 'worker')}
                  className="flex-1 cursor-pointer select-none"
                >
                  <input type="radio" value="worker" className="sr-only" {...register('role')} />
                  <div className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                    selectedRole === 'worker'
                      ? 'bg-[#ff7033] border-[#a83a00] text-[#601d00] shadow-sm'
                      : 'bg-[#fff9ef] border-[#5f5e5e] text-[#594139] hover:bg-[#f3ede4]'
                  }`}>
                    <span className="material-symbols-outlined mb-1 text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>content_cut</span>
                    <span className="text-sm font-mono font-medium">Worker</span>
                  </div>
                </label>

              </div>
              {errors.role && <p className="mt-1 text-xs font-mono text-red-600">{errors.role.message}</p>}
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-mono font-medium text-[#1d1b16]" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                className="w-full bg-[#fff9ef] border border-[#5f5e5e] rounded p-2.5 text-sm text-[#1d1b16] placeholder:text-[#5f5e5e]/50 focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] focus:outline-none transition-shadow"
                {...register('fullName')}
              />
              {errors.fullName && <p className="text-xs font-mono text-red-600">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-mono font-medium text-[#1d1b16]" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="jane@example.com"
                className="w-full bg-[#fff9ef] border border-[#5f5e5e] rounded p-2.5 text-sm text-[#1d1b16] placeholder:text-[#5f5e5e]/50 focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] focus:outline-none transition-shadow"
                {...register('email')}
              />
              {errors.email && <p className="text-xs font-mono text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-mono font-medium text-[#1d1b16]" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-[#fff9ef] border border-[#5f5e5e] rounded p-2.5 pr-10 text-sm text-[#1d1b16] placeholder:text-[#5f5e5e]/50 focus:border-[#a83a00] focus:ring-1 focus:ring-[#a83a00] focus:outline-none transition-shadow"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#5f5e5e] hover:text-[#a83a00]"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
              {errors.password && <p className="text-xs font-mono text-red-600">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#a83a00] border border-[#5f5e5e] text-white font-mono text-sm uppercase tracking-wider py-3 px-4 rounded hover:bg-[#802a00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>

          </form>

          <hr className="border-t border-[#5f5e5e]/20 my-5" />

          <p className="text-center text-sm text-[#594139]">
            Already have an account?{' '}
            <Link className="text-[#a83a00] font-mono text-xs font-semibold hover:underline underline-offset-4" href="/login">
              Log in
            </Link>
          </p>

        </div>
      </main>
    </>
  )
}
