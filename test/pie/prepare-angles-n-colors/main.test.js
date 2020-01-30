'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

tp('takes args, filters 0%, calculates angles, returns angles&percents', t => {
  const colorsOriginal = Symbol('colors original');
  const percentsOriginal = Symbol('percents original');
  const startAngle = Symbol('start angle');
  const counterClockwise = Symbol('counterClockwise flag');

  const filteredColors = Symbol('colors filtered');
  const filteredPercents = Symbol('percents filtered');
  const filterZeroPercentsStub = sinon.stub().returns({
    colors: filteredColors,
    percents: filteredPercents,
  });

  const calcAnglesFromPercentsRetVal = Symbol('angles calculated');
  const calcAnglesFromPercentsStub =
      sinon.stub().returns(calcAnglesFromPercentsRetVal);

  const normalizeAnglesRetVal = Symbol('angles normalized');
  const normalizeAnglesStub = sinon.stub().returns(normalizeAnglesRetVal);

  const main = proxyquire('pie/prepare-angles-n-colors/main', {
    './filter-zero-percents': filterZeroPercentsStub,
    './calc-angles-from-percents': calcAnglesFromPercentsStub,
    './normalize-angles': normalizeAnglesStub,
  });

  const {colors, angles} =
      main({percentsOriginal, colorsOriginal, startAngle, counterClockwise});
  t.equal(colors, filteredColors);
  t.equal(angles, normalizeAnglesRetVal);

  t.equal(filterZeroPercentsStub.callCount, 1);
  t.deepEqual(filterZeroPercentsStub.getCall(0).args,
      [percentsOriginal, colorsOriginal]);

  t.equal(calcAnglesFromPercentsStub.callCount, 1);
  t.deepEqual(calcAnglesFromPercentsStub.getCall(0).args,
    [{
      percents: filteredPercents,
      startAngle,
      counterClockwise,
    }]
  );

  t.equal(normalizeAnglesStub.callCount, 1);
  t.deepEqual(normalizeAnglesStub.getCall(0).args,
    [calcAnglesFromPercentsRetVal]
  );

  t.end();
});

tp('in case of 100% present it returns single color and angle [0]', t => {
  const colorsOriginal = Symbol('colors original');
  const percentsOriginal = Symbol('percents original');
  const startAngle = Symbol('start angle');
  const counterClockwise = Symbol('counterClockwise flag');

  const mainDeps = {
    './filter-zero-percents': sinon.stub().returns({
      colors: ['single col'],
      percents: [100],
    }),
    './calc-angles-from-percents': sinon.fake(),
    './normalize-angles': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-angles-n-colors/main', mainDeps);

  const actual =
      main({percentsOriginal, colorsOriginal, startAngle, counterClockwise});
  t.deepEqual(actual, {angles: [0], colors: ['single col']});

  t.equal(mainDeps['./filter-zero-percents'].callCount, 1);
  t.deepEqual(mainDeps['./filter-zero-percents'].getCall(0).args,
      [percentsOriginal, colorsOriginal]);
  t.equal(mainDeps['./calc-angles-from-percents'].callCount, 0);
  t.equal(mainDeps['./normalize-angles'].callCount, 0);

  t.end();
});
