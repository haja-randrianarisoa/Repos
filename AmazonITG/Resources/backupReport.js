// If a recent report exists copy it to a backup folder 
const cpy = require('cpy');
const del = require('del');
const fs = require('fs');

const reportBasePath = './Reports';
const recentReportPath = reportBasePath + '/Recent';
const date = new Date()
const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds()
const backupFolderPath = reportBasePath + '/backupReport_' + formattedDate;
 
const backup = async () => {
    if (fs.existsSync(recentReportPath)) {
        await cpy(recentReportPath, backupFolderPath, {parents: true});
        await del(recentReportPath);
        console.log('The recent report has been backed up at: ' + backupFolderPath);
    }
};

backup();