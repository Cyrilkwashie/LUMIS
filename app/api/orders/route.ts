import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { OrderItem } from "@/lib/types";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.items?.length || !body.customerEmail || !body.customerName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const order = createOrder({
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerPhone: body.customerPhone ?? "",
    shippingAddress: body.shippingAddress,
    billingAddress: body.billingAddress,
    items: body.items as OrderItem[],
    notes: body.notes ?? "",
    paymentMethod: body.paymentMethod ?? "card",
    paymentStatus: "paid",
    status: "pending",
  });

  return NextResponse.json(order, { status: 201 });
}
