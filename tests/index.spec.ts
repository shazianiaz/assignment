import { test, expect, Page } from "@playwright/test";
import OffersPage from "../pages/OffersPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DestinationPage from "../pages/DestinationPage";
import jsonTestData from "../constants/testData.json";
import OfferDetailPage from "../pages/OfferDetailPage";
import { OfferInfo } from "../constants/types";

// Helper function to select data based on locale
const getTestData = (locale: string) => {
  return jsonTestData[locale];
};

let url = ""; // Web url to open
let page: Page; // Page context
let homePage; // Define homePage outside to use it across tests
let loginPage; // Define loginPage outside to use it across tests
let destinationPage; // Define destinationPage outside to use it across tests
let offersPage; // Define offersPage outside to use it across tests
let offerDetailPage; // Define offerDetailPage outside to use it across tests
let testData; // Define testData outside for reuse
let selectedOfferDetails: OfferInfo; // Save selected package data form offers page
let newPage: Page; // Save New page that is opened in new tab from offers page

test.describe.configure({ mode: "serial" });

// Setup environment URL and data before all tests
test.beforeAll(async ({ browser }) => {
  console.log("Current environment:", process.env.LOCALE);

  // Initialize test data based on the environment
  testData = getTestData(process.env.LOCALE);

  if (["at", "ch"].includes(process.env.LOCALE)) {
    url = testData.url;
  } else {
    throw new Error("Environment not recognized");
  }

  // Open a browser page and instantiate HomePage only once
  const context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page, expect); // Create HomePage instance
  loginPage = new LoginPage(page, expect); // Create LoginPage instance
  destinationPage = new DestinationPage(page);
  offersPage = new OffersPage(page, expect, context);
});

test.describe("Select Holiday Offer", () => {
  test("Launch and URL Validation", async () => {
    // Open URL and validate it matches the expected URL
    await homePage.open(url);
    await expect(homePage.page).toHaveURL(testData.URLValidation);
  });

  test("Basic Functionalities Check", async () => {
    // Accept cookies and perform various checks on homepage elements
    await homePage.acceptCookies();
    await homePage.verifyDestinationSearchBox(testData.destination);
    await homePage.selectTransportation(testData.transportOption);
    await homePage.verifyDate(testData.date);
    await homePage.verifyPassengers(testData.passengers);
    await homePage.openMyAccount();
    await homePage.checkLogin();
    await homePage.closeLoginPanel();
  });

  test("Login Functionality and  Error Messages Validation", async () => {
    // Accept cookies and perform various checks on homepage elements

    // Attempt login with invalid credentials
    await loginPage.initiateLogin();
    await loginPage.enterCredentials(testData.Email, testData.Password);
    await loginPage.submitLogin();

    // Validate error messages
    await loginPage.validateErrorMessages(
      testData.InvalidEmailMsg,
      testData.InvalidPassMsg,
    );

    // Close login error
    await loginPage.closeLoginError();
  });

  test("Select Destination and Date", async () => {
    // Select Destination
    await destinationPage.enterDestination(testData.Destination);
    await destinationPage.selectDates(testData.StartDate,testData.EndDate);
    await destinationPage.submitSearch();
  });

  test("Select offer from offers list", async () => {
    // wait until page is fully loaded with correct data
    await page.waitForTimeout(5000);
    const offerToChoose = 2;
    selectedOfferDetails = await offersPage.getOfferDetails(offerToChoose);
    console.log(selectedOfferDetails);
    newPage = await offersPage.selectOffer(offerToChoose);

    // wait until page is fully loaded with correct data
     await newPage.waitForTimeout(5000);
    offerDetailPage = new OfferDetailPage(newPage, expect);
  });
  test("Compare selected offer with offer detail page", async () => {
    // get package details from package detail page
    const currentOfferDetails: OfferInfo =
      await offerDetailPage.getOfferDetails();
     console.log(currentOfferDetails);
    expect(currentOfferDetails.hotelName).toBe(selectedOfferDetails.hotelName);
    expect(currentOfferDetails.totalPrice).toBe(
      selectedOfferDetails.totalPrice,
    );
    expect(currentOfferDetails.hotelRegion).toBe(
      selectedOfferDetails.hotelRegion,
    );
    expect(currentOfferDetails.offerDetailUrl).toContain(
      selectedOfferDetails.offerDetailUrl,
    );
  });
});
