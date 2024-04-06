/**
 * Something like a box.
 */
type BoxLike = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/**
 * Represents a box (such as things returned by methods like `getBBox` and `getBoundingClientRect`).
 */
export class Box {
  /**
   * Creates and returns a new box with the same X and Y origin coordinates and width and height
   * as the input box-like object.
   */
  static matching(box: BoxLike): Box {
    let { x, y, width, height } = box;

    return new Box(x, y, width, height);
  }

  /**
   * The width and height of the box are permitted to be negative.
   *
   * @param x The X coordinate of the origin of the box.
   * @param y The Y coordinate of the origin of the box.
   * @param width The width of the box.
   * @param height The height of the box.
   */
  constructor(readonly x: number, readonly y: number, readonly width: number, readonly height: number) {}
}
