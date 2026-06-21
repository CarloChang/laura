import { cache } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ThemeSettings } from "@/lib/theme";

/**
 * Reads saved theme settings; returns `{}` when none/unavailable. Wrapped in
 * `cache()` so the layout and every component share a single query per request.
 */
export const getThemeSettings = cache(async (): Promise<ThemeSettings> => {
  if (!isSupabaseConfigured) return {};
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("theme_settings")
    .select("key, value");
  if (error) {
    console.error("getThemeSettings:", error.message);
    return {};
  }
  return Object.fromEntries(
    (data ?? []).map((r: { key: string; value: string }) => [r.key, r.value]),
  );
});
