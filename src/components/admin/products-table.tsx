"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteProduct, saveProductOrder } from "@/app/admin/actions";
import type { Category, Product } from "@/lib/types";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "nails", label: "Nails" },
  { value: "makeup", label: "Makeup" },
];

export function ProductsTable({ products }: { products: Product[] }) {
  const [items, setItems] = useState(products);
  const [dirty, setDirty] = useState(false);
  const [saving, startSaving] = useTransition();

  // Keep local state in sync when the server data changes (e.g. after a
  // delete revalidates the page) — but only while there are no pending edits.
  const initialIds = products.map((p) => p.id).join();
  const [syncedIds, setSyncedIds] = useState(initialIds);
  if (!dirty && initialIds !== syncedIds) {
    setItems(products);
    setSyncedIds(initialIds);
  }

  function move(index: number, direction: "up" | "down") {
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= items.length) return;
    if (items[index].category !== items[swapWith].category) return;
    const next = [...items];
    [next[index], next[swapWith]] = [next[swapWith], next[index]];
    setItems(next);
    setDirty(true);
  }

  function save() {
    startSaving(async () => {
      await saveProductOrder(items.map((p) => p.id));
      setDirty(false);
    });
  }

  return (
    <div className="space-y-4">
      {dirty && (
        <div className="flex items-center justify-between rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-2 text-sm">
          <span>You have unsaved order changes.</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setItems(products);
                setDirty(false);
              }}
              disabled={saving}
            >
              Reset
            </Button>
            <Button size="sm" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save order"}
            </Button>
          </div>
        </div>
      )}

      {CATEGORIES.map(({ value, label }) => {
        // Keep each product's index in the flat `items` array so move() and
        // the saved order stay consistent across both categories.
        const rows = items
          .map((p, index) => ({ p, index }))
          .filter(({ p }) => p.category === value);

        return (
          <section key={value} className="space-y-3">
            <h2 className="font-condensed text-2xl uppercase">{label}</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-160 text-sm">
                <thead className="bg-muted/60 text-left uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="p-3">Order</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ p, index }, rowPos) => {
                    const isFirst = rowPos === 0;
                    const isLast = rowPos === rows.length - 1;
                    return (
                      <tr key={p.id} className="border-t border-border">
                        <td className="p-3">
                          <div className="flex flex-col gap-0.5">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              type="button"
                              disabled={isFirst}
                              aria-label="Move up"
                              onClick={() => move(index, "up")}
                            >
                              ↑
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              type="button"
                              disabled={isLast}
                              aria-label="Move down"
                              onClick={() => move(index, "down")}
                            >
                              ↓
                            </Button>
                          </div>
                        </td>
                        <td className="p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image || "https://placehold.co/80x80?text=—"}
                            alt=""
                            className="h-12 w-12 rounded object-cover"
                          />
                        </td>
                        <td className="p-3 font-medium">{p.name}</td>
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
                              className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                              })}
                            >
                              Edit
                            </Link>
                            <form action={deleteProduct}>
                              <input type="hidden" name="id" value={p.id} />
                              <Button
                                variant="destructive"
                                size="sm"
                                type="submit"
                              >
                                Delete
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No {label.toLowerCase()} products yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
