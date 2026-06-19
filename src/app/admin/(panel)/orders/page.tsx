import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { updateOrderStatus, deleteOrder } from "../../actions";
import type { CustomOrder, OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUSES: OrderStatus[] = ["new", "in_progress", "done", "archived"];

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: "bg-terracotta text-paper",
  in_progress: "bg-dusty text-paper",
  done: "bg-olive text-paper",
  archived: "bg-muted text-muted-foreground",
};

export default async function OrdersPage() {
  if (!isSupabaseConfigured) {
    return (
      <p className="text-muted-foreground">Supabase isn&apos;t connected yet.</p>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("custom_orders")
    .select("*")
    .order("created_at", { ascending: false });
  const orders = (data ?? []) as CustomOrder[];

  return (
    <>
      <div className="mb-8">
        <h1 className="font-condensed text-4xl uppercase">Custom requests</h1>
        <p className="text-sm text-muted-foreground">
          {orders.length} request{orders.length === 1 ? "" : "s"}
        </p>
      </div>

      {orders.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          No custom requests yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <article
              key={o.id}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-xl">{o.name}</h2>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLE[o.status]}`}
                    >
                      {o.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <a href={`mailto:${o.email}`} className="hover:text-terracotta">
                      {o.email}
                    </a>
                    {o.instagram && ` · ${o.instagram}`}
                    {" · "}
                    {new Date(o.created_at).toLocaleDateString()}
                  </p>
                </div>
                {o.reference_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={o.reference_image}
                    alt="reference"
                    className="h-20 w-20 rounded-md border border-border object-cover"
                  />
                )}
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <Detail label="Shape" value={o.shape} />
                <Detail label="Length" value={o.length} />
                <Detail label="Sizing" value={o.size_status} />
                <Detail label="Budget" value={o.budget} />
              </dl>

              <p className="mt-3 whitespace-pre-line text-sm">
                <span className="font-semibold">Design: </span>
                {o.design}
              </p>
              {o.notes && (
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                  <span className="font-semibold">Notes: </span>
                  {o.notes}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                {STATUSES.map((s) => (
                  <form key={s} action={updateOrderStatus}>
                    <input type="hidden" name="id" value={o.id} />
                    <input type="hidden" name="status" value={s} />
                    <Button
                      type="submit"
                      size="sm"
                      variant={o.status === s ? "default" : "outline"}
                    >
                      {s.replace("_", " ")}
                    </Button>
                  </form>
                ))}
                <form action={deleteOrder} className="ml-auto">
                  <input type="hidden" name="id" value={o.id} />
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="inline font-semibold">{label}: </dt>
      <dd className="inline text-muted-foreground">{value}</dd>
    </div>
  );
}
