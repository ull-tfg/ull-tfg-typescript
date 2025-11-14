import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonLinearRing } from './ull-geo-json-linear-ring';
import { UllGeoJsonPosition } from './ull-geo-json-position';

/**
 * Represents a GeoJSON Polygon geometry.
 * A Polygon consists of an exterior linear ring and optional interior rings (holes).
 */
export class UllGeoJsonPolygon extends UllGeoJsonGeometry {
    private exteriorRing: UllGeoJsonLinearRing;
    private interiorRings: UllGeoJsonLinearRing[];

    /**
     * Constructs a Polygon with the given exterior ring.
     * @param exteriorRing The exterior linear ring (must be closed).
     * @throws Error if the exterior ring is not provided.
     */
    constructor(exteriorRing: UllGeoJsonLinearRing) {
        super();
        if (!exteriorRing) {
            throw new Error("The exterior ring must be provided");
        }
        this.exteriorRing = exteriorRing;
        this.interiorRings = [];
    }

    /**
     * Returns the GeoJSON geometry type.
     * @returns The string 'Polygon'.
     */
    getType(): string {
        return 'Polygon';
    }

    /**
     * Gets the exterior linear ring of the polygon.
     * @returns The exterior UllGeoJsonLinearRing.
     */
    getExteriorRing(): UllGeoJsonLinearRing {
        return this.exteriorRing;
    }

    /**
     * Sets the exterior ring of the polygon.
     * @param ring A new exterior UllGeoJsonLinearRing.
     */
    setExteriorRing(ring: UllGeoJsonLinearRing): void {
        this.exteriorRing = ring;
    }

    /**
     * Gets the interior linear rings (holes) of the polygon.
     * @returns An array of UllGeoJsonLinearRing.
     */
    getInteriorRings(): UllGeoJsonLinearRing[] {
        return this.interiorRings;
    }

    /**
     * Adds an interior linear ring (hole) to the polygon.
     * @param ring A UllGeoJsonLinearRing representing a hole.
     */
    addInteriorRing(ring: UllGeoJsonLinearRing): void {
        if (!ring) {
            throw new Error("Interior ring must be provided");
        }
        this.interiorRings.push(ring);
    }

    /**
     * Checks whether the polygon has any interior rings (holes).
     * @returns True if there are interior rings, false otherwise.
     */
    hasInteriorRings(): boolean {
        return this.interiorRings.length > 0;
    }

    /**
     * Returns the GeoJSON-compliant representation of the polygon.
     * @returns A GeoJSON Polygon object.
     */
    toJson(): object {
        const convertRing = (ring: UllGeoJsonLinearRing): (number[] | [number, number, number])[] =>
            ring.getCoordinates().map(pos => {
                const coord: [number, number] = [pos.getLongitude(), pos.getLatitude()];
                const alt = pos.getAltitude();
                return alt !== undefined ? [...coord, alt] : coord;
            });

        return {
            type: this.getType(),
            coordinates: [
                convertRing(this.exteriorRing),
                ...this.interiorRings.map(ring => convertRing(ring))
            ]
        };
    }

    /**
     * Returns a human-readable string representation of the polygon.
     * @returns A string for debugging purposes.
     */
    toString(): string {
        return `UllGeoJsonPolygon={exteriorRing=${this.exteriorRing.toString()}, interiorRings=[${this.interiorRings.map(ring => ring.toString()).join(', ')}]}`;
    }

    /**
     * Generates a random polygon for testing or demo purposes.
     * Only generates an exterior ring without holes.
     * @returns A random UllGeoJsonPolygon.
     */
    static random(): UllGeoJsonPolygon {
        const points: UllGeoJsonPosition[] = [];
        const numPoints = Math.max(4, Math.floor(Math.random() * 5) + 4); // minimum 4 to close ring
        for (let i = 0; i < numPoints - 1; i++) {
            points.push(UllGeoJsonPosition.random());
        }
        points.push(points[0]); // Close ring
        const ring = new UllGeoJsonLinearRing(points);
        return new UllGeoJsonPolygon(ring);
    }
}
