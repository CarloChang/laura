/**
 * Editable palette colors and per-role font sizes for the storefront.
 *
 * Each setting is stored as one row in `theme_settings` (key → value). Color
 * values are hex strings; font values are unitless multipliers. The admin
 * "Appearance" page edits these, and the root layout injects them as CSS custom
 * properties that override the defaults in globals.css.
 */

export interface ColorToken {
  key: string;
  label: string;
  /** CSS custom properties this color drives (without the leading `--`). */
  vars: string[];
  default: string;
  group: "Core" | "Brand" | "Card";
  /** Where this color shows up on the site (shown as a hint in the admin). */
  desc: string;
}

export interface FontRole {
  key: string;
  label: string;
  /** CSS custom property holding the multiplier (without the leading `--`). */
  var: string;
  default: number;
  min: number;
  max: number;
  step: number;
  /** Where this size applies (shown as a hint in the admin). */
  desc: string;
  /** Example copy + the font class used to preview it in the admin. */
  sample: string;
  fontClass: string;
}

/** A selectable font, loaded by the root layout via next/font. */
export interface FontFamily {
  /** Stored value, e.g. "playfair". */
  key: string;
  label: string;
  /** The CSS font-family stack this resolves to. */
  stack: string;
}

/**
 * Per-element font override, keyed to the matching TEXT_FIELDS entry. Each text
 * element can pick its own font; until it's overridden it uses `default`'s font
 * (via the `--ef-*` CSS var default in globals.css), keeping its original look.
 */
export interface ElementFont {
  /** Setting key + CSS var name (e.g. "ef-hero-title"). */
  key: string;
  /** The text field this font belongs to (e.g. "hero-title"). */
  textKey: string;
  /** Default font key (a FONT_FAMILIES entry) — the element's original font. */
  default: string;
}

export interface TextField {
  key: string;
  label: string;
  /** Where this copy appears on the site (shown as a hint in the admin). */
  desc: string;
  default: string;
  multiline?: boolean;
}

/**
 * Per-element text color. Each headline can be recolored on its own; until it's
 * overridden it inherits `fallback`'s palette token (via the CSS var default in
 * globals.css), so it keeps tracking the global color.
 */
export interface ElementColor {
  /** Setting key + CSS var name (e.g. "c-nails-title"). */
  key: string;
  /** The text field this color belongs to (e.g. "nails-title"). */
  textKey: string;
  /** Palette token it inherits from until overridden. */
  fallback: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  // Core surfaces & text
  { key: "background", label: "Background", vars: ["background"], default: "#f5efe3", group: "Core", desc: "The page background behind everything." },
  { key: "card", label: "Card", vars: ["card", "popover"], default: "#fbf7ee", group: "Core", desc: "Product image tiles, the “cómo empezar” block, photo frames." },
  { key: "foreground", label: "Text", vars: ["foreground", "card-foreground", "popover-foreground"], default: "#1f1b16", group: "Core", desc: "Main text — paragraphs and most headings." },
  { key: "muted-foreground", label: "Muted text", vars: ["muted-foreground"], default: "#6b6253", group: "Core", desc: "Subtle text — captions and small labels." },
  { key: "muted", label: "Muted surface", vars: ["muted", "secondary"], default: "#ece3d2", group: "Core", desc: "Muted backgrounds and secondary buttons." },
  { key: "border", label: "Borders", vars: ["border", "input"], default: "#ddd0b8", group: "Core", desc: "Hairline borders and input outlines." },

  // Brand accents (also exposed as bg-terracotta, text-olive, … utilities)
  { key: "terracotta", label: "Terracotta (accent)", vars: ["terracotta", "accent", "ring"], default: "#7d2231", group: "Brand", desc: "The “laura.” dot, link hovers, prices, accent buttons." },
  { key: "olive", label: "Olive", vars: ["olive"], default: "#7c7c3e", group: "Brand", desc: "Olive-toned accents." },
  { key: "dusty", label: "Dusty blue", vars: ["dusty"], default: "#7d99a8", group: "Brand", desc: "Dusty-blue accents." },
  { key: "burgundy", label: "Burgundy", vars: ["burgundy"], default: "#7b2d3a", group: "Brand", desc: "Burgundy accents." },
  { key: "blush", label: "Blush", vars: ["blush"], default: "#e7b9a6", group: "Brand", desc: "Footer “¿hablamos?” script and link hovers." },
  { key: "paper", label: "Paper", vars: ["paper"], default: "#f5efe3", group: "Brand", desc: "Light text on dark areas (footer)." },
  { key: "ink", label: "Ink", vars: ["ink"], default: "#1f1b16", group: "Brand", desc: "The “Pedido custom” button, footer background, “Agotado” badge." },

