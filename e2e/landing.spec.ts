import { expect, test } from "@playwright/test";
import { shortSessionAnchorForDay } from "../data.js";

test("landing shows title, example figure, and primary CTA", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.getByRole("heading", { name: "Female Contemporary Artists" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Ask the collection" })).toHaveCount(0);

  await expect(page.locator(".landing-example img")).toBeVisible();
  await expect(page.getByRole("button", { name: "Begin" })).toBeVisible();

  const secondaryNav = page.getByRole("navigation", { name: /other ways to explore/i });
  await expect(secondaryNav).toBeVisible();
  await expect(secondaryNav.getByRole("button", { name: "5-minute tour" })).toBeVisible();
  await expect(secondaryNav.getByRole("button", { name: "Your favorites" })).toBeVisible();

  await expect(page.locator(".landing-status")).toContainText(/5 of 5 disciplines live/);

  await page.getByRole("button", { name: "Begin" }).click();
  await expect(page.getByRole("heading", { name: "Choose a Series" })).toBeVisible();
});

test("5-minute tour opens topic and scrolls to anchor artist", async ({ page }) => {
  const anchor = shortSessionAnchorForDay();
  await page.goto("/index.html");

  await page.getByRole("button", { name: "5-minute tour" }).click();

  await expect(page.locator("#topic-tabs")).toBeVisible();
  const scene = page.locator(`#artist-grid .card-scene[data-artist-id="${anchor.artistId}"]`);
  await expect(scene).toBeVisible();
  await expect(scene.locator(".card")).toBeFocused();
});

test("Continue last place appears after visiting a topic", async ({ page }) => {
  await page.goto("/index.html");
  await page.evaluate(() => {
    localStorage.setItem(
      "wia_last_place",
      JSON.stringify({ seriesId: "photography", topicId: "identity" }),
    );
  });
  await page.reload();

  const continueBtn = page.getByRole("button", { name: /Continue: Photography — Identity/i });
  await expect(continueBtn).toBeVisible();
  await continueBtn.click();

  await expect(page.locator("#topic-tabs")).toBeVisible();
  await expect(page.locator("#topic-tabs .topic-tab.active")).toHaveText("Identity");
});

test("hash route opens favorites from landing link", async ({ page }) => {
  await page.goto("/index.html#/favorites");

  await expect(page.getByRole("heading", { name: "Your Favorites" })).toBeVisible();
});

test("hash route opens series-select", async ({ page }) => {
  await page.goto("/index.html#/series");

  await expect(page.getByRole("heading", { name: "Choose a Series" })).toBeVisible();
});

test("Your favorites on landing navigates to favorites screen", async ({ page }) => {
  await page.goto("/index.html");

  await page
    .getByRole("navigation", { name: /other ways to explore/i })
    .getByRole("button", { name: /Your favorites/i })
    .click();

  await expect(page.getByRole("heading", { name: "Your Favorites" })).toBeVisible();
});
