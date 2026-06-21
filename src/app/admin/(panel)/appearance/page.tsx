import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getThemeSettings } from "@/lib/theme-data";
import { ThemeForm } from "@/components/admin/theme-form";

export const dynamic = "force-dynamic";

export default async function AppearanceAdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <p className="text-muted-foreground">Supabase isn&apos;t connected yet.</p>
    );
  }

  const settings = await getThemeSettings();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-condensed text-4xl uppercase">Appearance</h1>
        <p className="text-sm text-muted-foreground">
          Tune the storefront&apos;s colors and text sizes. Changes apply to the
          public site after you save.
        </p>
      </div>

      <ThemeForm settings={settings} />
    </>
  );
}
