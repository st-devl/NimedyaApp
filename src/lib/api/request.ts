import { env } from "@/config/env";

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export function isAllowedSameOriginMutation(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const requestOrigin = new URL(request.url).origin;
  if (origin === requestOrigin) return true;

  return origin === new URL(env.NEXT_PUBLIC_SITE_URL).origin;
}
