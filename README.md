# Fixx

Sistema de gestión de talleres mecánicos. Controla órdenes de trabajo, inventario, vehículos, clientes y recordatorios desde un solo panel.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + DB)
- **Lucide Icons**

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## Deploy

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones completas de despliegue en Vercel.
