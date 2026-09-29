import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Leaf className="w-16 h-16 text-sage mx-auto mb-6" />
        <h1 className="font-display text-4xl font-bold text-forest mb-4">
          404
        </h1>
        <p className="text-forest/60 mb-8">
          La página que buscas no existe o fue movida.
        </p>
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
