export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-orchid.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        {/* light veil — keeps text readable on the left, lets the orchid show */}
        <div className="absolute inset-0 bg-linear-to-r from-paper via-paper/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background/10 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        {/* copy */}
        <div className="relative z-10">
          <p className="mb-4 inline-block border border-ink/30 bg-paper/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground/70 backdrop-blur-sm">
            Personalizadas · hechas a mano
          </p>
          <h1 className="font-bitcount text-6xl leading-[1.02] sm:text-7xl lg:text-8xl">
            Press ons
            <br />
            <span className="font-playfair text-4xl text-terracotta">@lauu.muaa</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-foreground/80">
            Sets de press-ons personalizados y belleza vintage cuidadosamente
            seleccionada — hechos a mano y enviados con cariño. Elige un diseño o
            imagina el tuyo.
          </p>
        </div>

        {/* script accent sits over the faded orchid on the right */}
        <div className="relative hidden h-64 md:block">
          <span className="script absolute bottom-4 right-6 rotate-[-6deg] text-5xl text-terracotta lg:text-6xl">
            hecho a mano
          </span>
        </div>
      </div>
    </section>
  );
}
