promise = require('request-promise');
var validator = require('validator');
var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    },
        {
            type: 'file',
            filename: 'Reports/Recent/logFile.log',
            category: 'log',
            flags: 'w'
        }
    ]
});
var logger = log4js.getLogger('log');
var fs = require('fs');
var osObj = require('os');
var protractor = require('protractor');
var exec = require('child_process').execFile;
var EC = protractor.ExpectedConditions;
//var trayballoon = require('trayballoon');
require('jasmine2-custom-message');
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');
//var currentSpecs= [];
const pdf = require('pdf-parse');
class SafeActions {

    /**
     * @Function  goToUrl
     * @Description  Function to launch the browser and navigates to the given url and sets the angular and non-angular settings
     */
    static async goToUrl(url, waitForAngularEnabled = false) {
        if (url) {
            logger.info("waitForAngularEnabled: " + waitForAngularEnabled);
            await browser.waitForAngularEnabled(waitForAngularEnabled)
            await browser.get(url);
        }
    }


    /**
     * @Function safeClick
     * @Description  Safe Function waits for User Click, waits until the element is clickable and then performs a click action
     * @param locator - locator of element to be found
     * @param friendlyName - name of the element to be found
     * @param timeout - the time in milli seconds to wait until returning a failure
     *
     */
    static async safeClick(locator, friendlyName, timeout = 30000) {
        //await this.scrollIntoElementView(locator, friendlyName);
        const ele = await this.safeGetElementWhenClickable(locator, friendlyName, timeout)
        await this.setHighlight(ele);
        try {
            await browser.actions().mouseMove(ele).perform()
            await ele.click();
        } catch (error) {
            var errorMessage = "Unable to click on - " + friendlyName;
            logger.error("Waited for the element" + "'" + friendlyName + "'" + " for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            throw errorMessage;
        }
        
        logger.info("Clicked on - " + friendlyName);
    }

    /**
     * Function that waits until the element specified by the locator becomes clickable
     * @param {*} locator - locator of element to be found
     * @param {*} friendlyName - name of the element to be found
     * @param {*} timeout - the time in milli seconds to wait until returning a failure
     * @returns The element specified by the locator
     */
    static async safeGetElementWhenClickable(locator, friendlyName, timeout = 30000) {
        const ele = element(locator);
        try {
            await browser.wait(EC.elementToBeClickable(ele), timeout);
        } catch (error) {
            var errorMessage = "Timeout while waiting for - " + friendlyName;
            logger.error("Waited for the element" + "'" + friendlyName + "'" + " for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            throw errorMessage;
        }
        return ele;
    }

 /**
     * @Function safeClearAndType
     * @Description  Safe Function for User Clear and Type, waits until the element is loaded and then enters some text
     * @param identifier - locator of element to be found
     * @param friendlyName - name of the element to be found
     * @param texttoenter - text to be enter in element
     * @param timeout - the time in milli seconds to wait until returning a failure
     */
    static async safeClearAndType(identifier, friendlyName, texttoenter, timeout = 30000) {
        var ele = await this.waitAndFindElement(identifier, friendlyName, timeout);
        await browser.actions().mouseMove(ele).perform();
        await this.setHighlight(ele);

        try {
            await ele.clear()
            logger.info("Cleared content under --" + friendlyName);
        }
        catch (error) {
            var errorMessage = "Unable to clear content under - " + friendlyName;
            logger.error(error.stack);
            throw errorMessage;
        };

        try {
            await ele.sendKeys(texttoenter)
            logger.info("Entered [" + texttoenter + "] under --" + friendlyName);
        } catch (error) {
            var errorMessage = "Unable to type under - " + friendlyName;
            logger.error(error.stack);
            throw errorMessage;
        }
    }

/**
     * @Function  waitAndFindElement
     * @Description  Function waits for an element until the element is found in the page.
     * @param identifier - locator of element to be found
     * @param friendlyName - name of the element to be found
     * @param timeout - the time in milli seconds to wait until returning a failure
     * @return ele - if element is located within timeout period else throws error
     */
    static async waitAndFindElement(identifier, friendlyName, timeout = 30000) {
        let ele = null;
        try {
            ele = await browser.wait(browser.findElement(identifier), timeout);
        } catch (error) {
            console.log(friendlyName + " - Not Present");
            var errorMessage = friendlyName + " - Not Present";
            logger.error("Waited for the element " + "'" + friendlyName + "'" + " for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            throw errorMessage;
        }

        try {
            await browser.wait(ele.isDisplayed(), timeout)
        } catch(error) {
            console.log(friendlyName + " - Not Displayed");
            var errorMessage = friendlyName + " - Not Displayed";
            logger.error("Waited for the element " + "'" + friendlyName + "'" + " for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            throw errorMessage;
        };
        try {
            await browser.wait(() => {
                browser.sleep(1000);
                return ele.isEnabled();
            }, timeout)
        } catch(error) {
            console.log(friendlyName + " - Not Enabled");
            var errorMessage = friendlyName + " - Not Enabled";
            logger.error("Waited for the element" + "'" + friendlyName + "'" + " for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            throw errorMessage;
        };
        return ele;
    }

/**
     * @Function setHighlight
     * @Description  Function Highlights on current working element or locator
     * @param elementtohighlight - element to be highlighted
     */
    static async setHighlight(elementtohighlight) {
        const attribValue = "border:3px solid red;";
        const getattrib = await elementtohighlight.getAttribute("style");
        try {
            await browser.executeScript("arguments[0].setAttribute('style', arguments[1]);", elementtohighlight, attribValue);
        } catch (error) {
            var errorMessage = "unable to highlight - " + elementtohighlight;
            logger.error(error.stack);
            throw errorMessage;
        }
        // give time for highlight to show before proceding
        await browser.sleep(100); 
        // reset style to original attributes
        await browser.executeScript("arguments[0].setAttribute('style', arguments[1]);", elementtohighlight, getattrib);
    }

    static async waitForElementVisibility(locator, friendlyName, timeout = 30000) {
        try {
            await browser.wait(EC.visibilityOf(element(locator)), timeout);
            logger.info("Element is visible - " + friendlyName);
        } catch (error) {    
            logger.error("Waited for the element" + "'" + friendlyName + "'" + " to become visible for " + timeout / 1000 + " seconds ");
            logger.error(error.stack);
            var errorMessage = "Element did not become visible - " + friendlyName;
            throw errorMessage;
        };
    };

}
module.exports = SafeActions;