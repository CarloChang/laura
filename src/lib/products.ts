import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { SEED_PRODUCTS, SEED_ABOUT } from "@/lib/seed-data";
import type { Product, AboutSection, Category } from "@/lib/types";

/**
 * Fetches products from Supabase when configured, otherwise returns the seed
 * content so the site renders before the database is connected.
 */
export async function getProducts(category?: Category): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    const all = SEED_PRODUCTS;
    return category ? all.filter((p) => p.category === category) : all;
  }

  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("getProducts:", error.message);
    return [];
  }
  return data as Product[];
}

export async function getAboutSections(): Promise<AboutSection[]> {
  if (!isSupabaseConfigured) return SEED_ABOUT;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("about_sections")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getAboutSections:", error.message);
    return [];
  }
  return data as AboutSection[];
}
