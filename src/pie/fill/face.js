'use strict';

function face(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const radius = data.get('radius');
  const cntx = data.get('cntx');
  const angles = data.get('angles');
  const colors = data.get('colors');
  const originalFillStyle = cntx.fillStyle;
  if (colors.length === 1) {
    cntx.beginPath();
    cntx.arc(centerX, faceY, radius, 0, 2 * Math.PI);
    cntx.fillStyle = colors[0];
    cntx.fill();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(centerX, faceY, radius, angles[i - 1], angles[i],
          data.get('counterClockwise'));
      cntx.lineTo(centerX, faceY);
      cntx.closePath();
      cntx.fillStyle = colors[i - 1];
      cntx.fill();
    }
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = face;
