'use strict';

function rim(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const rimY = data.get('rimY');
  const radius = data.get('radius');
  const rimDrawSequence = data.get('rimDrawSequence');
  const isRimDown = data.get('isRimDown');
  const cntx = data.get('cntx');
  const originalFillStyle = cntx.fillStyle;

  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (isRimDown) {
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
    fillInnerPartOfSlice();
    startX = endX;
    startY = endY;
  }

  cntx.fillStyle = originalFillStyle;

  function fillInnerPartOfSlice() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    startYRim = startY + thicknessScaled;
    cntx.lineTo(startX, startYRim);
    cntx.arc(centerX, rimY, radius, rimDrawSequence[i - 1],
        rimDrawSequence[i + 1], baseArcCounterClockwise);
    endX = Math.cos(rimDrawSequence[i + 1]) * radius + centerX;
    endY = Math.sin(rimDrawSequence[i + 1]) * radius + faceY;
    cntx.arc(centerX, faceY, radius, rimDrawSequence[i + 1],
        rimDrawSequence[i - 1], rimArcCounterClockwise);
    cntx.fillStyle = rimDrawSequence[i];
    cntx.fill();
  }
}

module.exports = rim;
