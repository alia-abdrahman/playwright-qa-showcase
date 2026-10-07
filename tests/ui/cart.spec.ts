import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { STANDARD_USER } from '../../data/users';

test.describe('Shopping cart', () => {
  let inventoryPage: InventoryPage;

  // Log in before each test, so every test starts from the same clean state.
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(STANDARD_USER.username, STANDARD_USER.password);
    await inventoryPage.expectLoaded();
  });

  test('adding two items shows 2 on the cart badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('removing an item lowers the cart badge', async () => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('the added item appears on the cart page', async ({ page }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    // expect(...).toHaveCount() keeps re-checking until the page has rendered,
    // so the test does not fail just because it looked too early.
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.expectItemInCart('Sauce Labs Backpack');
  });
});
