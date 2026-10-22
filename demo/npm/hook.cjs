const fs = require('node:fs');
const path = require('node:path');
const target = path.join(__dirname, 'INFECTED_INSTALL_RAN.txt');
const payload = `THIS IS DEMO, a package install script ran. 
YOU ARE INFECTED!!! (Well could be).

All your secrets belong to us!

Time: ${new Date().toISOString()}`;
fs.writeFileSync(target, payload);
// console.log('DEMO: wrote INSTALL_RAN.txt');
