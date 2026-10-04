import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the shopping cart page.
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  /** How many line items are in the cart. */
  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Assert a product with the given name is present in the cart. */
  async expectItemInCart(productName: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  /** Proceed to the checkout information step. */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
