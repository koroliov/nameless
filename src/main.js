'use strict';

window.charts3d = {
  pie: require('./pie/main.js')
    .bind(undefined, console.error, CanvasRenderingContext2D),
};
