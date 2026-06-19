import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-card">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.sold_out && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg leading-tight">{product.name}</h3>
        <span className="shrink-0 font-medium text-terracotta">
          {product.price}
        </span>
      </div>
      {product.description && (
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      )}
    </article>
  );
}
