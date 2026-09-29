import Link from "next/link";
import { Leaf, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573106198912";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/naturalvers21";

  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-sage" />
              <span className="font-display text-xl font-bold">NATURALVER&apos;S</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Productos naturales de medicina ancestral. Por un mundo mejor.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Tienda</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/productos"
                className="text-sm text-cream/70 hover:text-cream transition-colors"
              >
                Todos los productos
              </Link>
              <Link
                href="/carrito"
                className="text-sm text-cream/70 hover:text-cream transition-colors"
              >
                Carrito
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +57 310 619 8912
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @naturalvers21
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="text-xs text-cream/50 text-center">
            &copy; {new Date().getFullYear()} NATURALVER&apos;S. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
