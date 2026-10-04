import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { loginScenarios } from '../../data/users';

/**
 * DATA-DRIVEN login tests.
 *
 * We loop over `loginScenarios` (from data/users.ts) and generate one test per scenario.
 * This single block produces 4 independent tests covering positive AND negative cases —
 * add a row to the data file and you get another test for free. No copy-paste.
 */
test.describe('Login', () => {
  for (const scenario of loginScenarios) {
    test(scenario.description, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);

      if (scenario.expectSuccess) {
        // Positive path: we should land on the products page.
        await inventoryPage.expectLoaded();
      } else {
        // Negative path: we should see the expected error banner.
        await loginPage.expectError(scenario.expectedError!);
      }
    });
  }
});
