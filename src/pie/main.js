'use strict';

const validateArgs = require('./validate-args');
const fillOptionalArgs = require('./fill-optional-args');
const applyContextStateChanges = require('./apply-context-state-changes');
const correctOyForThickness = require('./correct-oy-for-thickness');
const prepareAnglesColors = require('./prepare-angles-n-colors/main');
const fillFace = require('./fill-face');
const strokeFace = require('./stroke-face');
const createRimDrawSequence = require('./create-rim-draw-sequence');
const fillRim = require('./fill-rim');
const strokeRim = require('./stroke-rim');

function main(consoleError, Context2dConstructor, map) {
  if (!(map instanceof Map)) {
    consoleError('pie chart: invalid argument');
    return;
  } else if (map.has('skipValidation') && !map.get('skipValidation')) {
    const errorMsg = validateArgs(map, Context2dConstructor);
    if (errorMsg) {
      consoleError(errorMsg);
      return;
    }
  }

  const fullOptions = fillOptionalArgs(map);
  const cntx = fullOptions.get('cntx');
  cntx.save();
  applyContextStateChanges({
    cntx: fullOptions.get('cntx'),
    ox: fullOptions.get('ox'),
    oy: fullOptions.get('oy'),
    strokeColor: fullOptions.get('strokeColor'),
    strokeWidth: fullOptions.get('strokeWidth'),
    rotationAngle: fullOptions.get('rotationAngle'),
    scaleY: fullOptions.get('scaleY'),
  });
  correctOyForThickness(fullOptions);

  const preparedAnglesColors = prepareAnglesColors({
    percentsOriginal: fullOptions.get('percents'),
    colorsOriginal: fullOptions.get('colors'),
    startAngle: fullOptions.get('startAngle'),
    counterClockwise: fullOptions.get('counterClockwise'),
  });
  fillFace({
    ox: fullOptions.get('ox'),
    oy: fullOptions.get('oy'),
    radius: fullOptions.get('radius'),
    cntx: fullOptions.get('cntx'),
    counterClockwise: fullOptions.get('counterClockwise'),
    colors: preparedAnglesColors.colors,
    angles: preparedAnglesColors.angles,
  });

  let rimDrawSeq;
  if (isRimVisible()) {
    if (isSingleSlice()) {
      rimDrawSeq = [0, preparedAnglesColors.colors[0], Math.PI];
    } else {
      rimDrawSeq = createRimDrawSequence({
        normalizedAngles: preparedAnglesColors.angles,
        colors: preparedAnglesColors.colors,
        isRimDown: fullOptions.get('isRimDown'),
        counterClockwise: fullOptions.get('counterClockwise'),
      });
    }
    fillRim({
      ox: fullOptions.get('ox'),
      oy: fullOptions.get('oy'),
      radius: fullOptions.get('radius'),
      rimDrawSequence: rimDrawSeq,
      isRimDown: fullOptions.get('isRimDown'),
      scaleY: fullOptions.get('scaleY'),
      rimThickness: fullOptions.get('thickness'),
      cntx: fullOptions.get('cntx'),
    });
  }
  if (fullOptions.get('strokeWidth') !== 0) {
    strokeFace({
      ox: fullOptions.get('ox'),
      oy: fullOptions.get('oy'),
      radius: fullOptions.get('radius'),
      cntx: fullOptions.get('cntx'),
      counterClockwise: fullOptions.get('counterClockwise'),
      angles: preparedAnglesColors.angles,
    });
    if (isRimVisible()) {
      strokeRim({
        ox: fullOptions.get('ox'),
        oy: fullOptions.get('oy'),
        radius: fullOptions.get('radius'),
        rimDrawSequence: rimDrawSeq,
        isRimDown: fullOptions.get('isRimDown'),
        scaleY: fullOptions.get('scaleY'),
        rimThickness: fullOptions.get('thickness'),
        cntx: fullOptions.get('cntx'),
      });
    }
  }
  cntx.restore();

  function isRimVisible() {
    return fullOptions.get('scaleY') !== 1 &&
      fullOptions.get('thickness') !== 0;
  }

  function isSingleSlice() {
    return preparedAnglesColors.colors.length === 1;
  }
}

module.exports = main;
