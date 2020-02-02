'use strict';

const tp = require('tape');
const validateArgs = require('pie/validate-args');

tp('check for unknown keys', t => {
  t.plan(1);
  const argument = getValidMandatoryArgumentsMap();
  argument.set(['foo', 1]);
  const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: arguments map contains unknown key');
});

validatePercentsAndColors: {
  tp('no percents', t => {
    t.plan(1);
    const argument = getValidMandatoryArgumentsMap();
    argument.delete('percents');
    const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');
  });

  tp('percents are not an array', t => {
    t.plan(3);
    const argument = getValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff']);

    argument.set('percents', new Map());
    let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', 'abc');
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', null);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');
  });

  tp('no colors', t => {
    t.plan(1);
    const argument = getValidMandatoryArgumentsMap();
    argument.delete('colors');
    const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');
  });

  tp('colors are not an array', t => {
    t.plan(3);
    const argument = getValidMandatoryArgumentsMap();
    argument.set('percents', [100]);

    argument.set('colors', new Map());
    let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', 'abc');
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', null);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');
  });

  tp('more percents, than colors', t => {
    t.plan(1);
    const argument = getValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff']);
    argument.set('percents', [50, 50]);
    const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: different ammount of colors/percents');
  });

  tp('more colors, than percents', t => {
    t.plan(1);
    const argument = getValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff', '#000000']);
    argument.set('percents', [100]);
    const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: different ammount of colors/percents');
  });

  tp('no colors and no percents', t => {
    t.plan(1);
    const argument = getValidMandatoryArgumentsMap();
    argument.set('colors', []);
    argument.set('percents', []);
    const actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: no colors and percents provided');
  });

  tp('validate percent values', t => {
    t.plan(8);
    let argument = getValidMandatoryArgumentsMap();
    argument.set('colors', ['#ffffff', '#000000']);

    argument.set('percents', [null, 100]);
    let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', [Infinity, 100]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', ['0', 100]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', [{valueOf() {return 0;}}, 100]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', [-5, 95]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', [5, 90]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent percents');

    argument.set('percents', [5, 95]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, '');

    argument.set('percents', [0, 100]);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, '');
  });

  tp('validate color values', t => {
    t.plan(6);
    let argument = getValidMandatoryArgumentsMap();
    argument.set('percents', [0, 100]);

    argument.set('colors', [null, 'bar']);
    let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', ['', 'bar']);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', [{toString() {return 'foo';}}, 'bar']);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', [{valueOf() {return 123;}}, 'bar']);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', [123, 'bar']);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, 'pie chart: invalid or absent colors');

    argument.set('colors', ['123', 'any non-empty']);
    actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
    t.equal(actualResult, '');
  });

}

tp('validate ox', t => {
  t.plan(10);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('ox');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', '1');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent ox');

  argument.set('ox', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('ox', -1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('ox', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate oy', t => {
  t.plan(10);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('oy');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', '1');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent oy');

  argument.set('oy', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('oy', -1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('oy', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate radius', t => {
  t.plan(10);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('radius');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', '1');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', -1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent radius');

  argument.set('radius', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate thickness', t => {
  t.plan(10);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('thickness');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', '1');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', -1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent thickness');

  argument.set('thickness', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('thickness', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate strokeWidth', t => {
  t.plan(10);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('strokeWidth');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', '1');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', -1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeWidth');

  argument.set('strokeWidth', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeWidth', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate strokeColor with strokeWidth non-0', t => {
  t.plan(7);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('strokeColor');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', {toString() {return '123';}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', 123);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', '');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent strokeColor');

  argument.set('strokeColor', 'any non-empty');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate strokeColor with strokeWidth 0', t => {
  t.plan(7);
  let argument = getValidMandatoryArgumentsMap();
  argument.set('strokeWidth', 0);

  argument.delete('strokeColor');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', {valueOf() {return 123;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', {toString() {return '123';}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', 123);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', '');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('strokeColor', 'any non-empty');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate cntx', t => {
  t.plan(4);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('cntx');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent cntx');

  argument.set('cntx', {});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent cntx');

  argument.set('cntx', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent cntx');

  argument.set('cntx', Object.create(MockGlobalCanvasContext2d.prototype));
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate scaleY', t => {
  t.plan(12);
  let argument = getValidMandatoryArgumentsMap();

  argument.set('scaleY', Infinity);
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', {valueOf() {return 0.5;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', '0.5');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', -0.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.set('scaleY', 1.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent scaleY');

  argument.delete('scaleY');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('scaleY', 0.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('scaleY', 1);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate rotationAngle', t => {
  t.plan(12);
  let argument = getValidMandatoryArgumentsMap();

  argument.set('rotationAngle', Infinity);
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', {valueOf() {return 0.5;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', '0.5');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', -2 * Math.PI);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.set('rotationAngle', 2 * Math.PI);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent rotationAngle');

  argument.delete('rotationAngle');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('rotationAngle', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('rotationAngle', -5.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('rotationAngle', 5.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate startAngle', t => {
  t.plan(11);
  let argument = getValidMandatoryArgumentsMap();

  argument.set('startAngle', Infinity);
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', -Infinity);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', NaN);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', {valueOf() {return 0.5;}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', '0.5');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', -0.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.set('startAngle', 2 * Math.PI);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent startAngle');

  argument.delete('startAngle');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('startAngle', 0);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('startAngle', 5.5);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate counterClockwise', t => {
  t.plan(9);
  let argument = getValidMandatoryArgumentsMap();

  argument.set('counterClockwise', 0);
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', 1);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', '');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', 'true');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', {toString() {return '1';}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.set('counterClockwise', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent counterClockwise');

  argument.delete('counterClockwise');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('counterClockwise', false);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('counterClockwise', true);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate isRimDown', t => {
  t.plan(9);
  let argument = getValidMandatoryArgumentsMap();

  argument.set('isRimDown', 0);
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', 1);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', '');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', 'true');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', {toString() {return '1';}});
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.set('isRimDown', null);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, 'pie chart: invalid or absent isRimDown');

  argument.delete('isRimDown');
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('isRimDown', false);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('isRimDown', true);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

tp('validate skipValidation', t => {
  t.plan(2);
  let argument = getValidMandatoryArgumentsMap();

  argument.delete('skipValidation');
  let actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');

  argument.set('skipValidation', false);
  actualResult = validateArgs(argument, MockGlobalCanvasContext2d);
  t.equal(actualResult, '');
});

function getValidMandatoryArgumentsMap() {
  return new Map(
    [
      ['percents', [100]],
      ['colors', ['#ffffff']],
      ['ox', 100],
      ['oy', 100],
      ['radius', 100],
      ['thickness', 100],
      ['strokeColor', '#ffffff'],
      ['strokeWidth', 1],
      ['cntx', Object.create(MockGlobalCanvasContext2d.prototype)],
    ]
  );
}

function MockGlobalCanvasContext2d() {
}
