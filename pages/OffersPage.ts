import { Expect, Locator, Page } from "@playwright/test";
import { Context } from "node:vm";
import { OfferInfo } from "../constants/types";

class OffersPage {
  page: Page;
  expect: Expect;
  context: Context;
  packageDetailButton: Locator;
  selectedHotelName: Locator;
  selectedHotelRegion: Locator;
  selectedHotelTotalPrice: Locator;
  //cookieAcceptButton: Locator;  no usage

  constructor(page: Page, expect: Expect, context: Context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
   /* this.cookieAcceptButton = page.locator(
      "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
    );*/ // no usage
  }

  setOfferSelectors(hotelIndex: number) {
    const prefixFirstHotel = `[data-testid='find-hotellist-hotellist'] > div:nth-child(3) > div:nth-child(${hotelIndex}) `;
    this.packageDetailButton = this.page.locator(
      `${prefixFirstHotel} [data-testid='find-hotellist-hotelbox-cta']`,
    );
    this.selectedHotelName = this.page.locator(
      `${prefixFirstHotel} [data-testid='find-hotellist-hotel-name']`,
    );
    this.selectedHotelRegion = this.page.locator(
      `${prefixFirstHotel} [data-testid='find-hotellist-hotel-region']`,
    );
    this.selectedHotelTotalPrice = this.page.locator(
      `${prefixFirstHotel} [data-testid='find-hotellist-total-price']`,
    );
  }

  /*async open(url) {
    await this.page.goto(url);
  }

  async acceptCookies() {
    await this.cookieAcceptButton.click();
  }*/ // no usage


  async getOfferDetails(offerIndex:number):Promise<OfferInfo>{
    this.setOfferSelectors(offerIndex);
     
    const hotelName = await this.selectedHotelName.textContent();
    const hotelRegion = await this.selectedHotelRegion.textContent();
    const totalPrice = await this.selectedHotelTotalPrice.textContent();
    const offerDetailUrl = await this.packageDetailButton.getAttribute("href");

    return {
      hotelName,
      hotelRegion,
      totalPrice,
      offerDetailUrl,
    };
  }

  // This function returns new page context
  async selectOffer(hotelIndex: number) {
    this.setOfferSelectors(hotelIndex);

    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      this.packageDetailButton.click(), // Opens a new tab
    ]);
    await newPage.waitForLoadState();

    return newPage;
  }
}

export default OffersPage;
