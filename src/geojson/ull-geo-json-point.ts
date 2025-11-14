import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonPosition } from './ull-geo-json-position';

/**
 * Represents a GeoJSON Point geometry.
 * Stores a position with longitude, latitude and optional altitude.
 */
export class UllGeoJsonPoint extends UllGeoJsonGeometry {
    public static readonly POSITION_REQUIRED_ERROR = 'Position is required for GeoJSON Point';

    private position: UllGeoJsonPosition;

    /**
     * Constructs a GeoJSON Point from a given position.
     * @param position The position of the point.
     * @throws Error if the position is not defined.
     */
    constructor(position: UllGeoJsonPosition) {
        super();
        if (!position) {
            throw new Error(UllGeoJsonPoint.POSITION_REQUIRED_ERROR);
        }
        this.position = position;
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'Point'.
     */
    getType(): string {
        return 'Point';
    }

    /**
     * Gets the position of the point.
     * @returns The UllGeoJsonPosition of the point.
     */
    getPosition(): UllGeoJsonPosition {
        return this.position;
    }

    /**
     * Sets a new position for the point.
     * @param position New UllGeoJsonPosition.
     */
    setPosition(position: UllGeoJsonPosition): void {
        if (!position) {
            throw new Error(UllGeoJsonPoint.POSITION_REQUIRED_ERROR);
        }
        this.position = position;
    }

    /**
     * Returns the GeoJSON-compliant representation of the point.
     * @returns An object following the GeoJSON specification.
     */
    toJson(): object {
        const coordinates = [
            this.position.getLongitude(),
            this.position.getLatitude()
        ];

        if (this.position.getAltitude() !== undefined) {
            coordinates.push(this.position.getAltitude());
        }

        return {
            type: this.getType(),
            coordinates
        };
    }

    /**
     * Returns a string representation of the point for debugging.
     * @returns A human-readable string with the point's position.
     */
    toString(): string {
        return `UllGeoJsonPoint={position=${this.position.toString()}}`;
    }

    /**
     * Generates a random GeoJSON Point for testing or demo purposes.
     * @returns A random UllGeoJsonPoint.
     */
    static random(): UllGeoJsonPoint {
        return new UllGeoJsonPoint(UllGeoJsonPosition.random());
    }
}
