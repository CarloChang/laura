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
  const email = String(formData.get("email") ?? "").trim();
  const design = String(formData.get("design") ?? "").trim();

  if (!name || !email || !design) {
    return { error: "Rellena tu nombre, email e idea de diseño." };
  }

  const row = {
    name,
    email,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    shape: String(formData.get("shape") ?? "").trim() || null,
    length: String(formData.get("length") ?? "").trim() || null,
    size_status: String(formData.get("size_status") ?? "").trim() || null,
    design,
    reference_image: String(formData.get("reference_image") ?? "").trim() || null,
    budget: String(formData.get("budget") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
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
