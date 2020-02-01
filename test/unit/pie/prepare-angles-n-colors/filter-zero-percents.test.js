'use strict';

const tp = require('tape');
const filterZeroPercents =
    require('pie/prepare-angles-n-colors/filter-zero-percents');

tp('filters zero percent values and corresponding colors', t => {
  t.plan(2);
  const colorsOriginal = ['col 0', 'col 1', 'col 2', 'col 3', 'col 4', ];
  const percentsOriginal = [0, 20, 0, 80, 0];
  const {percents, colors} =
      filterZeroPercents(percentsOriginal, colorsOriginal);
  t.deepEqual(percents, [20, 80]);
  t.deepEqual(colors, ['col 1', 'col 3']);
});
