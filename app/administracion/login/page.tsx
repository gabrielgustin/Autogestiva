import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'
import { getAdminSession } from '@/lib/admin/admin-session'

export const metadata = { title: 'Acceso administrador' }

export default async function LoginPage() {
  if (await getAdminSession()) redirect('/administracion/clientes')
  return (
    <main
      className="flex min-h-screen items-start justify-center bg-adm-brand px-3 py-8 text-adm-brand-foreground sm:items-center sm:p-6"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)', backgroundSize: '42px 42px' }}
    >
      <LoginForm />
    </main>
  )
}
