'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

tp(`takes data, filters 0%, calculates/normalizes angles, does not change data
by itself`, t => {
  const data = new Map([
    ['colors', ['col 1', 'col 2']],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './filter-zero-percents': sinon.fake(),
    './calculate-angles': sinon.fake(),
    './normalize-angles': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/angles-colors/main', mainDeps);
  main(data);

  t.equal(mainDeps['./filter-zero-percents'].callCount, 1);
  const filterZeroPercentsCall = mainDeps['./filter-zero-percents'].getCall(0);
  t.equal(filterZeroPercentsCall.args.length, 1);
  t.equal(filterZeroPercentsCall.args[0], data);

  t.equal(mainDeps['./calculate-angles'].callCount, 1);
  const calculateAnglesCall = mainDeps['./calculate-angles'].getCall(0);
  t.equal(calculateAnglesCall.args.length, 1);
  t.equal(calculateAnglesCall.args[0], data);
  t.equal(calculateAnglesCall.calledImmediatelyAfter(filterZeroPercentsCall),
      true);

  t.equal(mainDeps['./normalize-angles'].callCount, 1);
  const normalizeAnglesCall = mainDeps['./normalize-angles'].getCall(0);
  t.equal(normalizeAnglesCall.args.length, 1);
  t.equal(normalizeAnglesCall.args[0], data);
  t.equal(normalizeAnglesCall.calledImmediatelyAfter(calculateAnglesCall),
      true);

  t.deepEqual(data.get('colors'), ['col 1', 'col 2']);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp(`in case of 100% present it does not calculate angles, does not change data
by itself`, t => {
  const data = new Map([
    ['colors', ['col 1', 'col 2']],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './filter-zero-percents': sinon.spy((data) => {
      data.set('colors', ['col 1']);
    }),
    './calculate-angles': sinon.fake(),
    './normalize-angles': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/angles-colors/main', mainDeps);
  main(data);

  t.equal(mainDeps['./filter-zero-percents'].callCount, 1);
  const filterZeroPercentsCall = mainDeps['./filter-zero-percents'].getCall(0);
  t.equal(filterZeroPercentsCall.args.length, 1);
  t.equal(filterZeroPercentsCall.args[0], data);

  t.equal(mainDeps['./calculate-angles'].callCount, 0);
  t.equal(mainDeps['./normalize-angles'].callCount, 0);

  t.deepEqual(data.get('colors'), ['col 1']);
  t.equal(spySet.callCount, 1, 'the one from the filterZeroPercents spy');
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});
