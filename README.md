# Installation

With `npm`:

```
npm install @rnacanvas/boxes
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { Box } from '@rnacanvas/boxes';
```

## `interface BoxLike`

DOM element methods such as `getBBox()` and `getBoundingClientRect()`
often return box-like objects that implement the following interface.

```typescript
interface BoxLike {
  /**
   * Minimum X coordinate.
   */
  readonly x: number;

  /**
   * Minimum Y coordinate.
   */
  readonly y: number;

  readonly width: number;
  readonly height: number;
}
```

The `Box` class (below) also implements this interface
and can be instantiated from box-like objects.

## `class Box`

A two-dimensional box.

```javascript
// minimum X and Y coordinates
var x = 10;
var y = 20;

var width = 40;
var height = 80;

var box = new Box(x, y, width, height);

box.x; // 10
box.y; // 20

box.width; // 40
box.height; // 80

// center X and Y coordinates
box.centerX; // 30
box.centerY; // 60

// aliases for the minimum X and Y coordinates
box.minX; // 10
box.minY; // 20

// maximum X and Y coordinates
box.maxX; // 50
box.maxY; // 100

// a new box (with 10 padding on each side)
var box2 = box.padded(10);

// center X and Y coordinates are maintained
box2.centerX; // 30
box2.centerY; // 50

box2.x; // 0
box2.y; // 10

box2.width; // 60
box2.height; // 100
```

### `static matching()`

Boxes can be created matching the box-like objects returned by many DOM element methods (e.g., `getBBox()`).

```javascript
// an SVG circle element
circle instanceof SVGCircleElement; // true

var box = Box.matching(circle.getBBox());

box.x == circle.getBBox().x; // true
box.y == circle.getBBox().y; // true
box.width == circle.getBBox().width; // true
box.height == circle.getBBox().height; // true
```

<b>Note that DOM elements must be added to the document body for methods such as </b> `getBBox()` <b>to work.</b>

Any object implementing the `BoxLike` interface (above) can be input to the `static matching()` method.

Instances of the `Box` class can also be input to the `static matching()` method.

### `static bounding()`

Boxes can also be created bounding a collection of box-like objects.

```javascript
// some SVG elements
circle instanceof SVGCircleElement; // true
rect instanceof SVGRectElement; // true
text instanceof SVGTextElement; // true

// the box bounding the three elements
var boundingBox = Box.bounding([
  circle.getBBox(),
  rect.getBBox(),
  text.getBBox(),
]);
```

This method will throw for empty collections of box-like objects.

```javascript
Box.bounding([]); // throws
```

### `constructor()`

Parameters are specified in the order of `x`, `y`, `width` and `height`.

```javascript
var box = new Box(0, 100, 10, 20);

box.x; // 0
box.y; // 100
box.width; // 10
box.height; // 20
```

### `readonly x`

Minimum X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.x; // 0
```

### `readonly y`

Minimum Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.y; // 100
```

### `readonly width`

The width of the box.

```javascript
var box = new Box(0, 100, 10, 20);

box.width; // 10
```

### `readonly height`

The height of the box.

```javascript
var box = new Box(0, 100, 10, 20);

box.height; // 20
```

### `readonly centerX`

Center X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.centerX; // 5
```

### `readonly centerY`

Center Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.centerY; // 110
```

### `readonly minX`

Alias for the minimum X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.minX; // 0
```

### `readonly minY`

Alias for the minimum Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.minY; // 100
```

### `readonly maxX`

Maximum X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.maxX; // 10
```

### `readonly maxY`

Maximum Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.maxY; // 120
```

### `readonly top`

Minimum Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.top; // 100
```

### `readonly right`

Maximum X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.right; // 10
```

### `readonly bottom`

Maximum Y coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.bottom; // 120
```

### `readonly left`

Minimum X coordinate.

```javascript
var box = new Box(0, 100, 10, 20);

box.left; // 0
```

### `bounds()`

Returns `true` if the box bounds the other box.

```javascript
var box = new Box(0, 0, 10, 20);

// exactly bounds
box.bounds({ x: 0, y: 0, width: 10, height: 20 }); // true

// maximum X coordinate is too large
box.bounds({ x: 0, y: 0, width: 11, height: 20 }); // false

// maximum Y coordinate is too large
box.bounds({ x: 0, y: 0, width: 10, height: 21 }); // false
```

Instances of the `Box` class can also be input to the `bounds()` method.

```javascript
var box1 = new Box(0, 0, 10, 20);

var box2 = new Box(0, 0, 5, 10);

box1.bounds(box2); // true
box2.bounds(box1); // false
```

### `padded()`

Creates and returns a new box with the specified padding around the original box.

```javascript
var box1 = new Box(0, 0, 10, 20);

var box2 = box1.padded(5);

box2.minX; // -5
box2.minY; // -5
box2.maxX; // 15
box2.maxY; // 25
```

Different horizontal and vertical paddings can be specified.

```javascript
var box1 = new Box(0, 0, 10, 20);

var horizontalPadding = 5;
var verticalPadding = 1;

var box2 = box1.padded(horizontalPadding, verticalPadding);

box2.minX; // -5
box2.minY; // -1
box2.maxX; // 15
box2.maxY; // 21
```

Padding can also be specified using a relative factor
(relative to the dimensions of the box).

```javascript
var box1 = new Box(0, 0, 10, 20);

// 10% padding on each side
var box2 = box1.padded({ factor: 0.1 });

box2.minX; // -1
box2.minY; // -2
box2.maxX; // 11
box2.maxY; // 22
```

Alternatively, padding can be specified using a percentage value.

```javascript
var box1 = new Box(0, 0, 10, 20);

// 10% padding on each side
var box2 = box1.padded({ percentage: 10 });

box2.minX; // -1
box2.minY; // -2
box2.maxX; // 11
box2.maxY; // 22
```

### `readonly periphery`

Represents the periphery of the box.

The `atAngle()` method can be used to retrieve points on the periphery of a box.

```javascript
var box = new Box(0, 0, 2, 2);

// the bottom-right corner of the box
var point = box.periphery.atAngle(Math.PI / 4);

point.x; // 1
point.y; // 1

// the bottom-left corner of the box
box.periphery.atAngle(3 * Math.PI / 4).x; // -1
box.periphery.atAngle(3 * Math.PI / 4).y; // 1

// the top-left corner of the box
box.periphery.atAngle(5 * Math.PI / 4).x; // -1
box.periphery.atAngle(5 * Math.PI / 4).y; // -1

// the top-right corner of the box
box.periphery.atAngle(7 * Math.PI / 4).x; // 1
box.periphery.atAngle(7 * Math.PI / 4).y; // -1
```
