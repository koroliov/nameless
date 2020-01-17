'use strict';

const tp = require('tape');
const normalizeAngles = require('normalize-angles');

tp('angles in (-2Pi, 4Pi) range normalized to [0, 2Pi)', t => {
  t.plan(1);
  const actualAngles = [
    0,
    2,
    2 * Math.PI + 1,
    -3,
    0,
    2 * Math.PI,
    1,
    1,
  ];
  const expectedAngles = [
    0,
    2,
    1,
    2 * Math.PI - 3,
    0,
    0,
    1,
    1,
  ];
  normalizeAngles(actualAngles);
  t.deepEqual(actualAngles, expectedAngles);
});

tp('first and last not touched, since they are startAngle, ' +
  'which must be already in range', t => {
  t.plan(1);
  const actualAngles = [
    -11,
    2,
    -3,
    1,
    11,
  ];
  const expectedAngles = [
    -11,
    2,
    2 * Math.PI - 3,
    1,
    11,
  ];
  normalizeAngles(actualAngles);
  t.deepEqual(actualAngles, expectedAngles);
});
