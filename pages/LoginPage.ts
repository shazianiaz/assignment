import { Expect, Locator, Page } from "@playwright/test";

class LoginPage {
  page: Page;
  expect: Expect;
  headerControlIcon: Locator;
  headerControlLoginLink: Locator;
  emailField: Locator;
  passwordField: Locator;
  submitButton: Locator;
  invalidEmailError: Locator;
  invalidPasswordError: Locator;
  closeButton: Locator;

  constructor(page: Page, expect: Expect) {
    this.page = page;
    this.expect = expect; // Store expect as a property
    this.headerControlIcon = page.getByTestId(
      "shared-header-headercontrol-login",
    );
    this.headerControlLoginLink = page.locator(
      "[data-testid='shared-header-headercontrol-burgermenu']  a:nth-child(1)",
    );
    this.emailField = page.getByTestId(
      "shared-authentication-signinWidget-emailAddress-textfield",
    );
    this.passwordField = page.getByTestId(
      "shared-authentication-signinWidget-currentPassword-textfield",
    );
    this.submitButton = page.getByTestId(
      "shared-authentication-signinWidget-submit-button",
    );
    this.invalidEmailError = page
      .locator(
        "[data-testid='shared-authentication-signIn-widget'] [data-testid='message']",
      )
      .first();
    this.invalidPasswordError = page
      .locator(
        "[data-testid='shared-authentication-signIn-widget'] [data-testid='message']",
      )
      .last();
    this.closeButton = page.getByTestId("shared-dialogHead-closeButton");
  }
  async initiateLogin() {
    await this.headerControlIcon.click();
    await this.headerControlLoginLink.click();
  }

  async enterCredentials(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async submitLogin() {
    await this.submitButton.click();
  }

  async validateErrorMessages(emailError: string, passwordError: string) {
    await this.expect(this.invalidEmailError).toHaveText(emailError);
    await this.expect(this.invalidPasswordError).toHaveText(passwordError);
  }

  async closeLoginError() {
    await this.closeButton.click();
  }
}

export default LoginPage;
