'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
const drawPieRim = require('draw-pie-rim');

const pi = Math.PI;

tp('rim down, one slice', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-1-slice.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});

tp('rim down, 2 slices', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 1, '#e22929', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-2-slices.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});

tp('rim down, 3 slices', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 1, '#e22929', 2.5, '#113fda', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-3-slices.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});

tp('rim up, one slice', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-1-slice.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});

tp('rim up, 2 slices', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 5, '#e22929', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-2-slices.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});

tp('rim up, 3 slices', t => {
  t.plan(4);
  const originalFillStyle = '#ffffff';
  const originalStrokeStyle = '#000000';
  const originalLineWidth = 1;
  const canvWidth = 400;
  const canvHeight = 300;
  const {cntx, canvas} = setUp2dCanvas({originalFillStyle, originalStrokeStyle,
    originalLineWidth, canvWidth, canvHeight
  });

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 5, '#e22929', 4.5, '#113fda', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 50,
    cntx,
  };
  drawPieRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-3-slices.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(cntx.strokeStyle, originalStrokeStyle);
  t.equal(cntx.lineWidth, originalLineWidth);
});


function setUp2dCanvas(args) {
  const {originalFillStyle, originalStrokeStyle, originalLineWidth, canvWidth,
      canvHeight} = args;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);
  cntx.lineWidth = 1;
  cntx.strokeStyle = originalStrokeStyle;
  return {
    canvas,
    cntx,
  };
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
