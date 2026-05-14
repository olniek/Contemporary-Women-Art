import { expect, test } from "@playwright/test";

/**
 * Series → topic → quiz without hard-coding Photography flows (see quiz-flow.spec.ts).
 * Uses Painting / Figurative so topic order changes in data.js do not silently break only the default tab.
 */
test("Painting Figurative reaches quiz after explore gate", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Painting" }).click();

  await expect(page.getByRole("heading", { name: "Painting" })).toBeVisible();
  await page.getByRole("button", { name: "Figurative" }).click();
  await expect(page.getByRole("button", { name: "Figurative" })).toHaveClass(/active/);

  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();

  await page.getByRole("button", { name: "Take Quiz →" }).click();
  await expect(page.getByRole("heading", { name: /Painting — Quiz/ })).toBeVisible();
  await expect(page.getByText("Question 1 of 5")).toBeVisible();
});
