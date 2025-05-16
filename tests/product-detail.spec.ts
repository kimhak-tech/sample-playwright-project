import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import * as users from '../datas/users.json';

test.describe("Product Detail Page @product", async () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let item: Locator;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
    loginPage.login(users.standard.username, users.standard.password);

    productPage = new ProductPage(page);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    item = page.locator('[data-test="inventory-item"]').first();
    item.locator('[data-test="inventory-item-name"]').click();
  });

  // Product Detail : title, description, price
  test('Should have the correct format info', async ({ page }) => {
    expect(page.locator('[data-test="inventory-item-name"]').textContent()).not.toBeNull();
    expect(page.locator('[data-test="inventory-item-name"]').textContent()).not.toBeNull();
    // Price
    // Add to Cart
  });

  // Add item to cart
  // Remove item from the cart

  // Navigate back
  test('should go to back to Products page when click on "Back to Products"', async ({ page }) => {
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/.*inventory\.html$/);
  });

});