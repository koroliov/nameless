'use strict';

const tp = require('tape');
const sinon = require('sinon');
const validateArgument = require('pie/validate-argument');

tp('returns an error if the argument is not a map', t => {
  let result = validateArgument(undefined, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: argument must be instance of Map');

  result = validateArgument({}, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: argument must be instance of Map');

  result = validateArgument(null, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: argument must be instance of Map');

  t.end();
});

tp('does not report an error if the validateOptions flag set to false', t => {
  const argument = new Map();
  argument.set('validateOptions', false);
  const result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validateOptions is optional, default is false', t => {
  const argument = new Map();
  const result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('it does not change the provided map in any way', t => {
  const argument = getValidatableValidMandatoryArgumentsMap();
  const originalColors = Array.from(argument.get('colors'));
  const originalPercents = Array.from(argument.get('percents'));
  const spySet = sinon.spy(argument, 'set');
  const spyDelete = sinon.spy(argument, 'delete');
  const spyClear = sinon.spy(argument, 'clear');
  validateArgument(argument, MockGlobalCanvasContext2d);
  t.deepEqual(argument.get('colors'), originalColors);
  t.deepEqual(argument.get('percents'), originalPercents);
  t.equal(spySet.callCount, 0);
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.end();
});

tp('check for unknown keys', t => {
  const argument = getValidatableValidMandatoryArgumentsMap();
  argument.set('foo', 1);
  const result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: argument map contains unknown key');
  t.end();
});

validatePercentsAndColors: {
  tp('no percents', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();
    argument.delete('percents');
    const result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');
    t.end();
  });

  tp('percents are not an array', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();

    argument.set('percents', new Map());
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', 'abc');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', null);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');
    t.end();
  });

  tp('no colors', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();
    argument.delete('colors');
    const result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');
    t.end();
  });

  tp('colors are not an array', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();

    argument.set('colors', new Map());
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', 'abc');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', null);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');
    t.end();
  });

  tp('more percents, than colors', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff']);
    argument.set('percents', [50, 50]);
    const result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: different ammount of colors/percents');
    t.end();
  });

  tp('more colors, than percents', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff', '#000000']);
    argument.set('percents', [100]);
    const result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: different ammount of colors/percents');
    t.end();
  });

  tp('no colors and no percents', t => {
    const argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('colors', []);
    argument.set('percents', []);
    const result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: no colors and percents provided');
    t.end();
  });

  tp('validate percent values', t => {
    let argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff', '#000000']);

    argument.set('percents', [null, 100]);
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', [Infinity, 100]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', ['0', 100]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', [{valueOf() {return 0;}}, 100]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', [-5, 95]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', [5, 90]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent percents');

    argument.set('percents', [5, 95]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('percents', [0, 100]);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');
    t.end();
  });

  tp('validate color values', t => {
    let argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('percents', [0, 100]);

    argument.set('colors', [null, 'bar']);
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', ['', 'bar']);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', [{toString() {return 'foo';}}, 'bar']);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', [{valueOf() {return 123;}}, 'bar']);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', [123, 'bar']);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent colors');

    argument.set('colors', ['123', 'any non-empty']);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');
    t.end();
  });
}

tp('validate centerX', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('centerX');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', {valueOf() {return 123;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', '1');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerX');

  argument.set('centerX', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('centerX', -1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('centerX', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate centerY', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('centerY');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', {valueOf() {return 123;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', '1');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent centerY');

  argument.set('centerY', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('centerY', -1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('centerY', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate radius', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('radius');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', {valueOf() {return 123;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', '1');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', -1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent radius');

  argument.set('radius', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate thickness', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('thickness');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', {valueOf() {return 123;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', '1');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', -1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent thickness');

  argument.set('thickness', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('thickness', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate strokeWidth', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('strokeWidth');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', {valueOf() {return 123;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', '1');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', -1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('strokeWidth', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

validateStrokeColor: {
  tp('validate strokeColor with strokeWidth non-0', t => {
    let argument = getValidatableValidMandatoryArgumentsMap();

    argument.delete('strokeColor');
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', {valueOf() {return 123;}});
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', {toString() {return '123';}});
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', null);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', 123);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', '');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, 'pie chart: invalid or absent strokeColor');

    argument.set('strokeColor', 'any non-empty');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');
    t.end();
  });

  tp('validate strokeColor with strokeWidth 0', t => {
    let argument = getValidatableValidMandatoryArgumentsMap();
    argument.set('strokeWidth', 0);

    argument.delete('strokeColor');
    let result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', {valueOf() {return 123;}});
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', {toString() {return '123';}});
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', null);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', 123);
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', '');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');

    argument.set('strokeColor', 'any non-empty');
    result = validateArgument(argument, MockGlobalCanvasContext2d);
    t.equal(result, '');
    t.end();
  });
}

tp('validate cntx', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('cntx');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent cntx');

  argument.set('cntx', {});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent cntx');

  argument.set('cntx', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent cntx');

  argument.set('cntx', Object.create(MockGlobalCanvasContext2d.prototype));
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate scaleY', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.set('scaleY', Infinity);
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', {valueOf() {return 0.5;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', '0.5');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', -0.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', 1.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent scaleY');

  argument.delete('scaleY');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('scaleY', 0.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('scaleY', 1);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate rotationAngle', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.set('rotationAngle', Infinity);
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', {valueOf() {return 0.5;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', '0.5');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', -Math.PI / 2 - 0.1);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', Math.PI + 0.1);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent rotationAngle');

  argument.delete('rotationAngle');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('rotationAngle', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('rotationAngle', -Math.PI / 2);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('rotationAngle', Math.PI / 2);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate startAngle', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.set('startAngle', Infinity);
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', -Infinity);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', NaN);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', {valueOf() {return 0.5;}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', '0.5');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', -0.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', 2 * Math.PI);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent startAngle');

  argument.delete('startAngle');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('startAngle', 0);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('startAngle', 5.5);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate counterClockwise', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.set('counterClockwise', 0);
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', 1);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', '');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', 'true');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', {toString() {return '1';}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent counterClockwise');

  argument.delete('counterClockwise');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('counterClockwise', false);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('counterClockwise', true);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate isRimDown', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.set('isRimDown', 0);
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', 1);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', '');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', 'true');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', {toString() {return '1';}});
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', null);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, 'pie chart: invalid or absent isRimDown');

  argument.delete('isRimDown');
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('isRimDown', false);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('isRimDown', true);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

tp('validate validateOptions', t => {
  let argument = getValidatableValidMandatoryArgumentsMap();

  argument.delete('validateOptions');
  let result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');

  argument.set('validateOptions', false);
  result = validateArgument(argument, MockGlobalCanvasContext2d);
  t.equal(result, '');
  t.end();
});

function getValidMandatoryArgumentsMap() {
  return new Map(
    [
      ['percents', [100]],
      ['colors', ['#ffffff']],
      ['centerX', 100],
      ['centerY', 100],
      ['radius', 100],
      ['thickness', 100],
      ['strokeColor', '#ffffff'],
      ['strokeWidth', 1],
      ['cntx', Object.create(MockGlobalCanvasContext2d.prototype)],
    ]
  );
}

function getValidatableValidMandatoryArgumentsMap() {
  const mandatoryMap = getValidMandatoryArgumentsMap();
  mandatoryMap.set('validateOptions', true);
  return mandatoryMap;
}

function MockGlobalCanvasContext2d() {
}
