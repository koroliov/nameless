'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

tp(`fills the face and rim, does not change the data by itself`, t => {
  const data = new Map([
    ['rimDrawSequence', Symbol('actual value does not matter in this test')],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './face': sinon.fake(),
    './rim': sinon.fake(),
  };
  const main = proxyquire('pie/fill/main', mainDeps);
  main(data);

  t.equal(mainDeps['./face'].callCount, 1);
  const faceCall = mainDeps['./face'].getCall(0);
  t.equal(faceCall.args.length, 1);
  t.equal(faceCall.args[0], data);

  t.equal(mainDeps['./rim'].callCount, 1);
  const rimCall = mainDeps['./rim'].getCall(0);
  t.equal(rimCall.args.length, 1);
  t.equal(rimCall.args[0], data);
  t.equal(rimCall.calledImmediatelyAfter(faceCall), true);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp(`does not fill the rim if no rimDrawSequence, does not change the data by
itself`, t => {
  const data = new Map();
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  const mainDeps = {
    './face': sinon.fake(),
    './rim': sinon.fake(),
  };
  const main = proxyquire('pie/fill/main', mainDeps);
  main(data);

  t.equal(mainDeps['./face'].callCount, 1);
  const faceCall = mainDeps['./face'].getCall(0);
  t.equal(faceCall.args.length, 1);
  t.equal(faceCall.args[0], data);

  t.equal(mainDeps['./rim'].callCount, 0);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});
