'use strict';

const tp = require('tape');
const sinon = require('sinon');
const filterZeroPercents =
    require('pie/prepare-data/angles-colors/filter-zero-percents');

tp(`filters zero percent values and corresponding colors, does not change data
in other way`, t => {
  const data = new Map([
    ['colors', ['col 0', 'col 1', 'col 2', 'col 3', 'col 4', ]],
    ['percents', [0, 20, 0, 80, 0]],
  ]);
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  filterZeroPercents(data);
  t.deepEqual(data.get('percents'), [20, 80]);
  t.deepEqual(data.get('colors'), ['col 1', 'col 3']);
  t.equal(data.size, 2);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.end();
});
