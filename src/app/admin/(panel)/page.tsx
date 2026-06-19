import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteProduct } from "../actions";
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
    .order("sort_order");
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

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || "https://placehold.co/80x80?text=—"}
                    alt=""
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 capitalize text-muted-foreground">
                  {p.category}
                </td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">
                  {p.sold_out ? (
                    <span className="text-destructive">Sold out</span>
                  ) : (
                    <span className="text-olive">Live</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No products yet. Add your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
