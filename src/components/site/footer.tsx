import { getThemeSettings } from "@/lib/theme-data";
import { textValue } from "@/lib/theme";

export async function Footer() {
  const settings = await getThemeSettings();
  const email = textValue(settings, "footer-email");

  const socials = [
    { label: "Instagram", href: textValue(settings, "footer-instagram") },
    { label: "TikTok", href: textValue(settings, "footer-tiktok") },
    { label: "Pinterest", href: textValue(settings, "footer-pinterest") },
  ].filter((s) => s.href.trim() !== "");

  return (
    <footer
      id="contact"
      className="mt-auto scroll-mt-20 border-t border-border bg-ink text-paper"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="script text-[calc(2.25rem*var(--fs-script))] text-(--c-footer-script)">
              {textValue(settings, "footer-script")}
            </p>
            <h2 className="mt-2 font-condensed text-[calc(3rem*var(--fs-title))] uppercase leading-none text-(--c-footer-title) sm:text-[calc(3.75rem*var(--fs-title))]">
              {textValue(settings, "footer-title")}
            </h2>
            <p className="mt-4 max-w-sm text-(--c-footer-text)">
              {textValue(settings, "footer-text")}
            </p>
            {email.trim() !== "" && (
              <a
                href={`mailto:${email}`}
                className="mt-6 inline-block bg-terracotta px-6 py-3 text-sm font-semibold uppercase tracking-wide text-(--c-footer-email) transition-opacity hover:opacity-90"
              >
                {email}
              </a>
            )}
          </div>
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p className="text-xs uppercase tracking-widest text-paper/50">
              {textValue(settings, "footer-follow")}
            </p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[calc(1.5rem*var(--fs-heading))] text-paper transition-colors hover:text-blush"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Laura — Press-ons y belleza</span>
          <span>{textValue(settings, "footer-tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
