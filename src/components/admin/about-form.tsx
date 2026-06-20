"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveAboutSection } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageLightbox } from "@/components/admin/image-lightbox";
import type { AboutSection } from "@/lib/types";

export function AboutForm({ section }: { section: AboutSection }) {
  const [title, setTitle] = useState(section.title);
  const [text, setText] = useState(section.text);
  const [images, setImages] = useState<string[]>(section.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, startSaving] = useTransition();

  const dirty =
    title !== section.title ||
    text !== section.text ||
    images.join() !== (section.images ?? []).join();

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
      setImages((prev) => [...prev, data.publicUrl]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  function moveImage(i: number, dir: "left" | "right") {
    const j = dir === "left" ? i - 1 : i + 1;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    setImages(next);
  }

  function save() {
    setError(null);
    startSaving(async () => {
      try {
        await saveAboutSection({ id: section.id, title, text, images });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  return (
    <article className="space-y-4 rounded-lg border border-border bg-card p-5">
      <div className="space-y-1.5">
        <Label htmlFor={`title-${section.id}`}>Title</Label>
        <Input
          id={`title-${section.id}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`text-${section.id}`}>Text</Label>
        <Textarea
          id={`text-${section.id}`}
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Images (first 2 are shown on the site)</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="space-y-1">
              <div className={i > 1 ? "opacity-50" : ""}>
                <ImageLightbox src={url} alt={`${title} image ${i + 1}`} />
              </div>
              <div className="flex items-center justify-center gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  disabled={i === 0}
                  aria-label="Move left"
                  onClick={() => moveImage(i, "left")}
                >
                  ←
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  disabled={i === images.length - 1}
                  aria-label="Move right"
                  onClick={() => moveImage(i, "right")}
                >
                  →
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Remove"
                  onClick={() => removeImage(i)}
                >
                  ✕
                </Button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <p className="text-sm text-muted-foreground">No images yet.</p>
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
            e.target.value = "";
          }}
        />
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
    </article>
  );
}
