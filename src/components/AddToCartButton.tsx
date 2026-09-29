"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "./CartProvider";
import type { Product } from "../types";

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "name" | "price" | "stock" | "images">;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.image?.url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock === 0) {
    return (
      <button
        disabled
        className="p-2 rounded-lg bg-forest/20 text-forest/40 cursor-not-allowed"
        aria-label="Producto agotado"
      >
        <ShoppingCart className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`p-2 rounded-lg transition-colors ${
        added
          ? "bg-sage text-white"
          : "bg-forest text-white hover:bg-forest-light"
      }`}
      aria-label={added ? "Agregado al carrito" : `Agregar ${product.name} al carrito`}
    >
      {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
    </button>
  );
}
