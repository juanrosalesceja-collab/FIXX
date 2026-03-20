-- ============================================================
-- FIXX — Database Schema (Trial 7 Days logic)
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- Tabla de perfiles de usuario
create table profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    name text,
    email text unique,
    created_at timestamp with time zone default current_timestamp
);

-- Tabla de talleres de usuario
create table workshops (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    workshop_name text,
    created_at timestamp with time zone default current_timestamp
);

-- Tabla de suscripciones con lógica de trial
create table subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    trial_start_at timestamp with time zone default current_timestamp,
    trial_end_at timestamp with time zone,
    status text default 'trialing', -- 'trialing', 'active', 'expired'
    created_at timestamp with time zone default current_timestamp
);

-- Tabla de logs de auditoría
create table audit_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id),
    action text,
    created_at timestamp with time zone default current_timestamp
);

-- Habilitar RLS (Row Level Security)
alter table profiles enable row level security;
alter table workshops enable row level security;
alter table subscriptions enable row level security;
alter table audit_logs enable row level security;

-- Crear las políticas de acceso a los datos
create policy "Profiles can only access their own data" on profiles
  for select using (user_id = auth.uid());

create policy "Workshops can only access their own data" on workshops
  for select using (user_id = auth.uid());

create policy "Subscriptions can only access their own data" on subscriptions
  for select using (user_id = auth.uid());

create policy "Audit Logs can only access their own data" on audit_logs
  for select using (user_id = auth.uid());
