import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createOrder, getAllOrders } from "@/lib/orders";
import { OrderFilters } from "@/lib/orders";

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filters: OrderFilters = {
    status: (searchParams.get("status") as OrderFilters["status"]) ?? "all",
    search: searchParams.get("search") ?? undefined,
    paymentStatus: searchParams.get("paymentStatus") ?? "all",
    dateFrom: searchParams.get("dateFrom") ?? undefined,
    dateTo: searchParams.get("dateTo") ?? undefined,
  };

  return NextResponse.json(getAllOrders(filters));
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.items?.length) {
    return NextResponse.json({ error: "Order must have items" }, { status: 400 });
  }

  const order = createOrder(body);
  return NextResponse.json(order, { status: 201 });
}
