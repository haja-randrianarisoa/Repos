const { by } = require("protractor");

/*** This file contains locators for Protection Policies page ***/
var ProtectionPoliciesLocators = {
    EMAIL_TEXTFIELD: by.id('ap_email'),
    // EMAIL_TEXTFIELD: by.xpath("//input[@name='email']"),
    CONTINUE_BUTTON: by.id('continue'),
    PASSWORD_TEXTFIELD: by.id('ap_password'),
    SIGN_IN_NAVIGATION: by.id('nav-link-accountList'),
    SIGN_IN_BUTTON: by.id('signInSubmit'),
    PRODUCT: by.id('twotabsearchtextbox'),
    PRODUCT_SELECTION: by.xpath("//span[contains(text(),'Iceworks 5000 Portable Charger')]"),
    SEARCHED_PRODUCT_PRICE_LOCATOR: by.id('priceblock_saleprice'),
    ADD_TO_BASKET: by.id('add-to-cart-button'),
    PROCEED_TO_CHECKOUT_BUTTON: by.id('hlb-ptc-btn-native'),
    BASKET_PRICE_LOCATOR: by.id('sc-subtotal-amount-activecart'),
};
module.exports = ProtectionPoliciesLocators;