import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { STANDARD_USER } from '../../data/users';

// The main end-to-end test: one customer journey, login to order confirmed.
// Run `npm run test:headed` to watch it happen in a real browser.
test('a shopper can buy an item from login to confirmation', async ({ page }) => {
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

  // 3. Check out.
  await cartPage.checkout();
  await checkoutPage.fillInformation('Test', 'User', '50000');
  await checkoutPage.finish();

  // 4. Order confirmed.
  await checkoutPage.expectOrderComplete();
});
