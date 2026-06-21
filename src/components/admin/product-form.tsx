"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { saveProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageLightbox } from "@/components/admin/image-lightbox";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [image, setImage] = useState(product?.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setImage(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(fd: FormData) {
    if (uploading) {
      setError("Please wait for the image to finish uploading.");
      return;
    }
    setSaving(true);
    setError(null);
    fd.set("image", image);
    try {
      await saveProduct(fd);
      // On success saveProduct redirects, so we never reach here.
    } catch (e) {
      // A redirect resolves cleanly here; only real failures land in catch.
      setError(e instanceof Error ? e.message : "Could not save product");
      setSaving(false);
    }
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            defaultValue={product?.price ?? "€"}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? "nails"}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="nails">Nails</option>
            <option value="makeup">Makeup</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Image</Label>
        <div className="flex items-center gap-4">
          {image ? (
            <ImageLightbox src={image} alt="Product image" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
              none
            </div>
          )}
          <label
            className={cn(
              "inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent",
              uploading && "pointer-events-none opacity-50",
            )}
          >
            {uploading ? "Uploading…" : image ? "Change image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
                // Reset so picking the same file again still fires onChange.
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="sold_out"
          defaultChecked={product?.sold_out}
          className="size-4"
        />
        <span className="text-sm">Sold out</span>
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saving || uploading}>
          {saving
            ? "Saving…"
            : uploading
              ? "Waiting for image…"
              : product
                ? "Save changes"
                : "Create product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
