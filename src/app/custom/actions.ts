"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type OrderState = { ok?: boolean; error?: string } | null;

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  if (!isSupabaseConfigured) {
    return {
      error: "El formulario aún no está conectado. Inténtalo de nuevo más tarde.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();

  if (!name || !address || !budget) {
    return { error: "Rellena tu nombre, la dirección de entrega y el presupuesto." };
  }

  const designImages = formData
    .getAll("design_images")
    .map((v) => String(v).trim())
    .filter(Boolean)
    .slice(0, 3);

  const row = {
    name,
    address,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    shape: String(formData.get("shape") ?? "").trim() || null,
    size: String(formData.get("size") ?? "").trim() || null,
    budget,
    size_photo: String(formData.get("size_photo") ?? "").trim() || null,
    design_images: designImages,
    comments: String(formData.get("comments") ?? "").trim() || null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("custom_orders").insert(row);
  if (error) {
    console.error("submitOrder:", error.message);
    return {
      error: "Algo salió mal al enviar tu pedido. Inténtalo de nuevo.",
    };
  }

  return { ok: true };
}
