import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests require a running Next.js server with a MySQL database.
 *
 * To run locally:
 *   docker compose up -d   # starts MySQL + app
 *   npm run test:e2e
 *
 * Or against an already-running dev server:
 *   PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
 *
 * CI: see .github/workflows/ci.yml e2e job (requires mysql service).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
