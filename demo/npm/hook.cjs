const fs = require('node:fs');
const path = require('node:path');
const target = path.join(__dirname, 'INSTALL_RAN.txt');
fs.writeFileSync(target, 'THIS IS DEMO, a package install script ran. YOU ARE INFECTED!!! (Well could be).\n');
// console.log('DEMO: wrote INSTALL_RAN.txt');
