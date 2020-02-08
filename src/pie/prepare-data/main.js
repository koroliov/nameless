'use strict';

const create = require('./create');
const anglesColorsMain = require('./angles-colors/main');
const calculateFaceYRimY = require('./calculate-face-y-rim-y');
const createRimDrawSequence = require('./create-rim-draw-sequence');

function main(argument) {
  const data = create(argument);
  anglesColorsMain(data);
  calculateFaceYRimY(data);
  if (isRimPresent()) {
    createRimDrawSequence(data);
  }
  function isRimPresent() {
    return !(data.get('thickness') === 0 || data.get('scaleY') === 1);
  }
}

module.exports = main;
