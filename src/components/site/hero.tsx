import { getThemeSettings } from "@/lib/theme-data";
import { textValue } from "@/lib/theme";

export async function Hero() {
  const settings = await getThemeSettings();
  const badge = textValue(settings, "hero-badge");
  const title = textValue(settings, "hero-title");
  const subtitle = textValue(settings, "hero-subtitle");
  const text = textValue(settings, "hero-text");

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
          <p className="mb-4 inline-block border border-ink/30 bg-paper/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-(--c-hero-badge) backdrop-blur-sm">
            {badge}
          </p>
          <h1 className="font-bitcount text-[calc(3.75rem*var(--fs-title))] leading-[1.02] text-(--c-hero-title) sm:text-[calc(4.5rem*var(--fs-title))] lg:text-[calc(6rem*var(--fs-title))]">
            {title}
            <br />
            <span className="font-playfair text-[calc(2.25rem*var(--fs-heading))] text-(--c-hero-subtitle)">{subtitle}</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-(--c-hero-text)">{text}</p>
        </div>

        {/* script accent sits over the faded orchid on the right */}
        <div className="relative hidden h-64 md:block">
          <span className="script absolute bottom-4 right-6 rotate-[-6deg] text-[calc(3rem*var(--fs-script))] text-terracotta lg:text-[calc(3.75rem*var(--fs-script))]">
            hecho a mano
          </span>
        </div>
      </div>
    </section>
  );
}
