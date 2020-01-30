'use strict';

function fillRim(args) {
  const {ox, oy, radius, rimDrawSequence, isRimDown, scaleY, rimThickness,
      cntx} = args;
  const originalFillStyle = cntx.fillStyle;

  let rimScale = Math.sqrt(1 - scaleY * scaleY);
  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (isRimDown) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    rimScale = -rimScale;
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const rimThicknessScaled = rimThickness * rimScale / scaleY;
  let startX = ox + radius;
  let startY = oy;
  const oyRim = oy + rimThicknessScaled;
  let startYRim;
  let endX;
  let endY;
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    fillInnerPartOfSlice();
    startX = endX;
    startY = endY;
  }

  cntx.fillStyle = originalFillStyle;

  function fillInnerPartOfSlice() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    startYRim = startY + rimThicknessScaled;
    cntx.lineTo(startX, startYRim);
    cntx.arc(ox, oyRim, radius, rimDrawSequence[i - 1], rimDrawSequence[i + 1],
        baseArcCounterClockwise);
    endX = Math.cos(rimDrawSequence[i + 1]) * radius + ox;
    endY = Math.sin(rimDrawSequence[i + 1]) * radius + oy;
    cntx.arc(ox, oy, radius, rimDrawSequence[i + 1], rimDrawSequence[i - 1],
        rimArcCounterClockwise);
    cntx.fillStyle = rimDrawSequence[i];
    cntx.fill();
  }
}

module.exports = fillRim;
