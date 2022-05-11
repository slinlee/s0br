import { expect, test } from "@playwright/test";

test("index page has expected h1", async ({ page }) => {
  await page.goto("/");
  expect(await page.textContent("h1")).toBe("Welcome to S0BR");
});

test("index page should have main button", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("/");

  // Click [data-test="commitment-btn"]
  await expect(page.locator('[data-test="commitment-btn"]')).toContainText(
    "Connect MetaMask"
  );
});

test("index page should have wallet info", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("/");

  await expect(page.locator('[data-test="wallet-info"]')).toContainText(
    "Loading..."
  );
});

test("index page should have calendar", async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto("/");

  await expect(page.locator('[data-test="calendar"]')).toBeVisible();
});
