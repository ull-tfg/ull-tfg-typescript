import type { UllGeoJsonGeometry } from './ull-geo-json-geometry';

/**
 * Represents a custom GeoJSON Feature object within the Ull ecosystem.
 * This interface is useful for cases where flexibility in the geometry type or coordinates is required,
 * typically for components that handle raw or loosely-typed geometry data.
 */
export interface UllGeoJsonCustomFeature {

  /**
   * The geometry object of the feature.
   * It must extend UllGeoJsonGeometry and also explicitly include `type` and `coordinates`.
   * This allows both type-safe geometry manipulation and flexible access to raw coordinates if needed.
   */
  geometry: UllGeoJsonGeometry & {
    type: string;
    coordinates: any;
  };

  /**
   * Optional properties associated with the feature.
   * Includes predefined fields like `name` and `color`, but can also hold any other custom properties.
   */
  properties?: {
    name?: string;
    color?: string;
    [key: string]: any;
  };
}
