import { Box } from './Box';

describe('Box class', () => {
  test('constructor', () => {
    let box = new Box(15.2, -28.3, -101.559, 102.823);

    expect(box.x).toBe(15.2);
    expect(box.y).toBe(-28.3);
    expect(box.width).toBe(-101.559);
    expect(box.height).toBe(102.823);
  });
});
