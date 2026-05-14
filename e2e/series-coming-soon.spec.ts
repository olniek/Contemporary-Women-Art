import { expect, test } from "@playwright/test";

test("Sculpture series shows coming-soon preview and stays on series chooser", async ({ page }) => {
  await page.goto("/index.html");
  await page.getByRole("button", { name: "Begin" }).click();

  const sculpture = page.getByRole("button", { name: /Sculpture/i });
  await expect(sculpture).toBeVisible();
  await expect(sculpture).toBeEnabled();
  await expect(sculpture.getByText("Coming soon")).toBeVisible();

  await sculpture.click();
  await expect(page.getByText(/Three topics—body, space, and material/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Note interest (this browser)" })).toBeVisible();

  await page.getByRole("button", { name: "Photography" }).click();
  await expect(page.getByRole("heading", { name: "Photography" })).toBeVisible();
});
