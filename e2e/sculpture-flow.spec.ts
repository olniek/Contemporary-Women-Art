import { expect, test } from "@playwright/test";

async function openSculptureBody(page: import("@playwright/test").Page) {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();
  await page.getByRole("button", { name: "Sculpture" }).click();
  await expect(page.getByRole("heading", { name: "Sculpture" })).toBeVisible();
  await expect(page.getByText(/Sculpture that makes the body visible/i)).toBeVisible();
}

test("Sculpture series opens topic-select with editorial copy", async ({ page }) => {
  await openSculptureBody(page);
  await expect(page.getByText("Coming soon")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Body" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Space" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Material" })).toBeVisible();
});

test("Sculpture body topic enables quiz after two card flips", async ({ page }) => {
  await openSculptureBody(page);
  const quiz = page.getByRole("button", { name: "Take Quiz →" });
  await expect(quiz).toBeDisabled();

  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();
  await expect(quiz).toBeEnabled();
});

test("Sculpture body quiz shows topic-specific questions", async ({ page }) => {
  await openSculptureBody(page);
  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();
  await page.getByRole("button", { name: "Take Quiz →" }).click();

  await expect(page.getByRole("heading", { name: /Sculpture — Quiz/ })).toBeVisible();
  await expect(page.getByText(/Louise Bourgeois's giant spider sculptures/i)).toBeVisible();
});

test("Sculpture space topic shows artists and topic quiz", async ({ page }) => {
  await openSculptureBody(page);
  await page.getByRole("button", { name: "Space", exact: true }).click();
  await expect(
    page.getByText(/Works that reshape rooms, memorials, and negative space/i),
  ).toBeVisible();
  await expect(page.locator("#artist-grid .card-scene")).toHaveCount(3);

  const cards = page.locator("#artist-grid .card");
  await cards.nth(0).click();
  await cards.nth(1).click();
  await page.getByRole("button", { name: "Take Quiz →" }).click();
  await expect(page.getByText(/Rachel Whiteread is best known for casting/i)).toBeVisible();
});
