/*  This file contains grunt configuration for defining task sequence  */

module.exports = function (grunt) {
    process.env.protractorConfigTestSuiteName = grunt.option('suite') || 'Regression';
    process.env.AppUrl = grunt.option('url') || 'https://www.amazon.co.uk/';
    process.env.maxInstanceAttribute = grunt.option('maxInstanceCount') || '1';
    process.env.maxSessionsAttribute = grunt.option('maxSessionCount') || '1'
  
    //var webUrl = grunt.option('url') || 'https://www.amazon.co.uk/';
    var path = require('path');
    grunt.initConfig({
  
      clean: {
        contents: ["./Reports/Recent/Screenshots/*.png",
          "./Reports/Xmlfiles/*.xml",
          "./Reports/Recent/Htmlreport/*.html",
          "./Logs/*log"
        ]
      },
  
      pkg: grunt.file.readJSON('../package.json'),
      mkdir: {
        options: {
          mode: 766,
          create: ['.//Reports//Xmlfiles', './/Reports//Recent//Screenshots', './/Reports//Recent//Htmlreport']
        },
        target: {}
      },
  
      //To execute batch files as grunt tasks
      run_executables: {
        tests: {
          cmd: './Run_Utilities/Report.bat'
        }
      },
  
      //To execute single js file as grunt tasks
      execute: {
        excelData: {
          src: ['./Resources/convertExcelToJson.js']
        },
        emailableReport: {
          src: ['./Resources/emailableReports.js']
        }
      },
  
      /* /!* Protractor here is a grunt plug-in, which takes config file and selenium ports as params*!/
       protractor:{
           local:{
               configFile:"Configurations/conf_local.js"
           },
           auto:{
               options:{
                   keepAlive:true,
                   args:{
                       seleniumPort:4444
                   }
               }
           }
       }*/
      /* Protractor here is a grunt plug-in, which takes config file and selenium ports as params*/
      protractor: {
        local: {
          configFile: "Configurations/conf_local.js",
        },
  
  
        options: {
          keepAlive: true,
          args: {
            seleniumPort: 4444,
            params: {
            }
          },
        }
      }
  
    });
  
    //Redirecting to the path where below plugins are available
    grunt.file.setBase('../');
  
    //Load tasks before registering
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-Run-executables');
    grunt.loadNpmTasks('grunt-execute');
  
    //Register tasks
    grunt.task.registerTask('local', ['clean', 'mkdir', 'protractor:local']);
    grunt.task.registerTask('updateTestData', 'execute:excelData');
    grunt.task.registerTask('emailableReport', 'execute:emailableReport');
    grunt.registerTask('report', 'run_executables:tests');
  };
  