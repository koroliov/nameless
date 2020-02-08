'use strict';
/*
 * the tested module's purpose is to calculate the y coordinates of the pie's
 * face and rim (the y coordinate of the arcs to draw the face and rim)
 *
 * suppose the scaleY option is 1, then:
 *                    ____
 *                    |
 * the viewer =>      | <- this is the pie's face
 *                    |___
 *                      .
 *                     /|\
 *                      |
 *                 this is the rim
 *
 * in this case (scaleY = 1) the y coordinate of the face is equal to the pie's
 * centerY coordinate, and the rim isn't visible to the viewer
 *
 * in case when scaleY is in the interval (0, 1) the pie looks as rotated to
 * the viewer by the angle arccosine(scaleY) and the y coordinates of the face
 * and rim differ from centerY (which is the y of the center of the pie)
 * to find this difference we need to take these steps:
 *
 *   Sine(rotationAngle) = Sqrt(1 - scaleY^2), since scaleY is the cosine of
 *   the rotation angle
 *
 *   Sine(rotationAngle) = differenceInYCoordinate / half of the pie's
 *   thickness
 *
 *   2 * differenceInYCoordinate / thickness = Sqrt(1 - scaleY^2)
 *
 *   differenceInYCoordinate = thickness * Sqrt(1 - scaleY^2) / 2
 *
 *   correctedYCoordinate will be centerY +/- differenceInYCoordinate / scaleY
 *   depending on whether the rim is up or down (if the rim is down we need
 *   + differenceInYCoordinate for the face and - differenceInYCoordinate for
 *   the rim, when the rim is down it's vice versa.
 *   We need to divide differenceInYCoordinate by scaleY to correct
 *   for the scale factor, in order to the y coordinate to be correct on the
 *   canvas where the scale y transformation is applied
 *
*/

const tp = require('tape');
const sinon = require('sinon');
const calculateFaceYRimY = require('pie/prepare-data/calculate-face-y-rim-y');

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/F/neg', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['centerY', -10],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), -10 + differenceInYCoordinate);
  t.equal(data.get('rimY'), -10 - differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/F/0', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['centerY', 0],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), 0 + differenceInYCoordinate);
  t.equal(data.get('rimY'), 0 - differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/F/pos', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['centerY', 10],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), 10 + differenceInYCoordinate);
  t.equal(data.get('rimY'), 10 - differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/T/neg', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['centerY', -10],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), -10 - differenceInYCoordinate);
  t.equal(data.get('rimY'), -10 + differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/T/0', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['centerY', 0],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), 0 - differenceInYCoordinate);
  t.equal(data.get('rimY'), 0 + differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/F/T/pos', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', true],
    ['centerY', 10],
  ]);
  calculateFaceYRimY(data);
  const differenceInYCoordinate = 20 * Math.sqrt(1 - 0.5 * 0.5) / 2 / 0.5;
  t.equal(data.get('faceY'), 10 - differenceInYCoordinate);
  t.equal(data.get('rimY'), 10 + differenceInYCoordinate);
  t.end();
});

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/F/neg', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 0],
    ['isRimDown', false],
    ['centerY', -10],
  ]);
  calculateFaceYRimY(data);
  t.equal(data.get('faceY'), -10);
  t.equal(data.get('rimY'), -10);
  t.end();
});

//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/F/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/F/pos SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/T/neg SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/T/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) F/T/T/pos SKIPPED

tp('scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/F/neg', t => {
  const data = new Map([
    ['scaleY', 1],
    ['thickness', 20],
    ['isRimDown', false],
    ['centerY', -10],
  ]);
  calculateFaceYRimY(data);
  t.equal(data.get('faceY'), -10);
  t.equal(data.get('rimY'), -10);
  t.end();
});

//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/F/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/F/pos SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/T/neg SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/T/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/F/T/pos SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/F/neg SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/F/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/F/pos SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/T/neg SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/T/0 SKIPPED
//scaleY1, thickn0, isRimDown, centerY (neg/0/pos) T/T/T/pos SKIPPED

tp('it does not change data, except by setting rimY, faceY', t => {
  const data = new Map([
    ['scaleY', 0.5],
    ['thickness', 20],
    ['isRimDown', false],
    ['centerY', -10],
  ]);
  const spySet = sinon.spy(data, 'set');
  const spyDelete = sinon.spy(data, 'delete');
  const spyClear = sinon.spy(data, 'clear');
  calculateFaceYRimY(data);
  t.equal(spySet.callCount, 2, 'for rimY and faceY');
  t.equal(spyDelete.callCount, 0);
  t.equal(spyClear.callCount, 0);
  t.end();
});
