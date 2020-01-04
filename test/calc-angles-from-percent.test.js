'use strict';

const tp = require('tape');
const calcAnglesFromPercent = require('calc-angles-from-percent');
const onePercentAngle = Math.PI / 50;

tp('works with a -0 start angle', t => {
  const percents = [25, 39];
  const startAngle = -0;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents, startAngle);
  t.deepEqual(actual, expected);
  t.end();
});

tp('works with a positive start angle', t => {
  const percents = [25, 39];
  const startAngle = 0.5;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents, startAngle);
  t.deepEqual(actual, expected);
  t.end();
});

tp('works with a negative start angle', t => {
  const percents = [25, 39];
  const startAngle = -0.5;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents, startAngle);
  t.deepEqual(actual, expected);
  t.end();
});

tp('default start angle is 0', t => {
  const percents = [25, 39];
  const startAngle = 0;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents);
  t.deepEqual(actual, expected);
  t.end();
});

tp('works if subsequent percent vals are smaller', t => {
  const percents = [25, 3];
  const startAngle = 0;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents);
  t.deepEqual(actual, expected);
  t.end();
});

tp('works with float percent vals', t => {
  const percents = [25.0, 3.197];
  const startAngle = 0;
  const expected = [startAngle];
  expected[1] = onePercentAngle * percents[0] + startAngle;
  expected[2] = expected[1] + onePercentAngle * percents[1];
  expected[3] = startAngle;

  const actual = calcAnglesFromPercent(percents);
  t.deepEqual(actual, expected);
  t.end();
});
