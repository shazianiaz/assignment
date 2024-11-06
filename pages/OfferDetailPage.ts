import { Expect, Locator, Page } from "@playwright/test";
import { OfferInfo } from "../constants/types";

class OfferDetailPage {
  page: Page;
  expect: Expect;
  selectedHotelName: Locator;
  selectedHotelRegion: Locator;
  selectedHotelTotalPrice: Locator;

  constructor(page: Page, expect: Expect) {
    this.page = page;
    this.expect = expect;

    this.selectedHotelName = page.getByTestId("find-offerlist-hotel-name");
    this.selectedHotelRegion = page.getByTestId("find-offerlist-hotel-region");
    this.selectedHotelTotalPrice = page
      .getByTestId("find-offerlist-total-price")
      .first();
  }

  async getOfferDetails(): Promise<OfferInfo> {
    const hotelName = await this.selectedHotelName.textContent();
    const hotelRegion = await this.selectedHotelRegion.textContent();
    const totalPrice = await this.selectedHotelTotalPrice.textContent();
    const offerDetailUrl = this.page.url();

    return {
      hotelName,
      hotelRegion,
      totalPrice,
      offerDetailUrl,
    };
  }
}

export default OfferDetailPage;
