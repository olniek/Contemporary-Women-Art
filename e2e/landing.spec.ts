import { expect, test } from "@playwright/test";

test("landing shows title, example figure, and primary CTA", async ({ page }) => {
  await page.goto("/index.html");

  await expect(
    page.getByRole("heading", { name: "Female Contemporary Artists" }),
  ).toBeVisible();

  await expect(page.getByRole("button", { name: "Ask the collection" })).toHaveCount(0);

  await expect(page.locator(".landing-example img")).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin" })).toBeVisible();

  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByRole("heading", { name: "Choose a Series" })).toBeVisible();
});
