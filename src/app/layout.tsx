import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Anton, Caveat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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

export const metadata: Metadata = {
  title: "Laura — Press-on Nails & Beauty",
  description:
    "Handmade press-on nail sets and curated beauty, made with love. Custom designs, vintage-inspired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${anton.variable} ${caveat.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
