'use strict';

const tp = require('tape');
const calcAnglesFromPercent = require('calc-angles-from-percent');
const onePercentAngle = Math.PI / 50;

tp('works with a -0 start angle', t => {
  checkNormal(t, [25, 39], -0,);
});

tp('works with a positive start angle', t => {
  checkNormal(t, [25, 39], 0.5,);
});

tp('works with a negative start angle', t => {
  checkNormal(t, [25, 39], -0.5,);
});

tp('default start angle is 0', t => {
  checkNormal(t, [25, 39], 0,);
});

tp('works if subsequent percent vals are smaller', t => {
  checkNormal(t, [25, 3], 0,);
});

tp('works with float percent vals', t => {
  checkNormal(t, [25.0, 3.197], 0,);
});

tp('returns an error, if >100 percent passed', t => {
  checkErrors(t, calcAnglesFromPercent([25, 100,]), 1);
});

tp('returns an error, if 100 percent passed', t => {
  checkErrors(t, calcAnglesFromPercent([25, 75,]), 1);
});

function checkErrors(t, moduleRetVal, errorCode) {
  t.equal(Object.getPrototypeOf(moduleRetVal), null);
  t.equal(moduleRetVal.error, errorCode);
  t.end();
}

function checkNormal(t, percents, startAngle) {
  t.deepEqual(
    calcAnglesFromPercent(percents, startAngle),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
}

function getExpectedRetVal(percents, startAngle) {
  const expected = Object.create(null);
  expected.error = 0;
  expected.angles = [startAngle];
  expected.angles[1] = onePercentAngle * percents[0] + startAngle;
  expected.angles[2] = expected.angles[1] + onePercentAngle * percents[1];
  expected.angles[3] = startAngle;
  return expected;
}
