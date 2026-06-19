import { notFound } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/product-form";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured) notFound();
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) notFound();

  return (
    <>
      <h1 className="mb-6 font-condensed text-4xl uppercase">Edit product</h1>
      <ProductForm product={data as Product} />
    </>
  );
}
