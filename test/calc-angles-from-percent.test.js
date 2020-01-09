'use strict';

const tp = require('tape');
const calcAnglesFromPercent = require('calc-angles-from-percent');
const onePercentAngle = Math.PI / 50;

tp('works with a 0 start angle', t => {
  const percents = [25, 39,];
  const startAngle = 0;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('works with a -0 start angle', t => {
  const percents = [25, 39,];
  const startAngle = -0;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('works with a positive start angle', t => {
  const percents = [25, 39,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('works with a negative start angle', t => {
  const percents = [25, 39,];
  const startAngle = -0.5;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('works if subsequent percent vals are smaller', t => {
  const percents = [25, 3,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('works with float percent vals', t => {
  const percents = [25.0, 3.197,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercent({percents, startAngle}),
    getExpectedRetVal(percents, startAngle)
  );
  t.end();
});

tp('default start angle is 0', t => {
  const percents = [25, 39,];
  t.deepEqual(
    calcAnglesFromPercent({percents,}),
    getExpectedRetVal(percents, 0)
  );
  t.end();
});

tp('returns an error, if >100 percent passed', t => {
  checkErrors(t, [25, 100,], 1);
});

tp('returns an error, if 100 percent passed', t => {
  checkErrors(t, [25, 75,], 1);
});

function checkErrors(t, percents, errorCode) {
  const moduleRetVal = calcAnglesFromPercent({percents,});
  t.equal(Object.getPrototypeOf(moduleRetVal), null);
  t.equal(moduleRetVal.error, errorCode);
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
