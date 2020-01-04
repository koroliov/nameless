(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

const calcAnglesFromPercent = require('./calc-angles-from-percent.js');

window.calcAnglesFromPercent = calcAnglesFromPercent;

},{"./calc-angles-from-percent.js":1}]},{},[2]);