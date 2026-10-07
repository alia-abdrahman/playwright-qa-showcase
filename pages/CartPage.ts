import { Page, Locator, expect } from '@playwright/test';

// The shopping cart page.
export class CartPage {
  readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectItemInCart(productName: string) {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
