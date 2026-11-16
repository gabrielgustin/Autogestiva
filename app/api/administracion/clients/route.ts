import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin/admin-session'
import { CLIENT_COLUMNS, isDbConfigured, sql, toClient, toRow, type ClientRow } from '@/lib/admin/db'

export const dynamic = 'force-dynamic'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function guard() {
  if (!(await getAdminSession())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (!isDbConfigured()) return NextResponse.json({ error: 'La base de datos no está configurada' }, { status: 503 })
  return null
}

async function readJson(request: Request): Promise<Record<string, any>> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' ? body : {}
  } catch {
    return {}
  }
}

export async function GET() {
  const denied = await guard()
  if (denied) return denied
  try {
    const rows = await sql().query(`select ${CLIENT_COLUMNS} from clients order by orden asc nulls last, created_at desc`)
    return NextResponse.json((rows as ClientRow[]).map(toClient))
  } catch (error) {
    console.error('[admin] clients GET failed:', error)
    return NextResponse.json({ error: 'No se pudieron cargar los clientes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const denied = await guard()
  if (denied) return denied
  const parsed = toRow(await readJson(request))
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })
  // Los nombres de columna salen de toRow (fijos), nunca del pedido; los valores van como parámetros.
  const columns = Object.keys(parsed.row)
  try {
    const [row] = await sql().query(
      `insert into clients (${columns.join(', ')}, orden)
       values (${columns.map((_, i) => `$${i + 1}`).join(', ')}, (select coalesce(max(orden), 0) + 1 from clients))
       returning ${CLIENT_COLUMNS}`,
      Object.values(parsed.row),
    )
    return NextResponse.json(toClient(row as ClientRow), { status: 201 })
  } catch (error) {
    console.error('[admin] clients POST failed:', error)
    return NextResponse.json({ error: 'No se pudo crear el cliente' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const denied = await guard()
  if (denied) return denied
  const { row: id, ...fields } = await readJson(request)
  if (typeof id !== 'string' || !UUID_RE.test(id)) return NextResponse.json({ error: 'Cliente inválido' }, { status: 400 })
  const parsed = toRow(fields)
  if ('error' in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 })
  const columns = Object.keys(parsed.row)
  try {
    const [row] = await sql().query(
      `update clients set ${columns.map((column, i) => `${column} = $${i + 1}`).join(', ')}, updated_at = now()
       where id = $${columns.length + 1} returning ${CLIENT_COLUMNS}`,
      [...Object.values(parsed.row), id],
    )
    if (!row) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 })
    return NextResponse.json(toClient(row as ClientRow))
  } catch (error) {
    console.error('[admin] clients PUT failed:', error)
    return NextResponse.json({ error: 'No se pudo actualizar el cliente' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const denied = await guard()
  if (denied) return denied
  const { ids } = await readJson(request)
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' || !UUID_RE.test(id))) {
    return NextResponse.json({ error: 'Orden inválido' }, { status: 400 })
  }
  try {
    // Un solo update: cada id toma su posición en la lista.
    await sql().query(
      'update clients set orden = t.pos from unnest($1::uuid[]) with ordinality as t(id, pos) where clients.id = t.id',
      [ids],
    )
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin] clients PATCH failed:', error)
    return NextResponse.json({ error: 'No se pudo guardar el orden' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const denied = await guard()
  if (denied) return denied
  const { row: id } = await readJson(request)
  if (typeof id !== 'string' || !UUID_RE.test(id)) return NextResponse.json({ error: 'Cliente inválido' }, { status: 400 })
  try {
    await sql().query('delete from clients where id = $1', [id])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[admin] clients DELETE failed:', error)
    return NextResponse.json({ error: 'No se pudo eliminar el cliente' }, { status: 500 })
  }
}
