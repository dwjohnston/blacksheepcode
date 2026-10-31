import { defineConfig, devices } from "@playwright/test";

// Set PLAYWRIGHT_BASE_URL to run against an already deployed site (e.g. a Netlify deploy preview).
// Otherwise the site is built and served locally, with the test pages enabled.
const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const port = Number(process.env.PORT ?? 3000);
const baseURL = externalBaseUrl ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: `bun run build && bun run next:start --port ${port}`,
        url: baseURL,
        env: { SHOW_TEST_PAGES: "true" },
        reuseExistingServer: !process.env.CI,
        timeout: 10 * 60 * 1000,
        stdout: "ignore",
        stderr: "pipe",
      },
});
