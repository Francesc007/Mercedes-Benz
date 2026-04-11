-- Ejecutar en Supabase → SQL Editor (mismo proyecto que el inventario).
-- Habilita que la landing inserte filas con la clave anon (solo esta tabla).

create table if not exists public.landing_interactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  nombre text,
  whatsapp text,
  modelo_interes text,
  car_id text,
  car_label text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.landing_interactions enable row level security;

-- Permitir INSERT anónimo solo en esta tabla (ajusta si usas otro rol)
drop policy if exists "landing_interactions_anon_insert" on public.landing_interactions;
create policy "landing_interactions_anon_insert"
  on public.landing_interactions
  for insert
  to anon
  with check (true);

-- Opcional: lectura solo para usuarios autenticados del dashboard
-- create policy "landing_interactions_auth_read" on public.landing_interactions
--   for select to authenticated using (true);
