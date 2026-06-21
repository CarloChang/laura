import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getThemeSettings } from "@/lib/theme-data";
import { CustomSettingsForm } from "@/components/admin/custom-settings-form";

export const dynamic = "force-dynamic";

export default async function CustomAdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <p className="text-muted-foreground">Supabase isn&apos;t connected yet.</p>
    );
  }

  const settings = await getThemeSettings();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-condensed text-4xl uppercase">Custom</h1>
        <p className="text-sm text-muted-foreground">
          Settings for the custom order form. Add an example image or video so
          customers know how to photograph their nail size.
        </p>
      </div>

      <CustomSettingsForm settings={settings} />
    </>
  );
}
