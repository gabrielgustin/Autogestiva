import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin/admin-session'
import InfrastructureDashboard from '@/components/admin/infrastructure-dashboard'
import { SessionGuard } from '@/components/admin/session-guard'

export const metadata = { title: 'Panel Administrador' }

export default async function HomePage() {
  if (!(await getAdminSession())) redirect('/administracion/login')
  return (
    <>
      <SessionGuard />
      <InfrastructureDashboard />
    </>
  )
}
