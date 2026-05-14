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

test("landing offers Ask the collection and navigates to Ask screen", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.getByRole("button", { name: "Ask the collection" })).toBeVisible();

  await page.getByRole("button", { name: "Ask the collection" }).click();
  await expect(page.getByRole("heading", { name: "Ask the collection" })).toBeVisible();
  await expect(page.getByRole("button", { name: "← Back" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Your question" })).toBeVisible();
});

test("Ask shows validation when submitting empty question", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Ask the collection" }).click();

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

  await page.goto("/index.html");
  await page.getByRole("button", { name: "Ask the collection" }).click();

  await page
    .getByRole("textbox", { name: "Your question" })
    .fill("Who uses light in installation?");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Stubbed answer for tests.")).toBeVisible();
});
