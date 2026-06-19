-- ─────────────────────────────────────────────────────────────────────────────
-- Custom nail order requests
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.custom_orders (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,                 -- Nombre y apellidos
  address         text not null,                 -- Dirección de entrega
  instagram       text,                          -- IG
  shape           text,                          -- Forma (Ovalada / Cuadrada)
  size            text,                          -- Tamaño (Pequeño / Mediano / Largo)
  budget          text not null,                 -- Presupuesto
  size_photo      text,                          -- Foto de la uña con una moneda
  design_images   text[] not null default '{}',  -- Diseño: hasta 3 fotos
  comments        text,                          -- Comentarios
  status          text not null default 'new'
                  check (status in ('new', 'in_progress', 'done', 'archived')),
  created_at      timestamptz not null default now()
);

-- If the table already existed with the old columns, bring it up to date.
alter table public.custom_orders add column if not exists address       text;
alter table public.custom_orders add column if not exists size          text;
alter table public.custom_orders add column if not exists size_photo    text;
alter table public.custom_orders add column if not exists design_images text[] not null default '{}';
alter table public.custom_orders add column if not exists comments      text;
alter table public.custom_orders drop column if exists email;
alter table public.custom_orders drop column if exists length;
alter table public.custom_orders drop column if exists size_status;
alter table public.custom_orders drop column if exists design;
alter table public.custom_orders drop column if exists reference_image;
alter table public.custom_orders drop column if exists notes;

alter table public.custom_orders enable row level security;

-- Anyone (an anonymous visitor) may submit an order…
drop policy if exists "anyone submit orders" on public.custom_orders;
create policy "anyone submit orders"
  on public.custom_orders for insert
  to anon, authenticated with check (true);

-- …but only the logged-in admin can read / manage them.
drop policy if exists "auth read orders" on public.custom_orders;
create policy "auth read orders"
  on public.custom_orders for select to authenticated using (true);

drop policy if exists "auth update orders" on public.custom_orders;
create policy "auth update orders"
  on public.custom_orders for update to authenticated
  using (true) with check (true);

drop policy if exists "auth delete orders" on public.custom_orders;
create policy "auth delete orders"
  on public.custom_orders for delete to authenticated using (true);

-- Storage bucket for customer reference images (public read, anyone may upload).
insert into storage.buckets (id, name, public)
values ('order-refs', 'order-refs', true)
on conflict (id) do nothing;

drop policy if exists "public read order refs" on storage.objects;
create policy "public read order refs"
  on storage.objects for select using (bucket_id = 'order-refs');

drop policy if exists "anyone upload order refs" on storage.objects;
create policy "anyone upload order refs"
  on storage.objects for insert
  to anon, authenticated with check (bucket_id = 'order-refs');
