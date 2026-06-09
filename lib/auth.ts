export const SESSION_COOKIE = "lumis_admin_session";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "lumis2024";
const SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN ?? "lumis-admin-authenticated";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getSessionToken(): string {
  return SESSION_TOKEN;
}

export async function isAuthenticated(): Promise<boolean> {
  // Auth disabled for now — open admin access
  return true;
}
