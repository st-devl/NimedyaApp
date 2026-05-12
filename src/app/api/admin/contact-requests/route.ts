import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { listContactRequests, updateContactRequestStatus } from "@/lib/cms/contact";

const updateStatusSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export async function GET(request: Request) {
  const authorized = await authorizeAdminRequest(request);
  if (!authorized.ok) return authorized.response;

  return apiOk({ requests: await listContactRequests() });
}

export async function PATCH(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN", "EDITOR"]);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = updateStatusSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid status payload.", 400, parsed.error.flatten());
  }

  const requestRow = await updateContactRequestStatus(parsed.data.id, parsed.data.status);
  return apiOk({ request: requestRow });
}
