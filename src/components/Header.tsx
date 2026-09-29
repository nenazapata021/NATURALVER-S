"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useCart } from "./CartProvider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-forest group-hover:text-sage transition-colors" />
            <span className="font-display text-xl sm:text-2xl font-bold text-forest">
              NATURALVER&apos;S
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-forest/70 hover:text-forest transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-sm font-medium text-forest/70 hover:text-forest transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/#nosotros"
              className="text-sm font-medium text-forest/70 hover:text-forest transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/#contacto"
              className="text-sm font-medium text-forest/70 hover:text-forest transition-colors"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/carrito"
              className="relative p-2 text-forest hover:text-sage transition-colors"
              aria-label={`Carrito con ${itemCount} productos`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-forest"
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-forest/10">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-forest/70 hover:text-forest py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                className="text-sm font-medium text-forest/70 hover:text-forest py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="/#nosotros"
                className="text-sm font-medium text-forest/70 hover:text-forest py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/#contacto"
                className="text-sm font-medium text-forest/70 hover:text-forest py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
