'use strict';

const tp = require('tape');
const create = require('pie/prepare-data/create');

tp('fills absent optional arguments, and nothing more', t => {
  const argument = new Map([
    ['some property', null],
    ['percents', []],
    ['colors', []],
  ]);
  const optionalProperties = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  const data = create(argument);
  t.equal(data.size, 5 + 3);
  t.equal(data.get('some property'), null);
  t.deepEqual(data.get('percents'), []);
  t.deepEqual(data.get('colors'), []);
  t.equal(data.get('scaleY'), optionalProperties.get('scaleY'));
  t.equal(data.get('rotationAngle'), optionalProperties.get('rotationAngle'));
  t.equal(data.get('startAngle'), optionalProperties.get('startAngle'));
  t.equal(data.get('counterClockwise'),
      optionalProperties.get('counterClockwise'));
  t.equal(data.get('isRimDown'), optionalProperties.get('isRimDown'));
  t.end();
});

tp('does not change provided optional arguments', t => {
  const argument = new Map([
    ['some property', null],
    ['percents', []],
    ['colors', []],
    ['scaleY', undefined],
    ['rotationAngle', undefined],
    ['startAngle', undefined],
    ['counterClockwise', undefined],
    ['isRimDown', undefined],
  ]);
  const data = create(argument);
  t.equal(data.size, 8);
  t.equal(data.get('some property'), null);
  t.deepEqual(data.get('percents'), []);
  t.deepEqual(data.get('colors'), []);
  t.equal(data.get('scaleY'), undefined);
  t.equal(data.get('rotationAngle'), undefined);
  t.equal(data.get('startAngle'), undefined);
  t.equal(data.get('counterClockwise'), undefined);
  t.equal(data.get('isRimDown'), undefined);
  t.end();
});

tp('referense values a cloned, not shared', t => {
  const argument = new Map([
    ['some property', null],
    ['percents', [100, 0]],
    ['colors', ['col 1', 'col 2']],
    ['scaleY', undefined],
    ['rotationAngle', undefined],
    ['startAngle', undefined],
    ['counterClockwise', undefined],
    ['isRimDown', undefined],
  ]);
  const data = create(argument);
  t.equal(data === argument, false);
  t.deepEqual(data.get('percents'), [100, 0]);
  t.equal(data.get('percents') === argument.get('percents'), false);
  t.deepEqual(data.get('colors'), ['col 1', 'col 2']);
  t.equal(data.get('colors') === argument.get('colors'), false);
  t.end();
});

tp('the argument is not changed in any way', t => {
  const percents = [100, 0];
  const colors = ['col 1', 'col 2'];
  const argument = new Map([
    ['some property', null],
    ['percents', percents],
    ['colors', colors],
    ['scaleY', 0.5],
  ]);
  create(argument);
  t.equal(argument.size, 4);
  t.deepEqual(argument.get('percents'), percents);
  t.deepEqual(argument.get('colors'), colors);
  t.equal(argument.get('some property'), null);
  t.equal(argument.get('scaleY'), 0.5);
  t.end();
});
