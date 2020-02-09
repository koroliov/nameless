'use strict';

function validateArgument(map, GlobalCanvas2dContextConstructor) {
  if (!(map instanceof Map)) {
    return 'pie chart: argument must be instance of Map';
  }
  if (!map.has('validateOptions') || map.get('validateOptions') === false) {
    return '';
  }

  const twoPi = 2 * Math.PI;
  const halfPi = Math.PI / 2;
  const optionsNamesAndValidations = new Map([
    ['percents', propName => !Array.isArray(map.get(propName))],
    ['colors', propName => !Array.isArray(map.get(propName))],
    ['validateOptions', () => false],
    ['centerX', propName => !Number.isFinite(map.get(propName))],
    ['centerY', propName => !Number.isFinite(map.get(propName))],
    ['radius', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val <= 0;
    }],
    ['thickness', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeWidth', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeColor', propName => {
      if (map.get('strokeWidth') !== 0) {
        const val = map.get(propName);
        return typeof val !== 'string' || val === '';
      } else {
        return false;
      }
    }],
    ['cntx', propName => {
      const val = map.get(propName);
      if (typeof val !== 'object' || val === null) {
        return true;
      } else {
        return Object.getPrototypeOf(val) !==
            GlobalCanvas2dContextConstructor.prototype;
      }
    }],
    ['scaleY', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val <= 0 || val > 1);
    }],
    ['rotationAngle', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val < -halfPi || val > halfPi);
    }],
    ['startAngle', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val < 0 || val >= twoPi);
    }],
    ['counterClockwise', propName => {
      return map.has(propName) && typeof map.get(propName) !== 'boolean';
    }],
    ['isRimDown', propName => {
      return map.has(propName) && typeof map.get(propName) !== 'boolean';
    }],
  ]);

  for (const key of map.keys()) {
    if (!optionsNamesAndValidations.has(key)) {
      return  'pie chart: argument map contains unknown key';
    }
  }

  for (const [propName, isInvalid] of optionsNamesAndValidations) {
    if (isInvalid(propName)) {
      return 'pie chart: invalid or absent ' + propName;
    }
  }

  return hasErrorInColorsOrPercents(map) || '';
}

function hasErrorInColorsOrPercents(map) {
  const percents = map.get('percents');
  const colors = map.get('colors');
  if (percents.length !== colors.length) {
    return 'pie chart: different ammount of colors/percents';
  }
  if (percents.length === 0) {
    return 'pie chart: no colors and percents provided';
  }
  let percentSum = 0;
  for (const percentVal of percents) {
    if (!Number.isFinite(percentVal) || percentVal < 0) {
      return 'pie chart: invalid or absent percents';
    }
    percentSum += percentVal;
  }
  if (percentSum !== 100) {
    return 'pie chart: invalid or absent percents';
  }
  for (const colorVal of colors) {
    if (typeof colorVal !== 'string' || colorVal === '') {
      return 'pie chart: invalid or absent colors';
    }
  }
}

module.exports = validateArgument;
