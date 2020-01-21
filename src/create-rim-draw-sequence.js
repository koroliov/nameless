'use strict';

function createRimDrawSequence(args) {
  const {normalizedAngles, colors, isRimDown, counterClockwise} = args;
  const pi = Math.PI;
  const mergedAnglesColors = mergeAnglesColors(normalizedAngles, colors);
  const indOfAngleBehindZero =
    findIndOfFirstAngleBehindZero(normalizedAngles, isRimDown);

  const orderedSequence = createOrderedSequence(mergedAnglesColors,
    indOfAngleBehindZero, counterClockwise);
  const rimDrawSequence = [0, orderedSequence[1]];

  for (let i = 2; i < orderedSequence.length; i += 2) {
    if (orderedSequence[i] >= pi) {
      break;
    }
    rimDrawSequence.push(orderedSequence[i], orderedSequence[i + 1]);
  }
  if (orderedSequence[0] === 0) {
    rimDrawSequence.push(pi);
  } else if (orderedSequence[0] < pi) {
    rimDrawSequence.push(orderedSequence[0], orderedSequence[1], pi);
  } else {
    rimDrawSequence.push(pi);
  }

  return rimDrawSequence;
}

function createOrderedSequence(mergedAnglesColors, indOfAngleBehindZero,
  counterClockwise) {
  const orderedSequence = [];
  if (counterClockwise) {
    for (let i = indOfAngleBehindZero * 2; i > 0; i -= 2) {
      orderedSequence.push(mergedAnglesColors[i], mergedAnglesColors[i - 1]);
    }
    for (let i = mergedAnglesColors.length - 1; i > indOfAngleBehindZero * 2;
    i -= 2) {
      orderedSequence.push(mergedAnglesColors[i], mergedAnglesColors[i - 1]);
    }
  } else {
    for (let i = indOfAngleBehindZero * 2; i < mergedAnglesColors.length - 1;
    i += 2) {
      orderedSequence.push(mergedAnglesColors[i], mergedAnglesColors[i + 1]);
    }
    for (let i = 1; i < indOfAngleBehindZero * 2; i += 2) {
      orderedSequence.push(mergedAnglesColors[i - 1], mergedAnglesColors[i]);
    }
  }
  return orderedSequence;
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
