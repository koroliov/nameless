'use strict';

function fillFace(args) {
  const {ox, oy, radius, cntx, angles, colors, counterClockwise} = args;
  const originalFillStyle = cntx.fillStyle;
  if (colors.length === 1) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, 0, 2 * Math.PI);
    cntx.fillStyle = colors[0];
    cntx.fill();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(ox, oy, radius, angles[i - 1], angles[i],
          counterClockwise);
      cntx.lineTo(ox, oy);
      cntx.closePath();
      cntx.fillStyle = colors[i - 1];
      cntx.fill();
    }
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = fillFace;
