'use strict';

const face = require('./face');
const rim = require('./rim');

function main(data) {
  face(data);
  if (isRimPresent()) {
    rim(data);
  }

  function isRimPresent() {
    return data.has('rimDrawSequence');
  }
}

module.exports = main;
