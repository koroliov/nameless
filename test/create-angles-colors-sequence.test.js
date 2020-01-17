'use strict';

const tp = require('tape');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const pi = Math.PI;

tp('it passes angles to normalize-angles, then to uses its return val', t => {
  t.plan(3);
  const normalizeAnglesStub = sinon.stub().returns([0, 1, 2, 0]);
  const createAnglesColorsSequence =
    proxyquire('create-angles-colors-sequence', {
      './normalize-angles': normalizeAnglesStub,
    });
  const argument = {
    angles: [],
    colors: ['color 1', 'color 2', 'color 3'],
    counterClockwise: false,
  };
  createAnglesColorsSequence(argument);
  t.equal(normalizeAnglesStub.callCount, 1);
  t.equal(normalizeAnglesStub.args[0].length, 1);
  t.equal(normalizeAnglesStub.args[0][0], argument.angles);
});

test3Angles();
test2Angles();

function test3Angles() {
  tp('clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 2, 3, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [3, 'color 3', 1, 'color 1', 2, 'color 2', 3];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 2, 0, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 1, 'color 1', 2, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 2, pi, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 3', 1, 'color 1', 2, 'color 2', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 2, 4, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 3', 1, 'color 1', 2, 'color 2', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 0, 1, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 1, 'color 3', 2, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ bot, 0, pi IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ bot, 0, top IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, pi, 1, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 2', 1, 'color 3', 2, 'color 1', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, pi, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, pi, 0, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 2, 'color 1', pi, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ bot, pi, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, pi, 4, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 3', 2, 'color 1', pi, 'color 2', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 4, 1, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 2', 1, 'color 3', 2, 'color 1', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ bot, top, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ bot, top, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 4, 5, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 3', 2, 'color 1', 4, 'color 2', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 1, 2, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 1, 'color 2', 2, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ 0, bot, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 1, pi, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 1, 'color 2', pi, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ 0, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 1, 4, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 1, 'color 2', 4, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, pi, bot IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ 0, pi, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, pi, 4, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', pi, 'color 2', 4, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ 0, top, bot IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ 0, top, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 4, 5, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 4, 'color 2', 5, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 1, 2, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 1', 1, 'color 2', 2, 'color 3', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ pi, bot, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ pi, bot, top IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ pi, 0, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 0, 2, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 2, 'color 3', pi, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ pi, 0, top IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ pi, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 4, 2, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 2', 2, 'color 3', pi, 'color 1', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ pi, top, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 4, 0, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', pi, 'color 1', 4, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 4, 5, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 3', pi, 'color 1', 4, 'color 2', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 1, 2, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 1', 1, 'color 2', 2, 'color 3', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ top, bot, 0 IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ top, bot, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 1, pi, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 1', 1, 'color 2', pi, 'color 3', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 1, 4, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 1', 1, 'color 2', 4, 'color 3', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, 0, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 0, 1, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 1, 'color 3', 5, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ top, 0, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 0, pi, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', pi, 'color 3', 5, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 0, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 5, 'color 3', 4, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  clockwise, angles /bot/0/pi/top/ top, pi, bot IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ top, pi, 0 IMPOSSIBLE
  //  clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, pi, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 3', 4, 'color 1', pi, 'color 2', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 5, 1, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 2', 1, 'color 3', 4, 'color 1', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 5, 0, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 4, 'color 1', 5, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 5, pi, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 2', pi, 'color 3', 4, 'color 1', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 4.5, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [5, 'color 3', 4, 'color 1', 4.5, 'color 2', 5];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([3, 2, 1, 3]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [1, 'color 3', 3, 'color 1', 2, 'color 2', 1];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([3, 2, 0, 3]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 3, 'color 1', 2, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([3, 2, pi, 3]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 2', pi, 'color 3', 3, 'color 1', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([3, 2, 4, 3]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 2', 4, 'color 3', 3, 'color 1', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 0, 3, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 3, 'color 3', 2, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, 0, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 0, pi, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', pi, 'color 3', 2, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, 0, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([2, 0, 4, 2]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 4, 'color 3', 2, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, pi, 3, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [1, 'color 1', pi, 'color 2', 3, 'color 3', 1];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ bot, pi, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ bot, pi, top IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 4, 3, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [1, 'color 1', 4, 'color 2', 3, 'color 3', 1];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ bot, top, 0 IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, top, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 4, pi, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [1, 'color 1', 4, 'color 2', pi, 'color 3', 1];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 5, 4, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [1, 'color 1', 5, 'color 2', 4, 'color 3', 1];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 3, 2, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 3, 'color 2', 2, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, bot, pi IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, bot, top IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ 0, pi, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, pi, 2, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', pi, 'color 2', 2, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ 0, pi, top IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ 0, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 4, 2, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 4, 'color 2', 2, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ 0, top, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 4, pi, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 4, 'color 2', pi, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([0, 5, 4, 0]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 1', 5, 'color 2', 4, 'color 3', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 3, 2, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 3', pi, 'color 1', 3, 'color 2', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ pi, bot, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 3, 0, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', pi, 'color 1', 3, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ pi, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 3, 5, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [3, 'color 2', 5, 'color 3', pi, 'color 1', 3];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ pi, 0, bot IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ pi, 0, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 0, 5, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 5, 'color 3', pi, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ pi, pi, bot IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, pi, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, pi, pi IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, pi, top IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, top, bot IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, top, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([pi, 5, 4, pi]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 1', 5, 'color 2', 4, 'color 3', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 3, 2, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 3', 4, 'color 1', 3, 'color 2', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, bot, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 3, 0, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 4, 'color 1', 3, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ top, bot, pi IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 3, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [3, 'color 2', 5, 'color 3', 4, 'color 1', 3];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ top, 0, bot IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE
  //  counter-clockwise, angles /bot/0/pi/top/ top, 0, pi IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, 0, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 2', 5, 'color 3', 4, 'color 1', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, pi, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, pi, 3, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [3, 'color 3', 4, 'color 1', pi, 'color 2', 3];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, pi, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, pi, 0, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 4, 'color 1', pi, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  //  counter-clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('counter-clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([4, pi, 5, 4]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 2', 5, 'color 3', 4, 'color 1', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 4, 2, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 3', 5, 'color 1', 4, 'color 2', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 4, 0, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [0, 'color 3', 5, 'color 1', 4, 'color 2', 0];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 4, pi, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [pi, 'color 3', 5, 'color 1', 4, 'color 2', pi];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 4.5, 4, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2', 'color 3'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [4, 'color 3', 5, 'color 1', 4.5, 'color 2', 4];
    t.deepEqual(actualSequence, expectedSequence);
  });
}

function test2Angles() {
  tp('clockwise', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([1, 2, 1]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2'],
      counterClockwise: false,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 2', 1, 'color 1', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

  tp('counter-clockwise', t => {
    t.plan(1);
    const createAnglesColorsSequence =
      proxyquire('create-angles-colors-sequence', {
        './normalize-angles': sinon.stub().returns([5, 2, 5]),
      });
    const argument = {
      angles: [],
      colors: ['color 1', 'color 2'],
      counterClockwise: true,
    };
    const actualSequence = createAnglesColorsSequence(argument);
    const expectedSequence = [2, 'color 2', 5, 'color 1', 2];
    t.deepEqual(actualSequence, expectedSequence);
  });

}
