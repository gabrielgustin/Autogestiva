# Panel de administración (`/administracion`)

Vive en este mismo proyecto y se publica en `https://www.autogestiva.com.ar/administracion`.
Antes era el repo `paneladmin-autogestiva` (dominio aparte).

- **Clientes** (`/administracion/clientes`): alta, edición, orden, búsqueda, exportación a CSV y alertas de vencimientos.
- **Infraestructura** (`/administracion`): costos, consumo y estado de los proyectos de Neon, con detalle por proyecto (`/administracion/proyectos/[id]`).
- APIs del panel: `/api/administracion/*`.

## Variables de entorno (Vercel > Settings > Environment Variables > Production)

| Variable | Para qué |
| --- | --- |
| `DATABASE_URL` | Conexión a la base de Neon `autogestiva-neon` (tablas `clients` y `admin_users`). La carga sola la integración de Neon en Vercel |
| `NEON_API_KEY` | API key de Neon para leer costos e infraestructura |
| `BETTER_AUTH_SECRET` | Opcional. Secreto de sesión; si falta se deriva de `DATABASE_URL` |

Después de cargarlas hay que hacer Redeploy. Nunca subir claves a Git.

## Base de datos

El esquema está en `db/schema.sql` (Postgres en Neon). Hasta el 2026-11-16 los datos vivían en Supabase; se migraron a Neon con el mismo id de cada cliente.

El login compara la contraseña contra el hash bcrypt de `admin_users`. Para sumar otro admin, ver las instrucciones al final de `db/schema.sql`.

## Código

- Páginas: `app/administracion/`
- Componentes: `components/admin/`
- Lógica de servidor (sesión, base de datos, API de Neon): `lib/admin/`
- Los colores del panel llevan el prefijo `adm-` para no mezclarse con los de la web pública.
