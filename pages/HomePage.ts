import { Expect, Locator, Page } from "@playwright/test";

class HomePage {
  // locators
  page: Page;
  expect: Expect;
  destinationSearchBox: Locator;
  airportsField: Locator;
  airportsWidget: Locator;
  travelPeriodField: Locator;
  travellersFieldMultiroom: Locator;
  headerControlIcon: Locator;
  headerControlLoginLink: Locator;
  dialogCloseButton: Locator;
  cookieAcceptButton: Locator;

  constructor(page: Page, expect: Expect) {
    // Initialize page object and all locators
    this.page = page;
    this.expect = expect;
    this.destinationSearchBox = page.getByTestId("destination-field");
    this.airportsField = page.getByTestId("airports-field");
    this.airportsWidget = page.getByTestId("airports-widget");
    this.travelPeriodField = page.getByTestId("travel-period-field");
    this.travellersFieldMultiroom = page.getByTestId(
      "travellers-field-multiroom",
    );
    this.headerControlIcon = page.getByTestId(
      "shared-header-headercontrol-login",
    );
    this.headerControlLoginLink = page.locator(
      "[data-testid='shared-header-headercontrol-burgermenu']  a:nth-child(1)",
    );
    this.dialogCloseButton = page.getByTestId("shared-dialogHead-closeButton");
    this.cookieAcceptButton = page.locator(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
    );
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async acceptCookies() {
    await this.cookieAcceptButton.click();
  }

  async verifyDestinationSearchBox() {
    await this.expect(this.destinationSearchBox).toBeVisible();
    await this.expect(this.destinationSearchBox).toBeEditable();
  }

  async selectTransportation() {
    await this.expect(this.airportsField).toBeVisible();
    await this.airportsField.click();
    await this.expect(this.airportsWidget).toBeVisible();
  }

  async verifyDate() {
    await this.expect(this.travelPeriodField).toBeVisible();
    await this.travelPeriodField.click();
  }

  async verifyPassengers() {
    await this.expect(this.travellersFieldMultiroom).toBeVisible();
    await this.travellersFieldMultiroom.click();
  }

  async openMyAccount() {
    await this.expect(this.headerControlIcon).toBeVisible();
    await this.headerControlIcon.click();
    await this.expect(this.headerControlLoginLink).toBeVisible();
  }

  async checkLogin() {
    await this.headerControlIcon.click();
    await this.headerControlLoginLink.click();
  }

  async closeLoginPanel() {
    await this.dialogCloseButton.click();
  }
}

export default HomePage;
