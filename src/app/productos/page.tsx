import { getPayload } from "payload";
import type { Where } from "payload";
import config from "../../../payload.config";
import { ProductCard } from "../../components/ProductCard";
import { AddToCartButton } from "../../components/AddToCartButton";
import { CategoryFilter } from "../../components/CategoryFilter";
import type { Product, Category } from "../../types";

export const dynamic = "force-dynamic";

async function getProducts(categorySlug?: string): Promise<Product[]> {
  const payload = await getPayload({ config });

  let where: Where = {};
  if (categorySlug) {
    const categories = await payload.find({
      collection: "categories",
      where: { slug: { equals: categorySlug } },
      limit: 1,
    });
    if (categories.docs.length > 0) {
      where = { category: { equals: categories.docs[0].id } };
    }
  }

  const products = await payload.find({
    collection: "products",
    where,
    limit: 50,
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

async function getCategories(): Promise<Category[]> {
  const payload = await getPayload({ config });
  const categories = await payload.find({
    collection: "categories",
    limit: 50,
  });
  return categories.docs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
  }));
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params.categoria),
    getCategories(),
  ]);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest mb-2">
            Nuestros Productos
          </h1>
          <p className="text-forest/60">
            Elaborados con ingredientes 100% naturales y fórmulas ancestrales
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={params.categoria}
        />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute top-3 right-3 z-10">
                  <AddToCartButton product={product} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-forest/60 text-lg">
              No se encontraron productos en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
