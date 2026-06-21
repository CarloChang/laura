import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

interface Props {
  id: string;
  kicker: string;
  title: string;
  script?: string;
  products: Product[];
}

export function ProductSection({ id, kicker, title, script, products }: Props) {
  if (products.length === 0) return null;
  return (
    <section id={id} className="relative scroll-mt-20">
      {/*
        Per-section background pinned to the viewport. We use a sticky element
        instead of `background-attachment: fixed` because the latter renders
        zoomed/blurry on iOS Safari. The sticky window stays put while the
        products scroll over it, and is naturally clipped to this section.
      */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/product-section.jpg)" }}
          />
          {/* just the fade — image dissolves into the page, no side veil */}
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/20 to-background" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            {kicker}
          </p>
          <h2 className="flex items-center gap-3 font-monocraft text-[calc(1.5rem*var(--fs-title))] leading-none sm:text-[calc(3.75rem*var(--fs-title))]">
            <img src="/icon.png" alt="" aria-hidden className="h-[1.2em] w-auto shrink-0" />
            {title}
          </h2>
        </div>
        {script && (
          <span className="script text-[calc(1.875rem*var(--fs-script))] text-foreground/50 sm:text-[calc(2.25rem*var(--fs-script))]">
            {script}
          </span>
        )}
      </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
