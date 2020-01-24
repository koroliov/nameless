'use strict';

const tp = require('tape');
const calcAnglesFromPercents =
    require('prepare-angles-n-colors/calc-angles-from-percents');
const onePercentAngle = Math.PI / 50;

tp('clockwise, start 0', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = 0;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('clockwise, start >0 <Pi, has vals >2Pi <start + 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('clockwise, start >0 <Pi, does not have vals >2Pi <start + 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 30];
  const startAngle = Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('clockwise, start Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.Pi;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('clockwise, start >Pi <2Pi, has vals >3Pi <start + 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.PI + Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('clockwise, start >Pi <2Pi, does not have vals >3Pi <start + 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 30];
  const startAngle = Math.PI + Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start 0', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = 0;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: true});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] - percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] - percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start >0 <Pi, has vals <-Pi >start - 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start >0 <Pi, does not have vals <-Pi >start - 2Pi',
  t => {
  t.plan(1);
  const percents = [10, 20, 30];
  const startAngle = Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.PI;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: true});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] - percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] - percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start >Pi <2Pi, has vals <0 >start - 2Pi', t => {
  t.plan(1);
  const percents = [10, 20, 70];
  const startAngle = Math.PI + Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('counter-clockwise, start >Pi <2Pi, does not have vals <0 >start - 2Pi',
  t => {
  t.plan(1);
  const percents = [10, 20, 30];
  const startAngle = Math.PI + Math.PI / 2;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});

tp('has smaller values after bigger ones', t => {
  t.plan(1);
  const percents = [20, 10, 70];
  const startAngle = 0;
  const actualRetVal =
    calcAnglesFromPercents({percents, startAngle, counterClockwise: false});
  const expectedRetVal = [startAngle];
  expectedRetVal[1] = expectedRetVal[0] + percents[0] * onePercentAngle;
  expectedRetVal[2] = expectedRetVal[1] + percents[1] * onePercentAngle;
  expectedRetVal[3] = startAngle;
  t.deepEqual(actualRetVal, expectedRetVal);
});
