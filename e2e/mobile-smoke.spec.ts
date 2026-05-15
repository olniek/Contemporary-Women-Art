import { expect, test } from "@playwright/test";

/**
 * Touch-oriented smoke checks (Pixel 5 / Mobile Chrome project only).
 * See playwright.config.ts: desktop chromium ignores this file.
 */

test.beforeEach(async ({ page }) => {
  await page.route("**/api/ask", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204 });
      return;
    }
    await route.continue();
  });
});

test("mobile smoke: flip two cards enables Take Quiz", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();

  const quiz = page.getByRole("button", { name: "Take Quiz →" });
  await expect(quiz).toBeDisabled();

  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();

  await expect(quiz).toBeEnabled();
});

test("mobile smoke: first quiz question shows feedback", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();

  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();

  await page.getByRole("button", { name: "Take Quiz →" }).click();
  await expect(page.getByRole("heading", { name: /Photography — Quiz/ })).toBeVisible();

  await page.locator('input[name="quiz-choice"]').first().check();
  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByRole("heading", { name: "Why this answer" })).toBeVisible();
});

test("mobile smoke: Ask shows stubbed API answer", async ({ page }) => {
  await page.route("**/api/ask", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204 });
      return;
    }
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer: "Mobile stubbed Ask answer.",
        sources: [],
        wikipedia: [],
        wikiUsed: false,
      }),
    });
  });

  await page.goto("/index.html#/ask");
  await page.getByRole("textbox", { name: "Your question" }).fill("Test question on mobile?");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Mobile stubbed Ask answer.")).toBeVisible();
});
