
/*  This file contains the code to convert testdata of excel document to json data  */

var converter = require("xlsx-to-json");
var excelPath = ".\\Src\\TestData\\DataDrivenTest.xlsx";
var jsonPath = ".\\Src\\TestData\\DataDriven.json";

var convertExcelToJson = {
//Method that converts excel data to json data
    convertExcelDataToJsonData: (function () {
        converter({
            input: excelPath,
            output: jsonPath
        }, function (err, result) {
            if (err) {
                console.error(err, result);
            } else {
                console.log("Num of rows in TestData file = " + result.length);
            }
        });
    }())
};

module.exports = convertExcelToJson;

