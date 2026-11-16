import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/require-admin'
import { CLIENT_COLUMNS, isDbConfigured, sql, toClient, type ClientRow } from '@/lib/admin/db'
import { COLUMNS, COLUMN_LABELS } from '@/lib/admin/clients-shared'

export const dynamic = 'force-dynamic'

// Quotes a CSV field and neutralizes spreadsheet formulas (=, +, -, @) that could execute when the file is opened.
function csvField(value: string) {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replace(/"/g, '""')}"`
}

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied
  if (!isDbConfigured()) return NextResponse.json({ error: 'La base de datos no está configurada' }, { status: 503 })

  let rows: ReturnType<typeof toClient>[]
  try {
    const data = await sql().query(`select ${CLIENT_COLUMNS} from clients order by orden asc nulls last, created_at desc`)
    rows = (data as ClientRow[]).map(toClient)
  } catch (error) {
    console.error('[admin] clients export failed:', error)
    return NextResponse.json({ error: 'No se pudo generar el respaldo' }, { status: 500 })
  }
  const lines = [COLUMNS.map((column) => csvField(COLUMN_LABELS[column])).join(',')]
  for (const row of rows) lines.push(COLUMNS.map((column) => csvField(String(row[column] ?? ''))).join(','))

  const today = new Date().toISOString().slice(0, 10)
  // The BOM lets Excel open the accents correctly.
  return new NextResponse(`﻿${lines.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="clientes-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
