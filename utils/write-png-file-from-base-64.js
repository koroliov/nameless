'use strict';

const fs = require('fs');

function writePngFileFromBase64(globalBuffClass, fileName, base64str) {
  const buf = globalBuffClass.from(base64str.split(/,/)[1], 'base64');
  fs.writeFileSync(fileName, buf);
}

module.exports = writePngFileFromBase64;
