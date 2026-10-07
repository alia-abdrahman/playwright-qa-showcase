import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { loginScenarios } from '../../data/users';

// Data-driven tests: one loop over data/users.ts creates 4 separate tests,
// covering both the happy path and three failure cases.
test.describe('Login', () => {
  for (const scenario of loginScenarios) {
    test(scenario.name, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);

      if (scenario.error) {
        await loginPage.expectError(scenario.error);
      } else {
        await new InventoryPage(page).expectLoaded();
      }
    });
  }
});
