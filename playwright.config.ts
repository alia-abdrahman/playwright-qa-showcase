import { defineConfig, devices } from '@playwright/test';

// One file controls how every test runs: which browser, which site, what to
// capture when something fails. Docs: https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests',

  // The site under test, so tests can call page.goto('/').
  use: {
    baseURL: 'https://www.saucedemo.com',

    // Evidence when a test fails: screenshot, video, and a trace you can
    // replay step by step with `npm run report`.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Run tests at the same time instead of one by one.
  fullyParallel: true,

  // Retry twice on CI (networks there are flaky); never retry locally.
  retries: process.env.CI ? 2 : 0,

  // Results as a live list in the terminal plus a browsable HTML report.
  reporter: [['list'], ['html', { open: 'never' }]],

  // Chromium only, to keep runs fast. Add Firefox or WebKit by uncommenting.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
