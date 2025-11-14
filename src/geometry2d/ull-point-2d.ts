/**
 * Simple 2D point class for Kaizten geometry utilities.
 */
export class UllPoint2D {

    /**
     * X coordinate of the point. It is a required attribute.
     */
    private x: number;
    /**
     * Y coordinate of the point. It is a required attribute.
     */
    private y: number;

    /**
     * Constructs a new UllPoint2D.
     * @param x The X coordinate (default 0).
     * @param y The Y coordinate (default 0).
     */
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns the X coordinate.
     */
    public getX(): number {
        return this.x;
    }

    /**
     * Returns the Y coordinate.
     */
    public getY(): number {
        return this.y;
    }

    /**
     * Translates the point by the given delta values and returns a new point.
     * @param dx Delta X.
     * @param dy Delta Y.
     * @returns New KaiztenPoint2D translated by dx and dy.
     */
    public translate(dx: number, dy: number): UllPoint2D {
        return new UllPoint2D(this.x + dx, this.y + dy);
    }

    /**
     * Calculates the Euclidean distance to another point.
     * @param other The other KaiztenPoint2D.
     * @returns Distance as a number.
     */
    public distanceTo(other: UllPoint2D): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.hypot(dx, dy);
    }

    /**
     * Creates a shallow clone of this point.
     * @returns New KaiztenPoint2D with the same coordinates.
     */
    public clone(): UllPoint2D {
        return new UllPoint2D(this.x, this.y);
    }

    /**
     * Compares this point to another for equality.
     * @param other The other KaiztenPoint2D.
     * @param epsilon Optional tolerance for numeric comparison (default 0 = exact).
     * @returns True if points are equal within epsilon, false otherwise.
     */
    public equals(other: UllPoint2D, epsilon: number = 0): boolean {
        if (epsilon === 0) {
            return this.x === other.x && this.y === other.y;
        }
        return Math.abs(this.x - other.x) <= epsilon && Math.abs(this.y - other.y) <= epsilon;
    }

    /**
     * Returns the point as an array [x, y].
     */
    public toArray(): [number, number] {
        return [this.x, this.y];
    }

    /**
     * Creates a point from an array [x, y].
     * @param arr Array containing two numbers [x, y].
     * @returns New KaiztenPoint2D instance.
     */
    public static fromArray(arr: [number, number]): UllPoint2D {
        return new UllPoint2D(arr[0], arr[1]);
    }

    /**
     * Returns a string representation of the point.
     * @returns String in the form "KaiztenPoint2D(x, y)".
     */
    public toString(): string {
        return `UllPoint2D={${this.x}, ${this.y}}`;
    }
}