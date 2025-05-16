import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as users from '../datas/users.json';



test.describe("Login Page @login", async () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  })

  /**
   * Positive
   */
  // Standard User
  test("Positive: Standard user tries to login with correct credentials.", async () => {
    await loginPage.login(users.standard.username, users.standard.password);
    loginPage.validateSuccessLogin();
  });
  // Problem User
  test("Positive: Problem user tries to login with correct credentials.", async () => {
    await loginPage.login(users.problem.username, users.problem.password);
    loginPage.validateSuccessLogin();
  });
  // Performance User
  test("Positive: Performance user tries to login with correct credentials.", async () => {
    await loginPage.login(users.performance.username, users.performance.password);
    loginPage.validateSuccessLogin();
  });


  /**
   * Negative
   */
  // Empty Password
  test("Negative: User tries to login without password.", async () => {
    await loginPage.login(users.standard.username, "");
    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Password is required");
  });
  // Empty Username
  test("Negative: User tries to login without username.", async () => {
    await loginPage.login("", users.standard.password);
    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Username is required");
  });
  // Incorrect Password
  test("Negative: User tries to login with invalid password.", async () => {
    await loginPage.login(users.standard.username, "12345");
    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Username and password do not match any user in this service");
  });
});