  // Product detail popup (the open product card)
  { key: "pcard-bg", label: "Popup background", vars: ["pcard-bg"], default: "#c5e1a5", group: "Card", desc: "Background of the open product popup." },
  { key: "pcard-accent", label: "Name & price", vars: ["pcard-accent"], default: "#953553", group: "Card", desc: "Product name and price inside the popup." },
  { key: "pcard-text", label: "Description & labels", vars: ["pcard-text"], default: "#000000", group: "Card", desc: "Popup description and the product name on the grid." },
];

export const FONT_ROLES: FontRole[] = [
  { key: "fs-body", label: "Body text", var: "fs-body", default: 1, min: 0.8, max: 1.3, step: 0.05, desc: "Scales the whole site together.", sample: "Sets de press-ons hechos a mano.", fontClass: "font-body" },
  { key: "fs-heading", label: "Headings", var: "fs-heading", default: 1, min: 0.7, max: 1.6, step: 0.05, desc: "“cómo empezar” titles, footer links, product names.", sample: "Base Satin Skin", fontClass: "font-display" },
  { key: "fs-title", label: "Big titles", var: "fs-title", default: 1, min: 0.7, max: 1.6, step: 0.05, desc: "Hero “Press ons”, section titles, footer headline.", sample: "Hechas a medida", fontClass: "font-condensed" },
  { key: "fs-script", label: "Script accents", var: "fs-script", default: 1, min: 0.7, max: 1.6, step: 0.05, desc: "Cursive bits — “hecho a mano”, “¿hablamos?”.", sample: "hecho a mano", fontClass: "script" },
];

/**
 * Fonts loaded by the root layout (next/font), available to assign to any role.
 * The `stack` references the `--font-*` variable each font exposes.
 */
