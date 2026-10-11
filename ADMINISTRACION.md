# Panel de administración (`/administracion`)

Vive en este mismo proyecto y se publica en `https://www.autogestiva.com.ar/administracion`.
Antes era el repo `paneladmin-autogestiva` (dominio aparte).

- **Clientes** (`/administracion/clientes`): alta, edición, orden, búsqueda, exportación a CSV y alertas de vencimientos.
- **Infraestructura** (`/administracion`): costos, consumo y estado de los proyectos de Neon, con detalle por proyecto (`/administracion/proyectos/[id]`).
- APIs del panel: `/api/administracion/*`.

## Variables de entorno (Vercel > Settings > Environment Variables > Production)

| Variable | Para qué |
| --- | --- |
| `SUPABASE_URL` | URL del proyecto de Supabase (tabla `clients`, Auth y `admin_users`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave secreta de Supabase (solo servidor) |
| `NEON_API_KEY` | API key de Neon para leer costos e infraestructura |
| `BETTER_AUTH_SECRET` | Opcional. Secreto de sesión; si falta se deriva de la clave de Supabase |

Después de cargarlas hay que hacer Redeploy. Nunca subir claves a Git.

## Base de datos

Los scripts de Supabase están en `supabase/` (`clients.sql` y `admin_users.sql`). Ya están aplicados en el proyecto en uso.

## Código

- Páginas: `app/administracion/`
- Componentes: `components/admin/`
- Lógica de servidor (sesión, Supabase, Neon): `lib/admin/`
- Los colores del panel llevan el prefijo `adm-` para no mezclarse con los de la web pública.
