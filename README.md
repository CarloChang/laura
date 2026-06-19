# Laura — Press-on Nails & Beauty

A modern storefront + backoffice for Laura's handmade press-on nails and curated
beauty. Vintage beauty-magazine editorial design (see `_design-ref/INSPO`).

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui ·
Supabase (Postgres + Auth + Storage) · Vercel.

The original Bun/React site is archived in [`legacy/`](legacy/).

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Without Supabase configured, the site renders the built-in **seed content**
(`src/lib/seed-data.ts`) so you can develop the design immediately. The admin at
`/admin` will show an "almost there" notice until Supabase is connected.

---

## Connect Supabase (database + backoffice)

### 1. Create the project
1. Go to <https://supabase.com> → **New project** (free tier is plenty).
2. Pick a name + database password, wait ~2 min for it to provision.

### 2. Create the tables
- Dashboard → **SQL Editor** → **New query**
- Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
- This creates `products` + `about_sections`, the public-read / auth-write
  security rules, and the `product-images` storage bucket.

### 3. Add your keys
- Dashboard → **Project Settings → API**.
- Copy `.env.example` to `.env.local` and fill in:
  - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — `anon` public key
  - `SUPABASE_SERVICE_ROLE_KEY` — `service_role` key (for seeding only)

### 4. Seed the initial content
```bash
bun scripts/seed.ts
```
Loads the 12 nail sets, 6 makeup items, and the "where to start" sections.

### 5. Create your admin login
- Dashboard → **Authentication → Users → Add user** (email + password).
- This is the account Laura uses to log into `/admin`.

Restart `npm run dev`, visit `/admin/login`, and you can add/edit/delete
products and upload real photos.

---

## Deploy (Vercel)
1. Push to GitHub, import the repo at <https://vercel.com/new>.
2. Add the same three env vars in **Project Settings → Environment Variables**.
3. Deploy. (Schema + seed steps above are one-time, done against Supabase.)

---

## Project map
| Path | What |
|------|------|
| `src/app/page.tsx` | Public storefront |
| `src/components/site/` | Storefront sections (hero, grid, about, footer) |
| `src/app/admin/` | Backoffice (login + product CRUD) |
| `src/lib/products.ts` | Reads Supabase, falls back to seed data |
| `src/lib/supabase/` | Supabase clients + auth proxy |
| `supabase/schema.sql` | Database schema — run once |
| `scripts/seed.ts` | Seed initial content |
| `src/app/globals.css` | Design tokens / editorial styling |
