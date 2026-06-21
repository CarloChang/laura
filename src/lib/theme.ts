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
  group: "Core" | "Brand";
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
}

export const COLOR_TOKENS: ColorToken[] = [
  // Core surfaces & text
  { key: "background", label: "Background", vars: ["background"], default: "#f5efe3", group: "Core" },
  { key: "card", label: "Card", vars: ["card", "popover"], default: "#fbf7ee", group: "Core" },
  { key: "foreground", label: "Text", vars: ["foreground", "card-foreground", "popover-foreground"], default: "#1f1b16", group: "Core" },
  { key: "muted-foreground", label: "Muted text", vars: ["muted-foreground"], default: "#6b6253", group: "Core" },
  { key: "muted", label: "Muted surface", vars: ["muted", "secondary"], default: "#ece3d2", group: "Core" },
  { key: "border", label: "Borders", vars: ["border", "input"], default: "#ddd0b8", group: "Core" },

  // Brand accents (also exposed as bg-terracotta, text-olive, … utilities)
  { key: "terracotta", label: "Terracotta (accent)", vars: ["terracotta", "accent", "ring"], default: "#7d2231", group: "Brand" },
  { key: "olive", label: "Olive", vars: ["olive"], default: "#7c7c3e", group: "Brand" },
  { key: "dusty", label: "Dusty blue", vars: ["dusty"], default: "#7d99a8", group: "Brand" },
  { key: "burgundy", label: "Burgundy", vars: ["burgundy"], default: "#7b2d3a", group: "Brand" },
  { key: "blush", label: "Blush", vars: ["blush"], default: "#e7b9a6", group: "Brand" },
  { key: "paper", label: "Paper", vars: ["paper"], default: "#f5efe3", group: "Brand" },
  { key: "ink", label: "Ink", vars: ["ink"], default: "#1f1b16", group: "Brand" },
];

export const FONT_ROLES: FontRole[] = [
  { key: "fs-body", label: "Body text", var: "fs-body", default: 1, min: 0.8, max: 1.3, step: 0.05 },
  { key: "fs-heading", label: "Headings", var: "fs-heading", default: 1, min: 0.7, max: 1.6, step: 0.05 },
  { key: "fs-title", label: "Big titles", var: "fs-title", default: 1, min: 0.7, max: 1.6, step: 0.05 },
  { key: "fs-script", label: "Script accents", var: "fs-script", default: 1, min: 0.7, max: 1.6, step: 0.05 },
];

export type ThemeSettings = Record<string, string>;

/** Default value for a setting key (used by the admin form before any save). */
export function defaultFor(key: string): string {
  const color = COLOR_TOKENS.find((t) => t.key === key);
  if (color) return color.default;
  const font = FONT_ROLES.find((f) => f.key === key);
  if (font) return String(font.default);
  return "";
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

  if (lines.length === 0) return "";
  return `:root:root{${lines.join("")}}`;
}
