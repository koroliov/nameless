(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.charts3d = {
  pie: require('./pie/main.js')
    .bind(undefined, console.error, CanvasRenderingContext2D),
};

},{"./pie/main.js":8}],2:[function(require,module,exports){
'use strict';

function applyContextStateChanges(args) {
  const {cntx, ox, oy, strokeColor, strokeWidth, rotationAngle, scaleY} = args;
  if (strokeWidth !== 0) {
    cntx.strokeStyle = strokeColor;
    cntx.lineWidth = strokeWidth;
  }

  cntx.translate(ox, oy);
  cntx.rotate(rotationAngle);
  cntx.scale(1, scaleY);
  cntx.translate(-ox, -oy);
}

module.exports = applyContextStateChanges;

},{}],3:[function(require,module,exports){
'use strict';

function correctOyForThickness(map) {
  const scaleY = map.get('scaleY');
  const oy = map.get('oy');
  const thickness = map.get('thickness');
  const isRimDown = map.get('isRimDown');
  const oyChangeAbs = thickness * Math.sqrt(1 - scaleY * scaleY) / 2 / scaleY;
  map.set('oy', isRimDown ? -oyChangeAbs + oy : oyChangeAbs + oy);
}

module.exports = correctOyForThickness;

},{}],4:[function(require,module,exports){
'use strict';

const pi = Math.PI;

function createRimDrawSequence(args) {
  const {normalizedAngles, colors, isRimDown, counterClockwise} = args;
  const mergedAnglesColors = mergeAnglesColors(normalizedAngles, colors);
  const indOfAngleBehindZero =
      findIndOfFirstAngleBehindZero(normalizedAngles, isRimDown);

  const orderedSeq = createOrderedSequenceFromBehind0ToPi(
      mergedAnglesColors, indOfAngleBehindZero, counterClockwise);

  let rimDrawSequence;
  if (isRimDown) {
    rimDrawSequence = createDrawSeqForRimDown(orderedSeq);
  } else {
    rimDrawSequence = createDrawSeqForRimUp(orderedSeq);
  }

  return rimDrawSequence;
}

function createDrawSeqForRimUp(orderedSeq) {
  const rimDrawSequence = [0];
  let i = orderedSeq.length - 1;
  for (; i > 0; i -= 2) {
    if (orderedSeq[i - 1] <= pi) {
      break;
    }
    rimDrawSequence.push(orderedSeq[i], orderedSeq[i - 1]);
  }
  if (orderedSeq[0] > pi) {
    rimDrawSequence.push(orderedSeq[orderedSeq.length - 1], pi);
  } else {
    rimDrawSequence.push(orderedSeq[i], pi);
  }
  return rimDrawSequence;
}

function createDrawSeqForRimDown(orderedSeq) {
  const rimDrawSequence = [0, orderedSeq[1]];
  for (let i = 2; i < orderedSeq.length; i += 2) {
    if (orderedSeq[i] >= pi) {
      break;
    }
    rimDrawSequence.push(orderedSeq[i], orderedSeq[i + 1]);
  }
  if (orderedSeq[0] === 0) {
    rimDrawSequence.push(pi);
  } else if (orderedSeq[0] < pi) {
    rimDrawSequence.push(orderedSeq[0], orderedSeq[1], pi);
  } else {
    rimDrawSequence.push(pi);
  }
  return rimDrawSequence;
}

function createOrderedSequenceFromBehind0ToPi(
    mergedAnglesColors, indOfAngleBehindZero, counterClockwise) {
  const orderedSeq = [];
  if (counterClockwise) {
    for (let i = indOfAngleBehindZero * 2; i > 0; i -= 2) {
      orderedSeq.push(mergedAnglesColors[i], mergedAnglesColors[i - 1]);
    }
    for (let i = mergedAnglesColors.length - 1; i > indOfAngleBehindZero * 2;
        i -= 2) {
      orderedSeq.push(mergedAnglesColors[i], mergedAnglesColors[i - 1]);
    }
  } else {
    for (let i = indOfAngleBehindZero * 2; i < mergedAnglesColors.length - 1;
        i += 2) {
      orderedSeq.push(mergedAnglesColors[i], mergedAnglesColors[i + 1]);
    }
    for (let i = 1; i < indOfAngleBehindZero * 2; i += 2) {
      orderedSeq.push(mergedAnglesColors[i - 1], mergedAnglesColors[i]);
    }
  }
  return orderedSeq;
}

function mergeAnglesColors(normalizedAngles, colors) {
  const merged = [];
  colors.forEach((el, i) => merged.push(normalizedAngles[i], colors[i]));
  merged.push(normalizedAngles[normalizedAngles.length - 1]);
  return merged;
}

function findIndOfFirstAngleBehindZero(normalizedAngles, isRimDown) {
  let index = 0;
  for (let i = 0; i < normalizedAngles.length - 1; i++) {
    if (normalizedAngles[i] === 0) {
      index = i;
      break;
    }
    if (isRimDown) {
      if (normalizedAngles[i] > normalizedAngles[index]) {
        index = i;
      }
    } else if (normalizedAngles[i] < normalizedAngles[index]) {
      index = i;
    }
  }
  return index;
}

module.exports = createRimDrawSequence;

},{}],5:[function(require,module,exports){
'use strict';

function fillFace(args) {
  const {ox, oy, radius, cntx, angles, colors, counterClockwise} = args;
  const originalFillStyle = cntx.fillStyle;
  if (colors.length === 1) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, 0, 2 * Math.PI);
    cntx.fillStyle = colors[0];
    cntx.fill();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(ox, oy, radius, angles[i - 1], angles[i],
          counterClockwise);
      cntx.lineTo(ox, oy);
      cntx.closePath();
      cntx.fillStyle = colors[i - 1];
      cntx.fill();
    }
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = fillFace;

},{}],6:[function(require,module,exports){
'use strict';

function fillOptionalArgs(args) {
  const optionalArgsAndDefaultVals = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  for (const [key, defaultVal] of optionalArgsAndDefaultVals) {
    if (!args.has(key)) {
      args.set(key, defaultVal);
    }
  }
  return args;
}

module.exports = fillOptionalArgs;

},{}],7:[function(require,module,exports){
'use strict';

function fillRim(args) {
  const {ox, oy, radius, rimDrawSequence, isRimDown, scaleY, rimThickness,
      cntx} = args;
  const originalFillStyle = cntx.fillStyle;

  let rimScale = Math.sqrt(1 - scaleY * scaleY);
  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (isRimDown) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    rimScale = -rimScale;
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const rimThicknessScaled = rimThickness * rimScale / scaleY;
  let startX = ox + radius;
  let startY = oy;
  const oyRim = oy + rimThicknessScaled;
  let startYRim;
  let endX;
  let endY;
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    fillInnerPartOfSlice();
    startX = endX;
    startY = endY;
  }

  cntx.fillStyle = originalFillStyle;

  function fillInnerPartOfSlice() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    startYRim = startY + rimThicknessScaled;
    cntx.lineTo(startX, startYRim);
    cntx.arc(ox, oyRim, radius, rimDrawSequence[i - 1], rimDrawSequence[i + 1],
        baseArcCounterClockwise);
    endX = Math.cos(rimDrawSequence[i + 1]) * radius + ox;
    endY = Math.sin(rimDrawSequence[i + 1]) * radius + oy;
    cntx.arc(ox, oy, radius, rimDrawSequence[i + 1], rimDrawSequence[i - 1],
        rimArcCounterClockwise);
    cntx.fillStyle = rimDrawSequence[i];
    cntx.fill();
  }
}

