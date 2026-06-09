import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllProducts, updateStock } from "@/lib/products";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllProducts());
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, stockCount, inStock } = await request.json();
  const updated = updateStock(id, stockCount, inStock);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
