(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function calcAnglesFromPercents({percents, startAngle, counterClockwise}) {
  const onePercentAngle = Math.PI / 50;
  const angles = [startAngle];
  let totalPercents = 0;

  if (counterClockwise) {
    for (let i = 0; i < percents.length; i++) {
      totalPercents += percents[i];
      angles.push(angles[i] - onePercentAngle * percents[i]);
    }
  } else {
    for (let i = 0; i < percents.length; i++) {
      totalPercents += percents[i];
      angles.push(angles[i] + onePercentAngle * percents[i]);
    }
  }
  angles.push(startAngle);

  const retVal = Object.create(null);
  retVal.error = totalPercents >= 100 ? 1 : 0;
  retVal.angles = angles;
  return retVal;
}

module.exports = calcAnglesFromPercents;

},{}],2:[function(require,module,exports){
'use strict';

function drawPieBase({ox, oy, radius, cntx, angles, colors, counterClockwise}) {
  const originalFillStyle = cntx.fillStyle;
  for (let i = 1; i < angles.length; i++) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, angles[i - 1], angles[i], counterClockwise);
    cntx.lineTo(ox, oy);
    cntx.stroke();
    cntx.closePath();
    cntx.fillStyle = colors[i - 1];
    cntx.fill();
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = drawPieBase;

},{}],3:[function(require,module,exports){
'use strict';

const calcAnglesFromPercents = require('./calc-angles-from-percents.js');
window.calcAnglesFromPercents = calcAnglesFromPercents;

const drawPieBase = require('./draw-pie-base.js');
window.drawPieBase = drawPieBase;

},{"./calc-angles-from-percents.js":1,"./draw-pie-base.js":2}]},{},[3]);
