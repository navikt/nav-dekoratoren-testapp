import { expect, test } from "@playwright/test";

test("simple: true initialiserer Dekoratøren med forventet parameter", async ({
  page,
}) => {
  await page.goto("/parametre/simple");

  await expect(page.locator("header")).toBeAttached({ timeout: 15_000 });
  await expect(page.locator("footer")).toBeAttached({ timeout: 15_000 });
  await expect(page.getByTestId("simple-parameter")).toHaveText(
    "simple: true",
  );
  await expect(page.getByTestId("integration-state")).toHaveText(
    "rendret/lastet",
    { timeout: 15_000 },
  );
});
