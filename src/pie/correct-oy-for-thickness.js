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
