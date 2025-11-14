import { UllGeoJsonType } from "./ull-geo-json-type";

/**
 * Represents a position in GeoJSON coordinates ([longitude, latitude, altitude?]).
 * Supports validation, serialization, and equality checks.
 */
export class UllGeoJsonPosition {

    /** Minimum allowed longitude (-180°) */
    private static readonly LONGITUDE_MIN = -180.0;
    /** Maximum allowed longitude (+180°) */
    private static readonly LONGITUDE_MAX = 180.0;
    /** Minimum allowed latitude (-90°) */
    private static readonly LATITUDE_MIN = -90.0;
    /** Maximum allowed latitude (+90°) */
    private static readonly LATITUDE_MAX = 90.0;
    /** Constant representing an undefined altitude */
    private static readonly ALTITUDE_NOT_DEFINED = -1.0;

    private longitude: number;
    private latitude: number;
    private altitude: number;

    /**
     * Constructs a GeoJSON Position.
     * @param longitude Longitude in degrees.
     * @param latitude Latitude in degrees.
     * @param altitude Optional altitude in meters.
     * @throws Error if latitude or longitude are out of bounds.
     */
    constructor(longitude: number, latitude: number, altitude?: number) {
        this.validateLongitude(longitude);
        this.validateLatitude(latitude);
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude ?? UllGeoJsonPosition.ALTITUDE_NOT_DEFINED;
    }

    /** Validates the longitude range. */
    private validateLongitude(longitude: number): void {
        if (longitude < UllGeoJsonPosition.LONGITUDE_MIN || longitude > UllGeoJsonPosition.LONGITUDE_MAX) {
            throw new Error(`Longitude must be in range [${UllGeoJsonPosition.LONGITUDE_MIN}, ${UllGeoJsonPosition.LONGITUDE_MAX}]`);
        }
    }

    /** Validates the latitude range. */
    private validateLatitude(latitude: number): void {
        if (latitude < UllGeoJsonPosition.LATITUDE_MIN || latitude > UllGeoJsonPosition.LATITUDE_MAX) {
            throw new Error(`Latitude must be in range [${UllGeoJsonPosition.LATITUDE_MIN}, ${UllGeoJsonPosition.LATITUDE_MAX}]`);
        }
    }

    /** Validates the altitude to be >= 0 (if required). */
    private validateAltitude(altitude: number): void {
        if (altitude < 0) {
            throw new Error("Altitude must be greater than or equal to 0");
        }
    }

    /** Gets the longitude. */
    getLongitude(): number {
        return this.longitude;
    }

    /** Gets the latitude. */
    getLatitude(): number {
        return this.latitude;
    }

    /** Gets the altitude, if defined. */
    getAltitude(): number | undefined {
        return this.altitude !== UllGeoJsonPosition.ALTITUDE_NOT_DEFINED ? this.altitude : undefined;
    }

    /** Returns a new position with updated longitude. */
    setLongitude(longitude: number): UllGeoJsonPosition {
        this.validateLongitude(longitude);
        return new UllGeoJsonPosition(longitude, this.latitude, this.altitude);
    }

    /** Returns a new position with updated latitude. */
    setLatitude(latitude: number): UllGeoJsonPosition {
        this.validateLatitude(latitude);
        return new UllGeoJsonPosition(this.longitude, latitude, this.altitude);
    }

    /** Returns a new position with updated altitude. */
    setAltitude(altitude: number): UllGeoJsonPosition {
        this.validateAltitude(altitude);
        return new UllGeoJsonPosition(this.longitude, this.latitude, altitude);
    }

    /** Checks if this position has an altitude defined. */
    hasAltitude(): boolean {
        return this.altitude !== UllGeoJsonPosition.ALTITUDE_NOT_DEFINED;
    }

    /**
     * Returns the GeoJSON representation of the position as a Point.
     * @returns Object with type 'Point' and coordinates.
     */
    toJson(): object {
        const coordinates = [this.longitude, this.latitude];
        if (this.hasAltitude()) {
            coordinates.push(this.altitude);
        }
        return {
            type: UllGeoJsonType.POINT,
            coordinates
        };
    }

    /**
     * Generates a random position within valid latitude and longitude ranges.
     * Altitude may be randomly assigned or omitted.
     */
    static random(): UllGeoJsonPosition {
        const randomLongitude = Math.random() * (UllGeoJsonPosition.LONGITUDE_MAX - UllGeoJsonPosition.LONGITUDE_MIN) + UllGeoJsonPosition.LONGITUDE_MIN;
        const randomLatitude = Math.random() * (UllGeoJsonPosition.LATITUDE_MAX - UllGeoJsonPosition.LATITUDE_MIN) + UllGeoJsonPosition.LATITUDE_MIN;
        const randomAltitude = Math.random() < 0.5 ? undefined : Math.random() * 1000;
        return new UllGeoJsonPosition(randomLongitude, randomLatitude, randomAltitude);
    }

    /**
     * Compares this position with another, using high precision.
     * @param other Another GeoJSON position to compare with.
     * @returns True if they match in longitude and latitude within a small margin.
     */
    equals(other: UllGeoJsonPosition): boolean {
        return this.areCoordinatesEqual(other.getLatitude(), other.getLongitude());
    }

    /** Internal comparison of coordinates using a precision threshold. */
    private areCoordinatesEqual(lat2: number, lon2: number, precision: number = 1e-11): boolean {
        const isLatitudeEqual = Math.abs(this.latitude - lat2) < precision;
        const isLongitudeEqual = Math.abs(this.longitude - lon2) < precision;
        return isLatitudeEqual && isLongitudeEqual;
    }

    /** Returns a string representation of the position. */
    toString(): string {
        const altitude = this.hasAltitude() ? `, altitude=${this.altitude}` : '';
        return `UllGeoJsonPosition={longitude=${this.longitude}, latitude=${this.latitude}${altitude}}`;
    }
}
