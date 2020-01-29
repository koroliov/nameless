'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
const fillFace = require('pie/fill-face');
//const wr = require('dev-utils/write-png-file-from-base-64');

tp('draws a charted circle filled with colors, clockwise', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0, 1, 3, 0],
    colors: ['#60fd1e', '#41fff3', '#1a1fc7'],
    counterClockwise: false,
  };
  fillFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});

tp('draws a charted circle filled with colors, counter-clockwise', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0],
    colors: ['#60fd1e', '#41fff3', '#1a1fc7'],
    counterClockwise: true,
  };
  fillFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-counter-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});

tp('draws a circle filled with a single color, if color.length is 1, ' +
    'no matter what other arguments are (though most likely this will not ' +
    'occur, due to validation)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    cntx,
    angles: [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0],
    colors: ['#60fd1e'],
    counterClockwise: true,
  };
  fillFace(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-one-slice-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.end();
});
