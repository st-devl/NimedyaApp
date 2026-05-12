import { createHmac, timingSafeEqual } from "crypto";
import type { AdminRole } from "@prisma/client";
import { cookies } from "next/headers";
import { env } from "@/config/env";

const COOKIE_NAME = "nimedya_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  sub: number;
  role: AdminRole;
  exp: number;
};

export type AdminSession = {
  userId: number;
  role: AdminRole;
  expiresAt: Date;
};

function sign(value: string): string {
  return createHmac("sha256", env.ADMIN_SESSION_SECRET).update(value).digest("hex");
}

function encode(payload: AdminSessionPayload): string {
  const json = JSON.stringify(payload);
  const base = Buffer.from(json, "utf8").toString("base64url");
  const signature = sign(base);
  return `${base}.${signature}`;
}

function decode(token: string): AdminSessionPayload | null {
  const [base, signature] = token.split(".");
  if (!base || !signature) return null;

  const expected = sign(base);
  const sigA = Buffer.from(signature, "utf8");
  const sigB = Buffer.from(expected, "utf8");
  if (sigA.length !== sigB.length || !timingSafeEqual(sigA, sigB)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(base, "base64url").toString("utf8")) as AdminSessionPayload;
    if (typeof parsed.sub !== "number" || !["ADMIN", "EDITOR"].includes(parsed.role) || typeof parsed.exp !== "number") return null;
    if (Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildAdminSessionCookie(user: { id: number; role: AdminRole }) {
  const payload: AdminSessionPayload = {
    sub: user.id,
    role: user.role,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const value = encode(payload);
  return {
    name: COOKIE_NAME,
    value,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    },
  };
}

export function clearAdminSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };
}

export async function hasAdminSession(): Promise<boolean> {
  return Boolean(await getAdminSession());
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = decode(token);
  if (!payload) return null;

  return {
    userId: payload.sub,
    role: payload.role,
    expiresAt: new Date(payload.exp),
  };
}
