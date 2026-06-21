import type { Metadata } from "next";
import {
  Inter,
  DM_Serif_Display,
  Anton,
  Caveat,
  Bitcount_Ink,
  Playfair_Display,
  Ballet,
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
      className={`${inter.variable} ${dmSerif.variable} ${anton.variable} ${caveat.variable} ${bitcount.variable} ${playfair.variable} ${ballet.variable} ${monocraft.variable} h-full`}
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
