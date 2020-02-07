'use strict';

const filterZeroPercents = require('./filter-zero-percents');
const calculateAngles = require('./calculate-angles');
const normalizeAngles = require('./normalize-angles');

function main(data) {
  filterZeroPercents(data);
  if (data.get('colors').length !== 1) {
    calculateAngles(data);
    normalizeAngles(data);
  }
}

module.exports = main;
