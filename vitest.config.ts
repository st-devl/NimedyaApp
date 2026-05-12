import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    env: {
      NODE_ENV: "test",
      DATABASE_URL: "mysql://test:test@localhost:3306/testdb",
      ADMIN_SESSION_SECRET: "test-secret-at-least-16-chars-long",
      ADMIN_SEED_EMAIL: "admin@test.com",
      ADMIN_SEED_PASSWORD: "testpassword123",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_DEFAULT_LOCALE: "tr",
      NEXT_PUBLIC_SUPPORTED_LOCALES: "tr,en",
    },
    coverage: {
      provider: "v8",
      include: ["src/lib/auth/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
