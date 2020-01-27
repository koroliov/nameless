'use strict';

const filterZeroPercents = require('./filter-zero-percents');
const calcAnglesFromPercents = require('./calc-angles-from-percents');
const normalizeAngles = require('./normalize-angles');

function main(args) {
  const {percentsOriginal, colorsOriginal, startAngle, counterClockwise} = args;
  const {colors, percents} =
      filterZeroPercents(percentsOriginal, colorsOriginal);
  const angles = calcAnglesFromPercents({
    percents,
    startAngle,
    counterClockwise,
  });
  return {
    colors,
    angles: normalizeAngles(angles),
  };
}

module.exports = main;
