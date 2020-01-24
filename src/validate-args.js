'use strict';

function validateArgs(args, GlobalCanvas2dContextConstructor) {
  if (!(args instanceof Map)) {
    return 'pie chart: arguments must be instance of Map';
  }

  const twoPi = 2 * Math.PI;
  const argumentsNamesAndValidations = new Map([
    ['percents', (propName) => !Array.isArray(args.get(propName))],
    ['colors', (propName) => !Array.isArray(args.get(propName))],
    ['skipValidation', propName => false],
    ['ox', propName => !Number.isFinite(args.get(propName))],
    ['oy', propName => !Number.isFinite(args.get(propName))],
    ['radius', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val <= 0;
    }],
    ['thickness', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeWidth', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeColor', propName => {
      const val = args.get(propName);
      return typeof val !== 'string' || val === '';
    }],
    ['cntx', propName => {
      const val = args.get(propName);
      if (typeof val !== 'object' || val === null) {
        return true;
      } else {
        return Object.getPrototypeOf(val) !==
            GlobalCanvas2dContextConstructor.prototype;
      }
    }],
    ['scaleY', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val <= 0 || val > 1);
    }],
    ['rotationAngle', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val <= -twoPi || val >= twoPi);
    }],
    ['startAngle', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val < 0 || val >= twoPi);
    }],
    ['counterClockwise', propName => {
      return args.has(propName) && typeof args.get(propName) !== 'boolean';
    }],
    ['isRimDown', propName => {
      return args.has(propName) && typeof args.get(propName) !== 'boolean';
    }],
    ['skipValidation', () => false],
  ]);

  for (const key of args.keys()) {
    if (!argumentsNamesAndValidations.has(key)) {
      return  'pie chart: arguments map contains unknown key';
    }
  }

  for (const [propName, isInvalid] of argumentsNamesAndValidations) {
    if (isInvalid(propName)) {
      return 'pie chart: invalid or absent ' + propName;
    }
  }

  return hasErrorInColorsOrPercents(args) || '';
}

function hasErrorInColorsOrPercents(args) {
  const percents = args.get('percents');
  const colors = args.get('colors');
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

module.exports = validateArgs;
