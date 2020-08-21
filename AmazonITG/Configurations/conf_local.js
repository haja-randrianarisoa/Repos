var path = require("path");
var HtmlReporter = require('protractor-beautiful-reporter');

// Definition of global setting variables: envirenment variable configures them and default value
const settingsImportConfig = {
  protractorConfigTestSuiteName: {
    evnVarName: 'protractorConfigTestSuiteName',
    default: ''
  },
  appUrl: {
    evnVarName: 'AppUrl',
    default: 'https://www.amazon.co.uk/'
  },
  maxSessionsCount: {
    evnVarName: 'maxSessionsAttribute',
    default: '1'
  },
  maxInstancesCount: {
    evnVarName: 'maxInstanceAttribute',
    default: '1'
  },
};

// Load and log settings
for (const key in settingsImportConfig) {
  const importConfig = settingsImportConfig[key];
  if (process.env[importConfig.evnVarName]) {
    // configuration was passed in
    global[key] = process.env[importConfig.evnVarName];
    console.log("Configured from enviroment: '" + key + "'='" + global[key] + "'");
  } else {
    global[key] = importConfig.default;
    console.log("Configured from default: '" + key + "'='" + global[key] + "'");
  }
}


exports.config = {
 
  directConnect: true,
  
  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 25000,
  
  suites: {
    Smoke: [
      './../Src/TestSuites/AmazonSpec.js',       
    ],
        
  },

  multiCapabilities: [
    {
      browserName: "chrome",
      shardTestFiles: true,
      sequential: true,
      maxInstances: maxInstancesCount,
      maxSessions: maxSessionsCount,
      chromeOptions: {
        args: [
          "disable-infobars",
          "start-maximized",
        //   "--headless",
          "--disable-gpu",
          "--window-size=1920,1080"
        ],
        prefs: {
          download: {
            prompt_for_download: false,
            directory_upgrade: true,
            default_directory: path.resolve(
              __dirname,
              "./../Resources/DownloadFiles"
            ) 
          }
        }
      }
    },
  ],

  
  restartBrowserBetweenTests: false, //Splits each test(it block) in different browser instances sequentially
  framework: "jasmine2",

  
  jasmineNodeOpts: {
    
    showColors: true,
    
    defaultTimeoutInterval: 12000000
  },

  onPrepare: function () {
    console.log("Params: ", browser.params)
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'Reports/Recent',
      screenshotsSubfolder: 'screenshots',
      jsonsSubfolder: 'jsons'
    }).getJasmine2Reporter());
    global.isAngularSite = function (flag) {
      browser.ignoreSynchronization = !flag;
    };
    browser.driver
      .manage()
      .window()
      .maximize();
    var jasmineReporters = require("jasmine-reporters");
    return global.browser.getProcessedConfig().then(function () {
      browser.getCapabilities().then(function (capabilities) {
        jasmine.getEnv().addReporter(
          new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: "./Reports/Xmlfiles/",
            filePrefix:
              capabilities.get("browserName") +
              "." +
              capabilities.get("version") +
              "-" +
              capabilities.get("platform")
          })
        );
      });
    });
  }
};
