import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { STANDARD_USER } from '../../data/users';

/**
 * The flagship END-TO-END test: a full customer journey from login to a completed order.
 *
 * login -> add item -> open cart -> checkout info -> order overview -> finish -> confirmation
 *
 * Run it with `npm run test:headed` to watch the journey in a real browser.
 * Every step is one line because the selectors and waits live in the Page Objects;
 * that readability is the point of the framework.
 */
test('E2E: a shopper can complete a purchase from login to confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Sign in.
  await loginPage.goto();
  await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
  await inventoryPage.expectLoaded();

  // 2. Add a product and open the cart.
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.expectItemInCart('Sauce Labs Backpack');

  // 3. Check out: enter info, review overview, finish.
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '50000');
  await checkoutPage.finish();

  // 4. Verify the order completed.
  await checkoutPage.expectOrderComplete();
});
