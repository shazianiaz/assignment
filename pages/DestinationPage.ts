import { Locator, Page } from "@playwright/test";

class DestinationPage {
  page: Page;
  destinationInput: Locator;
  destinationOption: Locator;
  datePicker: Locator;
  //startDate: Locator;
  //endDate: Locator;
  submitButton: Locator;
  //selectPackageFromList: Locator;

  constructor(page: Page) {
    this.page = page;

    // this.expect = expect; // Store expect as a property
    this.destinationInput = page.locator("input[id='downshift-:r2:-input']");
    this.destinationOption = page.locator(
      "li[id='downshift-:r2:-item-0'] div[class='css-1nn7iqs eynpqhh0']",
    );
    this.datePicker = page.getByTestId('shared-searchForm-travel-period');
    this.submitButton = page.locator(
      ".e3h78fr0.e1mt2gco0.css-z4hl8j.ezlmkrz0[data-testid='submit']",
    );
    /*this.selectPackageFromList = page.locator(
      "a[data-testid='find-hotellist-hotelbox-cta']",
    );*/
  }

  async enterDestination(destination: string) {
    await this.destinationInput.fill(destination);
    await this.destinationOption.click();
  }

  async selectDates(startDate: string, endDate: string) {
    // 2025-06-01
    const startDateLocator: Locator = this.page.locator(
      `[data-date='${startDate}']`,
    );
    // 2025-06-03
    const endDateLocator: Locator = this.page.locator(
      `[data-date='${endDate}']`,
    );

    await this.datePicker.click();
    await startDateLocator.click();
    await endDateLocator.hover();
    await endDateLocator.click();
  }

  async submitSearch() {
    await this.submitButton.click();
  }
}

export default DestinationPage;
