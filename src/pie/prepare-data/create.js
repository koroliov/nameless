'use strict';

function create(map) {
  const dataWithOptionalValues = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  for (const [key] of dataWithOptionalValues) {
    if (map.has(key)) {
      dataWithOptionalValues.set(key, map.get(key));
    }
  }
  return dataWithOptionalValues;
}

module.exports = create;
