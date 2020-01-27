'use strict';

function applyContextStateChanges(args) {
  const {cntx, ox, oy, strokeColor, strokeWidth, rotationAngle, scaleY} = args;
  cntx.strokeStyle = strokeColor;
  cntx.lineWidth = strokeWidth;

  cntx.translate(ox, oy);
  cntx.rotate(rotationAngle);
  cntx.scale(1, scaleY);
  cntx.translate(-ox, -oy);
}

module.exports = applyContextStateChanges;
