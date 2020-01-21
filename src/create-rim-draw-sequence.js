'use strict';

const pi = Math.PI;

function createRimDrawSequence(args) {
  const {normalizedAngles, colors, isRimDown, counterClockwise} = args;
  const mergedAnglesColors = mergeAnglesColors(normalizedAngles, colors);
  const indOfAngleBehindZero =
    findIndOfFirstAngleBehindZero(normalizedAngles, isRimDown);

  const orderedSeq = createOrderedSequenceFromBehind0ToPi(mergedAnglesColors,
    indOfAngleBehindZero, counterClockwise);

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

function createOrderedSequenceFromBehind0ToPi(mergedAnglesColors,
  indOfAngleBehindZero, counterClockwise) {
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
