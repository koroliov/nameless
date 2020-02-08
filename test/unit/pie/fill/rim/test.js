'use strict';

const tp = require('tape');
const sinon = require('sinon');
const {createCanvas} = require('canvas');
const rim = require('pie/fill/rim');
//const wr = require('dev-utils/write-png-file-from-base-64');

const pi = Math.PI;

tp('rim down, one slice (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY + thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', pi]],
    ['isRimDown', true],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-1-slice-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'), [0, '#11ab12', pi]);
  t.end();
});

tp('rim down, 2 slices (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY + thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', 1, '#e22929', pi]],
    ['isRimDown', true],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-2-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'), [0, '#11ab12', 1, '#e22929', pi]);
  t.end();
});

tp('rim down, 3 slices (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY + thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', 1, '#e22929', 2.5, '#113fda', pi]],
    ['isRimDown', true],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-down-3-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'),
      [0, '#11ab12', 1, '#e22929', 2.5, '#113fda', pi]);
  t.end();
});

tp('rim up, 1 slice (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY - thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', pi]],
    ['isRimDown', false],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-1-slice-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'), [0, '#11ab12', pi]);
  t.end();
});

tp('rim up, 2 slices (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY - thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', 5, '#e22929', pi]],
    ['isRimDown', false],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-2-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'), [0, '#11ab12', 5, '#e22929', pi]);
  t.end();
});

tp('rim up, 3 slices (no changes in the data)', t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const faceY = canvHeight / 2;
  const thickness = 20;
  const scaleY = 0.5;
  const rimY = faceY - thickness * Math.sqrt(1 - scaleY * scaleY) / scaleY;
  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', faceY],
    ['rimY', rimY],
    ['radius', (canvHeight - 100) / 2],
    ['rimDrawSequence', [0, '#11ab12', 5, '#e22929', 4, '#113fda', pi]],
    ['isRimDown', false],
    ['cntx', cntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  rim(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-rim-up-3-slices-base64.js');
  t.equal(expectedBase64 === actualBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('rimDrawSequence'),
      [0, '#11ab12', 5, '#e22929', 4, '#113fda', pi]);
  t.end();
});
