"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";
import { ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            address: formData.address,
          },
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
          notes: formData.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el pedido");
      }

      clearCart();
      router.push(`/confirmacion?pedido=${data.orderNumber}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el pedido"
      );
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="w-16 h-16 text-forest/20 mx-auto mb-6" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-forest mb-4">
            No tienes productos en el carrito
          </h1>
          <p className="text-forest/60 mb-8">
            Agrega productos antes de proceder al checkout.
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/carrito"
          className="inline-flex items-center gap-2 text-sm text-forest/60 hover:text-forest mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-8">
          Finalizar Pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="card">
                <h2 className="font-display text-xl font-semibold text-forest mb-4">
                  Datos de contacto
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="label-text">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label-text">
                      Teléfono (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="310 619 8912"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-text">
                      Correo electrónico (opcional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="label-text">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Bogotá, Medellín, etc."
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="label-text">
                      Dirección de envío *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Calle 123 #45-67, Barrio"
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="font-display text-xl font-semibold text-forest mb-4">
                  Notas adicionales (opcional)
                </h2>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field resize-none"
                  placeholder="Ej: Quiero cambiar la talla si no hay stock, o preferencia de horario de entrega"
                />
              </div>

              {error && (
                <div className="bg-terracotta/10 border border-terracotta/20 text-terracotta px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base py-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  "Confirmar pedido"
                )}
              </button>

              <p className="text-xs text-forest/50 text-center">
                Al confirmar, tu pedido quedará registrado y te redirigirás a
                WhatsApp para coordinar el pago y la entrega.
              </p>
            </form>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-display text-xl font-semibold text-forest mb-4">
                Resumen del pedido
              </h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-forest/70">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium text-forest">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-forest/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-semibold text-forest">
                    Total
                  </span>
                  <span className="font-display text-xl font-bold text-terracotta">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
