const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto scroll-mt-20 border-t border-border bg-ink text-paper"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="script text-4xl text-blush">¿hablamos?</p>
            <h2 className="mt-2 font-condensed text-5xl uppercase leading-none text-paper sm:text-6xl">
              Order &amp; contact
            </h2>
            <p className="mt-4 max-w-sm text-paper/70">
              Got a question or a dream design? Message me on Instagram or drop
              an email — I reply within 24h.
            </p>
            <a
              href="mailto:hello@laura.com"
              className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              hello@laura.com
            </a>
          </div>
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p className="text-xs uppercase tracking-widest text-paper/50">
              Follow along
            </p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-2xl text-paper transition-colors hover:text-blush"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Laura — Press-on Nails &amp; Beauty</span>
          <span>Hecho a mano con cariño</span>
        </div>
      </div>
    </footer>
  );
}
