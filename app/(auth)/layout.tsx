export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(77,52,32,0.18),_transparent_34%),linear-gradient(180deg,_#f4eee7_0%,_#fbf7f2_100%)] text-stone-950">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4 py-8 sm:px-8">
        <div className="w-full">{children}</div>
      </div>
    </main>
  )
}
