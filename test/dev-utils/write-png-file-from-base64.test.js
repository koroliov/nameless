'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

let writePngFileFromBase64;
let writeFileSyncFake;
let bufferRetVal = Symbol('bufferRetVal');
let bufferMock;
let fileName;
const base64NoPrefix = 'fOo==';
const base64Full = 'data:image/png;base64,' + base64NoPrefix;

tp('should work with basenames', t => {
  t.plan(8);
  setUp('foo.png');
  writePngFileFromBase64(bufferMock, fileName, base64Full);
  check(t, fileName);
});

tp('should work with full path names', t => {
  t.plan(8);
  setUp('.././../foo.png');
  writePngFileFromBase64(bufferMock, fileName, base64Full);
  check(t, fileName);
});

function setUp(fileName) {
  writeFileSyncFake = sinon.fake();
  writePngFileFromBase64 = proxyquire('dev-utils/write-png-file-from-base-64', {
    'fs': {
      writeFileSync: writeFileSyncFake,
      '@noCallThrough': true,
    },
  });
  bufferMock = {
    from: sinon.stub().returns(bufferRetVal),
  };
}

function check(t, fileName) {
  t.equal(bufferMock.from.callCount, 1);
  const bufferFromCall = bufferMock.from.getCall(0);
  const bufferFromCallArgs = bufferFromCall.args;
  t.equal(bufferFromCallArgs.length, 2);
  t.equal(bufferFromCallArgs[0], base64NoPrefix);
  t.equal(bufferFromCall.thisValue, bufferMock,
    'buffer should not be called with new');

  t.equal(writeFileSyncFake.callCount, 1);
  const wfsArgs = writeFileSyncFake.getCall(0).args;
  t.equal(wfsArgs.length, 2);
  t.equal(wfsArgs[0], fileName);
  t.equal(wfsArgs[1], bufferRetVal);
}
