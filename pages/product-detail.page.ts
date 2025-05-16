import { Locator, Page, expect } from '@playwright/test';

export class ProductDetailPage {
    readonly product: Locator;
    constructor(public page: Page) {
        this.product
    }

    async goto() {
        await this.page.goto('/login');
    }

    
}