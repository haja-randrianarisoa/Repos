/**Import Log4js**/
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: 'Reports/Recent/logFile.log', category: 'log'}
    ]
});
/**Import all required pages**/
var SafeAction = require('../../Src/Util/SafeAction');
var AmazonLocators = require('../Page_Locators/AmazonLocators');
const { browser } = require('protractor');

class AmazonPage {

    /* Launch URL */
    static async launchAmazon(url) {
        await SafeAction.goToUrl(url, false);
       
    }

    /* Click on Sign In */
    static async signInNavigation() {
        await SafeAction.safeClick(AmazonLocators.SIGN_IN_NAVIGATION, "Sign In navigation");
    }

    /* User login to Amazon */
    static async loginToAmazon(userName, password) {
        await SafeAction.safeClearAndType(AmazonLocators.EMAIL_TEXTFIELD, "Email Address Text box", userName);
        await SafeAction.safeClick(AmazonLocators.CONTINUE_BUTTON, "Login Button");
        await SafeAction.waitForElementVisibility(AmazonLocators.PASSWORD_TEXTFIELD, "Password text field")
        await browser.sleep(1000);  
        await SafeAction.safeClearAndType(AmazonLocators.PASSWORD_TEXTFIELD, "Password text field", password);
        await SafeAction.safeClick(AmazonLocators.SIGN_IN_BUTTON, "Sign In button");
        await browser.sleep(2000);
    }

    /* Client searching for a Product */
      static async searchingForAProduct(productName) {
        await SafeAction.safeClearAndType(AmazonLocators.PRODUCT, "Search Text box", productName);
        await browser.sleep(5000); 
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    } 

    /* Client selecting a Product */
    static async selectingProduct() {
        await SafeAction.safeClick(AmazonLocators.PRODUCT_SELECTION, "Select a Product");
        await browser.sleep(1000);  
    }

    /* Client add a Product to the basket */
    static async addingAProductToTheBasket() {
        await SafeAction.safeClick(AmazonLocators.ADD_TO_BASKET, "Add a Product to the Basket");
        await browser.sleep(50000);  
    }

     /* Client Proceed to Checkout */
     static async proceedToCheckout() {
        await SafeAction.safeClick(AmazonLocators.PROCEED_TO_CHECKOUT_BUTTON, "Proceed to checkout");
        await browser.sleep(2000);  
    }

};

module.exports = AmazonPage;

