import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the product/inventory page shown after a successful login.
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title'); // reads "Products"
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /** Confirm we actually landed on the products page after login. */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.title).toHaveText('Products');
  }

  /**
   * Add a product to the cart by its visible name, e.g. 'Sauce Labs Backpack'.
   * We scope to the product's card, then click its "Add to cart" button — so this works
   * no matter how many products are on the page.
   */
  async addItemToCart(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Remove a product from the cart by its visible name. */
  async removeItemFromCart(productName: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  /** Read the number on the cart badge (0 when the badge is absent). */
  async getCartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  /** Open the cart page. */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
