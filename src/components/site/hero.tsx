export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        {/* copy */}
        <div className="relative z-10">
          <p className="mb-4 inline-block rounded-full border border-ink/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/70">
            Handmade · made to order
          </p>
          <h1 className="font-condensed text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
            Let your
            <br />
            nails do
            <br />
            <span className="text-terracotta">the talking.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Custom press-on nail sets and curated vintage-inspired beauty —
            crafted by hand, shipped with love. Pick a design or dream up your
            own.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#nails"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Browse all designs
            </a>
            <a
              href="/custom"
              className="rounded-full border border-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-ink hover:text-primary-foreground"
            >
              Design your own
            </a>
          </div>
        </div>

        {/* image collage */}
        <div className="relative h-[360px] sm:h-[440px]">
          <div className="absolute right-0 top-0 h-56 w-44 -rotate-3 overflow-hidden rounded-md border-4 border-card shadow-xl sm:h-72 sm:w-56">
            <img
              src="https://picsum.photos/seed/laura-hero1/600/800"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-2 h-48 w-40 rotate-2 overflow-hidden rounded-md border-4 border-card shadow-xl sm:h-60 sm:w-52">
            <img
              src="https://picsum.photos/seed/laura-hero2/600/700"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <span className="script absolute -bottom-2 right-6 rotate-[-6deg] text-4xl text-terracotta sm:text-5xl">
            hecho a mano
          </span>
        </div>
      </div>
    </section>
  );
}
