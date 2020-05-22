#3d-like chart examples with an HTML canvas element

*currently only the pie chart is available*

It should work in any modern browser, but was tested only in desktop latest versions of Firefox, Chrome on Linux and Opera on Windows.

If you want to use it in another environment, like Node.js, it can be done relatively easy, so either open an issue here or modify it yourself.

## Usage

Include the script (either minified or not) from the build directory of the repository:

```html
<script src="texas.min.js"></script>
```

This will create a global `window.texas` property on your page.

**It doesn't fill the background or clear anything on your canvas.** So you must pay attention to this and to either fill the canvas background yourself or use the background of HTML element(s), which are visible behind the canvas. But if you rely on the background of HTML elements and the user decides to save the canvas as an image, its background will be transparent. Also pay attention to transformations already applied to the canvas like scaling, translation etc.

### pie

To create a pie chart you need to call `window.texas.pie` as a function **not as a constructor** and provide it a map with options (some of which can be omitted):

```javascript
const map = new Map([
  ['centerX', 150],
  ['centerY', 110],
  ['radius', 100],
  ['thickness', 40],
  ['percents', [16, 4, 34, 46]],
  ['colors', ['#f91919', '#fff918', '#01ff2c', '#341ad8']],
  ['strokeColor', '#000000'],
  ['strokeWidth', 0.2],
  ['cntx', document.getElementById('canvas').getContext('2d')],

  ['scaleY', 0.6],
  ['startAngle', 3 * Math.PI / 2],
  ['counterClockwise', true],
  ['isRimDown', true],
  ['rotationAngle', 0],
  ['validateOptions', false],
]);
texas.pie(map);
```

This creates (if the background was previously filled with white):

![a pie with 4 slices "rotated" by the angle arccosine(`scaleY`) around the ox axis](examples/scaled-4-slices-rim-down.png?raw=true "a pie with 4 slices \"rotated\" by the angle arccosine(`scaleY`) around the ox axis") 

#### pie's options:

##### mandatory:

- *centerX* — number, the x coordinate of the pie's center.
- *centerY* — number, the y coordinate of the pie's center.
- *radius* — a positive number, the radius length of the pie.
- *thickness* — a non-negative number, the thickness (height) of the pie.
- *percents* — array, an array of numbers, each representing the percent value of a slice of the pie (**the sum must be 100**, zeroes are allowed).
- *colors* — array, an array of strings each representing the color of a slice. **Must be the same length as the percents**. Each percents' value like `percents[2]` will have the color of the same index from the colors value, like `colors[2]`.
Only the full hex color format (like `#ffffff`) was tested and is supported, though it will probably work with other possible color values like `red`, `rgba(0, 0, 0, 0)`, `#000` etc.
- *strokeColor* — string, the color to stroke slices and pie's edges with. Has the same restrictions to the format, as the colors option.
- *strokeWidth* — a positive number, the width of the stroke lines.
- *cntx* — a 2d context of a canvas element on the page.

##### optional:

- *scaleY* — a number in the range (0, 1], default is 1, which creates a simple 2d circle pie.
- *startAngle* — a number in the range [0, `2 * Math.PI`), means a point on the pie, where the first visible slice (which does not have a 0% value) appears, default is `3 * Math.PI / 2` (which is 12 o'clock).
- *counterClockwise* — boolean, the direction in which the slices will be drawn from the startAngle, default is false.
- *isRimDown* — boolean, where the visible part of the pie's rim will appear, default is true.
- *rotationAngle* — a number in the range [`-Math.PI / 2`, `Math.PI / 2`], means the angle by which the whole pie will be rotated around its (centerX, centerY) point, default is 0.
- *validateOptions* — boolean, when set it will try to spot errors in the options' provided values and in case any are found it will output a message to `console.error` with a hint about the problem, and won't proceed with the drawing. This option exists solely for debugging purposes.

#### Idea

The idea is that it's possible to simulate a 3d pie with a 2d context and its available transformations, if one takes the y scaling as the cosine of the rotation angle around the ox axis (it is an acceptable approximation, if the dimensions are small) and the rotation around the origin can complement the missing rotations around the oy an oz axes. It's not possible to use both the y and x scaling to simulate the rotations around the ox and oy axes, since in that case the image becomes distorted and does not correctly represent the rotations.

#### Examples

##### a pie with 4 slices "rotated" by the angle -arccosine(`scaleY`) around the ox axis
```javascript
const map = new Map([
  ['centerX', 150],
  ['centerY', 110],
  ['radius', 100],
  ['thickness', 40],
  ['percents', [16, 4, 34, 46]],
  ['colors', ['#f91919', '#fff918', '#01ff2c', '#341ad8']],
  ['strokeColor', '#000000'],
  ['strokeWidth', 0.2],
  ['cntx', document.getElementById('canvas').getContext('2d')],

  ['scaleY', 0.6],
  ['startAngle', 3 * Math.PI / 2],
  ['counterClockwise', true],
  ['isRimDown', false],
  ['rotationAngle', 0],
  ['validateOptions', false],
]);
texas.pie(map);
```

This creates (if the background was previously filled with white):

![a pie with 4 slices "rotated" by the angle -arccosine(`scaleY`) around the ox axis](examples/scaled-4-slices-rim-up.png?raw=true "")

##### a circular pie
```javascript
const map = new Map([
  ['centerX', 150],
  ['centerY', 110],
  ['radius', 100],
  ['thickness', 40],
  ['percents', [16, 4, 34, 46]],
  ['colors', ['#f91919', '#fff918', '#01ff2c', '#341ad8']],
  ['strokeColor', '#000000'],
  ['strokeWidth', 0.2],
  ['cntx', document.getElementById('canvas').getContext('2d')],

  ['scaleY', 1],
  ['startAngle', 3 * Math.PI / 2],
  ['counterClockwise', true],
  ['isRimDown', false],
  ['rotationAngle', 0],
  ['validateOptions', false],
]);
texas.pie(map);
```

This creates (if the background was previously filled with white):

![a circular pie](examples/not-scaled-4-slices.png?raw=true "")

##### a pie rotated around the origin
```javascript
const map = new Map([
  ['centerX', 150],
  ['centerY', 110],
  ['radius', 100],
  ['thickness', 40],
  ['percents', [16, 4, 34, 46]],
  ['colors', ['#f91919', '#fff918', '#01ff2c', '#341ad8']],
  ['strokeColor', '#000000'],
  ['strokeWidth', 0.2],
  ['cntx', document.getElementById('canvas').getContext('2d')],

  ['scaleY', 0.6],
  ['startAngle', 3 * Math.PI / 2],
  ['counterClockwise', true],
  ['isRimDown', true],
  ['rotationAngle', 1],
  ['validateOptions', false],
]);
texas.pie(map);
```

This creates (if the background was previously filled with white):

![a circular pie](examples/scaled-4-slices-rotated.png?raw=true "")

## License

MIT
