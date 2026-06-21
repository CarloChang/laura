/**
 * Settings for the "Pedido custom" order form, edited from the admin "Custom"
 * section and stored as rows in `theme_settings` (key → value), the same store
 * used for theme/text. These cover the nail-size field: its label, helper text,
 * and an example image or video so customers understand what to send.
 */

export const CUSTOM_KEYS = {
  sizeLabel: "custom-size-label",
  sizeHelp: "custom-size-help",
  sizeMedia: "custom-size-media",
  sizeMediaType: "custom-size-media-type",
} as const;

export type CustomMediaType = "image" | "video";

export const CUSTOM_DEFAULTS: Record<string, string> = {
  [CUSTOM_KEYS.sizeLabel]: "Tamaño de tus uñas (foto con una moneda)",
  [CUSTOM_KEYS.sizeHelp]:
    "Haz una foto de tu uña junto a una moneda para que pueda calcular la talla, como en el ejemplo.",
  [CUSTOM_KEYS.sizeMedia]: "",
  [CUSTOM_KEYS.sizeMediaType]: "image",
};

/** Resolves a custom-form setting to its saved value, or its default. */
export function customValue(
  settings: Record<string, string>,
  key: string,
): string {
  const saved = settings[key];
  if (saved !== undefined && saved !== null) return saved;
  return CUSTOM_DEFAULTS[key] ?? "";
}
