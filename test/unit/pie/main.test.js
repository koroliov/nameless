'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

tp('general happy pass', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['strokeWidth', 1],
    ['cntx', mockCntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');

  const mainDeps = {
    './validate-argument': sinon.stub().returns(''),
    './prepare-data/main': sinon.stub().returns(data),
    './apply-context-state-changes': sinon.fake(),
    './fill/main': sinon.fake(),
    './stroke/main': sinon.fake(),
  };
  const main = proxyquire('pie/main', mainDeps);
  main(mockConsoleError, mockCntxConstructor, argument);

  t.equal(mainDeps['./validate-argument'].callCount, 1);
  const validateArgCall = mainDeps['./validate-argument'].getCall(0);
  t.equal(validateArgCall.args.length, 2);
  t.equal(validateArgCall.args[0], argument);
  t.equal(validateArgCall.args[1], mockCntxConstructor);

  t.equal(mockConsoleError.callCount, 0);

  t.equal(mainDeps['./prepare-data/main'].callCount, 1);
  const prepareDataCall = mainDeps['./prepare-data/main'].getCall(0);
  t.equal(prepareDataCall.args.length, 1);
  t.equal(prepareDataCall.args[0], argument);
  t.equal(prepareDataCall.calledImmediatelyAfter(validateArgCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const saveCall = mockCntx.save.getCall(0);
  t.equal(saveCall.args.length, 0);
  t.equal(saveCall.calledImmediatelyAfter(prepareDataCall), true);

  t.equal(mainDeps['./apply-context-state-changes'].callCount, 1);
  const applyContextStateChangesCall =
      mainDeps['./apply-context-state-changes'].getCall(0);
  t.equal(applyContextStateChangesCall.args.length, 1);
  t.equal(applyContextStateChangesCall.args[0], data);
  t.equal(applyContextStateChangesCall.calledImmediatelyAfter(saveCall), true);

  t.equal(mainDeps['./fill/main'].callCount, 1);
  const fillCall = mainDeps['./fill/main'].getCall(0);
  t.equal(fillCall.args.length, 1);
  t.equal(fillCall.args[0], data);
  t.equal(fillCall.calledImmediatelyAfter(applyContextStateChangesCall), true);

  t.equal(mainDeps['./stroke/main'].callCount, 1);
  const strokeCall = mainDeps['./stroke/main'].getCall(0);
  t.equal(strokeCall.args.length, 1);
  t.equal(strokeCall.args[0], data);
  t.equal(strokeCall.calledImmediatelyAfter(fillCall), true);

  t.equal(mockCntx.restore.callCount, 1);
  const restoreCall = mockCntx.restore.getCall(0);
  t.equal(restoreCall.args.length, 0);
  t.equal(restoreCall.calledImmediatelyAfter(strokeCall), true);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp('no stroke, if strokeWidth is 0', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['strokeWidth', 0],
    ['cntx', mockCntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');

  const mainDeps = {
    './validate-argument': sinon.stub().returns(''),
    './prepare-data/main': sinon.stub().returns(data),
    './apply-context-state-changes': sinon.fake(),
    './fill/main': sinon.fake(),
    './stroke/main': sinon.fake(),
  };
  const main = proxyquire('pie/main', mainDeps);
  main(mockConsoleError, mockCntxConstructor, argument);

  t.equal(mainDeps['./validate-argument'].callCount, 1);
  const validateArgCall = mainDeps['./validate-argument'].getCall(0);
  t.equal(validateArgCall.args.length, 2);
  t.equal(validateArgCall.args[0], argument);
  t.equal(validateArgCall.args[1], mockCntxConstructor);

  t.equal(mockConsoleError.callCount, 0);

  t.equal(mainDeps['./prepare-data/main'].callCount, 1);
  const prepareDataCall = mainDeps['./prepare-data/main'].getCall(0);
  t.equal(prepareDataCall.args.length, 1);
  t.equal(prepareDataCall.args[0], argument);
  t.equal(prepareDataCall.calledImmediatelyAfter(validateArgCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const saveCall = mockCntx.save.getCall(0);
  t.equal(saveCall.args.length, 0);
  t.equal(saveCall.calledImmediatelyAfter(prepareDataCall), true);

  t.equal(mainDeps['./apply-context-state-changes'].callCount, 1);
  const applyContextStateChangesCall =
      mainDeps['./apply-context-state-changes'].getCall(0);
  t.equal(applyContextStateChangesCall.args.length, 1);
  t.equal(applyContextStateChangesCall.args[0], data);
  t.equal(applyContextStateChangesCall.calledImmediatelyAfter(saveCall), true);

  t.equal(mainDeps['./fill/main'].callCount, 1);
  const fillCall = mainDeps['./fill/main'].getCall(0);
  t.equal(fillCall.args.length, 1);
  t.equal(fillCall.args[0], data);
  t.equal(fillCall.calledImmediatelyAfter(applyContextStateChangesCall), true);

  t.equal(mainDeps['./stroke/main'].callCount, 0);

  t.equal(mockCntx.restore.callCount, 1);
  const restoreCall = mockCntx.restore.getCall(0);
  t.equal(restoreCall.args.length, 0);
  t.equal(restoreCall.calledImmediatelyAfter(fillCall), true);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});

tp('if validation returns an error, calls console.error and stops', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  const argument = Symbol('value does not matter in this test');
  const data = new Map([
    ['strokeWidth', 1],
    ['cntx', mockCntx],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');

  const mainDeps = {
    './validate-argument': sinon.stub().returns('error msg'),
    './prepare-data/main': sinon.stub().returns(data),
    './apply-context-state-changes': sinon.fake(),
    './fill/main': sinon.fake(),
    './stroke/main': sinon.fake(),
  };
  const main = proxyquire('pie/main', mainDeps);
  main(mockConsoleError, mockCntxConstructor, argument);

  t.equal(mainDeps['./validate-argument'].callCount, 1);
  const validateArgCall = mainDeps['./validate-argument'].getCall(0);
  t.equal(validateArgCall.args.length, 2);
  t.equal(validateArgCall.args[0], argument);
  t.equal(validateArgCall.args[1], mockCntxConstructor);

  t.equal(mockConsoleError.callCount, 1);
  const mockConsoleErrorCall = mockConsoleError.getCall(0);
  t.equal(mockConsoleErrorCall.args.length, 1);
  t.equal(mockConsoleErrorCall.args[0], 'error msg');
  t.equal(mockConsoleErrorCall.calledImmediatelyAfter(validateArgCall), true);

  t.equal(mainDeps['./prepare-data/main'].callCount, 0);
  t.equal(mockCntx.save.callCount, 0);
  t.equal(mainDeps['./apply-context-state-changes'].callCount, 0);
  t.equal(mainDeps['./fill/main'].callCount, 0);
  t.equal(mainDeps['./stroke/main'].callCount, 0);
  t.equal(mockCntx.restore.callCount, 0);

  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);

  t.end();
});
