import type { Product, AboutSection } from "./types";

// Ported from the original src/data.ts. Used as fallback content before
// Supabase is connected, and as the source for the DB seed script.

export const SEED_PRODUCTS: Product[] = [
  { category: "nails", name: "Usahana Pastel Picnic", price: "€35", image: "https://picsum.photos/seed/nail-picnic/600/600", description: "Tonos pastel suaves inspirados en un pícnic soleado. Con adorables detalles del conejito Usahana sobre una base rosa de ensueño." },
  { category: "nails", name: "Press-ons Custom", price: "€25", image: "https://picsum.photos/seed/nail-custom/600/600", description: "¡Totalmente personalizados a tu estilo! Elige forma, talla, color y diseño. Escríbeme por DM para crear tu set soñado." },
  { category: "nails", name: "Red Apple Rilakkuma", price: "€33", image: "https://picsum.photos/seed/nail-red-apple/600/600", description: "Detalles de manzana roja junto a charms del osito Rilakkuma. Incluye top coat brillante y una uña de acento extra." },
  { category: "nails", name: "Green Fairy Core", price: "€32", image: "https://picsum.photos/seed/nail-fairy/600/600", description: "Vibras de bosque encantado con shimmer verde iridiscente, pequeños calcas de setas y delicado arte de hojas." },
  { category: "nails", name: "Green Apple Rilakkuma", price: "€35", image: "https://picsum.photos/seed/nail-green-apple/600/600", description: "Una versión fresca de la serie Rilakkuma — base verde salvia con manzana y detalles del osito pintados a mano." },
  { category: "nails", name: "Smiski Picnic", price: "€35", image: "https://picsum.photos/seed/nail-smiski/600/600", description: "Personajes Smiski que brillan en la oscuridad sobre una base blanca lechosa. Un set único y juguetón que sorprende de noche." },
  { category: "nails", name: "Pastel Butterfly Dream", price: "€30", image: "https://picsum.photos/seed/nail-butterfly/600/600", description: "Mariposas pastel etéreas con detalle holográfico en las alas. Ligero y femenino — perfecto para cualquier ocasión." },
  { category: "nails", name: "Cherry Blossom Set", price: "€33", image: "https://picsum.photos/seed/nail-cherry/600/600", description: "Delicados pétalos de sakura pintados a mano sobre una base rosada translúcida. Elegante y atemporal, inspirado en la primavera en Japón." },
  { category: "nails", name: "Kawaii Bear", price: "€35", image: "https://picsum.photos/seed/nail-bear/600/600", description: "Caritas de osito kawaii con pequeños lazos de acento. Disponible en base beige, rosa o lavanda." },
  { category: "nails", name: "Strawberry Fields", price: "€28", image: "https://picsum.photos/seed/nail-strawberry/600/600", description: "Fresas rojas jugosas sobre una base crema suave. Fresco, divertido y perfecto para el verano." },
  { category: "nails", name: "Lavender Cloud", price: "€32", image: "https://picsum.photos/seed/nail-lavender/600/600", description: "Lavanda en acuarela suave con detalles de nubes esponjosas y acabado mate. Calmado, acogedor y de ensueño." },
  { category: "nails", name: "Ocean Wave", price: "€30", image: "https://picsum.photos/seed/nail-ocean/600/600", description: "Degradado azul profundo que se funde en verde espuma, con charms de perla y concha. Trae la playa a tus dedos." },
  { category: "makeup", name: "Set de Labios Rosewood", price: "€18", image: "https://picsum.photos/seed/makeup-lip/600/600", description: "Color de labios mate aterciopelado en tres tonos rosewood muy llevables. Fórmula de larga duración y acabado hidratante." },
  { category: "makeup", name: "Paleta de Sombras Garnet", price: "€28", image: "https://picsum.photos/seed/makeup-eye/600/600", description: "Nueve tonos joya profundos, del champán al burdeos intenso. Pigmento construible, sin caída." },
  { category: "makeup", name: "Iluminador Dewy Glow", price: "€22", image: "https://picsum.photos/seed/makeup-glow/600/600", description: "Iluminador perlado suave para un brillo desde dentro. Construible en pómulos, arco de las cejas y arco de cupido." },
  { category: "makeup", name: "Dúo de Coloretes Vintage", price: "€20", image: "https://picsum.photos/seed/makeup-blush/600/600", description: "Dos tonos de colorete que combinan — terracota cálido y rosa empolvado — prensados en un solo compacto." },
  { category: "makeup", name: "Set de Eyeliner y Máscara Marrón", price: "€24", image: "https://picsum.photos/seed/makeup-liner/600/600", description: "Eyeliner marrón a prueba de manchas junto a una máscara voluminizadora. Una alternativa más suave y natural al negro." },
  { category: "makeup", name: "Base Satin Skin", price: "€30", image: "https://picsum.photos/seed/makeup-foundation/600/600", description: "Acabado satinado de cobertura media. Fórmula ligera y transpirable disponible en 12 tonos." },
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
    text: "Ofrezco press-ons personalizados hechos a medida, maquillaje y accesorios de belleza cuidadosamente seleccionados. Cada pedido incluye una lima, pegamento y guía de aplicación.",
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
