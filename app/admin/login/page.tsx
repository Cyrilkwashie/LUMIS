import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  getSessionToken,
  verifyPassword,
} from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";

  const password = formData.get("password");

  if (typeof password !== "string" || !verifyPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

type Props = {
  searchParams: { error?: string };
};

export default function AdminLoginPage({ searchParams }: Props) {
  const hasError = searchParams.error === "invalid";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="font-syne text-2xl font-bold text-heading">LUMIS</h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-grey">
            Admin
          </p>
        </div>

        <form action={loginAction} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium uppercase tracking-widest text-grey"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-border bg-white px-4 py-3 text-sm text-heading focus:border-accent focus:outline-none"
              placeholder="Enter admin password"
            />
          </div>

          {hasError && (
            <p className="text-sm text-red-600">Invalid password.</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
