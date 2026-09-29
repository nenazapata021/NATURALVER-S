"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="w-16 h-16 text-forest/20 mx-auto mb-6" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forest mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-forest/60 mb-8">
            Explora nuestros productos naturales y encuentra lo que necesitas.
          </p>
          <Link href="/productos" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-forest/60 hover:text-forest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Seguir comprando
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-8">
          Tu Carrito
        </h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.productId}
              className="card flex items-center gap-4"
            >
              <div className="w-20 h-20 rounded-lg bg-cream-dark overflow-hidden shrink-0">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-forest/20" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-forest truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-forest/60">
                  {formatPrice(item.price)} c/u
                </p>
              </div>

              <div className="flex items-center border border-forest/20 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-2 hover:bg-cream-dark transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-2 hover:bg-cream-dark transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-display font-bold text-forest">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-terracotta hover:text-terracotta-dark text-sm mt-1 inline-flex items-center gap-1 transition-colors"
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card bg-cream-dark">
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-lg font-semibold text-forest">
              Total
            </span>
            <span className="font-display text-2xl font-bold text-terracotta">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={clearCart}
              className="btn-secondary flex-1"
            >
              Vaciar carrito
            </button>
            <Link href="/checkout" className="btn-primary flex-1">
              Proceder al checkout
            </Link>
          </div>

          <p className="text-xs text-forest/50 text-center mt-4">
            El pago y la entrega se coordinan por WhatsApp después de
            confirmar tu pedido.
          </p>
        </div>
      </div>
    </div>
  );
}
