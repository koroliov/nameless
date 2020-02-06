'use strict';

const filterZeroPercents = require('./filter-zero-percents');
const calcAnglesFromPercents = require('./calc-angles-from-percents');
const normalizeAngles = require('./normalize-angles');

function main(args) {
  const {percentsOriginal, colorsOriginal, startAngle, counterClockwise} = args;
  const {colors, percents} =
      filterZeroPercents(percentsOriginal, colorsOriginal);
  if (colors.length === 1) {
    return {
      colors,
      angles: [0],
    };
  }
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
