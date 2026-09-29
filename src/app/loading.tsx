import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <Leaf className="w-12 h-12 text-sage animate-pulse mx-auto mb-4" />
        <p className="text-forest/60 text-sm">Cargando...</p>
      </div>
    </div>
  );
}
