'use strict';

function draw100PercentPie(args) {
  const {ox, oy, radius, color, cntx} = args;
  const originalFillStyle = cntx.fillStyle;
  cntx.beginPath();
  cntx.arc(ox, oy, radius, 0, 2 * Math.PI);
  cntx.fillStyle = color;
  cntx.fill();
  cntx.stroke();
  cntx.fillStyle = originalFillStyle;
}

module.exports = draw100PercentPie;
