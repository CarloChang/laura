"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Category, OrderStatus } from "@/lib/types";

export async function signIn(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveProduct(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string | null;
  const row = {
    name: String(formData.get("name") ?? ""),
    price: String(formData.get("price") ?? ""),
    image: String(formData.get("image") ?? ""),
    description: String(formData.get("description") ?? "") || null,
    category: (String(formData.get("category") ?? "nails") as Category),
    sold_out: formData.get("sold_out") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  const { error } = id
    ? await supabase.from("products").update(row).eq("id", id)
    : await supabase.from("products").insert(row);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "new") as OrderStatus;
  const supabase = await createClient();
  const { error } = await supabase
    .from("custom_orders")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function deleteOrder(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.from("custom_orders").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}
