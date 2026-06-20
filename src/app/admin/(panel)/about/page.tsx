import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { AboutForm } from "@/components/admin/about-form";
import type { AboutSection } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AboutAdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <p className="text-muted-foreground">Supabase isn&apos;t connected yet.</p>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("about_sections")
    .select("*")
    .order("sort_order", { ascending: true });
  const sections = (data ?? []) as AboutSection[];

  return (
    <>
      <div className="mb-8">
        <h1 className="font-condensed text-4xl uppercase">About / Content</h1>
        <p className="text-sm text-muted-foreground">
          Edit the text and images of each homepage section.
        </p>
      </div>

      {sections.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          No sections found.
        </p>
      ) : (
        <div className="space-y-6">
          {sections.map((s) => (
            <AboutForm key={s.id} section={s} />
          ))}
        </div>
      )}
    </>
  );
}