module.exports = fillRim;

},{}],8:[function(require,module,exports){
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
    consoleError('invalid argument');
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

},{"./apply-context-state-changes":2,"./correct-oy-for-thickness":3,"./create-rim-draw-sequence":4,"./fill-face":5,"./fill-optional-args":6,"./fill-rim":7,"./prepare-angles-n-colors/main":11,"./stroke-face":13,"./stroke-rim":14,"./validate-args":15}],9:[function(require,module,exports){
'use strict';

function calcAnglesFromPercents({percents, startAngle, counterClockwise}) {
  const onePercentAngle = Math.PI / 50;
  const angles = [startAngle];

  if (counterClockwise) {
    for (let i = 0; i < percents.length - 1; i++) {
      angles.push(angles[i] - onePercentAngle * percents[i]);
    }
  } else {
    for (let i = 0; i < percents.length - 1; i++) {
      angles.push(angles[i] + onePercentAngle * percents[i]);
    }
  }
  angles.push(startAngle);

  return angles;
}

module.exports = calcAnglesFromPercents;

},{}],10:[function(require,module,exports){
'use strict';

function filterZeroPercents(percents, colors) {
  const filteredColors = [];
  const filteredPercents = percents.filter((el, i) => {
    if (el !== 0) {
      filteredColors.push(colors[i]);
      return true;
    }
    return false;
  });
  return {
    percents: filteredPercents,
    colors: filteredColors,
  };
}

module.exports = filterZeroPercents;

},{}],11:[function(require,module,exports){
'use strict';

const filterZeroPercents = require('./filter-zero-percents');
const calcAnglesFromPercents = require('./calc-angles-from-percents');
const normalizeAngles = require('./normalize-angles');

function main(args) {
  const {percentsOriginal, colorsOriginal, startAngle, counterClockwise} = args;
  const {colors, percents} =
      filterZeroPercents(percentsOriginal, colorsOriginal);
  if (colors.length === 1) {
    return {
      colors,
      angles: [0],
    };
  }
  const angles = calcAnglesFromPercents({
    percents,
    startAngle,
    counterClockwise,
  });
  return {
    colors,
    angles: normalizeAngles(angles),
  };
}

module.exports = main;

},{"./calc-angles-from-percents":9,"./filter-zero-percents":10,"./normalize-angles":12}],12:[function(require,module,exports){
'use strict';

function normalizeAngles(angles) {
  const twoPi = 2 * Math.PI;
  for (let i = 1; i < angles.length - 1; i++) {
    if (angles[i] < 0) {
      angles[i] = twoPi + angles[i];
    } else if (angles[i] >= twoPi) {
      angles[i] = angles[i] - twoPi;
    }
  }
  return angles;
}

module.exports = normalizeAngles;

},{}],13:[function(require,module,exports){
'use strict';

function strokeFace({ox, oy, radius, cntx, angles, counterClockwise}) {
  if (angles.length === 1) {
    cntx.beginPath();
    cntx.arc(ox, oy, radius, 0, 2 * Math.PI);
    cntx.stroke();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(ox, oy, radius, angles[i - 1], angles[i],
          counterClockwise);
      cntx.lineTo(ox, oy);
      cntx.stroke();
    }
  }
}

module.exports = strokeFace;

},{}],14:[function(require,module,exports){
'use strict';

function strokeRim(args) {
  const {ox, oy, radius, rimDrawSequence, isRimDown, scaleY, rimThickness,
      cntx} = args;
  const originalFillStyle = cntx.fillStyle;

  let rimScale = Math.sqrt(1 - scaleY * scaleY);
  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (isRimDown) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    rimScale = -rimScale;
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const rimThicknessScaled = rimThickness * rimScale / scaleY;
  let startX = ox + radius;
  let startY = oy;
  const oyRim = oy + rimThicknessScaled;
  let startYRim;
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    strokeSliceEdgesRightBottom();
    startX = Math.cos(rimDrawSequence[i + 1]) * radius + ox;
    startY = Math.sin(rimDrawSequence[i + 1]) * radius + oy;
  }
  strokeLeftEdgeOfLastSlice();

  cntx.fillStyle = originalFillStyle;

  function strokeSliceEdgesRightBottom() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    cntx.lineTo(startX, startYRim);
    cntx.arc(ox, oyRim, radius, rimDrawSequence[i - 1], rimDrawSequence[i + 1],
        baseArcCounterClockwise);
    cntx.stroke();
  }

  function strokeLeftEdgeOfLastSlice() {
    cntx.beginPath();
    cntx.moveTo(ox - radius, oy);
    cntx.lineTo(ox - radius, oy + rimThicknessScaled);
    cntx.stroke();
  }
}

