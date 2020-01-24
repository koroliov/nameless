'use strict';

const tp = require('tape');
const fillOptionalArgs = require('fill-optional-args');

tp('fills absent optional arguments, and nothing more', t => {
  t.plan(6);
  const actual = fillOptionalArgs(new Map());
  t.equal(actual.size, 5);
  t.equal(actual.get('scaleY'), 0);
  t.equal(actual.get('rotationAngle'), 0);
  t.equal(actual.get('startAngle'), 3 * Math.PI / 2);
  t.equal(actual.get('counterClockwise'), false);
  t.equal(actual.get('isRimDown'), true);
});

tp('does not change provided optional arguments', t => {
  t.plan(6);
  const args = new Map([
    ['scaleY', undefined],
    ['rotationAngle', undefined],
    ['startAngle', undefined],
    ['counterClockwise', undefined],
    ['isRimDown', undefined],
  ]);
  const actual = fillOptionalArgs(args);
  t.equal(actual.size, 5);
  t.equal(actual.get('scaleY'), undefined);
  t.equal(actual.get('rotationAngle'), undefined);
  t.equal(actual.get('startAngle'), undefined);
  t.equal(actual.get('counterClockwise'), undefined);
  t.equal(actual.get('isRimDown'), undefined);
});
