import type { AdminRole } from "@prisma/client";
import { apiError } from "@/lib/api/json-response";
import { isAllowedSameOriginMutation } from "@/lib/api/request";
import { getAdminSession, type AdminSession } from "@/lib/auth/admin-session";

export async function requireAdminSession(): Promise<AdminSession | null> {
  return getAdminSession();
}

export async function authorizeAdminRequest(request: Request, allowedRoles: AdminRole[] = ["ADMIN", "EDITOR"]) {
  if (!isAllowedSameOriginMutation(request)) {
    return { ok: false as const, response: apiError("FORBIDDEN", "Invalid request origin.", 403) };
  }

  const session = await requireAdminSession();
  if (!session) {
    return { ok: false as const, response: apiError("UNAUTHORIZED", "Unauthorized admin request.", 401) };
  }

  if (!allowedRoles.includes(session.role)) {
    return { ok: false as const, response: apiError("FORBIDDEN", "Insufficient admin role.", 403) };
  }

  return { ok: true as const, session };
}
