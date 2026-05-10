import { expect, test } from "@playwright/test";

test("landing offers Ask the collection and navigates to Ask screen", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.getByRole("button", { name: "Ask the collection" })).toBeVisible();

  await page.getByRole("button", { name: "Ask the collection" }).click();
  await expect(page.getByRole("heading", { name: "Ask the collection" })).toBeVisible();
  await expect(page.getByRole("button", { name: "← Back" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Your question" })).toBeVisible();
});
