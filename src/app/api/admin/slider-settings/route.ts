import { apiError, apiOk } from "@/lib/api/json-response";
import { authorizeAdminRequest } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(request: Request) {
  const authorized = await authorizeAdminRequest(request, ["ADMIN"]);
  if (!authorized.ok) return authorized.response;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const { intervalSeconds } = raw as Record<string, unknown>;
  if (typeof intervalSeconds !== "number" || !Number.isInteger(intervalSeconds) || intervalSeconds < 1 || intervalSeconds > 60) {
    return apiError("BAD_REQUEST", "intervalSeconds must be an integer between 1 and 60.", 400);
  }

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: { sliderIntervalSeconds: intervalSeconds },
  });

  return apiOk({ intervalSeconds });
}
