import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    /**
     * Select short value
     * @param value dropdown value
     * az   : Name (A to Z)
     * za   : Name (Z to A)
     * lohi : Price (low to high)
     * hilo : Price (high to low)
     */
    async sortByValue(value: string) {
        const dropdown = this.page.locator('[data-test="product-sort-container"]');
        await dropdown.selectOption(value);
    }

    async getAllProductsNames() {
        const titleLocators = this.page.locator('[data-test="inventory-item-name"]');

        return await titleLocators.allTextContents();
    }

    async getAllProductsPricesAsNumbers() {
        const priceLocators = this.page.locator('[data-test="inventory-item-price"]');
        const priceTexts = await priceLocators.allTextContents();

        return priceTexts.map(text => parseFloat(text.replace('$', '')));
    }

    async gotoCartPage() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
    
}