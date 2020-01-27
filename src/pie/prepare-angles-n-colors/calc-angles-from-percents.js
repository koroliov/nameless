'use strict';

function calcAnglesFromPercents({percents, startAngle, counterClockwise}) {
  const onePercentAngle = Math.PI / 50;
  const angles = [startAngle];

  if (counterClockwise) {
    for (let i = 0; i < percents.length - 1; i++) {
      angles.push(angles[i] - onePercentAngle * percents[i]);
    }
  } else {
    for (let i = 0; i < percents.length - 1; i++) {
      angles.push(angles[i] + onePercentAngle * percents[i]);
    }
  }
  angles.push(startAngle);

  return angles;
}

module.exports = calcAnglesFromPercents;
