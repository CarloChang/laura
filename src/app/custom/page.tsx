import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CustomForm } from "@/components/site/custom-form";

export const metadata: Metadata = {
  title: "Custom Nails — Laura",
  description:
    "Request a fully custom press-on nail set, made to measure just for you.",
};

const STEPS = [
  "Tell me your design dream & sizing below.",
  "I confirm availability, price and timing within 24h.",
  "You pay and I handcraft your set.",
  "It ships — usually in 7–14 days. 💅",
];

export default function CustomPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <span className="script text-5xl text-terracotta sm:text-6xl">
              made just for you
            </span>
            <h1 className="mt-2 font-condensed text-6xl uppercase leading-none sm:text-7xl">
              Custom nails
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Dreaming of a set that doesn&apos;t exist yet? Pick your shape,
              length and design and I&apos;ll handcraft it from scratch. Fill in
              the form and I&apos;ll be in touch.
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
