'use strict';

function rim(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const rimY = data.get('rimY');
  const radius = data.get('radius');
  const rimDrawSequence = data.get('rimDrawSequence');
  const cntx = data.get('cntx');
  const originalFillStyle = cntx.fillStyle;

  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (data.get('isRimDown')) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const thicknessScaled = faceY - rimY;
  let startX = centerX + radius;
  let startY = faceY;
  let startYRim;
  let endX;
  let endY;
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    strokeSliceEdgesRightBottom();
    startX = Math.cos(rimDrawSequence[i + 1]) * radius + centerX;
    startY = Math.sin(rimDrawSequence[i + 1]) * radius + faceY;
  }
  strokeLeftEdgeOfLastSlice();

  cntx.fillStyle = originalFillStyle;

  function strokeSliceEdgesRightBottom() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    cntx.lineTo(startX, startYRim);
    cntx.arc(centerX, rimY, radius, rimDrawSequence[i - 1],
        rimDrawSequence[i + 1], baseArcCounterClockwise);
    cntx.stroke();
  }

  function strokeLeftEdgeOfLastSlice() {
    cntx.beginPath();
    cntx.moveTo(centerX - radius, faceY);
    cntx.lineTo(centerX - radius, faceY - thicknessScaled);
    cntx.stroke();
  }
}

module.exports = rim;
