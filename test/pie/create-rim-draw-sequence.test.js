'use strict';

const tp = require('tape');
const createRimDrawSequence = require('pie/create-rim-draw-sequence');
const pi = Math.PI;


angles3RimDownClockwise: {

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 3, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 1', 2, 'col 2', 3, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 0, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 1', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 1', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 1', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 0, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ bot, 0, pi IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ bot, 0, top IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, pi, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 5, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ bot, top, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 5, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 3, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, 2, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', 2, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ 0, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, pi, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ 0, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, pi, bot IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ 0, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, pi, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ 0, top, bot IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ 0, top, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, 5, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 1, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', 2, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ pi, bot, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, bot, top IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ pi, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 0, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, 0, pi IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, 0, top IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, pi, bot IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, pi, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, pi, pi IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ pi, pi, top IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ pi, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ pi, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 0, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 5, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 2, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', 2, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ top, bot, 0 IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, pi, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 1, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, 0, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, pi, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, clockwise, angles /bot/0/pi/top/ top, pi, bot IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ top, pi, 0 IMPOSSIBLE
  //rim down, clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, pi, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 1, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 0, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, pi, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 6, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

}

angles3RimDownCounterClockwise: {

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', 2, 'col 1', 3, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', 3, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, pi, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', 3, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 4, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', 3, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, 0, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, pi, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ bot, pi, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ bot, pi, top IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, pi, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ bot, top, 0 IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 5, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 2, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, bot, pi IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, bot, top IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ 0, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, pi, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, pi, top IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ 0, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ 0, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, pi, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 5, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 1, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ pi, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 0, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ pi, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, 0, bot IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, 0, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ pi, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 0, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, pi, bot IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, pi, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, pi, pi IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, pi, top IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, top, bot IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, top, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 5, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 2, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 2, 0, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ top, bot, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 2, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 2, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ top, 0, bot IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE
  //rim down, c-clockwise, angles /bot/0/pi/top/ top, 0, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 0, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 1, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, pi, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 0, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim down, c-clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 0, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, pi, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [6, 5, 4, 6],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

}

angles3RimUpClockwise: {

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 3, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 0, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 0, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ bot, 0, pi IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ bot, 0, top IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, pi, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, pi, 5, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ bot, top, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 4, 5, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, 2, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ 0, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, pi, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ 0, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 1, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, pi, bot IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ 0, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, pi, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ 0, top, bot IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ 0, top, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, 5, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 1, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ pi, bot, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, bot, top IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ pi, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 0, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, 0, pi IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, 0, top IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, pi, bot IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, pi, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, pi, pi IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ pi, pi, top IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ pi, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 2, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ pi, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 0, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 4, 5, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 2, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ top, bot, 0 IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, pi, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 1, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, 0, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, pi, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 0, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, clockwise, angles /bot/0/pi/top/ top, pi, bot IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ top, pi, 0 IMPOSSIBLE
  //rim up, clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, pi, 4, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 3', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 1, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 1' , 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 0, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 1', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, pi, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 1', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 5, 6, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 6, 'col 2', 5, 'col 1', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

}

angles3RimUpCounterClockwise: {

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 1, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 0, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, bot, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, pi, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [3, 2, 4, 3],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, 0, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ bot, 0, 0 IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, 0, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 0, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, pi, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ bot, pi, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ bot, pi, pi IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ bot, pi, top IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, pi, 2, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ bot, top, 0 IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, pi, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ bot, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 5, 4, 1],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ 0, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 2, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, bot, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, bot, pi IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, bot, top IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, 0, bot IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, 0, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, 0, pi IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, 0, top IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ 0, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, pi, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, pi, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, pi, pi IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, pi, top IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ 0, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, 1, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ 0, top, 0 IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ 0, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 4, pi, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ 0, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [0, 5, 4, 0],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ pi, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 1, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ pi, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 0, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, bot, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ pi, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 2, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, 0, bot IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, 0, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, 0, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ pi, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 0, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, pi, bot IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, pi, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, pi, pi IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, pi, top IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, top, bot IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, top, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ pi, top, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ pi, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [pi, 5, 4, pi],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 2, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, bot, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 2, 0, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ top, bot, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 2, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 3', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ top, 0, bot IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ top, 0, 0 IMPOSSIBLE
  //rim up, c-clockwise, angles /bot/0/pi/top/ top, 0, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, 0, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 0, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 3', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, pi, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 1, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, pi, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 0, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  //rim up, c-clockwise, angles /bot/0/pi/top/ top, pi, pi IMPOSSIBLE

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, pi, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, pi, 5, 4],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 3', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 1, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, top, 0', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 0, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, top, pi', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, pi, 5],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 5, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/0/pi/top/ top, top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [6, 5, 4, 6],
      colors: ['col 1', 'col 2', 'col 3'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 3', 6, 'col 1', 5, 'col 2', 4, 'col 3', pi];
    t.deepEqual(actual, expected);
  });

}

angles2RimDown: {

  tp('rim down, clockwise, angles /bot/top/ bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 1', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/top/ bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/top/ top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 4],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, clockwise, angles /bot/top/ top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 5],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/top/ bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [2, 1, 2],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 1', 2, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/top/ bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 1, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/top/ top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 4],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 1, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim down, c-clockwise, angles /bot/top/ top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 5],
      colors: ['col 1', 'col 2'],
      isRimDown: true,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

}

angles2RimUp: {

  tp('rim up, clockwise, angles /bot/top/ bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 2, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/top/ bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/top/ top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 4],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, clockwise, angles /bot/top/ top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 5],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: false,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 5, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/top/ bot, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [2, 1, 2],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/top/ bot, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [1, 4, 1],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/top/ top, bot', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [4, 1, 4],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 4, 'col 1', pi];
    t.deepEqual(actual, expected);
  });

  tp('rim up, c-clockwise, angles /bot/top/ top, top', t => {
    t.plan(1);
    const argument = {
      normalizedAngles: [5, 4, 5],
      colors: ['col 1', 'col 2'],
      isRimDown: false,
      counterClockwise: true,
    };
    const actual = createRimDrawSequence(argument);
    const expected = [0, 'col 2', 5, 'col 1', 4, 'col 2', pi];
    t.deepEqual(actual, expected);
  });

}
