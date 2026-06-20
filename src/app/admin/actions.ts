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
  const category = String(formData.get("category") ?? "nails") as Category;
  const row = {
    name: String(formData.get("name") ?? ""),
    price: String(formData.get("price") ?? ""),
    image: String(formData.get("image") ?? ""),
    description: String(formData.get("description") ?? "") || null,
    category,
    sold_out: formData.get("sold_out") === "on",
  };

  let error;
  if (id) {
    // Editing: leave sort_order untouched so the product keeps its position.
    ({ error } = await supabase.from("products").update(row).eq("id", id));
  } else {
    // New product: append to the end of its category.
    const { data: last } = await supabase
      .from("products")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort_order = (last?.sort_order ?? -1) + 1;
    ({ error } = await supabase.from("products").insert({ ...row, sort_order }));
  }

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

export async function saveProductOrder(orderedIds: string[]) {
  const supabase = await createClient();

  // Assign sort_order to match the given order. Relative order within each
  // category is preserved, which is what the storefront sorts by.
  const { error } = await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from("products").update({ sort_order: i }).eq("id", id),
    ),
  ).then((results) => ({ error: results.find((r) => r.error)?.error }));

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveAboutSection(input: {
  id: string;
  title: string;
  text: string;
  images: string[];
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("about_sections")
    .update({
      title: input.title,
      text: input.text,
      images: input.images,
    })
    .eq("id", input.id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/about");
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
