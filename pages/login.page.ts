import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto('/login');
    }

    async enterUsername(name: string) {
        await this.page.locator('[data-test="username"]').fill(name);
    }

    async enterPass(pass: string) {
        await this.page.locator('[data-test="password"]').fill(pass);
    }

    async login(name: string, pass: string) {
        await this.page.locator('[data-test="username"]').fill(name);
        await this.page.locator('[data-test="password"]').fill(pass);
        await this.page.locator('[data-test="login-button"]').click();
    }

    async validateSuccessLogin() {
        await expect(this.page).toHaveURL(/.*inventory\.html$/);
        await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
    }

    get getErrorMessage() {
        return this.page.locator('[data-test="error"]').textContent();
    }
}