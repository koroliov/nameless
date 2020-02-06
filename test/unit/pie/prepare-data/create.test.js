'use strict';

const tp = require('tape');
const fillOptionalArgs = require('pie/prepare-data/create');

tp('fills absent optional arguments, and nothing more', t => {
  const argument = new Map();
  const actual = fillOptionalArgs(argument);
  const expected = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  t.deepEqual(actual, expected);
  t.equal(actual === expected, false, 'creates a new, cloned map');
  t.end();
});

tp('does not change provided optional arguments', t => {
  const argument = new Map([
    ['scaleY', undefined],
    ['rotationAngle', undefined],
    ['startAngle', undefined],
    ['counterClockwise', undefined],
    ['isRimDown', undefined],
  ]);
  const actual = fillOptionalArgs(argument);
  t.deepEqual(actual, argument);
  t.equal(actual === argument, false, 'creates a new, cloned map');
  t.end();
});
