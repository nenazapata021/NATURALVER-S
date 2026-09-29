"use client";

import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/productos"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? "bg-forest text-white"
            : "bg-cream-dark text-forest/70 hover:bg-forest/10"
        }`}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/productos?categoria=${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? "bg-forest text-white"
              : "bg-cream-dark text-forest/70 hover:bg-forest/10"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
