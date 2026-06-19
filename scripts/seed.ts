/**
 * Seeds the Supabase DB with the initial products & about content.
 *
 *   1. fill in .env.local (see .env.example)
 *   2. add SUPABASE_SERVICE_ROLE_KEY to .env.local (Dashboard → Settings → API)
 *   3. run:  bun scripts/seed.ts
 *
 * Safe to re-run: it clears both tables first, then re-inserts.
 */
import { createClient } from "@supabase/supabase-js";
import { SEED_PRODUCTS, SEED_ABOUT } from "../src/lib/seed-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function main() {
  // products
  await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const products = SEED_PRODUCTS.map(({ id: _id, ...p }) => p);
  const { error: pErr } = await supabase.from("products").insert(products);
  if (pErr) throw pErr;
  console.log(`✓ inserted ${products.length} products`);

  // about
  await supabase.from("about_sections").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const about = SEED_ABOUT.map(({ id: _id, ...s }) => s);
  const { error: aErr } = await supabase.from("about_sections").insert(about);
  if (aErr) throw aErr;
  console.log(`✓ inserted ${about.length} about sections`);

  console.log("Done 🎉");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
