"use client";

import type { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger className="group block w-full cursor-pointer text-left">
        <div className="relative aspect-square overflow-hidden bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.sold_out && (
            <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
              Agotado
            </span>
          )}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-[calc(1.125rem*var(--fs-heading))] leading-tight text-(--pcard-text)">
            {product.name}
          </h3>
          <span className="shrink-0 font-medium text-terracotta">
            {product.price}
          </span>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="overflow-hidden bg-(--pcard-bg) p-0 sm:max-w-md"
      >
        <div className="relative m-4 aspect-square overflow-hidden rounded-lg bg-card shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {product.sold_out && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              Agotado
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-3">
            <DialogTitle className="font-display text-[calc(1.5rem*var(--fs-heading))] leading-tight text-(--pcard-accent)">
              {product.name}
            </DialogTitle>
            <span className="shrink-0 text-lg font-medium text-(--pcard-accent)">
              {product.price}
            </span>
          </div>
          {product.description && (
            <DialogDescription className="mt-3 leading-relaxed text-(--pcard-text)">
              {product.description}
            </DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
