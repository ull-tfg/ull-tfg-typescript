import { UllGeoJsonGeometry } from './ull-geo-json-geometry';

/**
 * Represents a GeoJSON Feature object, which includes a geometry and associated properties.
 * A Feature wraps any geometry with additional metadata in the `properties` field.
 */
export class UllGeoJsonFeature {
    private geometry: UllGeoJsonGeometry;
    private properties?: { [key: string]: any };

    /**
     * Constructs a Feature with the specified geometry and optional properties.
     * @param geometry The geometry of the feature (must be a valid GeoJSON geometry).
     * @param properties Optional properties associated with the feature.
     */
    constructor(geometry: UllGeoJsonGeometry, properties?: { [key: string]: any }) {
        if (!geometry) {
            throw new Error('The geometry cannot be null');
        }
        this.geometry = geometry;
        this.properties = properties;
    }

    /**
     * Gets the geometry of this feature.
     * @returns The geometry object.
     */
    getGeometry(): UllGeoJsonGeometry {
        return this.geometry;
    }

    /**
     * Gets the properties of this feature.
     * @returns A key-value object containing the feature's properties, or undefined if none.
     */
    getProperties(): { [key: string]: any } | undefined {
        return this.properties;
    }

    /**
     * Sets the properties of this feature.
     * @param properties The new properties to associate with this feature.
     */
    setProperties(properties: { [key: string]: any }): void {
        this.properties = properties;
    }

    /**
     * Returns the GeoJSON-compliant representation of this feature.
     * @returns A GeoJSON Feature object.
     */
    toJson(): object {
        return {
            type: 'Feature',
            geometry: this.geometry.toJson(),
            properties: this.properties
        };
    }

    /**
     * Returns a stringified JSON representation of the feature for debugging purposes.
     * @returns A string containing the JSON representation of the feature.
     */
    toString(): string {
        return JSON.stringify(this.toJson());
    }
}
