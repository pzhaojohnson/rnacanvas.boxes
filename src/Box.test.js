import { Box } from './Box';

/**
 * Creates and returns a new box-like object.
 */
function createBoxLike(x, y, width, height) {
  return { x, y, width, height };
}

describe('Box class', () => {
  describe('bounding static method', () => {
    test('five box-like objects', () => {
      let bbox = Box.bounding([
        createBoxLike(0.008, 2.57, 554, 84),
        createBoxLike(-24, 1.98, 626, 201),
        createBoxLike(-55.2, 1.1, 82, 364.2),
        createBoxLike(28.1, -22.93, 22.51, 218),
        createBoxLike(17, 88.8, 171.828, 21),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: -55.2, y: -22.93, width: 657.2, height: 388.23 });
    });

    test('a single box', () => {
      let bbox = Box.bounding([
        createBoxLike(64, 88.2, 901, 27.5),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: 64, y: 88.2, width: 901, height: 27.5 });
    });

    test('a single box with zero width and height', () => {
      let bbox = Box.bounding([
        createBoxLike(15.02, -38.4, 0, 0),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: 15.02, y: -38.4, width: 0, height: 0 });
    });

    test('an empty array of boxes', () => {
      let bbox = Box.bounding([]);

      // still returns a box instance
      expect(bbox).toBeInstanceOf(Box);
    });
  });

  test('matching static method', () => {
    let box1 = { x: 57.9, y: 223.44, width: 507.221, height: 1044.922 };
    let box2 = Box.matching(box1);

    let { x, y, width, height } = box2;
    expect({ x, y, width, height }).toStrictEqual(box1);

    // created a new object
    expect(box2).not.toBe(box1);
  });

  test('constructor', () => {
    let box = new Box(15.2, -28.3, -101.559, 102.823);

    expect(box.x).toBe(15.2);
    expect(box.y).toBe(-28.3);
    expect(box.width).toBe(-101.559);
    expect(box.height).toBe(102.823);
  });

  test('`get centerX()`', () => {
    let box = new Box(27, -14, 82, 14);

    expect(box.centerX).toBeCloseTo(27 + (82 / 2));
  });

  test('`get centerY()`', () => {
    let box = new Box(-82, -19, 24, 15);

    expect(box.centerY).toBeCloseTo((-19) + (15 / 2));
  });

  test('minX getter', () => {
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.minX).toBeCloseTo(880.2);
  });

  test('minY getter', () => {
    let box = new Box(55, 6.027, 8.88, 12.55);
    expect(box.minY).toBeCloseTo(6.027);
  });

  test('maxX getter', () => {
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.maxX).toBeCloseTo(880.2 + 22.9804);
  });

  test('maxY getter', () => {
    let box = new Box(55, 6.027, 8.88, 12.55);
    expect(box.maxY).toBeCloseTo(6.027 + 12.55);
  });

  test('top getter', () => {
    let box = new Box(55, 6.027, 8.88, 12.55);
    expect(box.top).toBeCloseTo(6.027);
  });

  test('right getter', () => {
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.right).toBeCloseTo(880.2 + 22.9804);
  });

  test('bottom getter', () => {
    let box = new Box(55, 6.027, 8.88, 12.55);
    expect(box.bottom).toBeCloseTo(6.027 + 12.55);
  });

  test('left getter', () => {
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.left).toBeCloseTo(880.2);
  });

  test('isBoundedBy method', () => {
    let box = new Box(-21, 83, 105, 741);
    expect(box.isBoundedBy({ x: -21, y: 83, width: 105, height: 741 })).toBe(true);

    expect(box.isBoundedBy({ x: -20, y: 83, width: 104, height: 741 })).toBe(false);
    expect(box.isBoundedBy({ x: -22, y: 83, width: 106, height: 741 })).toBe(true);

    expect(box.isBoundedBy({ x: -21, y: 84, width: 105, height: 740 })).toBe(false);
    expect(box.isBoundedBy({ x: -21, y: 82, width: 105, height: 742 })).toBe(true);

    expect(box.isBoundedBy({ x: -21, y: 83, width: 104, height: 741 })).toBe(false);
    expect(box.isBoundedBy({ x: -21, y: 83, width: 106, height: 741 })).toBe(true);

    expect(box.isBoundedBy({ x: -21, y: 83, width: 105, height: 740 })).toBe(false);
    expect(box.isBoundedBy({ x: -21, y: 83, width: 105, height: 742 })).toBe(true);
  });

  describe('padded method', () => {
    test('producing a larger box', () => {
      let box1 = new Box(55, 23, 82, 94);
      let box2 = box1.padded(24, 72);

      let { x, y, width, height } = box2;
      expect({ x, y, width, height }).toStrictEqual({ x: 31, y: -49, width: 130, height: 238 });
    });

    test('producing a smaller box', () => {
      let box1 = new Box(8, 27, 121, 87);
      let box2 = box1.padded(-24, -36);

      let { x, y, width, height } = box2;
      expect({ x, y, width, height }).toStrictEqual({ x: 32, y: 63, width: 73, height: 15 });
    });

    test('specifying only horizontal padding', () => {
      let box1 = new Box(50, -212, 802, 503.4);
      let box2 = box1.padded(28.5);

      let { x, y, width, height } = box2;
      expect({ x, y, width, height }).toStrictEqual({ x: 21.5, y: -240.5, width: 859, height: 560.4 });
    });
  });
});
