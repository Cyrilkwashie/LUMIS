import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getHomepageFeatured,
  setHomepageFeatured,
} from "@/lib/homepage";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getHomepageFeatured());
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!Array.isArray(body.featured)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const featured = setHomepageFeatured(body.featured);
  return NextResponse.json(featured);
}
