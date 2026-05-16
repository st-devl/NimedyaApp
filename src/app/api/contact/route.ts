import { z } from "zod";
import { apiError, apiOk } from "@/lib/api/json-response";
import { consumeRateLimit } from "@/lib/api/rate-limit";
import { getClientIp } from "@/lib/api/request";
import { createContactRequest } from "@/lib/cms/contact";
import { appLogger } from "@/lib/logger";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(190),
  message: z.string().trim().min(10).max(5000),
  serviceType: z.string().max(100).optional(),
  budget: z.string().max(80).optional(),
  timeline: z.string().max(80).optional(),
});

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = consumeRateLimit("contact-submit", clientIp, 5, 60_000);
  if (!rateLimit.allowed) {
    appLogger.rateLimited({ scope: "contact-submit", ip: clientIp });
    return apiError("RATE_LIMITED", "Too many contact requests. Please retry in a minute.", 429, undefined, {
      headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
    });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return apiError("BAD_REQUEST", "Request body must be valid JSON.", 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return apiError("BAD_REQUEST", "Invalid contact payload.", 400, parsed.error.flatten());
  }

  await createContactRequest(parsed.data);
  appLogger.contactSubmitted({ ip: clientIp });
  return apiOk({ received: true }, { status: 201 });
}
