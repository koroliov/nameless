'use strict';

const tp = require('tape');
const sinon = require('sinon');
const {createCanvas} = require('canvas');
const face = require('pie/fill/face.js');
//const wr = require('dev-utils/write-png-file-from-base-64');

tp(`draws a charted circle filled with colors, clockwise, it does not change
the data`, t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', canvHeight / 2],
    ['radius', (canvHeight - 100) / 2],
    ['cntx', cntx],
    ['angles', [0, 1, 3, 0]],
    ['colors', ['#60fd1e', '#41fff3', '#1a1fc7']],
    ['counterClockwise', false],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  face(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('angles'), [0, 1, 3, 0]);
  t.deepEqual(data.get('colors'), ['#60fd1e', '#41fff3', '#1a1fc7']);
  t.end();
});

tp(`draws a charted circle filled with colors, counter-clockwise, does not
change data`, t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', canvHeight / 2],
    ['radius', (canvHeight - 100) / 2],
    ['cntx', cntx],
    ['angles', [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0]],
    ['colors', ['#60fd1e', '#41fff3', '#1a1fc7']],
    ['counterClockwise', true],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  face(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-counter-clockwise-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('angles'), [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0]);
  t.deepEqual(data.get('colors'), ['#60fd1e', '#41fff3', '#1a1fc7']);
  t.end();
});

tp(`draws a circle filled with a single color, if color.length is 1, no matter
what other arguments are (though most likely this will not occur), does not
change data`, t => {
  const canvWidth = 400;
  const canvHeight = 300;
  const canvas = createCanvas(canvWidth, canvHeight);
  const cntx = canvas.getContext('2d');
  const originalFillStyle = '#ffffff';
  cntx.fillStyle = originalFillStyle;
  cntx.fillRect(0, 0, canvWidth, canvHeight);

  const data = new Map([
    ['centerX', canvWidth / 2],
    ['faceY', canvHeight / 2],
    ['radius', (canvHeight - 100) / 2],
    ['cntx', cntx],
    ['angles', [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0]],
    ['colors', ['#60fd1e']],
    ['counterClockwise', false],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  face(data);

  const actualBase64 = canvas.toDataURL();
  const expectedBase64 = require('./expected-one-slice-base64.js');
  t.equal(actualBase64 === expectedBase64, true);
  t.equal(cntx.fillStyle, originalFillStyle);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.deepEqual(data.get('angles'), [0, 2 * Math.PI - 1, 2 * Math.PI - 3, 0]);
  t.deepEqual(data.get('colors'), ['#60fd1e']);
  t.end();
});
