import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonPosition } from './ull-geo-json-position';

/**
 * Represents a GeoJSON MultiPoint geometry.
 * A MultiPoint is a collection of Points grouped together in a single geometry.
 */
export class UllGeoJsonMultiPoint extends UllGeoJsonGeometry {
    private coordinates: UllGeoJsonPosition[];

    /**
     * Constructs a MultiPoint with the provided array of positions.
     * @param coordinates Array of UllGeoJsonPosition.
     * @throws Error if the array is empty or not provided.
     */
    constructor(coordinates: UllGeoJsonPosition[]) {
        super();
        if (!coordinates || coordinates.length === 0) {
            throw new Error('A MultiPoint must have at least one position');
        }
        this.coordinates = coordinates;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'MultiPoint'.
     */
    getType(): string {
        return 'MultiPoint';
    }

    /**
     * Gets the positions of the MultiPoint.
     * @returns Array of UllGeoJsonPosition.
     */
    getCoordinates(): UllGeoJsonPosition[] {
        return this.coordinates;
    }

    /**
     * Sets the positions of the MultiPoint.
     * Replaces all current positions.
     * @param coordinates Array of UllGeoJsonPosition.
     * @throws Error if the array is empty or not provided.
     */
    setCoordinates(coordinates: UllGeoJsonPosition[]): void {
        if (!coordinates || coordinates.length === 0) {
            throw new Error('A MultiPoint must have at least one position');
        }
        this.coordinates = coordinates;
    }

    /**
     * Adds a new position to the MultiPoint.
     * @param position The position to add.
     */
    addPoint(position: UllGeoJsonPosition): void {
        this.coordinates.push(position);
    }

    /**
     * Returns the GeoJSON-compliant representation of the MultiPoint.
     * @returns A GeoJSON object representing the MultiPoint.
     */
    toJson(): object {
        return {
            type: 'MultiPoint',
            coordinates: this.coordinates.map(pos => {
                const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                const alt = pos.getAltitude();
                return alt !== undefined ? [...coord, alt] : coord;
            }),
        };
    }

    /**
     * Returns a human-readable string representation of the MultiPoint.
     * @returns A string for debugging purposes.
     */
    toString(): string {
        return `UllGeoJsonMultiPoint={${this.coordinates.map(coord => coord.toString()).join(', ')}}`;
    }

    /**
     * Generates a random MultiPoint for testing or demo purposes.
     * @returns A random UllGeoJsonMultiPoint with between 1 and 10 points.
     */
    static random(): UllGeoJsonMultiPoint {
        const numberOfPoints = Math.floor(Math.random() * 10) + 1;
        const positions: UllGeoJsonPosition[] = [];
        for (let i = 0; i < numberOfPoints; i++) {
            positions.push(UllGeoJsonPosition.random());
        }
        return new UllGeoJsonMultiPoint(positions);
    }
}
