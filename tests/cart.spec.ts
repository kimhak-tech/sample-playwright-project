import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import * as users from '../datas/users.json';
import * as utility from '../utils/helpers-methods';



test.describe("Card Page @card", async () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
    loginPage.login(users.standard.username, users.standard.password);

    productPage = new ProductPage(page);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  // Empty Cart
  test("Should show empty when there is no item", async ({page}) => {
    await productPage.gotoCartPage();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
  });

  // Cart Item Information
  test("Should have the correct information format", async ({page}) => {
    await page.locator('[data-test="inventory-item"]').first().locator('button:has-text("Add to cart")').click();
    //await page.locator('[data-test="shopping-cart-link"]').click();
    await productPage.gotoCartPage();

    expect(await page.locator('[data-test="inventory-item-name"]').textContent()).not.toBeNull();
    expect(await page.locator('[data-test="inventory-item-desc"]').textContent()).not.toBeNull();
    // Price should have format $XX.XX
    expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(/^\$\d+\.\d{2}$/);
  });

  // Add items to Cart
  test("Should able to add multiple items ", async ({page}) => {
    await page.locator('[data-test="inventory-item"]').first().locator('button:has-text("Add to cart")').click();
    await page.locator('[data-test="inventory-item"]').nth(1).locator('button:has-text("Add to cart")').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
    // Verify the added items is correct
    await productPage.gotoCartPage();
  });

  // Remove Items from Cart
  // Refresh the page => Items stay the same
  // Navigate back to Product Page
  // Checkout Products


  

});