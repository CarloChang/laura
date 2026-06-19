import { useState, useEffect, useRef } from "react";
import { PRODUCTS, MAKEUPS, type NailProduct } from "./data";
import "./index.css";

interface AboutItem {
  id: number;
  title: string;
  text: string;
  images?: string[];
}

const ABOUT_ITEMS: AboutItem[] = [
  {
    id: 1,
    title: "Quién soy",
    text: "¡Hola! Soy Laura, apasionada por el nail art y los cosméticos vintage. Cada set que creo es hecho a mano con cariño, pensando en los detalles que hacen la diferencia. Me inspiro en la estética retro, lo femenino y lo atemporal.",
    images: [
      "https://picsum.photos/seed/about-me1/400/400",
      "https://picsum.photos/seed/about-me2/400/400",
    ],
  },
  {
    id: 2,
    title: "Mis servicios",
    text: "Ofrezco uñas postizas personalizadas (press-on nails) hechas a medida, maquillaje y accesorios de belleza cuidadosamente seleccionados. Cada pedido incluye una lima, pegamento y guía de aplicación.",
  },
  {
    id: 3,
    title: "Cómo hacer un pedido",
    text: "1. Elige tu diseño o rellena el formulario de uñas custom.\n2. Envíame un mensaje con tu talla de uñas (o te mando una hoja de medidas).\n3. Confirmo disponibilidad y tiempo de entrega.\n4. Realizas el pago y en 7–14 días lo tienes en casa.",
    images: [
      "https://picsum.photos/seed/order-step/400/400",
    ],
  },
  {
    id: 4,
    title: "Cuidado y aplicación",
    text: "Prepara la uña con la lima incluida, aplica una pequeña cantidad de pegamento y mantén presionada 30 segundos. Para retirarlas, remoja en agua tibia unos minutos. Con el cuidado adecuado duran hasta 2–3 semanas.",
  },
  {
    id: 5,
    title: "Contacto",
    text: "¿Tienes dudas o quieres un diseño especial? Escríbeme por Instagram o al correo. Respondo en menos de 24h.",
    images: [
      "https://picsum.photos/seed/contact-img/400/400",
      "https://picsum.photos/seed/contact-img2/400/400",
    ],
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.63a8.18 8.18 0 0 0 4.78 1.52V6.7a4.85 4.85 0 0 1-1.01-.01z"/>
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function IconX({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={cls}>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

// ─── NailCard ─────────────────────────────────────────────────────────────────

function NailCard({ product, onSelect }: { product: NailProduct; onSelect: (p: NailProduct) => void }) {
  return (
    <div className="flex flex-col">
      <button
        onClick={() => onSelect(product)}
        className="aspect-square overflow-hidden cursor-pointer block w-full"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </button>
      <div className="pt-2 pb-1">
        <p className="text-xs text-[#9B1B30] leading-snug line-clamp-2 italic font-semibold">{product.name}</p>
        <p className="text-xs text-[#5C4033] mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>{product.price}</p>
      </div>
    </div>
  );
}

// ─── AboutTab ─────────────────────────────────────────────────────────────────

function AboutTab() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="flex flex-col pt-6">
      <h2
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}
        className="text-6xl leading-none text-[#9B1B30] uppercase tracking-tight"
      >
        Sobre mí
      </h2>
      <div className="h-px bg-[#9B1B30]/30 mt-3 mb-6" />
      {ABOUT_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border border-[#9B1B30]/25 border-b-0 last:border-b">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex items-center justify-between w-full px-4 py-4 text-sm tracking-widest uppercase text-[#5C4033] hover:bg-[#9B1B30]/5 transition-colors text-left"
            >
              {item.title}
              <IconChevron open={isOpen} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="px-4 pb-5 border-t border-[#9B1B30]/15">
                <p className="text-sm text-[#5C4033]/80 leading-relaxed italic mt-4 whitespace-pre-line">
                  {item.text}
                </p>
                {item.images && item.images.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {item.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-24 h-24 object-cover border border-[#9B1B30]/20"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ShopTab ──────────────────────────────────────────────────────────────────

function ShopTab({ products, onSelect, label }: { products: NailProduct[]; onSelect: (p: NailProduct) => void; label: string }) {
  return (
    <div className="pt-6">
      <h2
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}
        className="text-6xl leading-none text-[#9B1B30] uppercase tracking-tight"
      >
        {label}
      </h2>
      <div className="h-px bg-[#9B1B30]/30 mt-3 mb-6" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {products.map((product) => (
          <NailCard key={product.id} product={product} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

// ─── ProductModal ─────────────────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
  onImageClick,
}: {
  product: NailProduct;
  onClose: () => void;
  onImageClick: () => void;
}) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 420);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#9B1B30]/50"
        onClick={handleClose}
      />
      {/* Sheet */}
      <div className={`${closing ? "modal-slide-down" : "modal-slide-up"} relative bg-[#E5DDCB] w-full max-w-md mx-auto px-6 pt-5 pb-10 shadow-2xl`}>
        {/* Handle */}
        <div className="w-10 h-1 bg-[#9B1B30]/20 mx-auto mb-5" />
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#9B1B30]/50 hover:text-[#9B1B30] transition-colors"
        >
          <IconX />
        </button>

        <div className="flex flex-col items-center gap-4">
          {/* Clickable image → full-screen view */}
          <button
            onClick={onImageClick}
            className="w-56 h-56 overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-zoom-in"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </button>

          <div className="text-center">
            <p className="font-semibold text-xl text-[#9B1B30] leading-snug">{product.name}</p>
            <p className="text-[#5C4033] mt-1 text-base" style={{ fontFamily: "system-ui, sans-serif" }}>{product.price}</p>
            {product.description && (
              <p className="text-sm text-[#9B1B30]/60 mt-3 leading-relaxed italic">{product.description}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-[#9B1B30]/20 text-center">
          <p className="text-xs tracking-widest uppercase text-[#9B1B30]">@lau.muuaa</p>
          <p className="text-xs text-[#5C4033]/60 mt-1 leading-relaxed italic">
            Handcrafted press-on nails made with love.<br />
            DM for custom orders — every set tailored just for you.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── FullImageModal ───────────────────────────────────────────────────────────

function FullImageModal({
  product,
  onClose,
}: {
  product: NailProduct;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(92,64,51,0.82)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-[82vw] max-w-sm">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors bg-[#9B1B30]/40  p-1.5"
        >
          <IconX />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full  shadow-2xl"
        />
        <p className="text-center text-white/90 text-sm font-medium mt-3">{product.name}</p>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export function App() {
  const [activeTab, setActiveTab] = useState<"links" | "shop" | "makeups">("links");
  const [selectedProduct, setSelectedProduct] = useState<NailProduct | null>(null);
  const [fullImageOpen, setFullImageOpen] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const scrollPositions = useRef<Record<string, number>>({ links: 0, shop: 0, makeups: 0 });

  const switchTab = (tab: "links" | "shop" | "makeups") => {
    scrollPositions.current[activeTab] = window.scrollY;
    setActiveTab(tab);
  };

  useEffect(() => {
    window.scrollTo({ top: scrollPositions.current[activeTab], behavior: "instant" });
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 160);
      setHeroOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseAll = () => {
    setSelectedProduct(null);
    setFullImageOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#E5DDCB] max-w-md mx-auto">
      <div className="paper-grain" aria-hidden="true" />
      {/* ── Hero ──────────────────────────────────────────── */}
      <div
        className="flex flex-col items-center pt-14 pb-8 px-6 border-b border-[#9B1B30]/25"
        style={{ opacity: heroOpacity }}
      >
        <div className="text-center mb-5">
          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}
            className="text-7xl leading-none text-[#9B1B30] tracking-tight"
          >
            Laura's<br />Nailsss
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px w-12 bg-[#9B1B30]/40" />
            <p style={{ fontFamily: "'Dancing Script', cursive", color: "#5C4033" }} className="text-xl">
              Your nail haven
            </p>
            <div className="h-px w-12 bg-[#9B1B30]/40" />
          </div>
          <p className="text-sm tracking-widest uppercase text-[#9B1B30]/70">@lau.muuaa</p>
        </div>

        <div className="flex gap-5 text-[#5C4033]">
          <button aria-label="Instagram" className="hover:text-[#9B1B30] transition-colors"><IconInstagram /></button>
          <button aria-label="TikTok"    className="hover:text-[#9B1B30] transition-colors"><IconTikTok /></button>
          <button aria-label="Pinterest" className="hover:text-[#9B1B30] transition-colors"><IconPinterest /></button>
          <button aria-label="Email"     className="hover:text-[#9B1B30] transition-colors"><IconMail /></button>
        </div>
      </div>

      {/* ── Tab Toggle ────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-[#E5DDCB] border-b border-[#9B1B30]/25">
        <div className="flex">
          {(["links", "shop", "makeups"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300 ease-in-out border-b-2 ${
                activeTab === tab
                  ? "border-[#9B1B30] text-[#9B1B30] font-semibold"
                  : "border-transparent text-[#5C4033]/60 hover:text-[#5C4033]"
              }`}
            >
              {tab === "makeups" ? "Maquillaje" : tab === "shop" ? "Uñas" : "Sobre mí"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div key={activeTab} className="px-4 pb-10 tab-content">
        {activeTab === "links"   && <AboutTab />}
        {activeTab === "shop"    && <ShopTab products={PRODUCTS} onSelect={setSelectedProduct} label="Uñas" />}
        {activeTab === "makeups" && <ShopTab products={MAKEUPS}  onSelect={setSelectedProduct} label="Makeup" />}
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div className="border-t border-[#9B1B30]/25 mx-4 pt-6 pb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px flex-1 bg-[#9B1B30]/20" />
          <p className="text-xs tracking-widest uppercase text-[#9B1B30]">@lau.muuaa</p>
          <div className="h-px flex-1 bg-[#9B1B30]/20" />
        </div>
        <p className="text-xs text-[#5C4033]/60 leading-relaxed italic">
          Handcrafted press-on nails made with love.<br />
          DM for custom orders — every set tailored just for you.
        </p>
      </div>

      {/* ── Modals ────────────────────────────────────────── */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseAll}
          onImageClick={() => setFullImageOpen(true)}
        />
      )}
      {fullImageOpen && selectedProduct && (
        <FullImageModal
          product={selectedProduct}
          onClose={() => setFullImageOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
