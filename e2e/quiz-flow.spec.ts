import { expect, test } from "@playwright/test";

async function openPhotographyTopic(page: import("@playwright/test").Page) {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();
}

test("quiz requires selection before Next, then shows feedback", async ({ page }) => {
  await openPhotographyTopic(page);
  await page.getByRole("button", { name: "Take Quiz →" }).click();

  await expect(page.getByRole("heading", { name: /Photography — Quiz/ })).toBeVisible();

  const next = page.getByRole("button", { name: "Next" });
  await expect(next).toBeDisabled();

  await page.locator('input[name="quiz-choice"]').first().check();
  await expect(next).toBeEnabled();
  await next.click();

  await expect(page.getByRole("heading", { name: "Why this answer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Curator note" })).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Question 2 of 5")).toBeVisible();
});

test("video art Narrative topic uses legacy bank (three options)", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Video Art" }).click();
  await page.getByRole("button", { name: "Narrative" }).click();
  await page.getByRole("button", { name: "Take Quiz →" }).click();

  await expect(page.getByRole("radio")).toHaveCount(3);
});
