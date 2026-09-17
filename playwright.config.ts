import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.TEST_APP_URL ?? "http://localhost:3000",
    ...devices["Desktop Chrome"],
  },
});
