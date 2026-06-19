import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/admin/image-lightbox";
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
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl">{o.name}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLE[o.status]}`}
                >
                  {o.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {o.instagram && `${o.instagram} · `}
                {new Date(o.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4 grid grid-cols-2 items-start gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
                <Detail label="Address" value={o.address} />
                <Detail label="Shape" value={o.shape} />
                <Detail label="Size" value={o.size} />
                <Detail label="Budget" value={o.budget} />
                <Detail label="Comments" value={o.comments} />
                {o.size_photo && (
                  <div>
                    <p className="mb-1 font-semibold">Size photo:</p>
                    <ImageLightbox src={o.size_photo} alt="Size photo" />
                  </div>
                )}
                {o.design_images.length > 0 && (
                  <div>
                    <p className="mb-1 font-semibold">Design references:</p>
                    <div className="flex flex-wrap gap-2">
                      {o.design_images.map((url) => (
                        <ImageLightbox
                          key={url}
                          src={url}
                          alt="Design reference"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-4 sm:gap-2">
                {STATUSES.map((s) => (
                  <form key={s} action={updateOrderStatus} className="min-w-0 flex-1">
                    <input type="hidden" name="id" value={o.id} />
                    <input type="hidden" name="status" value={s} />
                    <Button
                      type="submit"
                      size="sm"
                      variant={o.status === s ? "default" : "outline"}
                      className="w-full px-1.5 text-xs whitespace-nowrap sm:px-3 sm:text-sm"
                    >
                      {s.replace("_", " ")}
                    </Button>
                  </form>
                ))}
                <form action={deleteOrder}>
                  <input type="hidden" name="id" value={o.id} />
                  <Button
                    type="submit"
                    size="sm"
                    variant="destructive"
                    className="px-1.5 text-xs whitespace-nowrap sm:px-3 sm:text-sm"
                  >
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
  return (
    <div>
      <dt className="inline font-semibold">{label}: </dt>
      <dd className="inline text-muted-foreground">
        {value || <span className="italic opacity-60">—</span>}
      </dd>
    </div>
  );
}
