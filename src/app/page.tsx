import Link from "next/link";
import { Leaf, Heart, Shield, Truck } from "lucide-react";
import { getPayload } from "payload";
import config from "../../payload.config";
import { ProductCard } from "../components/ProductCard";
import { AddToCartButton } from "../components/AddToCartButton";
import type { Product } from "../types";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  const payload = await getPayload({ config });

  const products = await payload.find({
    collection: "products",
    where: {
      isFeatured: { equals: true },
      stock: { greater_than: 0 },
    },
    limit: 4,
    depth: 2,
  });

  return products.docs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    description: doc.description,
    ingredients: doc.ingredients,
    usageMode: doc.usageMode,
    warnings: doc.warnings,
    batch: doc.batch,
    expirationDate: doc.expirationDate,
    price: doc.price,
    stock: doc.stock,
    images: doc.images?.map((img: { image: unknown }) => ({
      image: {
        url: typeof img.image === "object" && img.image !== null
          ? (img.image as { url: string }).url
          : "",
        alt: typeof img.image === "object" && img.image !== null
          ? (img.image as { alt?: string }).alt
          : undefined,
      },
    })),
    isFeatured: doc.isFeatured,
    isNatural: doc.isNatural,
    isExternalUse: doc.isExternalUse,
    isIndigenousFormula: doc.isIndigenousFormula,
    category: doc.category
      ? {
          id: String(
            typeof doc.category === "object" ? doc.category.id : doc.category
          ),
          name:
            typeof doc.category === "object" && doc.category !== null
              ? (doc.category as { name: string }).name
              : "",
          slug:
            typeof doc.category === "object" && doc.category !== null
              ? (doc.category as { slug: string }).slug
              : "",
        }
      : undefined,
  }));
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-forest text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sage rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">
                Medicina Ancestral
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              Sanación natural para{" "}
              <span className="text-gold">un mundo mejor</span>
            </h1>
            <p className="text-lg sm:text-xl text-cream/80 mb-8 leading-relaxed">
              Productos naturales elaborados con ingredientes de la tierra.
              Fórmulas ancestrales que cuidan tu cuerpo y el planeta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/productos" className="btn-primary">
                Ver productos
              </Link>
              <a
                href="https://wa.me/573106198912"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">100% Natural</h3>
              <p className="text-sm text-forest/60">
                Ingredientes puros de la tierra, sin químicos sintéticos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-terracotta" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Fórmula Ancestral</h3>
              <p className="text-sm text-forest/60">
                Recetas transmitidas por generaciones de sabiduría indígena.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-forest" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Envíos a Colombia</h3>
              <p className="text-sm text-forest/60">
                Entregas seguras en todo el país. Pago contra entrega disponible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 sm:py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-2">
                Productos Destacados
              </h2>
              <p className="text-forest/60">
                Los favoritos de nuestra comunidad
              </p>
            </div>
            <Link
              href="/productos"
              className="hidden sm:inline-flex text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              Ver todos &rarr;
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <div className="absolute top-3 right-3 z-10">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-forest/60">
                No hay productos destacados disponibles en este momento.
              </p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/productos"
              className="btn-secondary"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-6">
                De la tierra, con amor
              </h2>
              <p className="text-forest/70 mb-4 leading-relaxed">
                En NATURALVER&apos;S creemos en el poder curativo de la
                naturaleza. Cada producto es elaborado artesanalmente con
                ingredientes seleccionados de nuestra tierra, respetando las
                tradiciones ancestrales de nuestros pueblos originarios.
              </p>
              <p className="text-forest/70 mb-6 leading-relaxed">
                Nuestro compromiso es contigo y con el planeta: envases
                biodegradables, ingredientes orgánicos y comercio justo con
                las comunidades locales.
              </p>
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-sage" />
                <div>
                  <p className="font-semibold text-forest">Calidad Garantizada</p>
                  <p className="text-sm text-forest/60">
                    Lotes controlados y fechas de vencimiento verificadas
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-sage/20 flex items-center justify-center">
                <Leaf className="w-24 h-24 text-sage" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 sm:py-20 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            ¿Tienes preguntas?
          </h2>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto">
            Escríbenos por WhatsApp y te asesoraremos sobre el producto ideal
            para ti. Envíos a todo Colombia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573106198912"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp: +57 310 619 8912
            </a>
            <a
              href="https://instagram.com/naturalvers21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-cream/30 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream/10 transition-colors"
            >
              Instagram: @naturalvers21
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
