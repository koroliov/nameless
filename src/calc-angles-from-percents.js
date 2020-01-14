'use strict';

function calcAnglesFromPercents({percents, startAngle, counterClockwise}) {
  const onePercentAngle = Math.PI / 50;
  const angles = [startAngle];
  let totalPercents = 0;

  if (counterClockwise) {
    for (let i = 0; i < percents.length; i++) {
      totalPercents += percents[i];
      angles.push(angles[i] - onePercentAngle * percents[i]);
    }
  } else {
    for (let i = 0; i < percents.length; i++) {
      totalPercents += percents[i];
      angles.push(angles[i] + onePercentAngle * percents[i]);
    }
  }
  angles.push(startAngle);

  const retVal = Object.create(null);
  retVal.error = totalPercents >= 100 ? 1 : 0;
  retVal.angles = angles;
  return retVal;
}

module.exports = calcAnglesFromPercents;
