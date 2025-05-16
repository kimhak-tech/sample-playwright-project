import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import * as users from '../datas/users.json';
import * as utility from '../utils/helpers-methods';



test.describe("Product Page @product", async () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
    loginPage.login(users.standard.username, users.standard.password);

    productPage = new ProductPage(page);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  })

  // Display list of products
  test("Verify the product list", async ({page}) => {
    const items = await page.locator('[data-test="inventory-item"]').count();
    expect(items).toBeGreaterThan(0);
  });

  /**
   * Short Func
   * Name (A to Z)
   * Name (Z to A)
   * Price (low to high)
   * Price (high to low)
   */
  // Name (A to Z)
  test('Short by Name (A to Z)', async ({ page }) => {
    await productPage.sortByValue('az');

    const productsTitles = await productPage.getAllProductsNames();
    const shortedTitles = utility.sortAlphabeticallyAsc(productsTitles);
    const hasSameOrder = utility.compareStringArraysWithOrder(productsTitles, shortedTitles);

    expect(hasSameOrder).toBe(true);
  });

  // Name (Z to A)
  test('Short by Name (Z to A)', async ({ page }) => {
    await productPage.sortByValue('za');

    const productsTitles = await productPage.getAllProductsNames();
    const shortedTitles = utility.sortAlphabeticallyDesc(productsTitles);
    const hasSameOrder = utility.compareStringArraysWithOrder(productsTitles, shortedTitles);

    expect(hasSameOrder).toBe(true);
  });

  // Price (low to high)
  test('Short by Price (low to high)', async ({ page }) => {
    await productPage.sortByValue('lohi');

    const productsPrices = await productPage.getAllProductsPricesAsNumbers();
    const shortedPrices = utility.sortArrayAsc(productsPrices);
    const hasSameOrder = utility.compareNumArrays(productsPrices, shortedPrices);

    expect(hasSameOrder).toBe(true);
  });

  // Price (high to low)
  test('Short by Price (high to low)', async ({ page }) => {
    await productPage.sortByValue('hilo');

    const productsPrices = await productPage.getAllProductsPricesAsNumbers();
    const shortedPrices = utility.sortArrayDesc(productsPrices);
    const hasSameOrder = utility.compareNumArrays(productsPrices, shortedPrices);

    console.log("======= Price ==== ");
    console.log('Prices :', productsPrices);
    console.log('Shorted  :', shortedPrices);

    expect(hasSameOrder).toBe(true);
  });


  // Card Information : title, description, price
  test('Should have the correct format info on the card', async ({ page }) => {
    const firstItem = page.locator('[data-test="inventory-item"]').first();
    expect(firstItem.locator('[data-test="inventory-item-name"]').textContent()).not.toBeNull();
    expect(firstItem.locator('[data-test="inventory-item-name"]').textContent()).not.toBeNull();
    // Price
    // Add to Cart
  });

  // Navigate to Product Detail page when click on the title
  test('Should navigate to product detail page when click on the title', async ({ page }) => {
    const firstItem = page.locator('[data-test="inventory-item"]').first();
    const itemName = await firstItem.locator('[data-test="inventory-item-name"]').textContent();
    await firstItem.locator('[data-test="inventory-item-name"]').click();

    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(itemName ?? '');
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+/);
    // TODO: Verify the valid ID
  });

  // Add items to cart
  test('should add item to cart and reflect in cart badge', async ({ page }) => {
    await page.locator('[data-test="inventory-item"]').first().locator('button:has-text("Add to cart")').click();
    await page.locator('[data-test="inventory-item"]').nth(1).locator('button:has-text("Add to cart")').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
  });

  // Remove items from cart
  test('should remove item to cart and reflect in cart badge', async ({ page }) => {
    await page.locator('[data-test="inventory-item"]').first().locator('button:has-text("Add to cart")').click();
    await page.locator('[data-test="inventory-item"]').nth(1).locator('button:has-text("Add to cart")').click();

    await page.locator('[data-test="inventory-item"]').nth(1).locator('button:has-text("Remove")').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  });

  // Navigate to cart page
  test('should go to cart page when cart icon is clicked', async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart\.html$/);
  });

});