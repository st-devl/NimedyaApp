import { test, expect } from "@playwright/test";

/**
 * Admin settings e2e tests.
 *
 * Auth redirect tests work WITHOUT a database (layout only checks cookies).
 *
 * Settings form tests require a running server with database AND a valid
 * session cookie. The cookie is set via context.addCookies() using a
 * pre-built token signed with the ADMIN_SESSION_SECRET env var.
 *
 * To produce a valid token, run the helper in e2e/helpers/auth.ts.
 */

// ── Unauthenticated redirect ────────────────────────────────────────────────

test.describe("Admin settings — auth redirect (no DB needed)", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("redirects unauthenticated user from /en/admin to login", async ({ page }) => {
    await page.goto("/en/admin");
    // Should redirect to login page
    await expect(page).toHaveURL(/admin\/login|admin\/giris/);
  });

  test("redirects unauthenticated user from /en/admin/settings to login", async ({ page }) => {
    await page.goto("/en/admin/settings");
    await expect(page).toHaveURL(/admin\/login|admin\/giris/);
  });

  test("login page is accessible without auth", async ({ page }) => {
    await page.goto("/en/admin/login");
    await expect(page.locator("form")).toBeVisible();
  });
});

// ── Settings form (requires running server + DB + valid session) ────────────

test.describe("Admin settings form", () => {
  test.beforeEach(async ({ page }) => {
    // Mock settings GET endpoint so page renders without DB
    await page.route("/api/admin/settings", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          json: {
            ok: true,
            data: {
              settings: {
                siteName: "Nimedya",
                siteTagline: "Dijital Ajans",
                contactEmail: "info@nimedya.com",
                contactPhone: "+90 555 000 0000",
                address: "Istanbul, Turkiye",
                socialInstagram: "",
                socialTwitter: "",
                socialLinkedin: "",
                headerLogoText: "Nimedya",
                footerLogoText: "Nimedya",
                heroImages: [],
                heroImagesMobile: [],
              },
            },
          },
        });
      } else {
        await route.continue();
      }
    });
  });

  /**
   * These tests require a valid session cookie to avoid the auth redirect.
   * They are skipped unless PLAYWRIGHT_SESSION_TOKEN env var is set.
   *
   * To generate a token:
   *   node -e "
   *     const { createHmac } = require('crypto');
   *     const secret = process.env.ADMIN_SESSION_SECRET;
   *     const payload = { sub: 1, role: 'ADMIN', exp: Date.now() + 8*60*60*1000 };
   *     const base = Buffer.from(JSON.stringify(payload)).toString('base64url');
   *     const sig = createHmac('sha256', secret).update(base).digest('hex');
   *     console.log(base + '.' + sig);
   *   "
   */
  test("updates site name and shows success feedback", async ({ page, context }) => {
    const sessionToken = process.env.PLAYWRIGHT_SESSION_TOKEN;
    if (!sessionToken) {
      test.skip(true, "Set PLAYWRIGHT_SESSION_TOKEN to run authenticated settings tests");
    }

    await context.addCookies([
      {
        name: "nimedya_admin_session",
        value: sessionToken!,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    // Mock the PATCH endpoint
    await page.route("/api/admin/settings", async (route) => {
      if (route.request().method() === "PATCH") {
        await route.fulfill({ json: { ok: true, data: { settings: {} } } });
      } else {
        await route.continue();
      }
    });

    await page.goto("/en/admin/settings");

    // Should NOT redirect to login (valid cookie)
    await expect(page).not.toHaveURL(/admin\/login/);

    // Update site name
    const siteNameInput = page.locator('input[name="siteName"]').first();
    await siteNameInput.clear();
    await siteNameInput.fill("Nimedya Ajans");

    await page.getByRole("button", { name: /Kaydet|Save/i }).first().click();

    // Expect success feedback
    await expect(page.getByText(/kaydedildi|saved/i)).toBeVisible({ timeout: 5000 });
  });
});
