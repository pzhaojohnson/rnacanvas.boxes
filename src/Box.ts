import { min, max } from '@rnacanvas/math';

/**
 * An object like a box.
 */
type BoxLike = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

/**
 * Represents a box (similar to objects returned by methods like `getBBox` and `getBoundingClientRect`).
 *
 * Throughout this class, there is no special handling of negative width and/or height for boxes.
 */
export class Box {
  /**
   * Returns a new box exactly bounding (with no extra padding) the given box-like objects.
   *
   * Currently, it is not firmly defined what box is returned for an empty array of input box-like objects,
   * though this method will still return a box instance and won't throw.
   */
  static bounding(boxLikes: BoxLike[]): Box {
    let boxes = boxLikes.map(boxLike => Box.matching(boxLike));

    let x = min(boxes.map(box => box.left));
    let y = min(boxes.map(box => box.top));

    let width = max(boxes.map(box => box.right)) - x;
    let height = max(boxes.map(box => box.bottom)) - y;

    return new Box(x, y, width, height);
  }

  /**
   * Creates and returns a new box with the same X and Y origin coordinates and width and height
   * as the input box-like object.
   */
  static matching(box: BoxLike): Box {
    let { x, y, width, height } = box;

    return new Box(x, y, width, height);
  }

  /**
   * @param x The X coordinate of the origin of the box.
   * @param y The Y coordinate of the origin of the box.
   * @param width The width of the box.
   * @param height The height of the box.
   */
  constructor(readonly x: number, readonly y: number, readonly width: number, readonly height: number) {}

  /**
   * Center X coordinate.
   */
  get centerX(): number {
    return this.minX + (this.width / 2);
  }

  /**
   * Center Y coordinate.
   */
  get centerY(): number {
    return this.minY + (this.height / 2);
  }

  /**
   * The minimum X coordinate of the box.
   */
  get minX(): number {
    return this.x;
  }

  /**
   * The minimum Y coordinate of the box.
   */
  get minY(): number {
    return this.y;
  }

  /**
   * The maximum X coordinate of the box.
   */
  get maxX(): number {
    return this.minX + this.width;
  }

  /**
   * The maximum Y coordinate of the box.
   */
  get maxY(): number {
    return this.minY + this.height;
  }

  /**
   * The minimum Y coordinate of the box.
   */
  get top(): number {
    return this.minY;
  }

  /**
   * The maximum X coordinate of the box.
   */
  get right(): number {
    return this.maxX;
  }

  /**
   * The maximum Y coordinate of the box.
   */
  get bottom(): number {
    return this.maxY;
  }

  /**
   * The minimum X coordinate of the box.
   */
  get left(): number {
    return this.minX;
  }

  /**
   * Returns true if the box is bounded by the other box-like object
   * and returns false otherwise.
   */
  isBoundedBy(other: BoxLike): boolean {
    let otherBox = Box.matching(other);

    return (
      this.minX >= otherBox.minX
      && this.minY >= otherBox.minY
      && this.maxX <= otherBox.maxX
      && this.maxY <= otherBox.maxY
    );
  }

  /**
   * Creates and returns a new box with the specified horizontal and vertical paddings
   * around the original box this method was called upon.
   *
   * If vertical padding is left unspecified, it is interpreted to be the same as
   * the horizontal padding.
   *
   * The specified horizontal and vertical paddings are allowed to be negative
   * (to produce a box smaller than the original box).
   */
  padded(horizontalPadding: number, verticalPadding?: number): Box {
    if (typeof verticalPadding != 'number') {
      verticalPadding = horizontalPadding;
    }

    return new Box(
      this.x - horizontalPadding,
      this.y - verticalPadding,
      this.width + (2 * horizontalPadding),
      this.height + (2 * verticalPadding),
    );
  }

  /**
   * Returns the point on the periphery of the box
   * at the given angle in reference to the center point of the box.
   */
  peripheralPoint(angle: number): Point {
    let halfWidth = this.width / 2;
    let halfHeight = this.height / 2;

    // the radius of the circle that is tangent to the corners of the box
    let circleRadius = (halfWidth**2 + halfHeight**2)**0.5;

    let pointOnCircle = {
      x: this.centerX + (circleRadius * Math.cos(angle)),
      y: this.centerY + (circleRadius * Math.sin(angle)),
    };

    // the distance from the center of the box for the point on the periphery of the box to be calculated
    let distanceFromCenter = circleRadius;

    if (Math.abs(this.centerX - pointOnCircle.x) > halfWidth) {
      distanceFromCenter = Math.abs(halfWidth / Math.cos(angle));

      // can become nonfinite when the angle is close to 90 or 270 degrees
      distanceFromCenter = Number.isFinite(distanceFromCenter) ? distanceFromCenter : halfHeight;
    }

    if (Math.abs(this.centerY - pointOnCircle.y) > halfHeight) {
      distanceFromCenter = Math.abs(halfHeight / Math.sin(angle));

      // can become nonfinite when the angle is close to 0 or 180 degrees
      distanceFromCenter = Number.isFinite(distanceFromCenter) ? distanceFromCenter : halfWidth;
    }

    return {
      x: this.centerX + (distanceFromCenter * Math.cos(angle)),
      y: this.centerY + (distanceFromCenter * Math.sin(angle)),
    };
  }
}

type Point = {
  x: number;
  y: number;
};
