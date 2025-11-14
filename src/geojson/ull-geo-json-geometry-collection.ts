import { UllGeoJsonGeometry } from './ull-geo-json-geometry';

/**
 * Represents a GeoJSON GeometryCollection object, which groups multiple geometries into a single object.
 * Each geometry in the collection can be of any type (Point, LineString, Polygon, etc.).
 */
export class UllGeoJsonGeometryCollection extends UllGeoJsonGeometry {
    private geometries: UllGeoJsonGeometry[];

    /**
     * Constructs a GeometryCollection with the provided geometries.
     * @param geometries An array of GeoJSON geometries.
     * @throws Error if the array is empty or null.
     */
    constructor(geometries: UllGeoJsonGeometry[]) {
        super();
        if (!geometries || geometries.length === 0) {
            throw new Error('The geometries cannot be null or empty');
        }
        this.geometries = geometries;
    }

    /**
     * Gets the geometries contained in this collection.
     * @returns An array of GeoJSON geometries.
     */
    getGeometries(): UllGeoJsonGeometry[] {
        return this.geometries;
    }

    /**
     * Returns the GeoJSON type of this geometry.
     * @returns The string 'GeometryCollection'.
     */
    getType(): string {
        return 'GeometryCollection';
    }

    /**
     * Returns the GeoJSON representation of this GeometryCollection.
     * @returns A GeoJSON GeometryCollection object.
     */
    toJson(): object {
        return {
            type: this.getType(),
            geometries: this.geometries.map(geometry => geometry.toJson())
        };
    }

    /**
     * Returns a stringified JSON representation of the GeometryCollection for debugging.
     * @returns A string containing the JSON representation of the collection.
     */
    toString(): string {
        return JSON.stringify(this.toJson());
    }
}
