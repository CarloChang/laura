-- ─────────────────────────────────────────────────────────────────────────────
-- Laura — database schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- ─────────────────────────────────────────────────────────────────────────────

-- Tables ----------------------------------------------------------------------

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  price       text not null,
  image       text not null default '',
  description text,
  category    text not null default 'nails' check (category in ('nails', 'makeup')),
  sold_out    boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.about_sections (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  text        text not null default '',
  images      text[] not null default '{}',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.theme_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security ----------------------------------------------------------
-- Public can READ everything; only logged-in (authenticated) users can write.

alter table public.products enable row level security;
alter table public.about_sections enable row level security;
alter table public.theme_settings enable row level security;

drop policy if exists "public read theme" on public.theme_settings;
create policy "public read theme"
  on public.theme_settings for select using (true);

drop policy if exists "auth write theme" on public.theme_settings;
create policy "auth write theme"
  on public.theme_settings for all
  to authenticated using (true) with check (true);

drop policy if exists "public read products" on public.products;
create policy "public read products"
  on public.products for select using (true);

drop policy if exists "auth write products" on public.products;
create policy "auth write products"
  on public.products for all
  to authenticated using (true) with check (true);

drop policy if exists "public read about" on public.about_sections;
create policy "public read about"
  on public.about_sections for select using (true);

drop policy if exists "auth write about" on public.about_sections;
create policy "auth write about"
  on public.about_sections for all
  to authenticated using (true) with check (true);

-- Custom nail order requests --------------------------------------------------

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

alter table public.custom_orders enable row level security;

drop policy if exists "anyone submit orders" on public.custom_orders;
create policy "anyone submit orders"
  on public.custom_orders for insert
  to anon, authenticated with check (true);

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

-- Storage bucket for product images -------------------------------------------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "auth upload images" on storage.objects;
create policy "auth upload images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "auth update images" on storage.objects;
create policy "auth update images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "auth delete images" on storage.objects;
create policy "auth delete images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images');

-- Storage bucket for customer reference images (public read, anyone uploads).
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
