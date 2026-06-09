import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAnalytics } from "@/lib/analytics";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAnalytics());
}
