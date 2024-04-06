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

  /**
   * The minimum Y coordinate of the box.
   *
   * Will be `y + height` if `height` is negative.
   */
  get top(): number {
    return Math.min(this.y, this.y + this.height);
  }

  /**
   * The maximum X coordinate of the box.
   *
   * Will be equal to `x` if `width` is negative.
   */
  get right(): number {
    return Math.max(this.x, this.x + this.width);
  }

  /**
   * The maximum Y coordinate of the box.
   *
   * Will be equal to `y` if `height` is negative.
   */
  get bottom(): number {
    return Math.max(this.y, this.y + this.height);
  }

  /**
   * The minimum X coordinate of the box.
   *
   * Will be equal to `x + width` if `width` is negative.
   */
  get left(): number {
    return Math.min(this.x, this.x + this.width);
  }
}
