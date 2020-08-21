// Run protractor as child process
// Protractore returns exit code 1 if a test fails, which interrupts the npm 
// script execution. To ensure that the post scripts execute despite the test 
// outcome we launch protractor as a child process.
const { spawnSync } = require('child_process');
const { resolve } = require('path');

const protractorMainPath = require.resolve('protractor')
const protractorPath = resolve(protractorMainPath, '../../bin/protractor')
const protractorConfig = 'Configurations/conf_local.js'

let ps = spawnSync(
    'node',
    [protractorPath, protractorConfig],
    {
        stdio: 'pipe',
        encoding: 'utf-8'
    }
);

console.log(ps.stdout);