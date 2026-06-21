import type { Metadata } from "next";
import {
  Inter,
  DM_Serif_Display,
  Anton,
  Caveat,
  Bitcount_Ink,
  Playfair_Display,
  Ballet,
  Poppins,
  Montserrat,
  Space_Grotesk,
  Work_Sans,
  Manrope,
  Outfit,
  DM_Sans,
  Plus_Jakarta_Sans,
  Figtree,
  Cormorant,
  EB_Garamond,
  Lora,
  Merriweather,
  Fraunces,
  Spectral,
  Source_Serif_4,
  Libre_Baskerville,
  Oswald,
  Bebas_Neue,
  Archivo_Narrow,
  Saira_Condensed,
  Pacifico,
  Dancing_Script,
  Satisfy,
  Sacramento,
  Great_Vibes,
  Lobster,
  Permanent_Marker,
  Shadows_Into_Light,
  Abril_Fatface,
  Bungee,
  Righteous,
  Monoton,
  JetBrains_Mono,
  Space_Mono,
  Roboto_Mono,
} from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { buildThemeCss } from "@/lib/theme";
import { getThemeSettings } from "@/lib/theme-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const bitcount = Bitcount_Ink({
  variable: "--font-bitcount",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ballet = Ballet({
  variable: "--font-ballet",
  subsets: ["latin"],
});

const monocraft = localFont({
  variable: "--font-monocraft",
  src: "./fonts/Monocraft.woff2",
  display: "swap",
});

// Sans-serif
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// Serif
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
});
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});
const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Condensed / display sans
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});
const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
});
const sairaCondensed = Saira_Condensed({
  variable: "--font-saira-condensed",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Handwritten / script
const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});
const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
});
const sacramento = Sacramento({
  variable: "--font-sacramento",
  weight: "400",
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});
const lobster = Lobster({
  variable: "--font-lobster",
  weight: "400",
  subsets: ["latin"],
});
const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  weight: "400",
  subsets: ["latin"],
});
const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  weight: "400",
  subsets: ["latin"],
});

// Display
const abrilFatface = Abril_Fatface({
  variable: "--font-abril-fatface",
  weight: "400",
  subsets: ["latin"],
});
const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});
const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});
const monoton = Monoton({
  variable: "--font-monoton",
  weight: "400",
  subsets: ["latin"],
});

// Monospace
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const fontVariables = [
  inter.variable,
  dmSerif.variable,
  anton.variable,
  caveat.variable,
  bitcount.variable,
  playfair.variable,
  ballet.variable,
  monocraft.variable,
  poppins.variable,
  montserrat.variable,
  spaceGrotesk.variable,
  workSans.variable,
  manrope.variable,
  outfit.variable,
  dmSans.variable,
  plusJakarta.variable,
  figtree.variable,
  cormorant.variable,
  ebGaramond.variable,
  lora.variable,
  merriweather.variable,
  fraunces.variable,
  spectral.variable,
  sourceSerif.variable,
  libreBaskerville.variable,
  oswald.variable,
  bebasNeue.variable,
  archivoNarrow.variable,
  sairaCondensed.variable,
  pacifico.variable,
  dancingScript.variable,
  satisfy.variable,
  sacramento.variable,
  greatVibes.variable,
  lobster.variable,
  permanentMarker.variable,
  shadowsIntoLight.variable,
  abrilFatface.variable,
  bungee.variable,
  righteous.variable,
  monoton.variable,
  jetbrainsMono.variable,
  spaceMono.variable,
  robotoMono.variable,
];

export const metadata: Metadata = {
  title: "Laura — Press-ons y belleza",
  description:
    "Sets de press-ons hechos a mano y belleza seleccionada, con cariño. Diseños personalizados de inspiración vintage.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCss = buildThemeCss(await getThemeSettings());

  return (
    <html
      lang="es"
      className={`${fontVariables.join(" ")} h-full`}
    >
      <body
        className="grain min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {themeCss && (
          <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
