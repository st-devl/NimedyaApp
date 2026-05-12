import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";
import { getClientIp } from "@/lib/api/request";
import { appLogger } from "@/lib/logger";

const createUserSchema = z.object({
  email: z.string().email().max(190),
  password: z.string().min(8).max(128),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true },
  });

  return apiOk({ users });
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = createUserSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid user payload.", 400, parsed.error.flatten());
  }

  const exists = await prisma.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (exists) {
    return apiError("CONFLICT", "A user with that email already exists.", 409);
  }

  const user = await prisma.adminUser.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      passwordHash: hashPassword(parsed.data.password),
      role: parsed.data.role,
    },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true },
  });

  appLogger.login({ userId: authorized.session.userId, role: authorized.session.role, ip: clientIp });
  return apiOk({ user }, { status: 201 });
}
