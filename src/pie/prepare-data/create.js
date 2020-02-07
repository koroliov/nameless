'use strict';

function create(map) {
  const optionalProperties = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  const data = new Map(map);
  data.set('percents', Array.from(map.get('percents')));
  data.set('colors', Array.from(map.get('colors')));
  for (const [key, value] of optionalProperties) {
    if (!data.has(key)) {
      data.set(key, value);
    }
  }
  return data;
}

module.exports = create;
