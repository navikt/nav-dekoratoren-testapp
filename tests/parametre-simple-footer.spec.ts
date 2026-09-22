import { expect, test } from "@playwright/test";

test("simpleFooter: true initialiserer en forenklet footer", async ({ page }) => {
  await page.goto("/parametre/simple-footer");

  await expect(page.locator("footer")).toBeAttached({ timeout: 15_000 });
  await expect(page.locator("header")).toBeAttached({ timeout: 15_000 });
  await expect(page.getByTestId("simpleFooter-parameter")).toHaveText(
    "simpleFooter: true",
  );
  await expect(page.getByTestId("integration-state")).toHaveText(
    "rendret/lastet",
    { timeout: 15_000 },
  );
});
