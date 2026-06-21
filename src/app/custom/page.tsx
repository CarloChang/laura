import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CustomForm } from "@/components/site/custom-form";
import { getThemeSettings } from "@/lib/theme-data";
import { textValue } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Press-ons personalizados — Laura",
  description:
    "Pide un set de press-ons totalmente personalizado, hecho a tu medida.",
};

const STEPS = [
  "Cuéntame tu diseño soñado y tu talla aquí abajo.",
  "Confirmo disponibilidad, precio y tiempos en menos de 24h.",
  "Pagas y elaboro tu set a mano.",
  "Se envía — normalmente en 7–14 días. 💅",
];

export default async function CustomPage() {
  const settings = await getThemeSettings();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <span className="script text-[calc(3rem*var(--fs-script))] text-(--c-custom-script) sm:text-[calc(3.75rem*var(--fs-script))]">
              {textValue(settings, "custom-script")}
            </span>
            <h1 className="mt-2 font-condensed text-[calc(3.75rem*var(--fs-title))] uppercase leading-none text-(--c-custom-title) sm:text-[calc(4.5rem*var(--fs-title))]">
              {textValue(settings, "custom-title")}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-(--c-custom-text)">
              {textValue(settings, "custom-text")}
            </p>
          </div>
        </section>

        <section className="bg-card/60">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
            {STEPS.map((step, i) => (
              <div key={i}>
                <span className="font-display text-3xl text-terracotta">
                  {i + 1}
                </span>
                <p className="mt-1 text-sm text-foreground/80">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
          <CustomForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
