-- ─────────────────────────────────────────────────────────────────────────────
-- Theme settings — editable palette colors and per-role font sizes.
-- One row per setting (key = CSS-variable-ish token, value = hex or multiplier).
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.theme_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table public.theme_settings enable row level security;

drop policy if exists "public read theme" on public.theme_settings;
create policy "public read theme"
  on public.theme_settings for select using (true);

drop policy if exists "auth write theme" on public.theme_settings;
create policy "auth write theme"
  on public.theme_settings for all
  to authenticated using (true) with check (true);
