import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "lumis_admin_session";
const SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN ?? "lumis-admin-authenticated";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthed = session === SESSION_TOKEN;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login" && isAuthed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
