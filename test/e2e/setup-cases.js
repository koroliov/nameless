'use strict';

(() => {
  const ul = document.getElementById('ul');
  const canvas = document.getElementById('canvas');
  const cntx = canvas.getContext('2d');
  cntx.fillStyle = 'rgba(0, 0, 0, 0)';
  const image = document.getElementById('image');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.height - 100) / 2;

  const docFrag = document.createDocumentFragment();
  const testsMap = new Map([
    ['pie/scaled-1-slice-thick-rim-down-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [100, 0]],
        ['colors', ['#f91919', '#fff918']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', true],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-1-slice-thick-rim-down-rotated-plus-1', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [100, 0]],
        ['colors', ['#f91919', '#fff918']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', true],
        ['rotationAngle', 1],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-1-slice-thick-rim-down-rotated-min-1', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [100, 0]],
        ['colors', ['#f91919', '#fff918']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', true],
        ['rotationAngle', -1],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-1-slice-thick-rim-up-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [100, 0]],
        ['colors', ['#f91919', '#fff918']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', false],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-1-slice-slim-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 0],
        ['percents', [100, 0]],
        ['colors', ['#f91919', '#fff918']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', true],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-3-slices-thick-rim-down-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', true],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-3-slices-thick-rim-up-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', false],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/scaled-3-slices-slim-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 0],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', false],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/unscaled-1-slice-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 0],
        ['percents', [100]],
        ['colors', ['#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 1],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', false],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/unscaled-3-slices-rotated-0', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 0],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 1],
        ['startAngle', 0],
        ['counterClockwise', false],
        ['isRimDown', false],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/counter-clockwise-works', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
        ['startAngle', 0],
        ['counterClockwise', true],
        ['isRimDown', true],
        ['rotationAngle', 0],
        ['validateOptions', false],
      ]);
      createTestLink(testName, argumentMap);
    }],

    ['pie/optional-args-work', testName => {
      const argumentMap = new Map([
        ['centerX', centerX],
        ['centerY', centerY],
        ['radius', radius],
        ['thickness', 40],
        ['percents', [35, 25, 40]],
        ['colors', ['#f91919', '#fff918', '#01ff2c']],
        ['strokeColor', '#000000'],
        ['strokeWidth', 0.5],
        ['cntx', cntx],

        ['scaleY', 0.5],
      ]);
      createTestLink(testName, argumentMap);
    }],

  ]);

  for (const [testName, setup] of testsMap) {
    setup(testName);
  }
  ul.appendChild(docFrag);

  function createTestLink(testName, argumentMap) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const text = document.createTextNode(testName);
    a.appendChild(text);
    a.setAttribute('href', '#');
    a.addEventListener('click', e => {
      e.preventDefault();
      clearCanvas();
      image.setAttribute('src', 'pngs/' + testName + '.png');
      charts3d.pie(argumentMap);
    });
    li.appendChild(a);
    docFrag.appendChild(li);
  }

  function clearCanvas() {
    cntx.clearRect(0, 0, canvas.width, canvas.height);
  }
})();
