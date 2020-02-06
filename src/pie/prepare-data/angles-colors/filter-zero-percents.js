'use strict';

function filterZeroPercents(data) {
  const colors = data.get('colors');
  const filteredColors = [];
  const filteredPercents = data.get('percents').filter((el, i) => {
    if (el !== 0) {
      filteredColors.push(colors[i]);
      return true;
    }
    return false;
  });
  data.set('percents', filteredPercents);
  data.set('colors', filteredColors);
  return data;
}

module.exports = filterZeroPercents;
