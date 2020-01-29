'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
const strokeFace = require('pie/stroke-face');
//const wr = require('dev-utils/write-png-file-from-base-64');

tp('strokes a charted circle clockwise', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);
  cntx.lineWidth = 0.1;
  cntx.strokeStyle = '#000000';

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0, 1, 3, 0],
    counterClockwise: false,
  };
  strokeFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});

tp('strokes a charted circle counter-clockwise', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);
  cntx.lineWidth = 0.1;
  cntx.strokeStyle = '#000000';

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0],
    counterClockwise: true,
  };
  strokeFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-counter-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});

tp('strokes a circle with no slices (a single piece), if angles.length is 1, ' +
    'no matter what other arguments are (though most likely this will not ' +
    'occur, due to validation)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);
  cntx.lineWidth = 0.1;
  cntx.strokeStyle = '#000000';

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0],
    counterClockwise: true,
  };
  strokeFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-one-slice-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});
