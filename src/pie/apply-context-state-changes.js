'use strict';

function applyContextStateChanges(data) {
  const cntx = data.get('cntx');
  const centerX = data.get('centerX');
  const centerY = data.get('centerY');
  const strokeWidth = data.get('strokeWidth');

  if (strokeWidth !== 0) {
    cntx.strokeStyle = data.get('strokeColor');
    cntx.lineWidth = strokeWidth;
  }
  cntx.translate(centerX, centerY);
  cntx.rotate(data.get('rotationAngle'));
  cntx.scale(1, data.get('scaleY'));
  cntx.translate(-centerX, -centerY);
}

module.exports = applyContextStateChanges;
