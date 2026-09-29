import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nombre del producto",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug (URL)",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      label: "Categoría",
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Descripción corta",
    },
    {
      name: "description",
      type: "richText",
      label: "Descripción completa",
    },
    {
      name: "ingredients",
      type: "array",
      label: "Ingredientes",
      fields: [
        {
          name: "ingredient",
          type: "text",
          required: true,
          label: "Ingrediente",
        },
      ],
    },
    {
      name: "usageMode",
      type: "textarea",
      label: "Modo de uso",
    },
    {
      name: "warnings",
      type: "textarea",
      label: "Advertencias",
    },
    {
      name: "batch",
      type: "text",
      label: "Lote",
    },
    {
      name: "expirationDate",
      type: "date",
      label: "Fecha de vencimiento",
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      label: "Precio (COP)",
    },
    {
      name: "stock",
      type: "number",
      required: true,
      min: 0,
      defaultValue: 0,
      label: "Stock disponible",
    },
    {
      name: "images",
      type: "array",
      label: "Imágenes",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Imagen",
        },
      ],
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: "Destacado",
    },
    {
      name: "isNatural",
      type: "checkbox",
      defaultValue: true,
      label: "100% Natural",
    },
    {
      name: "isExternalUse",
      type: "checkbox",
      defaultValue: true,
      label: "Uso externo",
    },
    {
      name: "isIndigenousFormula",
      type: "checkbox",
      defaultValue: false,
      label: "Fórmula indígena",
    },
  ],
};
