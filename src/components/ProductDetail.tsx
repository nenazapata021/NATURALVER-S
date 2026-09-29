"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  ShoppingCart,
  Shield,
  AlertTriangle,
  Package,
  Calendar,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "./CartProvider";
import type { Product } from "../types";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.image?.url,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const mainImage = product.images?.[0]?.image;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-forest/60 hover:text-forest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark">
            {mainImage?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sage/20">
                <Leaf className="w-24 h-24 text-sage" />
              </div>
            )}
            {product.isNatural && (
              <span className="absolute top-4 left-4 bg-forest text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                100% Natural
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <Link
                href={`/productos?categoria=${product.category.slug}`}
                className="text-sm text-sage hover:text-sage-dark font-medium transition-colors"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest mt-2 mb-4">
              {product.name}
            </h1>

            <p className="text-forest/70 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-3xl font-bold text-terracotta">
                {formatPrice(product.price)}
              </span>
              {product.stock > 0 ? (
                <span className="text-sm text-sage font-medium">
                  {product.stock} disponibles
                </span>
              ) : (
                <span className="text-sm text-terracotta font-medium">
                  Agotado
                </span>
              )}
            </div>

            {/* Cantidad y agregar */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-forest/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-cream-dark transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-3 hover:bg-cream-dark transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 ${added ? "btn-whatsapp" : "btn-primary"}`}
                >
                  {added ? (
                    <>
                      <Shield className="w-5 h-5" />
                      Agregado al carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Agregar al carrito
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Sellos */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.isNatural && (
                <span className="inline-flex items-center gap-1.5 bg-sage/20 text-forest text-xs font-medium px-3 py-1.5 rounded-full">
                  <Leaf className="w-3.5 h-3.5" />
                  100% Natural
                </span>
              )}
              {product.isExternalUse && (
                <span className="inline-flex items-center gap-1.5 bg-gold/20 text-forest text-xs font-medium px-3 py-1.5 rounded-full">
                  <Shield className="w-3.5 h-3.5" />
                  Uso externo
                </span>
              )}
              {product.isIndigenousFormula && (
                <span className="inline-flex items-center gap-1.5 bg-terracotta/20 text-terracotta text-xs font-medium px-3 py-1.5 rounded-full">
                  <Leaf className="w-3.5 h-3.5" />
                  Fórmula indígena
                </span>
              )}
            </div>

            {/* Detalles del producto */}
            <div className="border-t border-forest/10 pt-6 space-y-4">
              {product.batch && (
                <div className="flex items-center gap-3 text-sm">
                  <Package className="w-4 h-4 text-forest/40" />
                  <span className="text-forest/60">Lote:</span>
                  <span className="font-medium text-forest">{product.batch}</span>
                </div>
              )}
              {product.expirationDate && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-forest/40" />
                  <span className="text-forest/60">Vence:</span>
                  <span className="font-medium text-forest">
                    {formatDate(product.expirationDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ingredientes */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="card">
              <h2 className="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-sage" />
                Ingredientes
              </h2>
              <ul className="space-y-2">
                {product.ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-forest/70 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 shrink-0" />
                    {item.ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modo de uso */}
          {product.usageMode && (
            <div className="card">
              <h2 className="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />
                Modo de uso
              </h2>
              <p className="text-sm text-forest/70 leading-relaxed">
                {product.usageMode}
              </p>
            </div>
          )}

          {/* Advertencias */}
          {product.warnings && (
            <div className="card">
              <h2 className="font-display text-xl font-semibold text-forest mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-terracotta" />
                Advertencias
              </h2>
              <p className="text-sm text-forest/70 leading-relaxed">
                {product.warnings}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
