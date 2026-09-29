import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ pedido?: string }>;
}) {
  const params = await searchParams;
  const orderNumber = params.pedido || "NV-XXXXX";

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573106198912";

  const message = `¡Hola NATURALVER'S! Acabo de realizar un pedido en su tienda.\n\nNúmero de pedido: ${orderNumber}\n\nMe gustaría coordinar el pago y la entrega. ¡Gracias!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-sage" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-4">
          ¡Pedido registrado!
        </h1>

        <p className="text-forest/70 mb-2">Tu número de pedido es:</p>
        <p className="font-display text-2xl font-bold text-terracotta mb-8">
          {orderNumber}
        </p>

        <div className="card mb-8">
          <h2 className="font-display text-xl font-semibold text-forest mb-4">
            Siguiente paso
          </h2>
          <p className="text-forest/70 mb-6">
            Haz clic en el botón de abajo para abrir WhatsApp y coordinar el
            pago y la entrega directamente con nuestro equipo.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full text-base py-4"
          >
            <MessageCircle className="w-5 h-5" />
            Coordinar por WhatsApp
          </a>

          <p className="text-xs text-forest/50 mt-4">
            Te redireccionará a WhatsApp con un mensaje pre-completado. Solo
            presiona enviar.
          </p>
        </div>

        <div className="bg-sage/10 border border-sage/20 rounded-xl p-6 mb-8">
          <h3 className="font-display font-semibold text-forest mb-2">
            ¿Qué pasa después?
          </h3>
          <ul className="text-sm text-forest/70 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 shrink-0" />
              Nuestro equipo te contactará por WhatsApp para confirmar los
              detalles del pedido.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 shrink-0" />
              Coordinaremos el método de pago (transferencia, efectivo contra
              entrega, etc.).
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 shrink-0" />
              Te enviaremos el seguimiento de tu envío.
            </li>
          </ul>
        </div>

        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-light transition-colors"
        >
          Seguir explorando productos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
