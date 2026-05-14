import { expect, test } from "@playwright/test";

test("collection search from series select opens topic and scrolls to artist card", async ({
  page,
}) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByRole("heading", { name: "Choose a Series" })).toBeVisible();

  const search = page.getByRole("searchbox", { name: /Search artists/i });
  await search.fill("Goldin");
  await page.getByRole("option", { name: /Nan Goldin/i }).click();

  await expect(page.getByRole("heading", { name: "Photography" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Learn about Nan Goldin." })).toBeVisible();
});

test("collection search on topic screen navigates between topics", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();

  const search = page.getByRole("searchbox", { name: /Search artists/i });
  await search.fill("Mendieta");
  await page.getByRole("option", { name: /Ana Mendieta/i }).click();

  await expect(page.getByRole("button", { name: "Learn about Ana Mendieta." })).toBeVisible();
});
