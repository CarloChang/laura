import type { Product, AboutSection } from "./types";

// Ported from the original src/data.ts. Used as fallback content before
// Supabase is connected, and as the source for the DB seed script.

export const SEED_PRODUCTS: Product[] = [
  { category: "nails", name: "Usahana Pastel Picnic Nails", price: "€35", image: "https://picsum.photos/seed/nail-picnic/600/600", description: "Soft pastel shades inspired by a sunny picnic day. Featuring adorable Usahana bunny details on a dreamy pink base." },
  { category: "nails", name: "Custom Nails", price: "€25", image: "https://picsum.photos/seed/nail-custom/600/600", description: "Fully customised to your style! Choose your shape, size, colour, and design. DM to discuss your dream set." },
  { category: "nails", name: "Red Apple Rilakkuma Nails", price: "€33", image: "https://picsum.photos/seed/nail-red-apple/600/600", description: "Sweet red apple accents paired with Rilakkuma bear charms. Comes with a glossy top coat and extra accent nail." },
  { category: "nails", name: "Green Fairy Core Nails", price: "€32", image: "https://picsum.photos/seed/nail-fairy/600/600", description: "Enchanted forest vibes with iridescent green shimmer, tiny mushroom decals, and delicate foliage art." },
  { category: "nails", name: "Green Apple Rilakkuma Nails", price: "€35", image: "https://picsum.photos/seed/nail-green-apple/600/600", description: "A fresh take on the Rilakkuma series — sage green base with hand-painted apple and bear details." },
  { category: "nails", name: "Smiski Picnic Nails", price: "€35", image: "https://picsum.photos/seed/nail-smiski/600/600", description: "Glow-in-the-dark Smiski characters on a milky white base. A playful, unique set that surprises at night." },
  { category: "nails", name: "Pastel Butterfly Dream Nails", price: "€30", image: "https://picsum.photos/seed/nail-butterfly/600/600", description: "Airy pastel butterflies with holographic wing detail. Light and feminine — perfect for any occasion." },
  { category: "nails", name: "Cherry Blossom Set", price: "€33", image: "https://picsum.photos/seed/nail-cherry/600/600", description: "Delicate sakura petals hand-painted on a sheer blush base. Elegant and timeless, inspired by spring in Japan." },
  { category: "nails", name: "Kawaii Bear Nails", price: "€35", image: "https://picsum.photos/seed/nail-bear/600/600", description: "Chubby kawaii bear faces with tiny bow accents. Available in beige, pink, or lavender base colours." },
  { category: "nails", name: "Strawberry Fields Nails", price: "€28", image: "https://picsum.photos/seed/nail-strawberry/600/600", description: "Juicy red strawberries on a soft cream base. Fresh, fun, and perfect for summer." },
  { category: "nails", name: "Lavender Cloud Nails", price: "€32", image: "https://picsum.photos/seed/nail-lavender/600/600", description: "Soft watercolour lavender with fluffy cloud details and a matte finish. Calm, cosy, and dreamy." },
  { category: "nails", name: "Ocean Wave Nails", price: "€30", image: "https://picsum.photos/seed/nail-ocean/600/600", description: "Deep blue ombre fading into seafoam, with pearl and shell charms. Brings the beach to your fingertips." },
  { category: "makeup", name: "Rosewood Lip Set", price: "€18", image: "https://picsum.photos/seed/makeup-lip/600/600", description: "Velvety matte lip colour in three wearable rosewood shades. Long-lasting formula, hydrating finish." },
  { category: "makeup", name: "Garnet Eyeshadow Palette", price: "€28", image: "https://picsum.photos/seed/makeup-eye/600/600", description: "Nine deep jewel-tone shades from champagne to deep burgundy. Buildable pigment, no fallout." },
  { category: "makeup", name: "Dewy Glow Highlighter", price: "€22", image: "https://picsum.photos/seed/makeup-glow/600/600", description: "Soft pearl highlighter for a lit-from-within glow. Buildable on cheekbones, brow bones, and cupid's bow." },
  { category: "makeup", name: "Vintage Blush Duo", price: "€20", image: "https://picsum.photos/seed/makeup-blush/600/600", description: "Two complementary blush tones — warm terracotta and dusty rose — pressed into one compact." },
  { category: "makeup", name: "Brown Liner & Mascara Set", price: "€24", image: "https://picsum.photos/seed/makeup-liner/600/600", description: "Smudge-proof brown liner paired with a volumising mascara. A softer, more natural alternative to black." },
  { category: "makeup", name: "Satin Skin Foundation", price: "€30", image: "https://picsum.photos/seed/makeup-foundation/600/600", description: "Medium-coverage satin finish. Lightweight, breathable formula available in 12 shades." },
].map((p, i) => ({
  ...p,
  id: `seed-${i + 1}`,
  sold_out: false,
  sort_order: i,
})) as Product[];

export const SEED_ABOUT: AboutSection[] = [
  {
    title: "Quién soy",
    text: "¡Hola! Soy Laura, apasionada por el nail art y los cosméticos vintage. Cada set que creo es hecho a mano con cariño, pensando en los detalles que hacen la diferencia. Me inspiro en la estética retro, lo femenino y lo atemporal.",
    images: ["https://picsum.photos/seed/about-me1/500/500", "https://picsum.photos/seed/about-me2/500/500"],
  },
  {
    title: "Mis servicios",
    text: "Ofrezco uñas postizas personalizadas (press-on nails) hechas a medida, maquillaje y accesorios de belleza cuidadosamente seleccionados. Cada pedido incluye una lima, pegamento y guía de aplicación.",
    images: [],
  },
  {
    title: "Cómo hacer un pedido",
    text: "1. Elige tu diseño o rellena el formulario de uñas custom.\n2. Envíame un mensaje con tu talla de uñas (o te mando una hoja de medidas).\n3. Confirmo disponibilidad y tiempo de entrega.\n4. Realizas el pago y en 7–14 días lo tienes en casa.",
    images: ["https://picsum.photos/seed/order-step/500/500"],
  },
  {
    title: "Cuidado y aplicación",
    text: "Prepara la uña con la lima incluida, aplica una pequeña cantidad de pegamento y mantén presionada 30 segundos. Para retirarlas, remoja en agua tibia unos minutos. Con el cuidado adecuado duran hasta 2–3 semanas.",
    images: [],
  },
  {
    title: "Contacto",
    text: "¿Tienes dudas o quieres un diseño especial? Escríbeme por Instagram o al correo. Respondo en menos de 24h.",
    images: ["https://picsum.photos/seed/contact-img/500/500", "https://picsum.photos/seed/contact-img2/500/500"],
  },
].map((s, i) => ({ ...s, id: `seed-about-${i + 1}`, sort_order: i })) as AboutSection[];
