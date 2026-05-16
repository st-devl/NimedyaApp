import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Limit connection pool to avoid exhausting MySQL max_connections on shared hosting
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL ?? "";
  if (!url || url.includes("connection_limit")) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}connection_limit=3&connect_timeout=10&socket_timeout=10`;
};

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: { db: { url: getDatabaseUrl() } },
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
