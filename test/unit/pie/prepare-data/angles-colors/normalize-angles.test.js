'use strict';

const tp = require('tape');
const sinon = require('sinon');
const normalizeAngles =
    require('pie/prepare-data/angles-colors/normalize-angles');

tp('angles in (-2Pi, 4Pi) range normalized to [0, 2Pi)', t => {
  const angles = [
    0,
    2,
    2 * Math.PI + 1,
    -3,
    0,
    2 * Math.PI,
    -2 * Math.PI + 0.01,
    1,
  ];
  const expectedNormAngles = [
    0,
    2,
    1,
    2 * Math.PI - 3,
    0,
    0,
    0.009999999999999787,
    1,
  ];
  const data = new Map([
    ['angles', angles]
  ]);
  normalizeAngles(data);
  t.deepEqual(data.get('angles'), expectedNormAngles);
  t.end();
});

tp('first and last not touched, since they are startAngle, ' +
  'which must be already in the range', t => {
  const angles = [
    -11,
    2,
    -3,
    1,
    11,
  ];
  const expectedNormAngles = [
    -11,
    2,
    2 * Math.PI - 3,
    1,
    11,
  ];
  const data = new Map([
    ['angles', angles]
  ]);
  normalizeAngles(data);
  t.deepEqual(data.get('angles'), expectedNormAngles);
  t.end();
});

tp('data properties are ot changed', t => {
  const angles = [
    -11,
    2,
    1,
    11,
  ];
  const data = new Map([
    ['angles', angles]
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  normalizeAngles(data);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.end();
});
