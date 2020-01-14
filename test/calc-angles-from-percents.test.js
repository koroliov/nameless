'use strict';

const tp = require('tape');
const calcAnglesFromPercents = require('calc-angles-from-percents');
const onePercentAngle = Math.PI / 50;

testCounterClockwise();
testClockwise();
testErrors();

tp('works if subsequent percent vals are smaller', t => {
  t.plan(1);
  const percents = [25, 3,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false,}),
    getExpectedRetValClockwise(percents, startAngle)
  );
});

tp('works with float percent vals', t => {
  t.plan(1);
  const percents = [25.0, 3.197,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false,}),
    getExpectedRetValClockwise(percents, startAngle)
  );
});

function testErrors() {
  tp('returns an error, if >100 percent passed', t => {
    t.plan(2);
    checkErrors(t, [25, 100,], 1);
  });

  tp('returns an error, if 100 percent passed', t => {
    t.plan(2);
    checkErrors(t, [25, 75,], 1);
  });
}

function testClockwise() {
  tp('works with a 0 start angle clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = 0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: false}),
      getExpectedRetValClockwise(percents, startAngle)
    );
  });

  tp('works with a -0 start angle clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = -0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: false}),
      getExpectedRetValClockwise(percents, startAngle)
    );
  });

  tp('works with a positive start angle clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = 0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: false}),
      getExpectedRetValClockwise(percents, startAngle)
    );
  });

  tp('works with a negative start angle clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = -0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: false}),
      getExpectedRetValClockwise(percents, startAngle)
    );
  });
}

function testCounterClockwise() {
  tp('works with a 0 start angle counter-clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = 0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: true,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
  });

  tp('works with a -0 start angle counter-clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = -0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: true,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
  });

  tp('works with a positive start angle counter-clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = 0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: true,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
  });

  tp('works with a negative start angle counter-clockwise', t => {
    t.plan(1);
    const percents = [25, 39,];
    const startAngle = -0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, counterClockwise: true,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
  });
}

function checkErrors(t, percents, errorCode) {
  const moduleRetVal =
    calcAnglesFromPercents({percents, startAngle: 0, counterClockwise: true,});
  t.equal(Object.getPrototypeOf(moduleRetVal), null);
  t.equal(moduleRetVal.error, errorCode);
}

function getExpectedRetValClockwise(percents, startAngle) {
  const expected = Object.create(null);
  expected.error = 0;
  expected.angles = [startAngle];
  expected.angles[1] = onePercentAngle * percents[0] + startAngle;
  expected.angles[2] = expected.angles[1] + onePercentAngle * percents[1];
  expected.angles[3] = startAngle;
  return expected;
}

function getExpectedRetValCounterClockwise(percents, startAngle) {
  const expected = Object.create(null);
  expected.error = 0;
  expected.angles = [startAngle];
  expected.angles[1] = startAngle - onePercentAngle * percents[0];
  expected.angles[2] = expected.angles[1] - onePercentAngle * percents[1];
  expected.angles[3] = startAngle;
  return expected;
}
