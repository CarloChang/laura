import Link from "next/link";
import { getThemeSettings } from "@/lib/theme-data";
import { textValue } from "@/lib/theme";

const NAV = [
  { label: "Uñas", href: "/#nails" },
  { label: "Belleza", href: "/#beauty" },
  { label: "Personalizadas", href: "/custom" },
  { label: "Cómo empezar", href: "/#start" },
  { label: "Contacto", href: "/#contact" },
];

export async function Header() {
  const settings = await getThemeSettings();
  const logo = textValue(settings, "header-logo");
  const cta = textValue(settings, "header-cta");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-playfair text-2xl tracking-tight text-(--c-logo)"
          style={{ fontFamily: "var(--ef-logo)" }}
        >
          {logo}
          <span className="text-terracotta">.</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-foreground/70 transition-colors hover:text-terracotta"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Link
          href="/custom"
          className="border border-ink bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-terracotta hover:border-terracotta"
        >
          {cta}
        </Link>
      </div>
    </header>
  );
}
