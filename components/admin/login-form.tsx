'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock } from 'lucide-react'
import { TAB_MARKER } from '@/components/admin/session-guard'

const inputClass =
  'h-11 w-full rounded-lg border border-adm-brand-foreground/15 bg-adm-brand-foreground/10 px-3 text-sm text-adm-brand-foreground outline-none placeholder:text-adm-brand-foreground/40 focus:border-adm-orange'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/administracion/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'No se pudo iniciar sesión')
      sessionStorage.setItem(TAB_MARKER, '1')
      router.push('/administracion')
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <a
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-adm-brand-foreground/65 transition-colors hover:text-adm-brand-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver
      </a>
      <form onSubmit={submit} className="w-full rounded-2xl border border-adm-brand-foreground/15 bg-adm-brand p-6 shadow-2xl">
      <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-adm-orange text-adm-orange-foreground">
        <Lock className="size-5" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-black tracking-tight">Acceso administrador</h1>
      <p className="mt-2 text-sm text-adm-brand-foreground/65">Ingresá para ver y editar tu cartera de clientes.</p>
      <div className="mt-6 grid gap-4">
        <label className="text-xs font-semibold text-adm-brand-foreground/65">
          Email
          <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-2`} />
        </label>
        <label className="text-xs font-semibold text-adm-brand-foreground/65">
          Contraseña
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mt-2`} />
        </label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      <button disabled={loading} className="mt-6 h-11 w-full rounded-full bg-adm-orange text-sm font-bold text-adm-orange-foreground disabled:opacity-60">
        {loading ? 'Ingresando…' : 'Ingresar'}
      </button>
      </form>
    </div>
  )
}
