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

Many box-like objects returned by DOM element methods such as `getBBox()` and `getBoundingClientRect()`
implement the following interface.

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

```javasript
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
