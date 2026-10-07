import { Page, Locator, expect } from '@playwright/test';

// The products page you land on after logging in.
export class InventoryPage {
  readonly cartBadge: Locator;
  private readonly title: Locator;
  private readonly cartLink: Locator;

  constructor(private page: Page) {
    this.title = page.locator('.title'); // reads "Products"
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  // Confirm login actually worked and we are on the products page.
  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.title).toHaveText('Products');
  }

  // Find the card for a product by its name, then click its button.
  // Works no matter how many products are on the page.
  async addItemToCart(productName: string) {
    await this.product(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(productName: string) {
    await this.product(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  private product(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }
}
