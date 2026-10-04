import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { STANDARD_USER } from '../../data/users';

/**
 * Cart behaviour tests: adding and removing products updates the cart correctly.
 *
 * `beforeEach` logs in once before every test so each test starts from a clean,
 * known state (a core testing principle — tests must be independent).
 */
test.describe('Shopping cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
    await inventoryPage.expectLoaded();
  });

  test('adding two items updates the cart badge to 2', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    expect(await inventoryPage.getCartCount()).toBe(2);
  });

  test('removing an item decreases the cart badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe(2);

    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('the added item actually appears on the cart page', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    // NOTE: use the web-first assertion `toHaveCount`, which auto-waits/retries until the
    // cart page has rendered. A plain `await locator.count()` does NOT wait — it returns
    // immediately, so it can read 0 while the page is still loading — a common source
    // of flakiness.
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.expectItemInCart('Sauce Labs Backpack');
  });
});
