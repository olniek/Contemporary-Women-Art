import { expect, test } from "@playwright/test";

async function openDurationTopic(page: import("@playwright/test").Page) {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Performance" }).click();
  await expect(page.getByRole("heading", { name: "Performance" })).toBeVisible();
  await page.getByRole("button", { name: "Duration" }).click();
  await expect(page.getByRole("button", { name: "Duration" })).toHaveClass(/active/);
}

test("Duration topic shows loaded artist portraits", async ({ page }) => {
  await openDurationTopic(page);

  const imgs = page.locator("#artist-grid .card-image-img");
  await expect(imgs).toHaveCount(3);

  for (let i = 0; i < 3; i++) {
    const img = imgs.nth(i);
    await expect(img).toHaveJSProperty("complete", true);
    await expect
      .poll(async () => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }

  await expect(page.locator('[data-image-fallback="true"]')).toHaveCount(0);
});
