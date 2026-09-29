import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "../../../../payload.config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, total, notes } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Crear o buscar cliente por teléfono
    const existingCustomers = await payload.find({
      collection: "customers",
      where: { phone: { equals: customer.phone } },
      limit: 1,
    });

    let customerId: string | number;
    if (existingCustomers.docs.length > 0) {
      customerId = existingCustomers.docs[0].id;
      // Actualizar datos del cliente
      await payload.update({
        collection: "customers",
        id: customerId,
        data: {
          fullName: customer.fullName,
          email: customer.email || "",
          city: customer.city || "",
          address: customer.address || "",
        },
      });
    } else {
      const newCustomer = await payload.create({
        collection: "customers",
        data: {
          fullName: customer.fullName,
          phone: customer.phone,
          email: customer.email || "",
          city: customer.city || "",
          address: customer.address || "",
        },
      });
      customerId = newCustomer.id;
    }

    // Generar número de pedido único
    const orderNumber = `NV-${Date.now().toString(36).toUpperCase()}`;

    // Crear el pedido
    const order = await payload.create({
      collection: "orders",
      data: {
        orderNumber,
        status: "pending",
        customer: customerId,
        items: items.map(
          (item: {
            productId: string;
            name: string;
            quantity: number;
            price: number;
          }) => ({
            product: item.productId,
            productName: item.name,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          })
        ),
        total,
        notes: notes || "",
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    );
  }
}
