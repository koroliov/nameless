'use strict';

function strokeFace({ox, oy, radius, cntx, angles, counterClockwise}) {
  if (angles.length === 1) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, 0, 2 * Math.PI);
    cntx.stroke();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(ox, oy, radius, angles[i - 1], angles[i],
          counterClockwise);
      cntx.lineTo(ox, oy);
      cntx.stroke();
    }
  }
}

module.exports = strokeFace;
