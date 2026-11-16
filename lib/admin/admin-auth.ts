import bcrypt from 'bcryptjs'
import { isDbConfigured, sql } from '@/lib/admin/db'

// Hash de relleno: si el email no existe igual se compara, así el tiempo de respuesta no delata qué emails están dados de alta.
const DUMMY_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8.Gl0XcP5ZxdSMIw6hnGWT6d8sFP0a'

// Checks the credentials against public.admin_users (bcrypt hashes migrated from Supabase Auth).
// Returns the admin's id, or null when the credentials are wrong.
export async function verifyAdminCredentials(email: string, password: string) {
  if (!email.trim() || !password) return null
  if (!isDbConfigured()) throw new Error('La base de datos no está configurada')

  const [admin] = (await sql().query('select id, password_hash from admin_users where email = $1', [email.trim().toLowerCase()])) as {
    id: string
    password_hash: string
  }[]
  const ok = await bcrypt.compare(password, admin?.password_hash ?? DUMMY_HASH)
  return admin && ok ? admin.id : null
}
