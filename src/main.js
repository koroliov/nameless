'use strict';

window.texas = {
  pie: require('./pie/main.js')
    .bind(undefined, console.error, CanvasRenderingContext2D),
};
