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
