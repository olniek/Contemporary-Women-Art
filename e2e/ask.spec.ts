import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/ask", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204 });
      return;
    }
    await route.continue();
  });
});

test("hash route opens Ask screen", async ({ page }) => {
  await page.goto("/index.html#/ask");

  await expect(page.getByRole("heading", { name: "Ask the collection" })).toBeVisible();
  await expect(page.getByRole("button", { name: "← Back" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Your question" })).toBeVisible();
});

test("topic-select offers Ask the collection", async ({ page }) => {
  await page.goto("/index.html#/topic/photography/identity");

  await expect(page.getByRole("button", { name: "Ask the collection" })).toBeVisible();
  await page.getByRole("button", { name: "Ask the collection" }).click();
  await expect(page.getByRole("heading", { name: "Ask the collection" })).toBeVisible();
});

test("Ask shows validation when submitting empty question", async ({ page }) => {
  await page.goto("/index.html#/ask");

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("p.ask-status")).toHaveText("Enter a question first.");
});

test("Ask displays stubbed API answer", async ({ page }) => {
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
        answer: "Stubbed answer for tests.",
        sources: [],
        wikipedia: [],
        wikiUsed: false,
      }),
    });
  });

  await page.goto("/index.html#/ask");

  await page
    .getByRole("textbox", { name: "Your question" })
    .fill("Who uses light in installation?");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Stubbed answer for tests.")).toBeVisible();
});

test("quiz Ask returns to quiz on Back", async ({ page }) => {
  await page.goto("/index.html");
  await page.evaluate(() => {
    localStorage.setItem("wia_topic_quiz_done", JSON.stringify({ "photography:identity": true }));
  });
  await page.goto("/index.html#/topic/photography/identity");
  await page.getByRole("button", { name: "Take Quiz →" }).click();
  await expect(page.getByRole("heading", { name: /Photography — Quiz/ })).toBeVisible();

  await page.getByRole("button", { name: "Ask the collection" }).click();
  await expect(page.getByRole("heading", { name: "Ask the collection" })).toBeVisible();

  await page.getByRole("button", { name: "← Back" }).click();
  await expect(page.getByRole("heading", { name: /Photography — Quiz/ })).toBeVisible();
});
