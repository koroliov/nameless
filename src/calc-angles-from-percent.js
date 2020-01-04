'use strict';

function calcAnglesFromPercent(percents, startAngle=0) {
  const onePercentAngle = Math.PI / 50;

  let retVal = [startAngle];
  for (let i = 0; i < percents.length; i++) {
    retVal.push(retVal[i] + onePercentAngle * percents[i]);
  }
  retVal.push(startAngle);

  return retVal;
}

module.exports = calcAnglesFromPercent;