export const FONT_FAMILIES: FontFamily[] = [
  // Sans-serif
  { key: "inter", label: "Inter (sans-serif)", stack: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" },
  { key: "poppins", label: "Poppins (sans-serif)", stack: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif" },
  { key: "montserrat", label: "Montserrat (sans-serif)", stack: "var(--font-montserrat), ui-sans-serif, system-ui, sans-serif" },
  { key: "space-grotesk", label: "Space Grotesk (sans-serif)", stack: "var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif" },
  { key: "work-sans", label: "Work Sans (sans-serif)", stack: "var(--font-work-sans), ui-sans-serif, system-ui, sans-serif" },
  { key: "manrope", label: "Manrope (sans-serif)", stack: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif" },
  { key: "outfit", label: "Outfit (sans-serif)", stack: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif" },
  { key: "dm-sans", label: "DM Sans (sans-serif)", stack: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif" },
  { key: "plus-jakarta", label: "Plus Jakarta Sans (sans-serif)", stack: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif" },
  { key: "figtree", label: "Figtree (sans-serif)", stack: "var(--font-figtree), ui-sans-serif, system-ui, sans-serif" },

  // Serif
  { key: "dm-serif", label: "DM Serif Display (serif)", stack: "var(--font-dm-serif), ui-serif, Georgia, serif" },
  { key: "playfair", label: "Playfair Display (serif)", stack: "var(--font-playfair), ui-serif, Georgia, serif" },
  { key: "cormorant", label: "Cormorant (serif)", stack: "var(--font-cormorant), ui-serif, Georgia, serif" },
  { key: "eb-garamond", label: "EB Garamond (serif)", stack: "var(--font-eb-garamond), ui-serif, Georgia, serif" },
  { key: "lora", label: "Lora (serif)", stack: "var(--font-lora), ui-serif, Georgia, serif" },
  { key: "merriweather", label: "Merriweather (serif)", stack: "var(--font-merriweather), ui-serif, Georgia, serif" },
  { key: "fraunces", label: "Fraunces (serif)", stack: "var(--font-fraunces), ui-serif, Georgia, serif" },
  { key: "spectral", label: "Spectral (serif)", stack: "var(--font-spectral), ui-serif, Georgia, serif" },
  { key: "source-serif", label: "Source Serif 4 (serif)", stack: "var(--font-source-serif), ui-serif, Georgia, serif" },
  { key: "libre-baskerville", label: "Libre Baskerville (serif)", stack: "var(--font-libre-baskerville), ui-serif, Georgia, serif" },

  // Condensed / display sans
  { key: "anton", label: "Anton (condensed)", stack: 'var(--font-anton), "Arial Narrow", sans-serif' },
  { key: "oswald", label: "Oswald (condensed)", stack: 'var(--font-oswald), "Arial Narrow", sans-serif' },
  { key: "bebas-neue", label: "Bebas Neue (condensed)", stack: 'var(--font-bebas-neue), "Arial Narrow", sans-serif' },
  { key: "archivo-narrow", label: "Archivo Narrow (condensed)", stack: 'var(--font-archivo-narrow), "Arial Narrow", sans-serif' },
  { key: "saira-condensed", label: "Saira Condensed (condensed)", stack: 'var(--font-saira-condensed), "Arial Narrow", sans-serif' },

  // Handwritten / script
  { key: "caveat", label: "Caveat (handwritten)", stack: "var(--font-caveat), cursive" },
  { key: "ballet", label: "Ballet (script)", stack: "var(--font-ballet), cursive" },
  { key: "pacifico", label: "Pacifico (script)", stack: "var(--font-pacifico), cursive" },
  { key: "dancing-script", label: "Dancing Script (script)", stack: "var(--font-dancing-script), cursive" },
  { key: "satisfy", label: "Satisfy (script)", stack: "var(--font-satisfy), cursive" },
  { key: "sacramento", label: "Sacramento (script)", stack: "var(--font-sacramento), cursive" },
  { key: "great-vibes", label: "Great Vibes (script)", stack: "var(--font-great-vibes), cursive" },
  { key: "lobster", label: "Lobster (script)", stack: "var(--font-lobster), cursive" },
  { key: "permanent-marker", label: "Permanent Marker (marker)", stack: "var(--font-permanent-marker), cursive" },
  { key: "shadows-into-light", label: "Shadows Into Light (handwritten)", stack: "var(--font-shadows-into-light), cursive" },

  // Display
  { key: "bitcount", label: "Bitcount Ink (display)", stack: "var(--font-bitcount), system-ui" },
  { key: "abril-fatface", label: "Abril Fatface (display)", stack: "var(--font-abril-fatface), system-ui" },
  { key: "bungee", label: "Bungee (display)", stack: "var(--font-bungee), system-ui" },
  { key: "righteous", label: "Righteous (display)", stack: "var(--font-righteous), system-ui" },
  { key: "monoton", label: "Monoton (display)", stack: "var(--font-monoton), system-ui" },

  // Monospace
  { key: "monocraft", label: "Monocraft (monospace)", stack: "var(--font-monocraft), monospace" },
  { key: "jetbrains-mono", label: "JetBrains Mono (monospace)", stack: "var(--font-jetbrains-mono), monospace" },
  { key: "space-mono", label: "Space Mono (monospace)", stack: "var(--font-space-mono), monospace" },
  { key: "roboto-mono", label: "Roboto Mono (monospace)", stack: "var(--font-roboto-mono), monospace" },
];

/** Stack for a font key, or the body default if unknown. */
export function fontStack(key: string): string {
  return (
    FONT_FAMILIES.find((f) => f.key === key)?.stack ?? FONT_FAMILIES[0].stack
  );
}

export const TEXT_FIELDS: TextField[] = [
  { key: "header-logo", label: "Logo", desc: "Top-left brand name (the “.” after it stays in the accent color).", default: "laura" },
  { key: "header-cta", label: "Header button", desc: "The button in the top-right of every page.", default: "Pedido custom" },
  { key: "hero-badge", label: "Hero badge", desc: "Small pill above the hero title.", default: "Personalizadas · hechas a mano" },
  { key: "hero-title", label: "Hero title", desc: "The big hero headline.", default: "Press ons" },
  { key: "hero-subtitle", label: "Hero subtitle", desc: "Accent line under the hero title.", default: "@lauu.muaa" },
  { key: "hero-text", label: "Hero paragraph", desc: "Intro paragraph in the hero.", default: "Sets de press-ons personalizados y belleza vintage cuidadosamente seleccionada — hechos a mano y enviados con cariño. Elige un diseño o imagina el tuyo.", multiline: true },
  { key: "nails-kicker", label: "Nails — kicker", desc: "Small label above the nails section title (blank by default).", default: "" },
  { key: "nails-title", label: "Nails — title", desc: "Heading of the nails product section.", default: "Hechas a medida" },
  { key: "nails-script", label: "Nails — script", desc: "Cursive accent beside the nails title (blank by default).", default: "" },
  { key: "beauty-kicker", label: "Beauty — kicker", desc: "Small label above the beauty section title.", default: "Belleza seleccionada" },
  { key: "beauty-title", label: "Beauty — title", desc: "Heading of the beauty product section.", default: "Maquillaje y más" },
  { key: "beauty-script", label: "Beauty — script", desc: "Cursive accent beside the beauty title.", default: "vibras vintage" },
  { key: "custom-script", label: "Custom page — script", desc: "Cursive accent above the title on the “Pedido custom” page.", default: "hecho solo para ti" },
  { key: "custom-title", label: "Custom page — title", desc: "Headline on the “Pedido custom” page.", default: "Press-ons custom" },
  { key: "custom-text", label: "Custom page — paragraph", desc: "Intro paragraph on the “Pedido custom” page.", default: "¿Sueñas con un set que todavía no existe? Elige tu forma, largo y diseño y lo elaboro a mano desde cero. Rellena el formulario y me pongo en contacto contigo.", multiline: true },

  // Footer (appears on every page)
  { key: "footer-script", label: "Footer — script", desc: "Cursive accent at the top of the footer.", default: "¿hablamos?" },
  { key: "footer-title", label: "Footer — title", desc: "Footer headline.", default: "Pedidos y contacto" },
  { key: "footer-text", label: "Footer — paragraph", desc: "Paragraph under the footer title.", default: "¿Tienes una duda o un diseño soñado? Escríbeme por Instagram o al correo — respondo en menos de 24h.", multiline: true },
  { key: "footer-email", label: "Footer — email", desc: "Contact email — shown as the button and used for its mailto link.", default: "hello@laura.com" },
  { key: "footer-follow", label: "Footer — follow label", desc: "Small label above the social links.", default: "Sígueme" },
  { key: "footer-tagline", label: "Footer — tagline", desc: "Small line in the footer’s bottom bar.", default: "Hecho a mano con cariño" },
  { key: "footer-instagram", label: "Footer — Instagram link", desc: "URL for the Instagram link (leave blank to hide it).", default: "https://www.instagram.com/lauu.muaa" },
  { key: "footer-tiktok", label: "Footer — TikTok link", desc: "URL for the TikTok link (leave blank to hide it).", default: "https://tiktok.com" },
  { key: "footer-pinterest", label: "Footer — Pinterest link", desc: "URL for the Pinterest link (leave blank to hide it).", default: "https://pinterest.com" },
];

/**
 * Per-headline color overrides, keyed to the matching TEXT_FIELDS entry. The
 * CSS var defaults live in globals.css (so they inherit `fallback`); these only
 * emit an override once the admin picks a specific color.
 */
export const ELEMENT_COLORS: ElementColor[] = [
  { key: "c-logo", textKey: "header-logo", fallback: "foreground" },
  { key: "c-hero-badge", textKey: "hero-badge", fallback: "foreground" },
  { key: "c-hero-title", textKey: "hero-title", fallback: "foreground" },
  { key: "c-hero-subtitle", textKey: "hero-subtitle", fallback: "terracotta" },
  { key: "c-hero-text", textKey: "hero-text", fallback: "foreground" },
  { key: "c-nails-kicker", textKey: "nails-kicker", fallback: "terracotta" },
  { key: "c-nails-title", textKey: "nails-title", fallback: "foreground" },
  { key: "c-nails-script", textKey: "nails-script", fallback: "foreground" },
  { key: "c-beauty-kicker", textKey: "beauty-kicker", fallback: "terracotta" },
  { key: "c-beauty-title", textKey: "beauty-title", fallback: "foreground" },
  { key: "c-beauty-script", textKey: "beauty-script", fallback: "foreground" },
  { key: "c-custom-script", textKey: "custom-script", fallback: "terracotta" },
  { key: "c-custom-title", textKey: "custom-title", fallback: "foreground" },
  { key: "c-custom-text", textKey: "custom-text", fallback: "muted-foreground" },
  { key: "c-footer-script", textKey: "footer-script", fallback: "blush" },
  { key: "c-footer-title", textKey: "footer-title", fallback: "paper" },
  { key: "c-footer-text", textKey: "footer-text", fallback: "paper" },
  { key: "c-footer-email", textKey: "footer-email", fallback: "paper" },
];

/** The palette-token default hex an element color inherits from. */
export function elementColorDefault(key: string): string {
  const el = ELEMENT_COLORS.find((e) => e.key === key);
  if (!el) return "#000000";
  return COLOR_TOKENS.find((t) => t.key === el.fallback)?.default ?? "#000000";
}

/**
 * Per-element font overrides, keyed to the matching TEXT_FIELDS entry. The
 * `--ef-*` defaults live in globals.css (each element's original font); these
 * only emit an override once the admin picks a different font.
 */
export const ELEMENT_FONTS: ElementFont[] = [
  { key: "ef-logo", textKey: "header-logo", default: "playfair" },
  { key: "ef-hero-badge", textKey: "hero-badge", default: "inter" },
  { key: "ef-hero-title", textKey: "hero-title", default: "bitcount" },
  { key: "ef-hero-subtitle", textKey: "hero-subtitle", default: "playfair" },
  { key: "ef-hero-text", textKey: "hero-text", default: "inter" },
  { key: "ef-nails-kicker", textKey: "nails-kicker", default: "inter" },
  { key: "ef-nails-title", textKey: "nails-title", default: "monocraft" },
  { key: "ef-nails-script", textKey: "nails-script", default: "caveat" },
  { key: "ef-beauty-kicker", textKey: "beauty-kicker", default: "inter" },
  { key: "ef-beauty-title", textKey: "beauty-title", default: "monocraft" },
  { key: "ef-beauty-script", textKey: "beauty-script", default: "caveat" },
  { key: "ef-custom-script", textKey: "custom-script", default: "caveat" },
  { key: "ef-custom-title", textKey: "custom-title", default: "anton" },
  { key: "ef-custom-text", textKey: "custom-text", default: "inter" },
  { key: "ef-footer-script", textKey: "footer-script", default: "caveat" },
  { key: "ef-footer-title", textKey: "footer-title", default: "anton" },
  { key: "ef-footer-text", textKey: "footer-text", default: "inter" },
  { key: "ef-footer-email", textKey: "footer-email", default: "inter" },
];

/** The font key an element uses until overridden. */
export function elementFontDefault(key: string): string {
  return ELEMENT_FONTS.find((e) => e.key === key)?.default ?? FONT_FAMILIES[0].key;
}

export type ThemeSettings = Record<string, string>;

/** Default value for a setting key (used by the admin form before any save). */
export function defaultFor(key: string): string {
  const color = COLOR_TOKENS.find((t) => t.key === key);
  if (color) return color.default;
  const font = FONT_ROLES.find((f) => f.key === key);
  if (font) return String(font.default);
  const text = TEXT_FIELDS.find((t) => t.key === key);
  if (text) return text.default;
  if (ELEMENT_COLORS.some((e) => e.key === key)) return elementColorDefault(key);
  if (ELEMENT_FONTS.some((e) => e.key === key)) return elementFontDefault(key);
  return "";
}

/** Resolves an editable text field to its saved value, or its default. */
export function textValue(settings: ThemeSettings, key: string): string {
  const saved = settings[key];
  if (saved !== undefined && saved !== null) return saved;
  return TEXT_FIELDS.find((t) => t.key === key)?.default ?? "";
}

/**
 * Builds the CSS that overrides globals.css with the saved theme. Only keys that
 * differ from their default are emitted, so an empty/partial table is harmless.
 * `:root:root` raises specificity above globals.css's `:root` so it always wins.
 */
export function buildThemeCss(settings: ThemeSettings): string {
  const lines: string[] = [];

  for (const token of COLOR_TOKENS) {
    const value = settings[token.key];
    if (!value || value === token.default) continue;
    for (const v of token.vars) lines.push(`--${v}: ${value};`);
  }

  for (const role of FONT_ROLES) {
    const value = settings[role.key];
    if (!value || Number(value) === role.default) continue;
    lines.push(`--${role.var}: ${value};`);
  }

  // Per-element fonts: emit an --ef-* override only when a non-default font is
  // chosen, so untouched elements keep globals.css's original font.
  for (const el of ELEMENT_FONTS) {
    const value = settings[el.key];
    if (!value || value === el.default) continue;
    if (!FONT_FAMILIES.some((f) => f.key === value)) continue;
    lines.push(`--${el.key}: ${fontStack(value)};`);
  }

  // Per-element colors only override once they differ from the inherited token,
  // so untouched headlines keep following their palette color.
  for (const el of ELEMENT_COLORS) {
    const value = settings[el.key];
    if (!value) continue;
    if (value.toLowerCase() === elementColorDefault(el.key).toLowerCase()) continue;
    lines.push(`--${el.key}: ${value};`);
  }

  if (lines.length === 0) return "";
  return `:root:root{${lines.join("")}}`;
}
