'use strict';

function drawPieBase(args) {
  const {ox, oy, radius, cntx, normalizedAngles, colors, counterClockwise} =
      args;
  const originalFillStyle = cntx.fillStyle;
  for (let i = 1; i < normalizedAngles.length; i++) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, normalizedAngles[i - 1], normalizedAngles[i],
        counterClockwise);
    cntx.lineTo(ox, oy);
    cntx.stroke();
    cntx.closePath();
    cntx.fillStyle = colors[i - 1];
    cntx.fill();
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = drawPieBase;
