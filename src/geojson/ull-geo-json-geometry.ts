/**
 * Abstract base class for all GeoJSON geometry types.
 * All geometry classes must extend this and implement the toJson() method.
 */
export abstract class UllGeoJsonGeometry {
    /**
     * Returns the GeoJSON representation of the geometry.
     * @returns A JSON object representing the geometry.
     */
    abstract toJson(): object;

    /**
     * Returns the type of the geometry.
     * This must be overridden by each subclass to return its GeoJSON type.
     * @returns The GeoJSON geometry type as string.
     */
    abstract getType(): string;
}
