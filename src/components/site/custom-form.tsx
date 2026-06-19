"use client";

import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { submitOrder, type OrderState } from "@/app/custom/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SHAPES = ["Almendra", "Coffin", "Cuadrada", "Squoval", "Stiletto", "Redonda"];
const LENGTHS = ["Corto", "Medio", "Largo", "Extra largo"];
const SIZE_OPTIONS = [
  "Conozco mis tallas",
  "Envíame primero un kit de medidas",
  "No estoy segura / necesito ayuda",
];

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

export function CustomForm() {
  const [state, action, pending] = useActionState<OrderState, FormData>(
    submitOrder,
    null,
  );
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("order-refs")
        .upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("order-refs").getPublicUrl(path);
      setImage(data.publicUrl);
    } catch {
      // ignore — reference image is optional
    } finally {
      setUploading(false);
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

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="reference_image" value={image} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tu nombre *">
          <Input name="name" required />
        </Field>
        <Field label="Email *">
          <Input name="email" type="email" required />
        </Field>
        <Field label="Instagram (opcional)">
          <Input name="instagram" placeholder="@tuusuario" />
        </Field>
        <Field label="Presupuesto (opcional)">
          <Input name="budget" placeholder="ej. €30–40" />
        </Field>
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
        <Field label="Largo">
          <select name="length" defaultValue="" className={selectClass}>
            <option value="">Sin preferencia</option>
            {LENGTHS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tallas">
        <select name="size_status" defaultValue={SIZE_OPTIONS[0]} className={selectClass}>
          {SIZE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Describe tu set soñado *">
        <Textarea
          name="design"
          rows={4}
          required
          placeholder="Colores, temática, charms, inspiración, ocasión… ¡cuéntamelo todo!"
        />
      </Field>

      <Field label="Imagen de referencia (opcional)">
        <div className="flex items-center gap-4">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="h-16 w-16 rounded-md border border-border object-cover"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
          />
        </div>
        {uploading && (
          <p className="mt-1 text-xs text-muted-foreground">Subiendo…</p>
        )}
      </Field>

      <Field label="¿Algo más? (opcional)">
        <Textarea name="notes" rows={2} />
      </Field>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

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
