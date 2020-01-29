'use strict';

const tp = require('tape');
const sinon = require('sinon');
const applyContextStateChanges = require('pie/apply-context-state-changes');

tp('applies styles, translation, rotation, scaling in the right order', t => {
  t.plan(13);
  const mockContext2d = {
    translate: sinon.fake(),
    rotate: sinon.fake(),
    scale: sinon.fake(),
    strokeStyle: undefined,
    lineWidth: undefined,
  };
  const originalKeysLength = Object.keys(mockContext2d).length;
  const argument = {
    cntx: mockContext2d,
    ox: 1,
    oy: 2,
    strokeColor: Symbol('strokeColor'),
    strokeWidth: 1,
    rotationAngle: Symbol('rotationAngle'),
    scaleY: Symbol('scaleY'),
  };
  applyContextStateChanges(argument);

  const actualKeysLength = Object.keys(mockContext2d).length;
  t.equal(actualKeysLength, originalKeysLength, 'no new props were added');
  t.equal(mockContext2d.strokeStyle, argument.strokeColor);
  t.equal(mockContext2d.lineWidth, argument.strokeWidth);

  t.equal(mockContext2d.translate.callCount, 2);
  const firstTranslateCall = mockContext2d.translate.getCall(0);
  t.deepEqual(firstTranslateCall.args, [argument.ox, argument.oy]);

  t.equal(mockContext2d.rotate.callCount, 1);
  const rotateCall = mockContext2d.rotate.getCall(0);
  t.equal(rotateCall.calledImmediatelyAfter(firstTranslateCall), true);
  t.deepEqual(rotateCall.args, [argument.rotationAngle]);

  t.equal(mockContext2d.scale.callCount, 1);
  const scaleCall = mockContext2d.scale.getCall(0);
  t.equal(scaleCall.calledImmediatelyAfter(rotateCall), true);
  t.deepEqual(scaleCall.args, [1, argument.scaleY]);

  const secondTranslateCall = mockContext2d.translate.getCall(1);
  t.equal(secondTranslateCall.calledImmediatelyAfter(scaleCall), true);
  t.deepEqual(secondTranslateCall.args, [-argument.ox, -argument.oy]);

tp('if strokeWidth is 0, strokeColor, strokeWidth are not applied', t => {
  t.plan(13);
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
  const argument = {
    cntx: mockContext2d,
    ox: 1,
    oy: 2,
    strokeColor: Symbol('strokeColor'),
    strokeWidth: 0,
    rotationAngle: Symbol('rotationAngle'),
    scaleY: Symbol('scaleY'),
  };
  applyContextStateChanges(argument);

  const actualKeysLength = Object.keys(mockContext2d).length;
  t.equal(actualKeysLength, originalKeysLength, 'no new props were added');
  t.equal(mockContext2d.strokeStyle, originalStrokeStyle);
  t.equal(mockContext2d.lineWidth, originalLineWidth);

  t.equal(mockContext2d.translate.callCount, 2);
  const firstTranslateCall = mockContext2d.translate.getCall(0);
  t.deepEqual(firstTranslateCall.args, [argument.ox, argument.oy]);

  t.equal(mockContext2d.rotate.callCount, 1);
  const rotateCall = mockContext2d.rotate.getCall(0);
  t.equal(rotateCall.calledImmediatelyAfter(firstTranslateCall), true);
  t.deepEqual(rotateCall.args, [argument.rotationAngle]);

  t.equal(mockContext2d.scale.callCount, 1);
  const scaleCall = mockContext2d.scale.getCall(0);
  t.equal(scaleCall.calledImmediatelyAfter(rotateCall), true);
  t.deepEqual(scaleCall.args, [1, argument.scaleY]);

  const secondTranslateCall = mockContext2d.translate.getCall(1);
  t.equal(secondTranslateCall.calledImmediatelyAfter(scaleCall), true);
  t.deepEqual(secondTranslateCall.args, [-argument.ox, -argument.oy]);
});
});
