import { prisma } from "@/lib/db/prisma";

export async function consumeRateLimit(
  scope: string,
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const now = new Date();
  const nextReset = new Date(now.getTime() + windowMs);

  const result = await prisma.$transaction(async (tx) => {
    const bucket = await tx.apiRateLimit.findUnique({
      where: { scope_key: { scope, key } },
      select: { id: true, count: true, resetAt: true },
    });

    if (!bucket || bucket.resetAt <= now) {
      await tx.apiRateLimit.upsert({
        where: { scope_key: { scope, key } },
        update: { count: 1, resetAt: nextReset },
        create: { scope, key, count: 1, resetAt: nextReset },
      });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (bucket.count >= limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt.getTime() - now.getTime()) / 1000));
      return { allowed: false, retryAfterSeconds };
    }

    await tx.apiRateLimit.update({
      where: { id: bucket.id },
      data: { count: { increment: 1 } },
    });
    return { allowed: true, retryAfterSeconds: 0 };
  });

  return result;
}
