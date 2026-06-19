"use client";

import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { submitOrder, type OrderState } from "@/app/custom/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SHAPES = ["Ovalada", "Cuadrada"];
const SIZES = ["Pequeño", "Mediano", "Largo"];
const MAX_DESIGN_IMAGES = 3;

// Example photo (a nail next to a coin for scale). Replace the file at
// public/size-example.jpg with Laura's own reference photo.
const SIZE_EXAMPLE = "/size-example.jpg";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

async function uploadToStorage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("order-refs").upload(path, file);
  if (error) throw error;
  return supabase.storage.from("order-refs").getPublicUrl(path).data.publicUrl;
}

export function CustomForm() {
  const [state, action, pending] = useActionState<OrderState, FormData>(
    submitOrder,
    null,
  );
  const [sizePhoto, setSizePhoto] = useState("");
  const [sizePhotoUploading, setSizePhotoUploading] = useState(false);
  const [designImages, setDesignImages] = useState<string[]>([]);
  const [designUploading, setDesignUploading] = useState(false);
  const [exampleOk, setExampleOk] = useState(true);

  async function handleSizePhoto(file: File) {
    setSizePhotoUploading(true);
    try {
      setSizePhoto(await uploadToStorage(file));
    } catch {
      // ignore — optional
    } finally {
      setSizePhotoUploading(false);
    }
  }

  async function handleDesignImage(file: File) {
    if (designImages.length >= MAX_DESIGN_IMAGES) return;
    setDesignUploading(true);
    try {
      const url = await uploadToStorage(file);
      setDesignImages((prev) => [...prev, url].slice(0, MAX_DESIGN_IMAGES));
    } catch {
      // ignore — optional
    } finally {
      setDesignUploading(false);
    }
  }

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center">
        <p className="script text-5xl text-terracotta">¡gracias!</p>
        <h2 className="mt-2 font-condensed text-4xl uppercase">
          Pedido enviado
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          ¡Gracias! He recibido tu pedido personalizado y te contestaré en menos
          de 24h para confirmar los detalles y los tiempos. 💅
        </p>
      </div>
    );
  }

  const uploading = sizePhotoUploading || designUploading;

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="size_photo" value={sizePhoto} />
      {designImages.map((url) => (
        <input key={url} type="hidden" name="design_images" value={url} />
      ))}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre y apellidos *">
          <Input name="name" required />
        </Field>
        <Field label="Instagram (opcional)">
          <Input name="instagram" placeholder="@tuusuario" />
        </Field>
      </div>

      <Field label="Dirección de entrega *">
        <Input
          name="address"
          required
          placeholder="Calle Ejemplo 2, 10000, Provincia, Comunidad Autónoma"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Forma de uña">
          <select name="shape" defaultValue="" className={selectClass}>
            <option value="">Sin preferencia</option>
            {SHAPES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tamaño">
          <select name="size" defaultValue="" className={selectClass}>
            <option value="">Sin preferencia</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Presupuesto *">
        <Input name="budget" required placeholder="ej. 30–40 €" />
      </Field>

      <Field label="Tamaño de tus uñas (foto con una moneda)">
        <p className="text-sm text-muted-foreground">
          Haz una foto de tu uña junto a una moneda para que pueda calcular la
          talla, como en el ejemplo.
        </p>
        {exampleOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={SIZE_EXAMPLE}
            alt="Ejemplo: uña junto a una moneda"
            onError={() => setExampleOk(false)}
            className="mt-1 h-32 w-auto rounded-md border border-border object-cover"
          />
        )}
        <div className="mt-2 flex items-center gap-4">
          {sizePhoto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sizePhoto}
              alt=""
              className="h-16 w-16 rounded-md border border-border object-cover"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            disabled={sizePhotoUploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleSizePhoto(f);
            }}
          />
        </div>
        {sizePhotoUploading && (
          <p className="mt-1 text-xs text-muted-foreground">Subiendo…</p>
        )}
      </Field>

      <Field label={`Diseño — hasta ${MAX_DESIGN_IMAGES} fotos`}>
        <p className="text-sm text-muted-foreground">
          Sube imágenes de referencia del diseño que te gustaría.
        </p>
        {designImages.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-3">
            {designImages.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="h-20 w-20 rounded-md border border-border object-cover"
                />
                <button
                  type="button"
                  aria-label="Quitar imagen"
                  onClick={() =>
                    setDesignImages((prev) => prev.filter((u) => u !== url))
                  }
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-paper"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {designImages.length < MAX_DESIGN_IMAGES && (
          <Input
            type="file"
            accept="image/*"
            disabled={designUploading}
            className="mt-2"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleDesignImage(f);
              e.target.value = "";
            }}
          />
        )}
        {designUploading && (
          <p className="mt-1 text-xs text-muted-foreground">Subiendo…</p>
        )}
      </Field>

      <Field label="Comentarios (opcional)">
        <Textarea
          name="comments"
          rows={3}
          placeholder="Colores, temática, charms, ocasión… ¡cuéntamelo todo!"
        />
      </Field>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <Button type="submit" size="lg" disabled={pending || uploading}>
        {pending ? "Enviando…" : "Enviar mi pedido"}
      </Button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