module.exports = strokeRim;

},{}],15:[function(require,module,exports){
'use strict';

function validateArgs(args, GlobalCanvas2dContextConstructor) {
  if (!(args instanceof Map)) {
    return 'pie chart: arguments must be instance of Map';
  }

  const twoPi = 2 * Math.PI;
  const argumentsNamesAndValidations = new Map([
    ['percents', (propName) => !Array.isArray(args.get(propName))],
    ['colors', (propName) => !Array.isArray(args.get(propName))],
    ['skipValidation', propName => false],
    ['ox', propName => !Number.isFinite(args.get(propName))],
    ['oy', propName => !Number.isFinite(args.get(propName))],
    ['radius', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val <= 0;
    }],
    ['thickness', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeWidth', propName => {
      const val = args.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeColor', propName => {
      if (args.get('strokeWidth') !== 0) {
        const val = args.get(propName);
        return typeof val !== 'string' || val === '';
      } else {
        return false;
      }
    }],
    ['cntx', propName => {
      const val = args.get(propName);
      if (typeof val !== 'object' || val === null) {
        return true;
      } else {
        return Object.getPrototypeOf(val) !==
            GlobalCanvas2dContextConstructor.prototype;
      }
    }],
    ['scaleY', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val <= 0 || val > 1);
    }],
    ['rotationAngle', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val <= -twoPi || val >= twoPi);
    }],
    ['startAngle', propName => {
      const val = args.get(propName);
      return args.has(propName) &&
          (!Number.isFinite(val) || val < 0 || val >= twoPi);
    }],
    ['counterClockwise', propName => {
      return args.has(propName) && typeof args.get(propName) !== 'boolean';
    }],
    ['isRimDown', propName => {
      return args.has(propName) && typeof args.get(propName) !== 'boolean';
    }],
    ['skipValidation', () => false],
  ]);

  for (const key of args.keys()) {
    if (!argumentsNamesAndValidations.has(key)) {
      return  'pie chart: arguments map contains unknown key';
    }
  }

  for (const [propName, isInvalid] of argumentsNamesAndValidations) {
    if (isInvalid(propName)) {
      return 'pie chart: invalid or absent ' + propName;
    }
  }

  return hasErrorInColorsOrPercents(args) || '';
}

function hasErrorInColorsOrPercents(args) {
  const percents = args.get('percents');
  const colors = args.get('colors');
  if (percents.length !== colors.length) {
    return 'pie chart: different ammount of colors/percents';
  }
  if (percents.length === 0) {
    return 'pie chart: no colors and percents provided';
  }
  let percentSum = 0;
  for (const percentVal of percents) {
    if (!Number.isFinite(percentVal) || percentVal < 0) {
      return 'pie chart: invalid or absent percents';
    }
    percentSum += percentVal;
  }
  if (percentSum !== 100) {
    return 'pie chart: invalid or absent percents';
  }
  for (const colorVal of colors) {
    if (typeof colorVal !== 'string' || colorVal === '') {
      return 'pie chart: invalid or absent colors';
    }
  }
}

module.exports = validateArgs;

},{}]},{},[1]);
