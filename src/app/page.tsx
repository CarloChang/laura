import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ProductSection } from "@/components/site/product-section";
import { About } from "@/components/site/about";
import { Footer } from "@/components/site/footer";
import { getProducts, getAboutSections } from "@/lib/products";
import { getThemeSettings } from "@/lib/theme-data";
import { textValue } from "@/lib/theme";

export default async function Home() {
  const [nails, makeup, about, settings] = await Promise.all([
    getProducts("nails"),
    getProducts("makeup"),
    getAboutSections(),
    getThemeSettings(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductSection
          id="nails"
          kicker={textValue(settings, "nails-kicker")}
          title={textValue(settings, "nails-title")}
          script={textValue(settings, "nails-script")}
          kickerColor="var(--c-nails-kicker)"
          titleColor="var(--c-nails-title)"
          scriptColor="var(--c-nails-script)"
          products={nails}
        />
        <About sections={about} />
        <ProductSection
          id="beauty"
          kicker={textValue(settings, "beauty-kicker")}
          title={textValue(settings, "beauty-title")}
          script={textValue(settings, "beauty-script")}
          kickerColor="var(--c-beauty-kicker)"
          titleColor="var(--c-beauty-title)"
          scriptColor="var(--c-beauty-script)"
          products={makeup}
        />
      </main>
      <Footer />
    </>
  );
}
