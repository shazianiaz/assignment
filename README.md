Folder Structure
============================

    ├── constants                    # Constants for our app
    │   ├── types.ts                  # Custom type to map selected offer data for better typecasting
    │   └── test-data.json            # Test data in json format
    ├── pages                        # All page objects with specific logic for each feature
    │   ├── HomePage.ts              # Homepage class to perform basic functionalities related checks
    │   ├── LoginPage.ts             # LoginPage class to perform related related actions
    │   ├── DestinationPage.ts       # DestinationPage class to perform desired destination related actions
    │   └── OffersPage.ts            # OffersPage class to perform Offer related actions
    actions
    │   └── OfferDetailPage.ts       # OfferDetailPage class to perform selected Offer Details related actions
    ├── tests                        # All test files
    │   └── index.spec.ts            # Test file to test selected destination offer
    ├── package.json                 
    ├── package-lock.json            
    └── playwright.config.ts         # Playwright config


### How to run code

`npm start:at`

`npm start:at`


### Thoughts while doing this assignment 

While doing the assignment I kept in mind all instructions and made sure tests are maintainable and easy to understand.

- Moved out constants to files so we can use them and modify them whenever needed
- Created page objects to deal with specific features 
- Created one test to test whole flow

Problems encountered
- Initially when I tried to type destination page was crashing. Sometimes application is not responsive


Please let me know if you have any questions. Would be happy to answer.
