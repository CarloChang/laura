import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ProductSection } from "@/components/site/product-section";
import { About } from "@/components/site/about";
import { Footer } from "@/components/site/footer";
import { getProducts, getAboutSections } from "@/lib/products";

export default async function Home() {
  const [nails, makeup, about] = await Promise.all([
    getProducts("nails"),
    getProducts("makeup"),
    getAboutSections(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductSection
          id="nails"
          kicker=""
          title="Hechas a medida"
          script=""
          products={nails}
        />
        <About sections={about} />
        <ProductSection
          id="beauty"
          kicker="Belleza seleccionada"
          title="Maquillaje y más"
          script="vibras vintage"
          products={makeup}
        />
      </main>
      <Footer />
    </>
  );
}
