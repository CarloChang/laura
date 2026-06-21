import type { AboutSection } from "@/lib/types";

export function About({ sections }: { sections: AboutSection[] }) {
  if (sections.length === 0) return null;
  return (
    <section
      id="start"
      className="scroll-mt-20 border-y border-border bg-card/60"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="mb-14 text-center">
          <span className="script text-[calc(3rem*var(--fs-script))] text-terracotta sm:text-[calc(3.75rem*var(--fs-script))]">
            cómo empezar
          </span>
          <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
            todo lo que necesitas saber antes de pedir
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={section.id}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <div className={flip ? "md:order-2" : ""}>
                  <h3 className="mb-3 inline-block font-display text-[calc(1.875rem*var(--fs-heading))]">
                    {section.title}
                  </h3>
                  <p className="whitespace-pre-line leading-relaxed text-foreground/80">
                    {section.text}
                  </p>
                </div>
                {section.images.length > 0 && (
                  <div
                    className={`flex gap-4 ${flip ? "md:order-1" : ""}`}
                  >
                    {section.images.slice(0, 2).map((src, j) => (
                      <div
                        key={j}
                        className="overflow-hidden shadow-lg"
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-44 w-full object-cover sm:h-56"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
