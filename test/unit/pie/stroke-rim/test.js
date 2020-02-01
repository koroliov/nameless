'use strict';

const tp = require('tape');
const {createCanvas} = require('canvas');
const strokeRim = require('pie/stroke-rim');
//const wr = require('dev-utils/write-png-file-from-base-64');

const pi = Math.PI;

tp('rim down, one slice', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-1-slice-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});

tp('rim down, 2 slices', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 1, '#e22929', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-2-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});

tp('rim down, 3 slices', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 1, '#e22929', 2.5, '#113fda', pi],
    isRimDown: true,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-3-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});

tp('rim up, 1 slice', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-1-slice-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});

tp('rim up, 2 slices', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 5, '#e22929', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-2-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});

tp('rim up, 3 slices', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  cntx.lineWidth = 0.1;
  cntx.fillStyle = '#ffffff';
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const argument = {
    ox: canvWidth / 2,
    oy: canvHeight / 2,
    radius: (canvHeight - 100) / 2,
    rimDrawSequence: [0, '#11ab12', 5, '#e22929', 4, '#113fda', pi],
    isRimDown: false,
    scaleY: 0.5,
    rimThickness: 20,
    cntx,
  };
  strokeRim(argument);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-3-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.end();
});
