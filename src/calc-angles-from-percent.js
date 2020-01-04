'use strict';

function calcAnglesFromPercent(percents, start=0) {
  const onePercentAngle = Math.PI / 50;

  let retVal = [onePercentAngle * percents[0] + start];
  for (let i = 1; i < percents.length; i++) {
    retVal.push(retVal[i - 1] + onePercentAngle * percents[i]);
  }
  retVal.push(start);

  return retVal;
}

module.exports = calcAnglesFromPercent;
