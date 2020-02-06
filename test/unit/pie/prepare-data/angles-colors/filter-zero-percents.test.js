'use strict';

const tp = require('tape');
const filterZeroPercents =
    require('pie/prepare-data/angles-colors/filter-zero-percents');

tp('filters zero percent values and corresponding colors', t => {
  const data = new Map([
    ['colors', ['col 0', 'col 1', 'col 2', 'col 3', 'col 4', ]],
    ['percents', [0, 20, 0, 80, 0]],
  ]);
  filterZeroPercents(data);
  t.deepEqual(data.get('percents'), [20, 80]);
  t.deepEqual(data.get('colors'), ['col 1', 'col 3']);
  t.end();
});
