import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "Nombre completo",
    },
    {
      name: "phone",
      type: "text",
      required: true,
      label: "Teléfono (WhatsApp)",
      validate: (value: unknown) => {
        if (!value || typeof value !== "string") return "El teléfono es obligatorio";
        const cleaned = value.replace(/[\s\-()]/g, "");
        if (!/^\+?\d{10,15}$/.test(cleaned)) {
          return "Ingresa un número de teléfono válido (10-15 dígitos)";
        }
        return true;
      },
    },
    {
      name: "email",
      type: "email",
      label: "Correo electrónico (opcional)",
    },
    {
      name: "city",
      type: "text",
      label: "Ciudad",
    },
    {
      name: "address",
      type: "text",
      label: "Dirección de envío",
    },
  ],
};
