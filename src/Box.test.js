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
});
