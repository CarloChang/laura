"use client";

import { useMemo, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveThemeSettings } from "@/app/admin/actions";
import {
  CUSTOM_KEYS,
  customValue,
  type CustomMediaType,
} from "@/lib/custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ThemeSettings } from "@/lib/theme";

export function CustomSettingsForm({ settings }: { settings: ThemeSettings }) {
  const initial = useMemo(
    () => ({
      label: customValue(settings, CUSTOM_KEYS.sizeLabel),
      help: customValue(settings, CUSTOM_KEYS.sizeHelp),
      media: customValue(settings, CUSTOM_KEYS.sizeMedia),
      mediaType: customValue(
        settings,
        CUSTOM_KEYS.sizeMediaType,
      ) as CustomMediaType,
    }),
    [settings],
  );

  const [label, setLabel] = useState(initial.label);
  const [help, setHelp] = useState(initial.help);
  const [media, setMedia] = useState(initial.media);
  const [mediaType, setMediaType] = useState<CustomMediaType>(initial.mediaType);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, startSaving] = useTransition();

  const dirty =
    label !== initial.label ||
    help !== initial.help ||
    media !== initial.media ||
    mediaType !== initial.mediaType;

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("product-images")
        .upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);
      setMedia(data.publicUrl);
      setMediaType(file.type.startsWith("video/") ? "video" : "image");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function save() {
    setError(null);
    startSaving(async () => {
      try {
        await saveThemeSettings({
          [CUSTOM_KEYS.sizeLabel]: label,
          [CUSTOM_KEYS.sizeHelp]: help,
          [CUSTOM_KEYS.sizeMedia]: media,
          [CUSTOM_KEYS.sizeMediaType]: mediaType,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  return (
    <section className="space-y-5 rounded-lg border border-border bg-card p-5">
      <div>
        <h2 className="font-condensed text-xl uppercase">Nail size example</h2>
        <p className="text-xs text-muted-foreground">
          Configure the “tamaño de uñas” field on the custom order form. The
          example image or video helps customers understand what to send.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="custom-size-label">Field label</Label>
        <Input
          id="custom-size-label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="custom-size-help">Helper text</Label>
        <Textarea
          id="custom-size-help"
          rows={3}
          value={help}
          onChange={(e) => setHelp(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Shown under the label to explain how to take the photo.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Example image or video</Label>
        {media ? (
          <div className="flex items-start gap-3">
            {mediaType === "video" ? (
              <video
                src={media}
                controls
                className="h-40 w-auto rounded-md border border-border object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media}
                alt="Nail size example"
                className="h-40 w-auto rounded-md border border-border object-cover"
              />
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setMedia("");
                setMediaType("image");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No example yet.</p>
        )}
        <Input
          type="file"
          accept="image/*,video/*"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
            e.target.value = "";
          }}
        />
        <p className="text-xs text-muted-foreground">
          Upload an image (JPG, PNG…) or a short video (MP4) example.
        </p>
        {uploading && (
          <p className="text-xs text-muted-foreground">Uploading…</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={!dirty || saving || uploading}>
          {saving ? "Saving…" : "Save"}
        </Button>
        {saved && <span className="text-sm text-olive">Saved ✓</span>}
        {dirty && !saving && (
          <span className="text-sm text-muted-foreground">Unsaved changes</span>
        )}
      </div>
    </section>
  );
}
