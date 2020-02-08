'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

tp(`creates necessary data, does not change the argument and data by
itself`, t => {
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['thickness', 20],
    ['scaleY', 0.5],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './create': sinon.stub().returns(data),
    './angles-colors/main': sinon.fake(),
    './calculate-face-y-rim-y': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/main', mainDeps);
  const retVal = main(argument);

  t.equal(retVal, data);

  t.equal(mainDeps['./create'].callCount, 1);
  const createCall = mainDeps['./create'].getCall(0);
  t.equal(createCall.args.length, 1);
  t.equal(createCall.args[0], argument);

  t.equal(mainDeps['./angles-colors/main'].callCount, 1);
  const anglesColorsMainCall = mainDeps['./angles-colors/main'].getCall(0);
  t.equal(anglesColorsMainCall.args.length, 1);
  t.equal(anglesColorsMainCall.args[0], data);
  t.equal(anglesColorsMainCall.calledImmediatelyAfter(createCall), true);

  t.equal(mainDeps['./calculate-face-y-rim-y'].callCount, 1);
  const calculateFaceYRimYCall =
      mainDeps['./calculate-face-y-rim-y'].getCall(0);
  t.equal(calculateFaceYRimYCall.args.length, 1);
  t.equal(calculateFaceYRimYCall.args[0], data);
  t.equal(calculateFaceYRimYCall.calledImmediatelyAfter(anglesColorsMainCall),
      true);

  t.equal(mainDeps['./create-rim-draw-sequence'].callCount, 1);
  const createRimDrawSequenceCall =
      mainDeps['./create-rim-draw-sequence'].getCall(0);
  t.equal(createRimDrawSequenceCall.args.length, 1);
  t.equal(createRimDrawSequenceCall.args[0], data);
  t.equal(createRimDrawSequenceCall
      .calledImmediatelyAfter(calculateFaceYRimYCall), true);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp(`in case of thickness 0 (no rim) does not create the rimDrawSequence,
does not change data by itself`, t => {
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['thickness', 0],
    ['scaleY', 0.5],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './create': sinon.stub().returns(data),
    './angles-colors/main': sinon.fake(),
    './calculate-face-y-rim-y': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/main', mainDeps);
  const retVal = main(argument);

  t.equal(retVal, data);

  t.equal(mainDeps['./create'].callCount, 1);
  const createCall = mainDeps['./create'].getCall(0);
  t.equal(createCall.args.length, 1);
  t.equal(createCall.args[0], argument);

  t.equal(mainDeps['./angles-colors/main'].callCount, 1);
  const anglesColorsMainCall = mainDeps['./angles-colors/main'].getCall(0);
  t.equal(anglesColorsMainCall.args.length, 1);
  t.equal(anglesColorsMainCall.args[0], data);
  t.equal(anglesColorsMainCall.calledImmediatelyAfter(createCall), true);

  t.equal(mainDeps['./calculate-face-y-rim-y'].callCount, 1);
  const calculateFaceYRimYCall =
      mainDeps['./calculate-face-y-rim-y'].getCall(0);
  t.equal(calculateFaceYRimYCall.args.length, 1);
  t.equal(calculateFaceYRimYCall.args[0], data);
  t.equal(calculateFaceYRimYCall.calledImmediatelyAfter(anglesColorsMainCall),
      true);

  t.equal(mainDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp(`in case of scaleY 1 (no rim) does not create the rimDrawSequence,
does not change data by itself`, t => {
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['thickness', 20],
    ['scaleY', 1],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './create': sinon.stub().returns(data),
    './angles-colors/main': sinon.fake(),
    './calculate-face-y-rim-y': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/main', mainDeps);
  const retVal = main(argument);

  t.equal(retVal, data);

  t.equal(mainDeps['./create'].callCount, 1);
  const createCall = mainDeps['./create'].getCall(0);
  t.equal(createCall.args.length, 1);
  t.equal(createCall.args[0], argument);

  t.equal(mainDeps['./angles-colors/main'].callCount, 1);
  const anglesColorsMainCall = mainDeps['./angles-colors/main'].getCall(0);
  t.equal(anglesColorsMainCall.args.length, 1);
  t.equal(anglesColorsMainCall.args[0], data);
  t.equal(anglesColorsMainCall.calledImmediatelyAfter(createCall), true);

  t.equal(mainDeps['./calculate-face-y-rim-y'].callCount, 1);
  const calculateFaceYRimYCall =
      mainDeps['./calculate-face-y-rim-y'].getCall(0);
  t.equal(calculateFaceYRimYCall.args.length, 1);
  t.equal(calculateFaceYRimYCall.args[0], data);
  t.equal(calculateFaceYRimYCall.calledImmediatelyAfter(anglesColorsMainCall),
      true);

  t.equal(mainDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp(`in case of scaleY 1 and thickness 0 (no rim) does not create
the rimDrawSequence, does not change data by itself`, t => {
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['thickness', 0],
    ['scaleY', 1],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './create': sinon.stub().returns(data),
    './angles-colors/main': sinon.fake(),
    './calculate-face-y-rim-y': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
  };
  const main = proxyquire('pie/prepare-data/main', mainDeps);
  const retVal = main(argument);

  t.equal(retVal, data);

  t.equal(mainDeps['./create'].callCount, 1);
  const createCall = mainDeps['./create'].getCall(0);
  t.equal(createCall.args.length, 1);
  t.equal(createCall.args[0], argument);

  t.equal(mainDeps['./angles-colors/main'].callCount, 1);
  const anglesColorsMainCall = mainDeps['./angles-colors/main'].getCall(0);
  t.equal(anglesColorsMainCall.args.length, 1);
  t.equal(anglesColorsMainCall.args[0], data);
  t.equal(anglesColorsMainCall.calledImmediatelyAfter(createCall), true);

  t.equal(mainDeps['./calculate-face-y-rim-y'].callCount, 1);
  const calculateFaceYRimYCall =
      mainDeps['./calculate-face-y-rim-y'].getCall(0);
  t.equal(calculateFaceYRimYCall.args.length, 1);
  t.equal(calculateFaceYRimYCall.args[0], data);
  t.equal(calculateFaceYRimYCall.calledImmediatelyAfter(anglesColorsMainCall),
      true);

  t.equal(mainDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});
