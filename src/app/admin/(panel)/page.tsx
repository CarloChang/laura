import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { ProductsTable } from "@/components/admin/products-table";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h1 className="font-condensed text-3xl uppercase">Almost there</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Supabase isn&apos;t connected yet. Add your keys to{" "}
          <code className="rounded bg-muted px-1">.env.local</code> and run the
          schema — see <code className="rounded bg-muted px-1">README.md</code>.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("category")
    .order("sort_order")
    .order("created_at");
  const products = (data ?? []) as Product[];

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-4xl uppercase">Products</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} item{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants()}>
          + Add product
        </Link>
      </div>

      <ProductsTable products={products} />
    </>
  );
}
