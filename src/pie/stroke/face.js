'use strict';

function face(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const radius = data.get('radius');
  const cntx = data.get('cntx');
  const angles = data.get('angles');
  if (isSingleSlice()) {
    cntx.beginPath();
    cntx.arc(centerX, faceY, radius, 0, 2 * Math.PI);
    cntx.stroke();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(centerX, faceY, radius, angles[i - 1], angles[i],
          data.get('counterClockwise'));
      cntx.lineTo(centerX, faceY);
      cntx.stroke();
    }
  }
  function isSingleSlice() {
    return data.get('colors').length === 1;
  }
}

module.exports = face;
