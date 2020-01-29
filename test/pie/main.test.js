'use strict';

const tp = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();

tp('in case of a validation error it calls only console.error', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const validateArgsRetVal = 'error msg';
  const pieDeps = {
    './validate-args': sinon.stub().returns(validateArgsRetVal),
    './fill-optional-args': sinon.fake(),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  t.deepEqual(pieDeps['./validate-args'].getCall(0).args,
      [argument, mockCntxConstructor]);
  t.equal(pieDeps['./fill-optional-args'].callCount, 0);
  t.equal(pieDeps['./apply-context-state-changes'].callCount, 0);
  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);
  t.equal(pieDeps['./fill-face'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);
  t.equal(mockCntx.save.callCount, 0);
  t.equal(mockCntx.restore.callCount, 0);
  t.equal(mockConsoleError.callCount, 1);
  t.deepEqual(mockConsoleError.getCall(0).args, [validateArgsRetVal]);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/F/F/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 1);
  const createRimDrawSeqCall = pieDeps['./create-rim-draw-sequence'].getCall(0);
  t.deepEqual(createRimDrawSeqCall.args, [{
    normalizedAngles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);
  t.equal(strokeFaceCall.calledAfter(fillRimCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 1);
  const strokeRimCall = pieDeps['./stroke-rim'].getCall(0);
  t.deepEqual(strokeRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(strokeRimCall.calledAfter(fillFaceCall), true);
  t.equal(strokeRimCall.calledAfter(fillRimCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(strokeRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/F/F/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 1);
  const createRimDrawSeqCall = pieDeps['./create-rim-draw-sequence'].getCall(0);
  t.deepEqual(createRimDrawSeqCall.args, [{
    normalizedAngles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(fillRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/F/T/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/F/T/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/T/F/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/T/F/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/T/T/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/F/T/T/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/F/F/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: [0, '#f91919', Math.PI],
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: [0],
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);
  t.equal(strokeFaceCall.calledAfter(fillRimCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 1);
  const strokeRimCall = pieDeps['./stroke-rim'].getCall(0);
  t.deepEqual(strokeRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: [0, '#f91919', Math.PI],
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(strokeRimCall.calledAfter(fillFaceCall), true);
  t.equal(strokeRimCall.calledAfter(fillRimCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(strokeRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/F/F/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: [0, '#f91919', Math.PI],
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(fillRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/F/T/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: [0],
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/F/T/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/T/F/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: [0],
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/T/F/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/T/T/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);
  t.equal(pieDeps['./fill-rim'].callCount, 0);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: [0],
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, F/T/T/T/T', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', false],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [100]],
    ['colors', ['#f91919']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 0],
    ['strokeWidth', 0],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 1],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main': sinon.fake(),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.fake(),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 1);
  const validateArgsCall = pieDeps['./validate-args'].getCall(0);
  t.deepEqual(validateArgsCall.args, [argument, mockCntxConstructor]);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);
  t.equal(fillOptionalArgsCall.calledAfter(validateArgsCall), true);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);

  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 0);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: [0],
    colors: ['#f91919'],
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 0);

  t.equal(pieDeps['./fill-rim'].callCount, 0);
  t.equal(pieDeps['./stroke-face'].callCount, 0);
  t.equal(pieDeps['./stroke-rim'].callCount, 0);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(fillFaceCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/F/F/F', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map([
    ['skipValidation', true],
  ]);
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 0);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 1);
  const createRimDrawSeqCall = pieDeps['./create-rim-draw-sequence'].getCall(0);
  t.deepEqual(createRimDrawSeqCall.args, [{
    normalizedAngles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);
  t.equal(strokeFaceCall.calledAfter(fillRimCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 1);
  const strokeRimCall = pieDeps['./stroke-rim'].getCall(0);
  t.deepEqual(strokeRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(strokeRimCall.calledAfter(fillFaceCall), true);
  t.equal(strokeRimCall.calledAfter(fillRimCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(strokeRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

tp('skipValidat is not present', t => {
  const mockCntx = {
    save: sinon.fake(),
    restore: sinon.fake(),
  }
  const argument = new Map();
  const fillOptionalArgsRetVal = new Map([
    ['percents', [20, 30, 50]],
    ['colors', ['#f91919', '#fff918', '#2c45eb']],
    ['ox', 400],
    ['oy', 300],
    ['radius', 100],
    ['thickness', 40],
    ['strokeWidth', 0.5],
    ['strokeColor', '#000000'],
    ['cntx', mockCntx],
    ['scaleY', 0.5],
    ['rotationAngle', 1],
    ['startAngle', 1],
    ['counterClockwise', false],
    ['isRimDown', true],
    ['skipValidation', false],
  ]);
  const prepAnglesColorsRetVal = {
    colors: ['col 1', 'col 2', 'col 3'],
    angles: [0, 1, 3, 0],
  };
  const createRimDrawSeqRetVal = [0, 'col 1', 0];
  const pieDeps = {
    './validate-args': sinon.stub().returns(''),
    './fill-optional-args': sinon.stub().returns(fillOptionalArgsRetVal),
    './apply-context-state-changes': sinon.fake(),
    './prepare-angles-n-colors/main':
        sinon.stub().returns(prepAnglesColorsRetVal),
    './fill-face': sinon.fake(),
    './stroke-face': sinon.fake(),
    './create-rim-draw-sequence': sinon.stub().returns(createRimDrawSeqRetVal),
    './fill-rim': sinon.fake(),
    './stroke-rim': sinon.fake(),
  };
  const pie = proxyquire('pie/main', pieDeps);
  const mockConsoleError = sinon.fake();
  const mockCntxConstructor = Symbol('mock cntx constructor');
  pie(mockConsoleError, mockCntxConstructor, argument);

  t.equal(pieDeps['./validate-args'].callCount, 0);

  t.equal(pieDeps['./fill-optional-args'].callCount, 1);
  const fillOptionalArgsCall = pieDeps['./fill-optional-args'].getCall(0);
  t.deepEqual(fillOptionalArgsCall.args, [argument]);

  t.equal(pieDeps['./apply-context-state-changes'].callCount, 1);
  const applyCntxStateChangesCall =
      pieDeps['./apply-context-state-changes'].getCall(0);
  t.deepEqual(applyCntxStateChangesCall.args, [{
    cntx: fillOptionalArgsRetVal.get('cntx'),
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    strokeColor: fillOptionalArgsRetVal.get('strokeColor'),
    strokeWidth: fillOptionalArgsRetVal.get('strokeWidth'),
    rotationAngle: fillOptionalArgsRetVal.get('rotationAngle'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
  }]);


  t.equal(pieDeps['./prepare-angles-n-colors/main'].callCount, 1);
  const prepAnglesColorsCall =
      pieDeps['./prepare-angles-n-colors/main'].getCall(0);
  t.deepEqual(prepAnglesColorsCall.args, [{
    percentsOriginal: fillOptionalArgsRetVal.get('percents'),
    colorsOriginal: fillOptionalArgsRetVal.get('colors'),
    startAngle: fillOptionalArgsRetVal.get('startAngle'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-face'].callCount, 1);
  const fillFaceCall = pieDeps['./fill-face'].getCall(0);
  t.deepEqual(fillFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
    angles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
  }]);
  t.equal(fillFaceCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./create-rim-draw-sequence'].callCount, 1);
  const createRimDrawSeqCall = pieDeps['./create-rim-draw-sequence'].getCall(0);
  t.deepEqual(createRimDrawSeqCall.args, [{
    normalizedAngles: prepAnglesColorsRetVal.angles,
    colors: prepAnglesColorsRetVal.colors,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);

  t.equal(pieDeps['./fill-rim'].callCount, 1);
  const fillRimCall = pieDeps['./fill-rim'].getCall(0);
  t.deepEqual(fillRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(fillRimCall.calledAfter(applyCntxStateChangesCall), true);

  t.equal(pieDeps['./stroke-face'].callCount, 1);
  const strokeFaceCall = pieDeps['./stroke-face'].getCall(0);
  t.deepEqual(strokeFaceCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
    angles: prepAnglesColorsRetVal.angles,
    counterClockwise: fillOptionalArgsRetVal.get('counterClockwise'),
  }]);
  t.equal(strokeFaceCall.calledAfter(fillFaceCall), true);
  t.equal(strokeFaceCall.calledAfter(fillRimCall), true);

  t.equal(pieDeps['./stroke-rim'].callCount, 1);
  const strokeRimCall = pieDeps['./stroke-rim'].getCall(0);
  t.deepEqual(strokeRimCall.args, [{
    ox: fillOptionalArgsRetVal.get('ox'),
    oy: fillOptionalArgsRetVal.get('oy'),
    radius: fillOptionalArgsRetVal.get('radius'),
    rimDrawSequence: createRimDrawSeqRetVal,
    isRimDown: fillOptionalArgsRetVal.get('isRimDown'),
    scaleY: fillOptionalArgsRetVal.get('scaleY'),
    rimThickness: fillOptionalArgsRetVal.get('thickness'),
    cntx: fillOptionalArgsRetVal.get('cntx'),
  }]);
  t.equal(strokeRimCall.calledAfter(fillFaceCall), true);
  t.equal(strokeRimCall.calledAfter(fillRimCall), true);

  t.equal(mockCntx.save.callCount, 1);
  const mockCntxSaveCall = mockCntx.save.getCall(0);
  t.equal(mockCntxSaveCall.calledBefore(applyCntxStateChangesCall),
      true);

  t.equal(mockCntx.restore.callCount, 1);
  const mockCntxRestoreCall = mockCntx.restore.getCall(0);
  t.equal(mockCntxRestoreCall.calledAfter(strokeFaceCall), true);
  t.equal(mockCntxRestoreCall.calledAfter(strokeRimCall), true);

  t.equal(mockConsoleError.callCount, 0);
  t.end();
});

//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/F/F/T SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/F/T/F SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/F/T/T SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/T/F/F SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/T/F/T SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/T/T/F SKIPPED
//skipValidat, oneSlice, thickn0, scaleY1, strokeW0, T/F/T/T/T SKIPPED
