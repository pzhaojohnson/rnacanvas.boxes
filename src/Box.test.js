import { Box } from './Box';

/**
 * Creates and returns a new box-like object.
 */
function createBoxLike(x, y, width, height) {
  return { x, y, width, height };
}

describe('Box class', () => {
  describe('bounding static method', () => {
    test('boxes with positive width and height', () => {
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

    test('boxes with negative width', () => {
      let bbox = Box.bounding([
        createBoxLike(18, 771, -28, 1.1),
        createBoxLike(128, 8.25, -17.4, 0.25),
        createBoxLike(-23, 19.02, -0.82, 19),
        createBoxLike(-4, 5.51, -22.19, 8),
        createBoxLike(2, 9, -11.8, 7),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: -26.19, y: 5.51, width: 154.19, height: 766.59 });
    });

    test('boxes with negative height', () => {
      let bbox = Box.bounding([
        createBoxLike(8, 12.9, 12, -22.08),
        createBoxLike(1.2, 8.5, 18, -124),
        createBoxLike(-10.77, -3, 22.5, -88.2),
        createBoxLike(16, 0.32, 41, -37.1),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: -10.77, y: 8.5 + (-124), width: 67.77, height: 128.4 });
    });

    test('a single box', () => {
      let bbox = Box.bounding([
        createBoxLike(64, 88.2, 901, -27.5),
      ]);

      let { x, y, width, height } = bbox;
      expect({ x, y, width, height }).toStrictEqual({ x: 64, y: 88.2 + (-27.5), width: 901, height: 27.5 });
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
    let box1 = { x: 57.9, y: 223.44, width: -507.221, height: 1044.922 };
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

  test('top getter', () => {
    // positive height
    let box = new Box(55, 6.027, -8.88, 12.55);
    expect(box.top).toBeCloseTo(6.027);

    // negative height
    box = new Box(2.3, 15.82, 8.7, -9.003);
    expect(box.top).toBeCloseTo(15.82 + (-9.003));
  });

  test('right getter', () => {
    // positive width
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.right).toBeCloseTo(880.2 + 22.9804);

    // negative width
    box = new Box(-9.05, 22.01, -51.27, 15);
    expect(box.right).toBeCloseTo(-9.05);
  });

  test('bottom getter', () => {
    // positive height
    let box = new Box(55, 6.027, -8.88, 12.55);
    expect(box.bottom).toBeCloseTo(6.027 + 12.55);

    // negative height
    box = new Box(2.3, 15.82, 8.7, -9.003);
    expect(box.bottom).toBeCloseTo(15.82);
  });

  test('left getter', () => {
    // positive width
    let box = new Box(880.2, 5.1, 22.9804, 13);
    expect(box.left).toBeCloseTo(880.2);

    // negative width
    box = new Box(-9.05, 22.01, -51.27, 15);
    expect(box.left).toBeCloseTo((-9.05) + (-51.27));
  });
});
