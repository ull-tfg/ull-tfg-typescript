import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonPolygon } from './ull-geo-json-polygon';

/**
 * Represents a GeoJSON MultiPolygon geometry.
 * A MultiPolygon is a collection of Polygon geometries grouped into a single object.
 */
export class UllGeoJsonMultiPolygon extends UllGeoJsonGeometry {
    private polygons: UllGeoJsonPolygon[];

    /**
     * Constructs a MultiPolygon with the given array of Polygon geometries.
     * @param polygons Array of UllGeoJsonPolygon.
     * @throws Error if the array is empty or undefined.
     */
    constructor(polygons: UllGeoJsonPolygon[]) {
        super();
        if (!polygons || polygons.length === 0) {
            throw new Error('A MultiPolygon must have at least one Polygon');
        }
        this.polygons = polygons;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'MultiPolygon'.
     */
    getType(): string {
        return 'MultiPolygon';
    }

    /**
     * Gets the polygons in the MultiPolygon.
     * @returns Array of UllGeoJsonPolygon.
     */
    getPolygons(): UllGeoJsonPolygon[] {
        return this.polygons;
    }

    /**
     * Adds a new polygon to the MultiPolygon.
     * @param polygon The polygon to add.
     */
    addPolygon(polygon: UllGeoJsonPolygon): void {
        this.polygons.push(polygon);
    }

    /**
     * Returns the GeoJSON-compliant representation of the MultiPolygon.
     * @returns A GeoJSON object representing the MultiPolygon.
     */
    toJson(): object {
        const convertRing = (polygon: UllGeoJsonPolygon) =>
            [
                polygon.getExteriorRing().getCoordinates().map(pos => {
                    const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                    const alt = pos.getAltitude();
                    return alt !== undefined ? [...coord, alt] : coord;
                }),
                ...polygon.getInteriorRings().map(ring =>
                    ring.getCoordinates().map(pos => {
                        const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                        const alt = pos.getAltitude();
                        return alt !== undefined ? [...coord, alt] : coord;
                    })
                )
            ];

        return {
            type: 'MultiPolygon',
            coordinates: this.polygons.map(convertRing)
        };
    }

    /**
     * Returns a human-readable string representation of the MultiPolygon.
     * @returns A string for debugging purposes.
     */
    toString(): string {
        return `UllGeoJsonMultiPolygon={${this.polygons.map(p => p.toString()).join(', ')}}`;
    }

    /**
     * Generates a random MultiPolygon for testing or demo purposes.
     * @returns A random UllGeoJsonMultiPolygon with 1 to 3 random polygons.
     */
    static random(): UllGeoJsonMultiPolygon {
        const numberOfPolygons = Math.floor(Math.random() * 3) + 1;
        const polygons: UllGeoJsonPolygon[] = [];
        for (let i = 0; i < numberOfPolygons; i++) {
            polygons.push(UllGeoJsonPolygon.random());
        }
        return new UllGeoJsonMultiPolygon(polygons);
    }
}
