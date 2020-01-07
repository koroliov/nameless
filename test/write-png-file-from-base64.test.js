'use strict';

const tp = require('tape');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

tp('should work with basenames', t => {
  const wfsFake = sinon.fake();
  const {writePngFileFromBase64} = proxyquire('./utils.js', {
    'fs': {
      writeFileSync: wfsFake,
      '@noCallThrough': true,
    },
  });
  const bufferRetVal = Symbol('bufferRetVal');
  const bufferMock = {
    from: sinon.stub().returns(bufferRetVal),
  };
  const fileName = 'foo.png';
  const base64NoPrefix = 'fOo==';
  const base64Full = 'data:image/png;base64,' + base64NoPrefix;

  writePngFileFromBase64(bufferMock, fileName, base64Full);

  t.equal(bufferMock.from.callCount, 1);
  const bufferFromCall = bufferMock.from.getCall(0);
  const bufferFromCallArgs = bufferFromCall.args;
  t.equal(bufferFromCallArgs.length, 2);
  t.equal(bufferFromCallArgs[0], base64NoPrefix);
  t.equal(bufferFromCall.thisValue, bufferMock,
    'buffer should not be called with new');

  t.equal(wfsFake.callCount, 1);
  const wfsArgs = wfsFake.getCall(0).args;
  t.equal(wfsArgs.length, 2);
  t.equal(wfsArgs[0], fileName);
  t.equal(wfsArgs[1], bufferRetVal);
  t.end();
});

tp('should work with full path names', t => {
  const wfsFake = sinon.fake();
  const {writePngFileFromBase64} = proxyquire('./utils.js', {
    'fs': {
      writeFileSync: wfsFake,
      '@noCallThrough': true,
    },
  });
  const bufferRetVal = Symbol('bufferRetVal');
  const bufferMock = {
    from: sinon.stub().returns(bufferRetVal),
  };
  const fileName = '.././../foo.png';
  const base64NoPrefix = 'fOo==';
  const base64Full = 'data:image/png;base64,' + base64NoPrefix;

  writePngFileFromBase64(bufferMock, fileName, base64Full);

  t.equal(bufferMock.from.callCount, 1);
  const bufferFromCall = bufferMock.from.getCall(0);
  const bufferFromCallArgs = bufferFromCall.args;
  t.equal(bufferFromCallArgs.length, 2);
  t.equal(bufferFromCallArgs[0], base64NoPrefix);
  t.equal(bufferFromCall.thisValue, bufferMock,
    'buffer should not be called with new');

  t.equal(wfsFake.callCount, 1);
  const wfsArgs = wfsFake.getCall(0).args;
  t.equal(wfsArgs.length, 2);
  t.equal(wfsArgs[0], fileName);
  t.equal(wfsArgs[1], bufferRetVal);
  t.end();
});
