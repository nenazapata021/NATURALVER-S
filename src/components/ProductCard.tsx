import Link from "next/link";
import { Leaf, ShoppingCart } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const mainImage = product.images?.[0]?.image;

  return (
    <div className="card group hover:shadow-md transition-shadow">
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-cream-dark mb-4">
          {mainImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainImage.url}
              alt={mainImage.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-sage/20">
              <Leaf className="w-12 h-12 text-sage" />
            </div>
          )}
          {product.isNatural && (
            <span className="absolute top-3 left-3 bg-forest text-white text-xs font-semibold px-2 py-1 rounded-full">
              100% Natural
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-forest/60 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Agotado</span>
            </div>
          )}
        </div>

        <h3 className="font-display text-lg font-semibold text-forest mb-1 group-hover:text-forest-light transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-forest/60 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
      </Link>

      <div className="flex items-center justify-between">
        <span className="font-display text-xl font-bold text-terracotta">
          {formatPrice(product.price)}
        </span>
        {product.stock > 0 && onAddToCart && (
          <button
            onClick={onAddToCart}
            className="p-2 rounded-lg bg-forest text-white hover:bg-forest-light transition-colors"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
