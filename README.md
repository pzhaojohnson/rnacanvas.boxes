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

## `class Box`

A 2D box.

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

box2.x; // 0
box2.y; // 10
box2.width; // 60
box2.height; // 100
```
