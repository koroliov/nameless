'use strict';

const normalizeAngles = require('./normalize-angles');

function createAnglesColorsSequence({angles, colors, counterClockwise}) {
  const normalizedAngles = normalizeAngles(angles);

  const mergedSequence = mergeAnglesAndColors(normalizedAngles, colors);
  const sequenceStartingAtZeroOrBehind0 = [];

  let zeroOrNearestFromBehindAngleInd =
    findIndOfZeroAngleOrFirstBehind0(normalizedAngles, counterClockwise);
  let zeroOrNearestBehindAngleIndInMergedSeq =
    zeroOrNearestFromBehindAngleInd * 2;

  for (let i = zeroOrNearestBehindAngleIndInMergedSeq;
    i < mergedSequence.length - 1; i += 2) {
    sequenceStartingAtZeroOrBehind0
      .push(mergedSequence[i], mergedSequence[i + 1]);
  }
  for (let i = 0; i !== zeroOrNearestBehindAngleIndInMergedSeq; i += 2) {
    sequenceStartingAtZeroOrBehind0
      .push(mergedSequence[i], mergedSequence[i + 1]);
  }
  sequenceStartingAtZeroOrBehind0
    .push(mergedSequence[zeroOrNearestBehindAngleIndInMergedSeq]);

  return sequenceStartingAtZeroOrBehind0;
}

function mergeAnglesAndColors(normalizedAngles, colors) {
  const merged = [];
  colors.forEach((el, i) => merged.push(normalizedAngles[i], colors[i]));
  merged.push(normalizedAngles[normalizedAngles.length - 1]);
  return merged;
}

function findIndOfZeroAngleOrFirstBehind0(normalizedAngles, counterClockwise) {
  let index = 0;
  for (let i = 0; i < normalizedAngles.length - 1; i++) {
    if (normalizedAngles[i] === 0) {
      index = i;
      break;
    }
    if (counterClockwise) {
      if (normalizedAngles[i] < normalizedAngles[index]) {
        index = i;
      }
    } else if (normalizedAngles[i] > normalizedAngles[index]) {
      index = i;
    }
  }
  return index;
}

module.exports = createAnglesColorsSequence;
