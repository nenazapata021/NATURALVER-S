import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "../../../../payload.config";
import { ProductDetail } from "../../../components/ProductDetail";
import type { Product } from "../../../types";

export const dynamic = "force-dynamic";

async function getProduct(slug: string): Promise<Product | null> {
  const payload = await getPayload({ config });

  const products = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });

  if (products.docs.length === 0) return null;

  const doc = products.docs[0];
  return {
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
  };
}

export default async function ProductoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
