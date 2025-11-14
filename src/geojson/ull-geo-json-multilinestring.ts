import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonLineString } from './ull-geo-json-line-string';

/**
 * Represents a GeoJSON MultiLineString geometry.
 * A MultiLineString is a collection of LineStrings grouped together in a single geometry.
 */
export class UllGeoJsonMultiLineString extends UllGeoJsonGeometry {
    private lineStrings: UllGeoJsonLineString[];

    /**
     * Constructs a MultiLineString with the provided array of LineStrings.
     * @param lineStrings Array of UllGeoJsonLineString.
     * @throws Error if the array is empty or not provided.
     */
    constructor(lineStrings: UllGeoJsonLineString[]) {
        super();
        if (!lineStrings || lineStrings.length === 0) {
            throw new Error('A MultiLineString must have at least one LineString');
        }
        this.lineStrings = lineStrings;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'MultiLineString'.
     */
    getType(): string {
        return 'MultiLineString';
    }

    /**
     * Gets the LineStrings of the MultiLineString.
     * @returns Array of UllGeoJsonLineString.
     */
    getLineStrings(): UllGeoJsonLineString[] {
        return this.lineStrings;
    }

    /**
     * Adds a new LineString to the MultiLineString.
     * @param lineString The LineString to add.
     */
    addLineString(lineString: UllGeoJsonLineString): void {
        this.lineStrings.push(lineString);
    }

    /**
     * Returns the GeoJSON-compliant representation of the MultiLineString.
     * @returns A GeoJSON object representing the MultiLineString.
     */
    toJson(): object {
        return {
            type: 'MultiLineString',
            coordinates: this.lineStrings.map(ls =>
                ls.getCoordinates().map(pos => {
                    const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                    const alt = pos.getAltitude();
                    return alt !== undefined ? [...coord, alt] : coord;
                })
            )
        };
    }

    /**
     * Returns a human-readable string representation of the MultiLineString.
     * @returns A string for debugging purposes.
     */
    toString(): string {
        return `UllGeoJsonMultiLineString={${this.lineStrings.map(ls => ls.toString()).join(', ')}}`;
    }

    /**
     * Generates a random MultiLineString for testing or demo purposes.
     * @returns A random UllGeoJsonMultiLineString with between 1 and 5 LineStrings.
     */
    static random(): UllGeoJsonMultiLineString {
        const numberOfLines = Math.floor(Math.random() * 5) + 1;
        const lines: UllGeoJsonLineString[] = [];
        for (let i = 0; i < numberOfLines; i++) {
            lines.push(UllGeoJsonLineString.random());
        }
        return new UllGeoJsonMultiLineString(lines);
    }
}
