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
