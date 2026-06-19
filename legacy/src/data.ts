// ─────────────────────────────────────────────────────────────────────────────
// Add or edit items here. Each grid loops over its array automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface NailProduct {
  id: number;
  name: string;
  price: string;
  image: string; // URL or local path, e.g. "/images/my-set.jpg"
  description?: string;
}

export const PRODUCTS: NailProduct[] = [
  {
    id: 1,
    name: "Usahana Pastel Picnic Nails",
    price: "€35",
    image: "https://picsum.photos/seed/nail-picnic/400/400",
    description: "Soft pastel shades inspired by a sunny picnic day. Featuring adorable Usahana bunny details on a dreamy pink base.",
  },
  {
    id: 2,
    name: "Custom Nails",
    price: "€25",
    image: "https://picsum.photos/seed/nail-custom/400/400",
    description: "Fully customised to your style! Choose your shape, size, colour, and design. DM to discuss your dream set.",
  },
  {
    id: 3,
    name: "Red Apple Rilakkuma Nails",
    price: "€33",
    image: "https://picsum.photos/seed/nail-red-apple/400/400",
    description: "Sweet red apple accents paired with Rilakkuma bear charms. Comes with a glossy top coat and extra accent nail.",
  },
  {
    id: 4,
    name: "Green Fairy Core Nails",
    price: "€32",
    image: "https://picsum.photos/seed/nail-fairy/400/400",
    description: "Enchanted forest vibes with iridescent green shimmer, tiny mushroom decals, and delicate foliage art.",
  },
  {
    id: 5,
    name: "Green Apple Rilakkuma Nails",
    price: "€35",
    image: "https://picsum.photos/seed/nail-green-apple/400/400",
    description: "A fresh take on the Rilakkuma series — sage green base with hand-painted apple and bear details.",
  },
  {
    id: 6,
    name: "Smiski Picnic Nails",
    price: "€35",
    image: "https://picsum.photos/seed/nail-smiski/400/400",
    description: "Glow-in-the-dark Smiski characters on a milky white base. A playful, unique set that surprises at night.",
  },
  {
    id: 7,
    name: "Pastel Butterfly Dream Nails",
    price: "€30",
    image: "https://picsum.photos/seed/nail-butterfly/400/400",
    description: "Airy pastel butterflies with holographic wing detail. Light and feminine — perfect for any occasion.",
  },
  {
    id: 8,
    name: "Cherry Blossom Set",
    price: "€33",
    image: "https://picsum.photos/seed/nail-cherry/400/400",
    description: "Delicate sakura petals hand-painted on a sheer blush base. Elegant and timeless, inspired by spring in Japan.",
  },
  {
    id: 9,
    name: "Kawaii Bear Nails",
    price: "€35",
    image: "https://picsum.photos/seed/nail-bear/400/400",
    description: "Chubby kawaii bear faces with tiny bow accents. Available in beige, pink, or lavender base colours.",
  },
  {
    id: 10,
    name: "Strawberry Fields Nails",
    price: "€28",
    image: "https://picsum.photos/seed/nail-strawberry/400/400",
    description: "Juicy red strawberries on a soft cream base. Fresh, fun, and perfect for summer.",
  },
  {
    id: 11,
    name: "Lavender Cloud Nails",
    price: "€32",
    image: "https://picsum.photos/seed/nail-lavender/400/400",
    description: "Soft watercolour lavender with fluffy cloud details and a matte finish. Calm, cosy, and dreamy.",
  },
  {
    id: 12,
    name: "Ocean Wave Nails",
    price: "€30",
    image: "https://picsum.photos/seed/nail-ocean/400/400",
    description: "Deep blue ombre fading into seafoam, with pearl and shell charms. Brings the beach to your fingertips.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Makeups — add or edit items here.
// ─────────────────────────────────────────────────────────────────────────────

export const MAKEUPS: NailProduct[] = [
  {
    id: 1,
    name: "Rosewood Lip Set",
    price: "€18",
    image: "https://picsum.photos/seed/makeup-lip/400/400",
    description: "Velvety matte lip colour in three wearable rosewood shades. Long-lasting formula, hydrating finish.",
  },
  {
    id: 2,
    name: "Garnet Eyeshadow Palette",
    price: "€28",
    image: "https://picsum.photos/seed/makeup-eye/400/400",
    description: "Nine deep jewel-tone shades from champagne to deep burgundy. Buildable pigment, no fallout.",
  },
  {
    id: 3,
    name: "Dewy Glow Highlighter",
    price: "€22",
    image: "https://picsum.photos/seed/makeup-glow/400/400",
    description: "Soft pearl highlighter for a lit-from-within glow. Buildable on cheekbones, brow bones, and cupid's bow.",
  },
  {
    id: 4,
    name: "Vintage Blush Duo",
    price: "€20",
    image: "https://picsum.photos/seed/makeup-blush/400/400",
    description: "Two complementary blush tones — warm terracotta and dusty rose — pressed into one compact.",
  },
  {
    id: 5,
    name: "Brown Liner & Mascara Set",
    price: "€24",
    image: "https://picsum.photos/seed/makeup-liner/400/400",
    description: "Smudge-proof brown liner paired with a volumising mascara. A softer, more natural alternative to black.",
  },
  {
    id: 6,
    name: "Satin Skin Foundation",
    price: "€30",
    image: "https://picsum.photos/seed/makeup-foundation/400/400",
    description: "Medium-coverage satin finish. Lightweight, breathable formula available in 12 shades.",
  },
];
