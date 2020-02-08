'use strict';

function calculateAngles(data) {
  const percents = data.get('percents');
  const startAngle = data.get('startAngle');
  const counterClockwise = data.get('counterClockwise');
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
  data.set('angles', angles);
}

module.exports = calculateAngles;
