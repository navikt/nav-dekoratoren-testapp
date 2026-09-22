import { expect, test } from "@playwright/test";

test("simpleHeader: true initialiserer en forenklet header", async ({ page }) => {
  await page.goto("/parametre/simple-header");

  await expect(page.locator("header")).toBeAttached({ timeout: 15_000 });
  await expect(page.locator("footer")).toBeAttached({ timeout: 15_000 });
  await expect(page.getByTestId("simpleHeader-parameter")).toHaveText(
    "simpleHeader: true",
  );
  await expect(page.getByTestId("integration-state")).toHaveText(
    "rendret/lastet",
    { timeout: 15_000 },
  );
});
