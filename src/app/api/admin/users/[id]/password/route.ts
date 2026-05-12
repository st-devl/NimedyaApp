import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";

const changePasswordSchema = z.object({
  password: z.string().min(8).max(128),
});

function parseId(idStr: string): number | null {
  const n = parseInt(idStr, 10);
  return isNaN(n) || n < 1 ? null : n;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // ADMIN can change any user's password; any role can change their own
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid user id.", 400);

  const isSelf = id === authorized.session.userId;
  const isAdmin = authorized.session.role === "ADMIN";

  if (!isSelf && !isAdmin) {
    return apiError("FORBIDDEN", "Insufficient permissions to change another user's password.", 403);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = changePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid payload.", 400, parsed.error.flatten());
  }

  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) return apiError("NOT_FOUND", "User not found.", 404);

  await prisma.adminUser.update({
    where: { id },
    data: { passwordHash: hashPassword(parsed.data.password) },
  });

  return apiOk({ updated: true });
}
