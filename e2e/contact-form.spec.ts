import { test, expect } from "@playwright/test";

/**
 * Contact form e2e tests.
 *
 * NOTE: These tests require a running server with a database connection
 * because the contact page SSR fetches CMS content from MySQL.
 *
 * The API call to /api/contact is intercepted via page.route() so no
 * real contact records are created in the database.
 */

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API endpoint — prevents real DB writes and controls response
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 201, json: { ok: true, data: { received: true } } }),
    );
    await page.goto("/en/contact");
  });

  test("renders name, email, and message fields", async ({ page }) => {
    await expect(page.locator("#full-name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("shows client-side validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /Gonder|Send/i }).click();
    await expect(page.getByText("Ad Soyad zorunludur.")).toBeVisible();
    await expect(page.getByText("E-posta zorunludur.")).toBeVisible();
    await expect(page.getByText("Mesaj zorunludur.")).toBeVisible();
  });

  test("shows email validation error for invalid email", async ({ page }) => {
    await page.locator("#full-name").fill("Ali Veli");
    await page.locator("#email").fill("not-an-email");
    await page.locator("#message").fill("Bu bir test mesajidir.");
    await page.getByRole("button", { name: /Gonder|Send/i }).click();
    await expect(page.getByText("Gecerli bir e-posta girin.")).toBeVisible();
  });

  test("submits successfully and shows success message", async ({ page }) => {
    await page.locator("#full-name").fill("Ahmet Yilmaz");
    await page.locator("#email").fill("ahmet@example.com");
    await page.locator("#message").fill("Hizmetleriniz hakkinda bilgi almak istiyorum.");

    await page.getByRole("button", { name: /Gonder|Send/i }).click();

    await expect(page.getByText("Mesajiniz alindi.")).toBeVisible();
  });

  test("clears form fields after successful submission", async ({ page }) => {
    await page.locator("#full-name").fill("Ahmet Yilmaz");
    await page.locator("#email").fill("ahmet@example.com");
    await page.locator("#message").fill("Hizmetleriniz hakkinda bilgi almak istiyorum.");

    await page.getByRole("button", { name: /Gonder|Send/i }).click();

    await expect(page.locator("#full-name")).toHaveValue("");
    await expect(page.locator("#email")).toHaveValue("");
    await expect(page.locator("#message")).toHaveValue("");
  });

  test("shows error message when API returns an error", async ({ page }) => {
    // Override the beforeEach mock for this test only
    await page.unroute("/api/contact");
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 500, json: { ok: false, error: { code: "INTERNAL_ERROR", message: "Server error." } } }),
    );

    await page.locator("#full-name").fill("Ahmet Yilmaz");
    await page.locator("#email").fill("ahmet@example.com");
    await page.locator("#message").fill("Hizmetleriniz hakkinda bilgi almak istiyorum.");

    await page.getByRole("button", { name: /Gonder|Send/i }).click();

    await expect(page.getByText("Mesaj gonderilemedi.")).toBeVisible();
  });

  test("shows loading state while submitting", async ({ page }) => {
    await page.unroute("/api/contact");
    await page.route("/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await route.fulfill({ status: 201, json: { ok: true, data: { received: true } } });
    });

    await page.locator("#full-name").fill("Test Kullanici");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#message").fill("Bu bir test mesajidir yeterince uzun.");

    await page.getByRole("button", { name: /Gonder|Send/i }).click();
    await expect(page.getByRole("button", { name: "Gonderiliyor..." })).toBeDisabled();
  });
});
