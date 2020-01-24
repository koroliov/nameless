'use strict';

function fillOptionalArgs(args) {
  const optionalArgsAndDefaultVals = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  for (const [key, defaultVal] of optionalArgsAndDefaultVals) {
    if (!args.has(key)) {
      args.set(key, defaultVal);
    }
  }
  return args;
}

module.exports = fillOptionalArgs;
