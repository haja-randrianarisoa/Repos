/*function getNewLocator (locator,...dynamicText){
        console.log(arguments.length+" "+locator);
    let locatorType = locator.toString().slice(3,locator.toString().indexOf(', ')).trim();
    let newLocatorString = locator.toString().slice(locator.toString().indexOf(', ')+1,locator.toString().length-1).trim();
        console.log("test "+locatorType);
        console.log("test "+newLocatorString);
    }*/
class Dynamic{
    getNewLocator (locator,...dynamicText){
        //console.log(arguments[0]+" "+locator);
        let locatorType = locator.toString().slice(3,locator.toString().indexOf(', ')).trim();
        let newLocatorString = locator.toString().slice(locator.toString().indexOf(', ')+1,locator.toString().length-1).trim();
        for(let i=1;i<arguments.length;i++) {
            newLocatorString = newLocatorString.replace("%s", arguments[i]);
        }
        //console.log("Locator :"+newLocatorString);
        switch(locatorType)
        {
            case "xpath":
                locator = by.xpath(newLocatorString);
                break;
            case "css selector":
                locator = by.css(newLocatorString);
                break;
        }
        return locator;
    };
}
module.exports = {Dynamic};
