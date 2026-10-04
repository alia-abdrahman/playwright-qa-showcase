import { defineConfig, devices } from '@playwright/test';

/**
 * Central Playwright configuration.
 *
 * This single file controls HOW the whole suite runs — which browsers, where the
 * app lives, how failures are captured, and how results are reported. Keeping it
 * config-driven means one line here redirects every test at a new browser or
 * environment, with no changes to the specs.
 *
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Where the tests live.
  testDir: './tests',

  // Run tests inside each file in parallel. Fast feedback is a core Playwright selling point.
  fullyParallel: true,

  // Fail the CI build if someone accidentally commits a `test.only`.
  forbidOnly: !!process.env.CI,

  // Retry flaky tests on CI only (locally we want failures to be loud).
  retries: process.env.CI ? 2 : 0,

  // Limit workers on CI for stability; use the machine's full power locally.
  workers: process.env.CI ? 1 : undefined,

  // The HTML reporter captures screenshots, traces and per-step timings for every run.
  reporter: [['html', { open: 'never' }], ['list']],

  // Settings shared by every test.
  use: {
    // Base URL so tests can navigate with page.goto('/') instead of full URLs.
    baseURL: 'https://www.saucedemo.com',

    // Capture a trace on the first retry — this powers the Trace Viewer (your debugging demo).
    trace: 'on-first-retry',

    // Evidence on failure: a screenshot and a video. Great for defect reports.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Cross-browser coverage: the same tests run on Chromium, Firefox, and WebKit (Safari engine).
  // Comment out browsers you don't want to run locally to speed things up.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
