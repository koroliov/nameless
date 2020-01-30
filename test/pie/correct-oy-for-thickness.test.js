'use strict';

const tp = require('tape');
const correctOyForThickness = require('pie/correct-oy-for-thickness');

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/F/neg', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), -10 + (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/F/0', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 0 + (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/F/pos', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 10 + (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/T/neg', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), -10 - (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/T/0', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 0 - (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/F/T/pos', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 10 - (20 * Math.sqrt(1 - 0.5 * 0.5) / 2) / 0.5);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/F/neg', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/F/0', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/F/pos', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/T/neg', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), -10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/T/0', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) F/T/T/pos', t => {
  const argument = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 0.5);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/F/neg', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), -10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/F/0', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/F/pos', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', false],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/T/neg', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), -10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/T/0', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/F/T/pos', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', true],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 20);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/F/neg', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), -10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/F/0', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/F/pos', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', false],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), false);
  t.equal(argument.get('oy'), 10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/T/neg', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', -10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), -10);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/T/0', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', 0],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 0);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, oy (neg/0/pos) T/T/T/pos', t => {
  const argument = new Map([
    ['scaleY', 1],
    ['thickness', 0],
    ['isRimDown', true],
    ['oy', 10],
  ]);
  const originalSize = argument.size;
  correctOyForThickness(argument);
  t.deepEqual(argument.size, originalSize);
  t.equal(argument.get('scaleY'), 1);
  t.equal(argument.get('thickness'), 0);
  t.equal(argument.get('isRimDown'), true);
  t.equal(argument.get('oy'), 10);
  t.end();
});
