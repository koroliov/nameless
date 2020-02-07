'use strict';

const tp = require('tape');
const sinon = require('sinon');
const calculateAngles =
    require('pie/prepare-data/angles-colors/calculate-angles');
const onePercentAngle = Math.PI / 50;

tp('counterClockwise, start (bot/0/top) F/bot', t => {
  const startAngle = 1;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', false],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] + percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] + percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('counterClockwise, start (bot/0/top) F/0', t => {
  const startAngle = 0;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', false],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] + percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] + percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('counterClockwise, start (bot/0/top) F/top', t => {
  const startAngle = 5;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', false],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] + percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] + percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('counterClockwise, start (bot/0/top) T/bot', t => {
  const startAngle = 1;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', true],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] - percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] - percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('counterClockwise, start (bot/0/top) T/0', t => {
  const startAngle = 0;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', true],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] - percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] - percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('counterClockwise, start (bot/0/top) T/top', t => {
  const startAngle = 5;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', true],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const expectedAngles = [data.get('startAngle')];
  expectedAngles[1] = expectedAngles[0] - percents[0] * onePercentAngle;
  expectedAngles[2] = expectedAngles[1] - percents[1] * onePercentAngle;
  expectedAngles[3] = startAngle;
  calculateAngles(data);
  t.deepEqual(data.get('angles'), expectedAngles);
  t.end();
});

tp('it does not change data, except setting angles', t => {
  const startAngle = 5;
  const percents = [10, 20, 70];
  const data = new Map([
    ['counterClockwise', true],
    ['startAngle', startAngle],
    ['percents', percents],
  ]);
  const spy = sinon.spy(data, 'set');
  calculateAngles(data);
  t.equal(spy.callCount, 1);
  t.equal(spy.getCall(0).args.length, 2);
  t.equal(spy.getCall(0).args[0], 'angles');
  t.end();
});
