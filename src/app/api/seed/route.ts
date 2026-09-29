import { getPayload } from "payload";
import { NextResponse } from "next/server";
import config from "../../../../payload.config";

export async function POST() {
  try {
    const payload = await getPayload({ config });

    const existingCategories = await payload.find({
      collection: "categories",
      limit: 1,
    });

    if (existingCategories.totalDocs > 0) {
      return NextResponse.json(
        { message: "La base de datos ya tiene datos. Saltando seed." },
        { status: 200 }
      );
    }

    const categoriesData = [
      {
        name: "Aceites",
        slug: "aceites",
        description:
          "Aceites esenciales y vegetales con propiedades terapéuticas",
      },
      {
        name: "Cremas",
        slug: "cremas",
        description:
          "Cremas hidratantes y terapéuticas para el cuidado corporal",
      },
      {
        name: "Tés e Infusiones",
        slug: "tes",
        description: "Mezclas herbales para bienestar y relajación",
      },
      {
        name: "Bálsamos",
        slug: "balsamos",
        description: "Bálsamos labiales y corporales con cera de abeja",
      },
    ];

    const createdCategories: Record<string, string> = {};

    for (const cat of categoriesData) {
      const created = await payload.create({
        collection: "categories",
        data: cat,
      });
      createdCategories[cat.slug] = String(created.id);
    }

    const productsData = [
      {
        name: "Aceite Relajante Natural",
        slug: "aceite-relajante-natural",
        category: createdCategories["aceites"],
        shortDescription:
          "Aceite corporal con árnica, romero y caléndula para aliviar tensiones musculares",
        description: [
          {
            type: "paragraph",
            text: "Nuestro Aceite Relajante Natural es una fórmula ancestral elaborada con ingredientes 100% naturales. Combina las propiedades del árnica, romero y caléndula para ofrecer un alivio profundo a los músculos cansados y tensionados.",
            children: [],
          },
        ],
        ingredients: [
          { ingredient: "Aceite de árnica" },
          { ingredient: "Aceite esencial de romero" },
          { ingredient: "Extracto de caléndula" },
          { ingredient: "Aceite de almendras dulces" },
          { ingredient: "Vitamina E" },
        ],
        usageMode:
          "Aplicar sobre la piel limpia y masajear suavemente hasta absorber. Usar 2-3 veces al día en las áreas con tensión muscular.",
        warnings:
          "Solo uso externo. No aplicar sobre heridas abiertas o piel irritada. Evitar contacto con los ojos. Mantener fuera del alcance de los niños.",
        batch: "LOT-2026-001",
        expirationDate: "2027-06-30",
        price: 45000,
        stock: 25,
        images: [],
        isFeatured: true,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: true,
      },
      {
        name: "Aceite de Menthol Refrescante",
        slug: "aceite-menthol-refrescante",
        category: createdCategories["aceites"],
        shortDescription:
          "Aceite con mentol natural para alivio rápido de dolores musculares",
        description: [
          {
            type: "paragraph",
            text: "Fórmula refrescante con mentol natural que proporciona alivio inmediato a dolores musculares y articulares.",
            children: [],
          },
        ],
        ingredients: [
          { ingredient: "Mentol natural" },
          { ingredient: "Aceite de eucalipto" },
          { ingredient: "Aceite de coco fraccionado" },
        ],
        usageMode:
          "Aplicar una pequeña cantidad en el área afectada y masajear hasta absorber. Repetir cada 4-6 horas.",
        warnings:
          "Solo uso externo. No inhalar directamente. En caso de irritación, suspender uso.",
        batch: "LOT-2026-002",
        expirationDate: "2027-03-15",
        price: 38000,
        stock: 18,
        images: [],
        isFeatured: true,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: false,
      },
      {
        name: "Crema Hidratante de Caléndula",
        slug: "crema-hidratante-calendula",
        category: createdCategories["cremas"],
        shortDescription:
          "Crema corporal con caléndula y manteca de karité para piel sensible",
        description: [
          {
            type: "paragraph",
            text: "Crema hidratante elaborada con caléndula y manteca de karité. Ideal para pieles sensibles y secas.",
            children: [],
          },
        ],
        ingredients: [
          { ingredient: "Extracto de caléndula" },
          { ingredient: "Manteca de karité" },
          { ingredient: "Aceite de jojoba" },
          { ingredient: "Glicerina vegetal" },
        ],
        usageMode:
          "Aplicar sobre la piel limpia y masajear suavemente. Usar diariamente para mejores resultados.",
        warnings:
          "Solo uso externo. En caso de alergia a alguno de los ingredientes, suspender uso.",
        batch: "LOT-2026-003",
        expirationDate: "2026-12-20",
        price: 52000,
        stock: 12,
        images: [],
        isFeatured: true,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: true,
      },
      {
        name: "Té Relajante de Manzanilla",
        slug: "te-relajante-manzanilla",
        category: createdCategories["tes"],
        shortDescription:
          "Infusión de manzanilla y lavanda para calmar y relajar",
        description: [
          {
            type: "paragraph",
            text: "Mezcla herbal con manzanilla, lavanda y toronjil. Perfecta para relajarte al final del día.",
            children: [],
          },
        ],
        ingredients: [
          { ingredient: "Manzanilla" },
          { ingredient: "Lavanda" },
          { ingredient: "Toronjil" },
          { ingredient: "Miel de abeja" },
        ],
        usageMode:
          "Verter agua caliente sobre una cucharada de la mezcla. Dejar reposar 5-7 minutos. Colar y endulzar al gusto.",
        warnings:
          "No recomendado para personas alérgicas a las plantas de la familia Asteraceae.",
        batch: "LOT-2026-004",
        expirationDate: "2027-01-30",
        price: 22000,
        stock: 30,
        images: [],
        isFeatured: false,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: true,
      },
      {
        name: "Bálsamo Labial de Cera de Abeja",
        slug: "balsamo-labial-cera-abeja",
        category: createdCategories["balsamos"],
        shortDescription:
          "Bálsamo labial natural con cera de abeja y miel para labios secos",
        description: [
          {
            type: "paragraph",
            text: "Bálsamo labial elaborado con cera de abeja pura, miel de abeja y aceite de coco. Hidratación profunda para tus labios.",
            children: [],
          },
        ],
        ingredients: [
          { ingredient: "Cera de abeja" },
          { ingredient: "Miel de abeja" },
          { ingredient: "Aceite de coco" },
          { ingredient: "Vitamina E" },
        ],
        usageMode:
          "Aplicar directamente sobre los labios según sea necesario. Ideal para climas fríos y secos.",
        warnings:
          "No recomendado para personas alérgicas a productos de abeja.",
        batch: "LOT-2026-005",
        expirationDate: "2027-08-10",
        price: 15000,
        stock: 40,
        images: [],
        isFeatured: false,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: false,
      },
      {
        name: "Aceite Esencial de Eucalipto",
        slug: "aceite-esencial-eucalipto",
        category: createdCategories["aceites"],
        shortDescription:
          "Aceite esencial puro de eucalipto para vías respiratorias",
        description: [
          {
            type: "paragraph",
            text: "Aceite esencial 100% puro de eucalipto. Ideal para aromaterapia y masajes descongestionantes.",
            children: [],
          },
        ],
        ingredients: [{ ingredient: "Aceite esencial de eucalipto" }],
        usageMode:
          "Para aromaterapia: agregar 3-5 gotas al difusor. Para masajes: diluir en aceite portador.",
        warnings:
          "No ingerir. No aplicar directamente sobre la piel sin diluir. Mantener fuera del alcance de los niños.",
        batch: "LOT-2026-006",
        expirationDate: "2028-02-28",
        price: 28000,
        stock: 20,
        images: [],
        isFeatured: false,
        isNatural: true,
        isExternalUse: true,
        isIndigenousFormula: false,
      },
    ];

    for (const prod of productsData) {
      await payload.create({
        collection: "products",
        data: prod as any,
      });
    }

    return NextResponse.json(
      {
        message: "Seed completado exitosamente",
        categories: categoriesData.length,
        products: productsData.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en seed:", error);
    return NextResponse.json(
      { error: "Error al ejecutar seed", details: String(error) },
      { status: 500 }
    );
  }
}
