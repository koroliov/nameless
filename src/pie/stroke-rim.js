'use strict';

function strokeRim(args) {
  const {ox, oy, radius, rimDrawSequence, isRimDown, scaleY, rimThickness,
      cntx} = args;
  const originalFillStyle = cntx.fillStyle;

  let rimScale = 1 - scaleY;
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
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    strokeSliceEdgesRightBottom();
    startX = Math.cos(rimDrawSequence[i + 1]) * radius + ox;
    startY = Math.sin(rimDrawSequence[i + 1]) * radius + oy;
  }
  strokeLeftEdgeOfLastSlice();

  cntx.fillStyle = originalFillStyle;

  function strokeSliceEdgesRightBottom() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    cntx.lineTo(startX, startYRim);
    cntx.arc(ox, oyRim, radius, rimDrawSequence[i - 1], rimDrawSequence[i + 1],
        baseArcCounterClockwise);
    cntx.stroke();
  }

  function strokeLeftEdgeOfLastSlice() {
    cntx.beginPath();
    cntx.moveTo(ox - radius, oy);
    cntx.lineTo(ox - radius, oy + rimThicknessScaled);
    cntx.stroke();
  }
}

module.exports = strokeRim;
