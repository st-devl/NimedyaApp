import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

const updateUserSchema = z.object({
  role: z.enum(["ADMIN", "EDITOR"]).optional(),
  isActive: z.boolean().optional(),
}).refine((d) => d.role !== undefined || d.isActive !== undefined, {
  message: "At least one of role or isActive is required.",
});

function parseId(idStr: string): number | null {
  const n = parseInt(idStr, 10);
  return isNaN(n) || n < 1 ? null : n;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid user id.", 400);

  // Prevent admins from deactivating themselves
  if (id === authorized.session.userId) {
    return apiError("FORBIDDEN", "Cannot modify your own account status.", 403);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = updateUserSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid payload.", 400, parsed.error.flatten());
  }

  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) return apiError("NOT_FOUND", "User not found.", 404);

  const updated = await prisma.adminUser.update({
    where: { id },
    data: { ...(parsed.data.role && { role: parsed.data.role }), ...(parsed.data.isActive !== undefined && { isActive: parsed.data.isActive }) },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true },
  });

  return apiOk({ user: updated });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (!id) return apiError("BAD_REQUEST", "Invalid user id.", 400);

  if (id === authorized.session.userId) {
    return apiError("FORBIDDEN", "Cannot deactivate your own account.", 403);
  }

  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) return apiError("NOT_FOUND", "User not found.", 404);

  // Soft-delete: deactivate instead of hard delete
  await prisma.adminUser.update({ where: { id }, data: { isActive: false } });
  return apiOk({ deactivated: true });
}
