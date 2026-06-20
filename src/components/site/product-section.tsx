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
    <section id={id} className="relative scroll-mt-20 overflow-hidden">
      {/* fixed to the viewport: the image stays put while products scroll over it */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url(/product-section.jpg)" }}
      />
      {/* just the fade — image dissolves into the page, no side veil */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/20 to-background" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
            {kicker}
          </p>
          <h2 className="font-condensed text-5xl uppercase leading-none sm:text-6xl">
            {title}
          </h2>
        </div>
        {script && (
          <span className="script text-3xl text-foreground/50 sm:text-4xl">
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
