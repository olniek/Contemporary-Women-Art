import { expect, test } from "@playwright/test";

test("favorite persists across reload when reopening Favorites", async ({ page }) => {
  await page.goto("/index.html");
  await page.evaluate(() => localStorage.removeItem("wia_favorites"));
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();

  const heart = page.getByRole("button", { name: /^Add .+ from favorites$/ }).first();
  const label = await heart.getAttribute("aria-label");
  const match = label?.match(/^Add (.+) from favorites$/);
  expect(match).toBeTruthy();
  const artistName = match![1];

  await heart.click();
  await expect(
    page.getByRole("button", { name: `Remove ${artistName} from favorites` }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Favorites", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Your favorites" })).toBeVisible();
  await expect(page.getByRole("list")).toContainText(artistName);

  await page.reload();
  await page.goto("/index.html#/landing");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();
  await page.getByRole("button", { name: "Favorites", exact: true }).click();

  await expect(page.getByRole("heading", { name: "Your favorites" })).toBeVisible();
  await expect(page.getByRole("list")).toContainText(artistName);
});
