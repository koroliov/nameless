'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
//const wr = require('dev-utils/write-png-file-from-base-64');
const draw100PercentPie = require('pie/draw-100-percent-pie');

tp('draw 100% pie (no slices)', t => {
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
    color: '#11ab12',
    cntx,
  };
  draw100PercentPie(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-base64.js');
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
