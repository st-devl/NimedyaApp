import { z } from "zod";
import { consumeRateLimit } from "@/lib/api/rate-limit";
import { apiError, apiOk } from "@/lib/api/json-response";
import { getClientIp, isAllowedSameOriginMutation } from "@/lib/api/request";
import { prisma } from "@/lib/db/prisma";
import { buildAdminSessionCookie } from "@/lib/auth/admin-session";
import { verifyPassword } from "@/lib/auth/password";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!isAllowedSameOriginMutation(request)) {
    return apiError("FORBIDDEN", "Invalid request origin.", 403);
  }

  const clientIp = getClientIp(request);
  const rateLimit = await consumeRateLimit("admin-login", clientIp, 8, 60_000);
  if (!rateLimit.allowed) {
    return apiError("RATE_LIMITED", "Too many login attempts. Please retry in a minute.", 429, undefined, {
      headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Invalid JSON body.", 400);
  }

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid payload.", 400);
  }

  const adminUser = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    select: { id: true, passwordHash: true, role: true, isActive: true },
  });

  if (!adminUser || !adminUser.isActive || !verifyPassword(parsed.data.password, adminUser.passwordHash)) {
    return apiError("UNAUTHORIZED", "Invalid credentials.", 401);
  }

  const sessionCookie = buildAdminSessionCookie({ id: adminUser.id, role: adminUser.role });
  const response = apiOk({ userId: adminUser.id, role: adminUser.role });
  response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);
  return response;
}
