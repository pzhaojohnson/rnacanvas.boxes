/**
 * Represents a box (such as things returned by methods like `getBBox` and `getBoundingClientRect`).
 */
export class Box {
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
