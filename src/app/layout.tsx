import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartProvider } from "../components/CartProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NATURALVER'S — Productos Naturales de Medicina Ancestral",
  description:
    "Productos naturales de medicina ancestral. Aceites, cremas y remedios con ingredientes 100% naturales. Por un mundo mejor.",
  keywords: [
    "productos naturales",
    "medicina ancestral",
    "aceites naturales",
    "remedios naturales",
    "Colombia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
