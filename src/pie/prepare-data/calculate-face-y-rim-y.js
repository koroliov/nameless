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
