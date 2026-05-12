import { NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { clearAdminSessionCookie } from "@/lib/auth/admin-session";

export async function POST(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const cookie = clearAdminSessionCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
