# Fixx — Guía de Deploy Completa

## Requisitos previos

- Node.js 18+
- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com)
- Proyecto en [Supabase](https://supabase.com) ya creado

---

## 1. Crear tablas en Supabase

**ANTES de desplegar**, ejecuta el esquema SQL en tu proyecto Supabase:

1. Ve a [supabase.com](https://supabase.com) → tu proyecto → **SQL Editor**
2. Copia y pega el contenido de `scripts/supabase-schema.sql`
3. Haz clic en **Run**
4. Verifica que se crearon 4 tablas: `profiles`, `workshops`, `subscriptions`, `audit_logs`

---

## 2. Subir a GitHub

```bash
cd revvio
git init
git add .
git commit -m "Fixx v1.0 — trial system + security"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/fixx.git
git push -u origin main
```

> `.env.local` y `scripts/output/` NO se suben a Git.

---

## 3. Variables de entorno

### Desarrollo local (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://dveifluvdedonhpzdhvq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### Vercel (Settings → Environment Variables)

| Variable | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres:[password]@db.dveifluvdedonhpzdhvq.supabase.co:5432/postgres` |
| `JWT_SECRET` | Una cadena secreta para firmar tokens (ej: `fixx-secret-2026`) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://dveifluvdedonhpzdhvq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu anon key |

> **IMPORTANTE**: La variable `DATABASE_URL` es obligatoria para que el sistema de registro y login funcione en Vercel. Asegúrate de reemplazar `[password]` con tu contraseña real de la base de datos de Supabase.

---

## 4. Deploy en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio
3. Agrega las 2 variables de entorno
4. Haz clic en **Deploy**

---

## 5. Configurar Supabase Auth

En **Authentication → URL Configuration**:

| Campo | Valor |
|-------|-------|
| **Site URL** | `https://tu-proyecto.vercel.app` |
| **Redirect URLs** | `https://tu-proyecto.vercel.app/**` |

Para desarrollo local, agrega también: `http://localhost:3000/**`

---

## 6. Crear usuarios demo (opcional)

Después de ejecutar el esquema SQL:

```bash
npx tsx scripts/seed-users.ts
```

Las credenciales se guardan en `scripts/output/test-users.csv`.

---

## 7. Sistema de Trial

- Al registrarse, cada usuario recibe 7 días de prueba gratuita
- Al expirar: se muestra `/trial-expired` y se bloquea `/dashboard`
- Las cuentas NO se eliminan — se marcan como `expired`
- Eliminación diferida opcional: 30 días después de expiración

---

## 8. Seguridad implementada

| Medida | Estado |
|--------|--------|
| RLS (Row Level Security) | ✅ 4 tablas |
| Route protection middleware | ✅ |
| Security headers (HSTS, X-Frame, nosniff) | ✅ |
| Server-side registration (no secrets on client) | ✅ |
| Input validation | ✅ |
| Non-revealing error messages | ✅ |
| Audit logging | ✅ |
| Supabase Auth (no custom passwords) | ✅ |
| .env excluded from Git | ✅ |

### Pendiente para futuras iteraciones:
- Rate limiting (requiere Redis o middleware externo)
- CSP header refinado
- 2FA
- Manejo de roles más granular

---

## Estructura del proyecto

```
revvio/
├── .env.local              # No se sube a Git
├── .env.example            # Template seguro
├── scripts/
│   ├── supabase-schema.sql # SQL para Supabase
│   └── seed-users.ts       # Seed 10 usuarios demo
├── src/
│   ├── middleware.ts        # Auth + trial + security headers
│   ├── app/
│   │   ├── api/auth/register/route.ts  # Registration API
│   │   ├── login/page.tsx
│   │   ├── registro/page.tsx
│   │   ├── trial-expired/page.tsx
│   │   └── dashboard/...   # Protected routes
│   └── lib/supabase/
│       ├── client.ts
│       └── server.ts
```
