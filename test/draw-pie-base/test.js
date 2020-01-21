'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
const drawPieBase = require('draw-pie-base');

tp('draws a charted circle filled with colors, clockwise', t => {
  t.plan(2);
  const originalFillStyle = '#ffffff';
  const {currentFillStyle, actualBase64} = drawAndReturnItemsToTest(
    originalFillStyle, ['#11ab12', '#e22929', '#113fda'],
    [0, 1, 3, 0], false);
  const expectedBase64 = require('./expected-clockwise-base64.js');

  t.equal(actualBase64 === expectedBase64, true);
  t.equal(currentFillStyle, originalFillStyle);
});

tp('draws a charted circle filled with colors, counter-clockwise', t => {
  t.plan(2);
  const originalFillStyle = '#ffffff';
  const {currentFillStyle, actualBase64} = drawAndReturnItemsToTest(
    originalFillStyle, ['#11ab12', '#e22929', '#113fda'],
    [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0], true);
  const expectedBase64 = require('./expected-counter-clockwise-base64.js');

  t.equal(actualBase64 === expectedBase64, true);
  t.equal(currentFillStyle, originalFillStyle);
  t.end();
});

function drawAndReturnItemsToTest(originalFillStyle, colors, normalizedAngles,
  counterClockwise) {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);
  cntx.lineWidth = 1;
  cntx.strokeStyle = '#000000';

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    normalizedAngles,
    colors,
  };
  if (counterClockwise !== null) {
    argument.counterClockwise = counterClockwise;
  }
  drawPieBase(argument);

  const retVal = Object.create(null);
  retVal.currentFillStyle = cntx.fillStyle;
  retVal.actualBase64 = canvas.toDataURL();
  return retVal;
}

let fileCounterForSorting = 0;
function writePngs(descriptivePartOfPngName, actualBase64, expectedBase64) {
  const wPngFileFromBase64 = require('dev-utils/write-png-file-from-base-64');
  fileCounterForSorting++;
  const actualFilePath = './png-test-output/' + fileCounterForSorting +
    '-' + descriptivePartOfPngName + '-actual.png';
  const expectedFilePath = './png-test-output/' + fileCounterForSorting +
    '-' + descriptivePartOfPngName + '-expected.png';
  wPngFileFromBase64(Buffer, actualFilePath, actualBase64);
  wPngFileFromBase64(Buffer, expectedFilePath, expectedBase64);
}
