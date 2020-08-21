xlsxj = require("xlsx-to-json");

var convertExcelToJson = {

//Method that converts excel data to json data
    convertExcelDataToJsonData: (function (ExcelFile,JsonFile) {
        xlsxj({
            input: ExcelFile,
            output: JsonFile,
        }, function (err, result) {
            if (err) {
                console.error(err, result);
            } else {
                //console.log("Test Data In Json Format = " + result);
            }
        });
    })
};

module.exports = convertExcelToJson;