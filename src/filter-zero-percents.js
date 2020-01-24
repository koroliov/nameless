'use strict';

function filterZeroPercents(percents, colors) {
  const filteredColors = [];
  const filteredPercents = percents.filter((el, i) => {
    if (el !== 0) {
      filteredColors.push(colors[i]);
      return true;
    }
    return false;
  });
  return {
    percents: filteredPercents,
    colors: filteredColors,
  };
}

module.exports = filterZeroPercents;
