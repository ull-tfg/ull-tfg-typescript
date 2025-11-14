import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonPosition } from './ull-geo-json-position';

/**
 * Represents a GeoJSON LineString geometry.
 * Stores an ordered array of positions (minimum two).
 */
export class UllGeoJsonLineString extends UllGeoJsonGeometry {
    public static readonly MINIMUM_POSITIONS = 2;

    private coordinates: UllGeoJsonPosition[];

    /**
     * Constructs a GeoJSON LineString from an array of positions.
     * @param coordinates An array of UllGeoJsonPosition with at least two points.
     * @throws Error if the array has fewer than two positions.
     */
    constructor(coordinates: UllGeoJsonPosition[]) {
        super();
        if (!coordinates || coordinates.length < UllGeoJsonLineString.MINIMUM_POSITIONS) {
            throw new Error(`A LineString must have at least ${UllGeoJsonLineString.MINIMUM_POSITIONS} positions`);
        }
        this.coordinates = coordinates;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'LineString'.
     */
    getType(): string {
        return 'LineString';
    }

    /**
     * Gets the array of positions (coordinates) in the line.
     * @returns Array of UllGeoJsonPosition.
     */
    getCoordinates(): UllGeoJsonPosition[] {
        return this.coordinates;
    }

    /**
     * Sets new coordinates for the line.
     * @param coordinates New array of UllGeoJsonPosition.
     */
    setCoordinates(coordinates: UllGeoJsonPosition[]): void {
        if (!coordinates || coordinates.length < UllGeoJsonLineString.MINIMUM_POSITIONS) {
            throw new Error(`A LineString must have at least ${UllGeoJsonLineString.MINIMUM_POSITIONS} positions`);
        }
        this.coordinates = coordinates;
    }

    /**
     * Adds a point to the end of the LineString.
     * @param position A UllGeoJsonPosition to add.
     */
    addPoint(position: UllGeoJsonPosition): void {
        this.coordinates.push(position);
    }

    /**
     * Returns the GeoJSON-compliant representation of the LineString.
     * @returns A GeoJSON LineString object.
     */
    toJson(): object {
        return {
            type: this.getType(),
            coordinates: this.coordinates.map(coord => {
                const array: [number, number] = [coord.getLongitude(), coord.getLatitude()];
                const altitude = coord.getAltitude();
                if (altitude !== undefined) {
                    return [...array, altitude];
                }
                return array;
            })
        };
    }

    /**
     * Returns a string representation of the LineString for debugging.
     * @returns A human-readable string.
     */
    toString(): string {
        return `UllGeoJsonLineString={${this.coordinates.map(coord => coord.toString()).join(',')}}`;
    }

    /**
     * Generates a random GeoJSON LineString for testing or demo purposes.
     * @returns A random UllGeoJsonLineString.
     */
    static random(): UllGeoJsonLineString {
        const numberOfPoints = Math.floor(Math.random() * 10) + UllGeoJsonLineString.MINIMUM_POSITIONS;
        const positions: UllGeoJsonPosition[] = [];
        for (let i = 0; i < numberOfPoints; i++) {
            positions.push(UllGeoJsonPosition.random());
        }
        return new UllGeoJsonLineString(positions);
    }
}
