import { redirect } from 'next/navigation'
import { ClientsDashboard } from '@/components/admin/clients-dashboard'
import { SessionGuard } from '@/components/admin/session-guard'
import { getAdminSession } from '@/lib/admin/admin-session'

export const metadata = { title: 'Clientes' }

export default async function ClientsPage() {
  if (!(await getAdminSession())) redirect('/administracion/login')
  return (
    <>
      <SessionGuard />
      <ClientsDashboard />
    </>
  )
}
