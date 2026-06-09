import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createProduct, getAllProducts, nextProductId, slugify } from "@/lib/products";
import { Product } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllProducts());
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = body.slug || slugify(body.name);

  const product: Product = {
    id: nextProductId(),
    name: body.name,
    brand: body.brand,
    category: body.category,
    price: Number(body.price),
    slug,
    description: body.description,
    specs: body.specs ?? {},
    images: body.images?.length ? body.images : [""],
    variants: body.variants?.length
      ? body.variants
      : [{ id: "default", label: "Standard" }],
    isNew: Boolean(body.isNew),
    inStock: body.inStock !== false,
  };

  createProduct(product);
  return NextResponse.json(product, { status: 201 });
}
