import { Box } from './Box';

describe('Box class', () => {
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
