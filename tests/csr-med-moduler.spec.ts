import { test, expect } from "@playwright/test";

test("CSR med moduler laster Dekoratøren", async ({ page }) => {
  await page.goto("/csr-med-moduler");
  await expect(page.locator("header")).toBeAttached({ timeout: 15_000 });
  await expect(page.locator("footer")).toBeAttached({ timeout: 15_000 });
  await expect(page.getByTestId("integration-state")).toHaveText("rendret/lastet", { timeout: 15_000 });
});
