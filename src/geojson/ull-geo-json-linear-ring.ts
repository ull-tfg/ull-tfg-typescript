import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonPosition } from './ull-geo-json-position';

/**
 * Represents a GeoJSON LinearRing geometry.
 * A LinearRing is a closed LineString with at least 4 positions, where the first and last positions are identical.
 * Note: Although LinearRing is a concept used within Polygons, it's treated here as an independent geometry class.
 */
export class UllGeoJsonLinearRing extends UllGeoJsonGeometry {
    private static readonly MINIMUM_POINTS = 4;

    private coordinates: UllGeoJsonPosition[];

    /**
     * Constructs a LinearRing with the provided coordinates.
     * Automatically ensures that the ring is closed by duplicating the first point if necessary.
     * @param coordinates An array of UllGeoJsonPosition.
     * @throws Error if fewer than 4 positions are provided.
     */
    constructor(coordinates: UllGeoJsonPosition[]) {
        super();
        if (coordinates.length < UllGeoJsonLinearRing.MINIMUM_POINTS) {
            throw new Error(`A LinearRing must have at least ${UllGeoJsonLinearRing.MINIMUM_POINTS} positions`);
        }
        const first = coordinates[0];
        const last = coordinates[coordinates.length - 1];
        if (!first.equals(last)) {
            coordinates.push(first);
        }
        this.coordinates = coordinates;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'LinearRing'.
     */
    getType(): string {
        return 'LinearRing';
    }

    /**
     * Gets the coordinates of the LinearRing.
     * @returns An array of UllGeoJsonPosition.
     */
    getCoordinates(): UllGeoJsonPosition[] {
        return this.coordinates;
    }

    /**
     * Adds a new point to the LinearRing before the closing point.
     * Automatically keeps the ring closed.
     * @param position The new position to insert.
     */
    addPoint(position: UllGeoJsonPosition): void {
        this.coordinates.splice(this.coordinates.length - 1, 0, position);
    }

    /**
     * Returns the GeoJSON-compliant representation of the LinearRing.
     * @returns A GeoJSON LineString (used inside Polygon rings).
     */
    toJson(): object {
        return {
            type: 'LineString',
            coordinates: this.coordinates.map(pos => {
                const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                const alt = pos.getAltitude();
                return alt !== undefined ? [...coord, alt] : coord;
            }),
        };
    }

    /**
     * Returns a human-readable string representation of the LinearRing.
     * @returns A string for debugging purposes.
     */
    toString(): string {
        return `UllGeoJsonLinearRing={${this.coordinates.map(coord => coord.toString()).join(', ')}}`;
    }

    /**
     * Generates a random LinearRing for testing or demo purposes.
     * The ring is always closed automatically.
     * @returns A random UllGeoJsonLinearRing.
     */
    static random(): UllGeoJsonLinearRing {
        const points: UllGeoJsonPosition[] = [];
        const numPoints = Math.max(4, Math.floor(Math.random() * 4) + 4);
        for (let i = 0; i < numPoints - 1; i++) {
            points.push(UllGeoJsonPosition.random());
        }
        points.push(points[0]);
        return new UllGeoJsonLinearRing(points);
    }
}
