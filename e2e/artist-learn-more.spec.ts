import { expect, test } from "@playwright/test";

test("Learn more opens in-app artist detail dialog", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();

  const card = page.locator("#artist-grid .card").first();
  await card.click();
  await card.getByRole("button", { name: "Learn more about the artist" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { level: 2 })).toBeVisible();
  await expect(dialog.getByText("Artist insight")).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Ask a follow-up" })).toBeVisible();

  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});
