import { defineConfig, devices } from "@playwright/test";

const PORT = 9876;
const HOST = "127.0.0.1";
const baseURL = `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /mobile-smoke\.spec\.ts$/,
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: /mobile-smoke\.spec\.ts$/,
    },
  ],
  webServer: {
    command: `python3 -m http.server ${PORT} --bind ${HOST}`,
    cwd: process.cwd(),
    url: `${baseURL}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
