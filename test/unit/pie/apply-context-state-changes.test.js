'use strict';

const tp = require('tape');
const sinon = require('sinon');
const applyContextStateChanges = require('pie/apply-context-state-changes');

tp(`applies styles, translation, rotation, scaling in the right order,
it does not change data in any way`, t => {
  const mockContext2d = {
    translate: sinon.fake(),
    rotate: sinon.fake(),
    scale: sinon.fake(),
    strokeStyle: undefined,
    lineWidth: undefined,
  };
  const originalKeysLength = Object.keys(mockContext2d).length;
  const data = new Map([
    ['cntx', mockContext2d],
    ['centerX', 1],
    ['centerY', 2],
    ['strokeColor', Symbol('strokeColor')],
    ['strokeWidth', 1],
    ['rotationAngle', Symbol('rotationAngle')],
    ['scaleY', Symbol('scaleY')],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  applyContextStateChanges(data);

  const actualKeysLength = Object.keys(mockContext2d).length;
  t.equal(actualKeysLength, originalKeysLength, 'no new props were added');
  t.equal(mockContext2d.strokeStyle, data.get('strokeColor'));
  t.equal(mockContext2d.lineWidth, data.get('strokeWidth'));

  t.equal(mockContext2d.translate.callCount, 2);
  const firstTranslateCall = mockContext2d.translate.getCall(0);
  t.deepEqual(firstTranslateCall.args,
      [data.get('centerX'), data.get('centerY')]);

  t.equal(mockContext2d.rotate.callCount, 1);
  const rotateCall = mockContext2d.rotate.getCall(0);
  t.equal(rotateCall.calledImmediatelyAfter(firstTranslateCall), true);
  t.deepEqual(rotateCall.args, [data.get('rotationAngle')]);

  t.equal(mockContext2d.scale.callCount, 1);
  const scaleCall = mockContext2d.scale.getCall(0);
  t.equal(scaleCall.calledImmediatelyAfter(rotateCall), true);
  t.deepEqual(scaleCall.args, [1, data.get('scaleY')]);

  const secondTranslateCall = mockContext2d.translate.getCall(1);
  t.equal(secondTranslateCall.calledImmediatelyAfter(scaleCall), true);
  t.deepEqual(secondTranslateCall.args,
      [-data.get('centerX'), -data.get('centerY')]);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp('if strokeWidth is 0, strokeColor, strokeWidth are not applied', t => {
  const originalStrokeStyle = Symbol('original strokeStyle');
  const originalLineWidth = Symbol('original lineWidth');
  const mockContext2d = {
    translate: sinon.fake(),
    rotate: sinon.fake(),
    scale: sinon.fake(),
    strokeStyle: originalStrokeStyle,
    lineWidth: originalLineWidth,
  };
  const originalKeysLength = Object.keys(mockContext2d).length;
  const data = new Map([
    ['cntx', mockContext2d],
    ['centerX', 1],
    ['centerY', 2],
    ['strokeColor', Symbol('strokeColor')],
    ['strokeWidth', 0],
    ['rotationAngle', Symbol('rotationAngle')],
    ['scaleY', Symbol('scaleY')],
  ]);
  applyContextStateChanges(data);

  const actualKeysLength = Object.keys(mockContext2d).length;
  t.equal(actualKeysLength, originalKeysLength, 'no new props were added');
  t.equal(mockContext2d.strokeStyle, originalStrokeStyle);
  t.equal(mockContext2d.lineWidth, originalLineWidth);

  t.equal(mockContext2d.translate.callCount, 2);
  const firstTranslateCall = mockContext2d.translate.getCall(0);
  t.deepEqual(firstTranslateCall.args,
      [data.get('centerX'), data.get('centerY')]);

  t.equal(mockContext2d.rotate.callCount, 1);
  const rotateCall = mockContext2d.rotate.getCall(0);
  t.equal(rotateCall.calledImmediatelyAfter(firstTranslateCall), true);
  t.deepEqual(rotateCall.args, [data.get('rotationAngle')]);

  t.equal(mockContext2d.scale.callCount, 1);
  const scaleCall = mockContext2d.scale.getCall(0);
  t.equal(scaleCall.calledImmediatelyAfter(rotateCall), true);
  t.deepEqual(scaleCall.args, [1, data.get('scaleY')]);

  const secondTranslateCall = mockContext2d.translate.getCall(1);
  t.equal(secondTranslateCall.calledImmediatelyAfter(scaleCall), true);
  t.deepEqual(secondTranslateCall.args,
      [-data.get('centerX'), -data.get('centerY')]);

  t.end();
});
