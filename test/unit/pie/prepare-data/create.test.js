'use strict';

const tp = require('tape');
const create = require('pie/prepare-data/create');

tp('fills absent optional arguments, and nothing more', t => {
  const argument = new Map([
    ['some property', null],
  ]);
  const data = create(argument);
  const expected = new Map([
    ['some property', null],
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  t.deepEqual(data, expected);
  t.equal(data === expected, false, 'creates a new, cloned map');
  t.end();
});

tp('does not change provided optional arguments', t => {
  const argument = new Map([
    ['some property', null],
    ['scaleY', undefined],
    ['rotationAngle', undefined],
    ['startAngle', undefined],
    ['counterClockwise', undefined],
    ['isRimDown', undefined],
  ]);
  const data = create(argument);
  t.deepEqual(data, argument);
  t.equal(data === argument, false, 'creates a new, cloned map');
  t.end();
});
