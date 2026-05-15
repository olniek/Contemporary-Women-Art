import { expect, test } from "@playwright/test";

async function openPhotographyTopic(page: import("@playwright/test").Page) {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Photography" }).click();
}

async function flipTwoArtistCards(page: import("@playwright/test").Page) {
  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();
}

test("quiz is enabled without flips when topic was completed before", async ({ page }) => {
  await page.goto("/index.html");
  await page.evaluate(() => {
    localStorage.setItem("wia_topic_quiz_done", JSON.stringify({ "photography:identity": true }));
  });
  // Deep-link avoids relying on default topic order under Object.keys(APP_DATA.series.photography.topics).
  await page.goto("/index.html#/topic/photography/identity");
  const quiz = page.getByRole("button", { name: "Take Quiz →" });
  await expect(quiz).toBeEnabled();
  await expect(page.getByText(/completed this quiz before/i)).toBeVisible();
});

test("take quiz stays disabled until two cards are flipped", async ({ page }) => {
  await openPhotographyTopic(page);
  const quiz = page.getByRole("button", { name: "Take Quiz →" });
  await expect(quiz).toBeDisabled();
  await expect(page.getByText(/Flip 2 cards before the quiz/)).toBeVisible();

  await page.locator("#artist-grid .card").nth(0).click();
  await expect(page.getByText(/1 of 2 viewed/)).toBeVisible();
  await expect(quiz).toBeDisabled();

  await flipTwoArtistCards(page);
  await expect(quiz).toBeEnabled();
  await expect(page.getByText(/You have enough context to try the quiz/)).toBeVisible();
});

test("quiz requires selection before Next, then shows feedback", async ({ page }) => {
  await openPhotographyTopic(page);
  await flipTwoArtistCards(page);
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

test("photography quiz completes five questions and shows rich result recap", async ({ page }) => {
  await openPhotographyTopic(page);
  await flipTwoArtistCards(page);
  await page.getByRole("button", { name: "Take Quiz →" }).click();
  await expect(page.getByRole("heading", { name: /Photography — Quiz/ })).toBeVisible();

  for (let i = 0; i < 5; i++) {
    await page.locator('input[name="quiz-choice"]').first().check();
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByRole("heading", { name: "Why this answer" })).toBeVisible();
    const cont =
      i === 4
        ? page.getByRole("button", { name: "See results" })
        : page.getByRole("button", { name: "Continue" });
    await cont.click();
  }

  await expect(page.locator(".result-score")).toHaveText(/\d+ \/ 5/);
  await expect(page.getByRole("heading", { name: "How you did" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Key ideas from the topic" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What you practiced" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Review answers" })).toBeVisible();
  await expect(page.locator(".result-recap-item").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Retry" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore another topic" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Try another series" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Start over" })).toBeVisible();
});

test("explore another topic advances within Photography", async ({ page }) => {
  await openPhotographyTopic(page);
  await flipTwoArtistCards(page);
  await page.getByRole("button", { name: "Take Quiz →" }).click();
  for (let i = 0; i < 5; i++) {
    await page.locator('input[name="quiz-choice"]').first().check();
    await page.getByRole("button", { name: "Next" }).click();
    const cont =
      i === 4
        ? page.getByRole("button", { name: "See results" })
        : page.getByRole("button", { name: "Continue" });
    await cont.click();
  }
  await page.getByRole("button", { name: "Explore another topic" }).click();
  await expect(page.getByRole("button", { name: "Documentary" })).toHaveClass(/active/);
});

test("video art Narrative topic uses dedicated topic bank", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Video Art" }).click();
  await page.getByRole("button", { name: "Narrative" }).click();
  await flipTwoArtistCards(page);
  await page.getByRole("button", { name: "Take Quiz →" }).click();

  await expect(page.getByRole("radio")).toHaveCount(4);
  await expect(page.locator(".quiz-bank-framing")).toHaveCount(0);
  await expect(page.locator(".quiz-question")).toContainText(/Birnbaum.*Wonder Woman/i);
});
