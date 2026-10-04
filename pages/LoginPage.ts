import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the SauceDemo login page.
 *
 * WHY PAGE OBJECT MODEL (POM)?
 * - Locators live in ONE place. If the UI changes, you fix it here, not in 20 tests.
 * - Tests read like plain English: `loginPage.login(user, pass)`.
 * - Page Objects stay free of assertions, so they can be reused by any spec.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Prefer user-facing locators (placeholder / role) — this is modern Playwright best practice.
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    // data-test attributes are the most stable hook when one exists.
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /** Navigate to the login page (uses baseURL from playwright.config.ts). */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** Fill credentials and submit. */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Assert the error banner shows the expected text. */
  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
