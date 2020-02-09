(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

window.charts3d = {
  pie: require('./pie/main.js')
    .bind(undefined, console.error, CanvasRenderingContext2D),
};

},{"./pie/main.js":6}],2:[function(require,module,exports){
'use strict';

function applyContextStateChanges(data) {
  const cntx = data.get('cntx');
  const centerX = data.get('centerX');
  const centerY = data.get('centerY');
  const strokeWidth = data.get('strokeWidth');

  if (strokeWidth !== 0) {
    cntx.strokeStyle = data.get('strokeColor');
    cntx.lineWidth = strokeWidth;
  }
  cntx.translate(centerX, centerY);
  cntx.rotate(data.get('rotationAngle'));
  cntx.scale(1, data.get('scaleY'));
  cntx.translate(-centerX, -centerY);
}

module.exports = applyContextStateChanges;

},{}],3:[function(require,module,exports){
'use strict';

function face(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const radius = data.get('radius');
  const cntx = data.get('cntx');
  const angles = data.get('angles');
  const colors = data.get('colors');
  const originalFillStyle = cntx.fillStyle;
  if (colors.length === 1) {
    cntx.beginPath();
    cntx.arc(centerX, faceY, radius, 0, 2 * Math.PI);
    cntx.fillStyle = colors[0];
    cntx.fill();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(centerX, faceY, radius, angles[i - 1], angles[i],
          data.get('counterClockwise'));
      cntx.lineTo(centerX, faceY);
      cntx.closePath();
      cntx.fillStyle = colors[i - 1];
      cntx.fill();
    }
  }
  cntx.fillStyle = originalFillStyle;
}

module.exports = face;

},{}],4:[function(require,module,exports){
'use strict';

const face = require('./face');
const rim = require('./rim');

function main(data) {
  face(data);
  if (isRimPresent()) {
    rim(data);
  }

  function isRimPresent() {
    return data.has('rimDrawSequence');
  }
}

module.exports = main;

},{"./face":3,"./rim":5}],5:[function(require,module,exports){
'use strict';

function rim(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const rimY = data.get('rimY');
  const radius = data.get('radius');
  const rimDrawSequence = data.get('rimDrawSequence');
  const isRimDown = data.get('isRimDown');
  const cntx = data.get('cntx');
  const originalFillStyle = cntx.fillStyle;

  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (isRimDown) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const thicknessScaled = faceY - rimY;
  let startX = centerX + radius;
  let startY = faceY;
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
    startYRim = startY + thicknessScaled;
    cntx.lineTo(startX, startYRim);
    cntx.arc(centerX, rimY, radius, rimDrawSequence[i - 1],
        rimDrawSequence[i + 1], baseArcCounterClockwise);
    endX = Math.cos(rimDrawSequence[i + 1]) * radius + centerX;
    endY = Math.sin(rimDrawSequence[i + 1]) * radius + faceY;
    cntx.arc(centerX, faceY, radius, rimDrawSequence[i + 1],
        rimDrawSequence[i - 1], rimArcCounterClockwise);
    cntx.fillStyle = rimDrawSequence[i];
    cntx.fill();
  }
}

module.exports = rim;

},{}],6:[function(require,module,exports){
'use strict';

const validateArgument = require('./validate-argument');
const prepareData = require('./prepare-data/main');
const applyContextStateChanges = require('./apply-context-state-changes');
const fill = require('./fill/main');
const stroke = require('./stroke/main');

function main(consoleError, Context2dConstructor, argument) {
  const errorMsg = validateArgument(argument, Context2dConstructor);
  if (errorMsg) {
    consoleError(errorMsg);
    return;
  }

  const data = prepareData(argument);
  const cntx = data.get('cntx');
  cntx.save();
  applyContextStateChanges(data);
  fill(data);
  if (data.get('strokeWidth') !== 0) {
    stroke(data);
  }
  cntx.restore();
}

module.exports = main;

},{"./apply-context-state-changes":2,"./fill/main":4,"./prepare-data/main":14,"./stroke/main":16,"./validate-argument":18}],7:[function(require,module,exports){
'use strict';

function calculateAngles(data) {
  const percents = data.get('percents');
  const startAngle = data.get('startAngle');
  const counterClockwise = data.get('counterClockwise');
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
  data.set('angles', angles);
}

module.exports = calculateAngles;

},{}],8:[function(require,module,exports){
'use strict';

function filterZeroPercents(data) {
  const colors = data.get('colors');
  const filteredColors = [];
  const filteredPercents = data.get('percents').filter((el, i) => {
    if (el !== 0) {
      filteredColors.push(colors[i]);
      return true;
    }
    return false;
  });
  data.set('percents', filteredPercents);
  data.set('colors', filteredColors);
  return data;
}

module.exports = filterZeroPercents;

},{}],9:[function(require,module,exports){
'use strict';

const filterZeroPercents = require('./filter-zero-percents');
const calculateAngles = require('./calculate-angles');
const normalizeAngles = require('./normalize-angles');

function main(data) {
  filterZeroPercents(data);
  if (data.get('colors').length !== 1) {
    calculateAngles(data);
    normalizeAngles(data);
  }
}

module.exports = main;

},{"./calculate-angles":7,"./filter-zero-percents":8,"./normalize-angles":10}],10:[function(require,module,exports){
'use strict';

function normalizeAngles(map) {
  const angles = map.get('angles');
  const twoPi = 2 * Math.PI;
  for (let i = 1; i < angles.length - 1; i++) {
    if (angles[i] < 0) {
      angles[i] = twoPi + angles[i];
    } else if (angles[i] >= twoPi) {
      angles[i] = angles[i] - twoPi;
    }
  }
}

module.exports = normalizeAngles;

},{}],11:[function(require,module,exports){
'use strict';

function calculateFaceYRimY(data) {
  const scaleY = data.get('scaleY');
  const centerY = data.get('centerY');
  const thickness = data.get('thickness');
  const isRimDown = data.get('isRimDown');
  const differenceInYCoordinate =
      thickness * Math.sqrt(1 - scaleY * scaleY) / 2 / scaleY;
  let faceY;
  let rimY;
  if (isRimDown) {
    faceY =  centerY - differenceInYCoordinate;
    rimY =  centerY + differenceInYCoordinate;
  } else {
    faceY =  centerY + differenceInYCoordinate;
    rimY =  centerY - differenceInYCoordinate;
  }
  data.set('faceY', faceY);
  data.set('rimY', rimY);
}

module.exports = calculateFaceYRimY;

},{}],12:[function(require,module,exports){
'use strict';

const pi = Math.PI;

function createRimDrawSequence(data) {
  const angles = data.get('angles');
  const colors = data.get('colors');
  const isRimDown = data.get('isRimDown');
  const counterClockwise = data.get('counterClockwise');

  if (isSingleSlicePie()) {
    data.set('rimDrawSequence', [0, colors[0], pi]);
    return;
  }

  const mergedAnglesColors = mergeAnglesColors(angles, colors);
  const indOfAngleBehindZero =
      findIndOfFirstAngleBehindZero(angles, isRimDown);

  const orderedSeq = createOrderedSequenceFromBehind0ToPi(
      mergedAnglesColors, indOfAngleBehindZero, counterClockwise);

  let rimDrawSequence;
  if (isRimDown) {
    rimDrawSequence = createDrawSeqForRimDown(orderedSeq);
  } else {
    rimDrawSequence = createDrawSeqForRimUp(orderedSeq);
  }

  data.set('rimDrawSequence', rimDrawSequence);

  function isSingleSlicePie() {
    return colors.length === 1;
  }
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

function mergeAnglesColors(angles, colors) {
  const merged = [];
  colors.forEach((el, i) => merged.push(angles[i], colors[i]));
  merged.push(angles[angles.length - 1]);
  return merged;
}

function findIndOfFirstAngleBehindZero(angles, isRimDown) {
  let index = 0;
  for (let i = 0; i < angles.length - 1; i++) {
    if (angles[i] === 0) {
      index = i;
      break;
    }
    if (isRimDown) {
      if (angles[i] > angles[index]) {
        index = i;
      }
    } else if (angles[i] < angles[index]) {
      index = i;
    }
  }
  return index;
}

module.exports = createRimDrawSequence;

},{}],13:[function(require,module,exports){
'use strict';

function create(map) {
  const optionalProperties = new Map([
    ['scaleY', 0],
    ['rotationAngle', 0],
    ['startAngle', 3 * Math.PI / 2],
    ['counterClockwise', false],
    ['isRimDown', true],
  ]);
  const data = new Map(map);
  data.set('percents', Array.from(map.get('percents')));
  data.set('colors', Array.from(map.get('colors')));
  for (const [key, value] of optionalProperties) {
    if (!data.has(key)) {
      data.set(key, value);
    }
  }
  return data;
}

module.exports = create;

},{}],14:[function(require,module,exports){
'use strict';

const create = require('./create');
const anglesColorsMain = require('./angles-colors/main');
const calculateFaceYRimY = require('./calculate-face-y-rim-y');
const createRimDrawSequence = require('./create-rim-draw-sequence');

function main(argument) {
  const data = create(argument);
  anglesColorsMain(data);
  calculateFaceYRimY(data);
  if (isRimPresent()) {
    createRimDrawSequence(data);
  }

  function isRimPresent() {
    return !(data.get('thickness') === 0 || data.get('scaleY') === 1);
  }
  return data;
}

module.exports = main;

},{"./angles-colors/main":9,"./calculate-face-y-rim-y":11,"./create":13,"./create-rim-draw-sequence":12}],15:[function(require,module,exports){
'use strict';

function face(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const radius = data.get('radius');
  const cntx = data.get('cntx');
  const angles = data.get('angles');
  if (isSingleSlice()) {
    cntx.beginPath();
    cntx.arc(centerX, faceY, radius, 0, 2 * Math.PI);
    cntx.stroke();
  } else {
    for (let i = 1; i < angles.length; i++) {
      cntx.beginPath();
      cntx.arc(centerX, faceY, radius, angles[i - 1], angles[i],
          data.get('counterClockwise'));
      cntx.lineTo(centerX, faceY);
      cntx.stroke();
    }
  }
  function isSingleSlice() {
    return data.get('colors').length === 1;
  }
}

module.exports = face;

},{}],16:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"./face":15,"./rim":17,"dup":4}],17:[function(require,module,exports){
'use strict';

function rim(data) {
  const centerX = data.get('centerX');
  const faceY = data.get('faceY');
  const rimY = data.get('rimY');
  const radius = data.get('radius');
  const rimDrawSequence = data.get('rimDrawSequence');
  const cntx = data.get('cntx');
  const originalFillStyle = cntx.fillStyle;

  let baseArcCounterClockwise;
  let rimArcCounterClockwise;
  if (data.get('isRimDown')) {
    baseArcCounterClockwise = false;
    rimArcCounterClockwise = true;
  } else {
    baseArcCounterClockwise = true;
    rimArcCounterClockwise = false;
  }
  const thicknessScaled = faceY - rimY;
  let startX = centerX + radius;
  let startY = faceY;
  let endX;
  let endY;
  let i;

  for (i = 1; i < rimDrawSequence.length; i += 2) {
    strokeSliceEdgesRightBottom();
    startX = Math.cos(rimDrawSequence[i + 1]) * radius + centerX;
    startY = Math.sin(rimDrawSequence[i + 1]) * radius + faceY;
  }
  strokeLeftEdgeOfLastSlice();

  cntx.fillStyle = originalFillStyle;

  function strokeSliceEdgesRightBottom() {
    cntx.beginPath();
    cntx.moveTo(startX, startY);
    cntx.arc(centerX, rimY, radius, rimDrawSequence[i - 1],
        rimDrawSequence[i + 1], baseArcCounterClockwise);
    cntx.stroke();
  }

  function strokeLeftEdgeOfLastSlice() {
    cntx.beginPath();
    cntx.moveTo(centerX - radius, faceY);
    cntx.lineTo(centerX - radius, faceY - thicknessScaled);
    cntx.stroke();
  }
}

module.exports = rim;

},{}],18:[function(require,module,exports){
'use strict';

function validateArgument(map, GlobalCanvas2dContextConstructor) {
  if (!(map instanceof Map)) {
    return 'pie chart: argument must be instance of Map';
  }
  if (!map.has('validateOptions') || map.get('validateOptions') === false) {
    return '';
  }

  const twoPi = 2 * Math.PI;
  const halfPi = Math.PI / 2;
  const optionsNamesAndValidations = new Map([
    ['percents', propName => !Array.isArray(map.get(propName))],
    ['colors', propName => !Array.isArray(map.get(propName))],
    ['validateOptions', () => false],
    ['centerX', propName => !Number.isFinite(map.get(propName))],
    ['centerY', propName => !Number.isFinite(map.get(propName))],
    ['radius', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val <= 0;
    }],
    ['thickness', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeWidth', propName => {
      const val = map.get(propName);
      return !Number.isFinite(val) || val < 0
    }],
    ['strokeColor', propName => {
      if (map.get('strokeWidth') !== 0) {
        const val = map.get(propName);
        return typeof val !== 'string' || val === '';
      } else {
        return false;
      }
    }],
    ['cntx', propName => {
      const val = map.get(propName);
      if (typeof val !== 'object' || val === null) {
        return true;
      } else {
        return Object.getPrototypeOf(val) !==
            GlobalCanvas2dContextConstructor.prototype;
      }
    }],
    ['scaleY', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val <= 0 || val > 1);
    }],
    ['rotationAngle', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val < -halfPi || val > halfPi);
    }],
    ['startAngle', propName => {
      const val = map.get(propName);
      return map.has(propName) &&
          (!Number.isFinite(val) || val < 0 || val >= twoPi);
    }],
    ['counterClockwise', propName => {
      return map.has(propName) && typeof map.get(propName) !== 'boolean';
    }],
    ['isRimDown', propName => {
      return map.has(propName) && typeof map.get(propName) !== 'boolean';
    }],
  ]);

  for (const key of map.keys()) {
    if (!optionsNamesAndValidations.has(key)) {
      return  'pie chart: argument map contains unknown key';
    }
  }

  for (const [propName, isInvalid] of optionsNamesAndValidations) {
    if (isInvalid(propName)) {
      return 'pie chart: invalid or absent ' + propName;
    }
  }

  return hasErrorInColorsOrPercents(map) || '';
}

function hasErrorInColorsOrPercents(map) {
  const percents = map.get('percents');
  const colors = map.get('colors');
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

module.exports = validateArgument;

},{}]},{},[1]);
