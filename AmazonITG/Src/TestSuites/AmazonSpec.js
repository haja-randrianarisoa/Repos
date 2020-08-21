/**Import all required pages**/
var amazonPage = require('../../Src/PageObjectModel/AmazonPage');
const {
    browser
} = require('protractor');
describe("Amazon Journey", () => {

    describe("Login as a client", () => {

        it("should be possible to login as a client", async () => {
            await amazonPage.launchAmazon('https://www.amazon.co.uk/');
            await amazonPage.signInNavigation();
            await amazonPage.loginToAmazon("lorenzoroccasmartr@gmail.com", "5mrtr@6067123");
        });

        describe("Client search for a product", () => {

            it("should be able to search a product", async () => {
                await amazonPage.searchingForAProduct("iceworks 5000");
            });

            it("should be able to add a product to the basket", async () => {
                await amazonPage.selectingProduct();
                await amazonPage.addingAProductToTheBasket();
                await amazonPage.proceedToCheckout();
            });
        });
    });
});