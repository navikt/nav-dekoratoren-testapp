import { test, expect } from "@playwright/test";

test("SSR med moduler er rendret i første HTML", async ({ page }) => {
  const response = await page.goto("/ssr-med-moduler");
  expect(response?.status()).toBe(200);
  expect(await page.locator("body").textContent()).toContain("ssr-med-moduler");
  await expect(page.locator("header")).toBeAttached();
  await expect(page.locator("footer")).toBeAttached();
  await expect(page.getByTestId("integration-state")).toHaveText(
    "rendret/lastet",
  );
});
