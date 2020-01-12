'use strict';

const tp = require('tape');
const calcAnglesFromPercents = require('calc-angles-from-percents');
const onePercentAngle = Math.PI / 50;

testClockwise();
testCounterClockwise();
testDefaultArgumentValues();
testErrors();

tp('works if subsequent percent vals are smaller', t => {
  const percents = [25, 3,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercents({percents, startAngle, clockwise: true,}),
    getExpectedRetValClockwise(percents, startAngle)
  );
  t.end();
});

tp('works with float percent vals', t => {
  const percents = [25.0, 3.197,];
  const startAngle = 0.5;
  t.deepEqual(
    calcAnglesFromPercents({percents, startAngle, clockwise: true,}),
    getExpectedRetValClockwise(percents, startAngle)
  );
  t.end();
});

function testDefaultArgumentValues() {
  tp('default start angle is 0', t => {
    const percents = [25, 39,];
    t.deepEqual(
      calcAnglesFromPercents({percents, clockwise: true}),
      getExpectedRetValClockwise(percents, 0)
    );
    t.end();
  });

  tp('default is clockwise', t => {
    const percents = [25, 39,];
  const startAngle = 0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle,}),
      getExpectedRetValClockwise(percents, startAngle)
    );
    t.end();
  });
}
function testErrors() {
  tp('returns an error, if >100 percent passed', t => {
    checkErrors(t, [25, 100,], 1);
  });

  tp('returns an error, if 100 percent passed', t => {
    checkErrors(t, [25, 75,], 1);
  });
}

function testClockwise() {
  tp('works with a 0 start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = 0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle}),
      getExpectedRetValClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a -0 start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = -0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle}),
      getExpectedRetValClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a positive start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = 0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle}),
      getExpectedRetValClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a negative start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = -0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle}),
      getExpectedRetValClockwise(percents, startAngle)
    );
    t.end();
  });
}

function testCounterClockwise() {
  tp('works with a 0 start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = 0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, clockwise: false,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a -0 start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = -0;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, clockwise: false,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a positive start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = 0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, clockwise: false,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
    t.end();
  });

  tp('works with a negative start angle clockwise', t => {
    const percents = [25, 39,];
    const startAngle = -0.5;
    t.deepEqual(
      calcAnglesFromPercents({percents, startAngle, clockwise: false,}),
      getExpectedRetValCounterClockwise(percents, startAngle)
    );
    t.end();
  });
}

function checkErrors(t, percents, errorCode) {
  const moduleRetVal =
    calcAnglesFromPercents({percents, startAngle: 0, clockwise: true,});
  t.equal(moduleRetVal.get('error'), errorCode);
  t.end();
}

function getExpectedRetValClockwise(percents, startAngle) {
  const expected = new Map([
    ['error', 0],
  ]);
  const angles = [startAngle];
  angles[1] = onePercentAngle * percents[0] + startAngle;
  angles[2] = angles[1] + onePercentAngle * percents[1];
  angles[3] = startAngle;
  expected.set('angles', angles);
  return expected;
}

function getExpectedRetValCounterClockwise(percents, startAngle) {
  const expected = new Map([
    ['error', 0],
  ]);
  const angles = [startAngle];
  angles[1] = startAngle - onePercentAngle * percents[0];
  angles[2] = angles[1] - onePercentAngle * percents[1];
  angles[3] = startAngle;
  expected.set('angles', angles);
  return expected;
}
