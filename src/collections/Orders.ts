import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "orderNumber",
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      required: true,
      unique: true,
      label: "Número de pedido",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      options: [
        { label: "Pendiente", value: "pending" },
        { label: "Contactado", value: "contacted" },
        { label: "Confirmado", value: "confirmed" },
        { label: "Cancelado", value: "cancelled" },
      ],
      label: "Estado",
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
      label: "Cliente",
    },
    {
      name: "items",
      type: "array",
      required: true,
      label: "Productos del pedido",
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
          label: "Producto",
        },
        {
          name: "productName",
          type: "text",
          required: true,
          label: "Nombre del producto (snapshot)",
        },
        {
          name: "quantity",
          type: "number",
          required: true,
          min: 1,
          label: "Cantidad",
        },
        {
          name: "priceAtPurchase",
          type: "number",
          required: true,
          min: 0,
          label: "Precio al momento de la compra (COP)",
        },
      ],
    },
    {
      name: "total",
      type: "number",
      required: true,
      min: 0,
      label: "Total (COP)",
    },
    {
      name: "notes",
      type: "textarea",
      label: "Notas del cliente",
    },
    {
      name: "createdAt",
      type: "date",
      admin: {
        readOnly: true,
      },
      label: "Fecha de creación",
    },
  ],
};
