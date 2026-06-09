import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/products";

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updated = updateProduct(params.id, {
    name: body.name,
    brand: body.brand,
    category: body.category,
    price: Number(body.price),
    slug: body.slug,
    description: body.description,
    specs: body.specs,
    images: body.images,
    variants: body.variants,
    isNew: Boolean(body.isNew),
    inStock: body.inStock !== false,
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = deleteProduct(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
