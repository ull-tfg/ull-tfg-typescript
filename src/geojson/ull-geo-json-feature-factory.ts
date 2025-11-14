import { UllGeoJsonFeature } from './ull-geo-json-feature';
import { UllGeoJsonPoint } from './ull-geo-json-point';
import { UllGeoJsonLineString } from './ull-geo-json-line-string';
import { UllGeoJsonPolygon } from './ull-geo-json-polygon';
import { UllGeoJsonMultiPoint } from './ull-geo-json-multipoint';
import { UllGeoJsonMultiLineString } from './ull-geo-json-multilinestring';
import { UllGeoJsonMultiPolygon } from './ull-geo-json-multipolygon';
import { UllGeoJsonGeometry } from './ull-geo-json-geometry';
import { UllGeoJsonGeometryCollection } from './ull-geo-json-geometry-collection';
import { UllUUID } from '../ull-uuid';
import { UllGeoJsonLinearRing } from './ull-geo-json-linear-ring';
import { UllGeoJsonPosition } from './ull-geo-json-position';
  
export class UllGeoJsonFeatureFactory {

  static fromGeoJson(input: any): UllGeoJsonFeature[] {
    if (!input) throw new Error('GeoJSON input is undefined or null');
    if (input.type === 'Feature') {
      return [this.buildFeature(input)];
    }
    if (input.type === 'FeatureCollection') {
      return input.features.map((f: any) => this.buildFeature(f));
    }
    if (input.type && input.coordinates) {
      const geometry = this.buildGeometry(input);
      return [
        new UllGeoJsonFeature(geometry, {
          _id: UllUUID.random(),
          _type: geometry.getType()
        })
      ];
    }
    throw new Error(`Unsupported GeoJSON type: ${input.type}`);
  }

  static buildFeature(obj: any): UllGeoJsonFeature {
    if (!obj || obj.type !== 'Feature' || !obj.geometry) {
      throw new Error('Invalid Feature object');
    }
    const geometry = this.buildGeometry(obj.geometry);
    const properties = obj.properties || {};
    if (!properties._id) {
      properties._id = UllUUID.random();
    }
    if (!properties._type) {
      properties._type = geometry.getType();
    }
    return new UllGeoJsonFeature(geometry, properties);
  }

  static buildGeometry(obj: any): UllGeoJsonGeometry {
    switch (obj.type) {
      case 'Point':
        return new UllGeoJsonPoint(obj.coordinates);
      case 'LineString':
        return new UllGeoJsonLineString(obj.coordinates);
      case 'Polygon': {
        const rings = obj.coordinates as any[][];
        if (!Array.isArray(rings) || rings.length < 1) {
          throw new Error('Invalid Polygon: missing rings');
        }
        const toPos = (c: any): UllGeoJsonPosition => {
          if (Array.isArray(c) && c.length >= 2) {
            const [lng, lat, alt] = c;
            return new UllGeoJsonPosition(Number(lng), Number(lat), alt != null ? Number(alt) : undefined);
          }
          if (c && typeof c === 'object') {
            if ('lng' in c && 'lat' in c)
              return new UllGeoJsonPosition(Number(c.lng), Number(c.lat), c.altitude ?? c.alt);
            if ('lon' in c && 'lat' in c)
              return new UllGeoJsonPosition(Number(c.lon), Number(c.lat), c.altitude ?? c.alt);
            if ('x' in c && 'y' in c)
              return new UllGeoJsonPosition(Number(c.x), Number(c.y));
          }
          throw new Error('Invalid position for Polygon ring');
        };
        const toRing = (ringCoords: any[]): UllGeoJsonLinearRing => {
          const positions = ringCoords.map(toPos);
          return new UllGeoJsonLinearRing(positions);
        };
        const [exteriorCoords, ...interiorCoords] = rings;
        const exteriorRing = toRing(exteriorCoords);
        const polygon = new UllGeoJsonPolygon(exteriorRing);
        interiorCoords.forEach((ring) => polygon.addInteriorRing(toRing(ring)));
        return polygon;
      }
      case 'MultiPoint':
        return new UllGeoJsonMultiPoint(obj.coordinates);
      case 'MultiLineString':
        return new UllGeoJsonMultiLineString(obj.coordinates);
      case 'MultiPolygon': {
        return new UllGeoJsonMultiPolygon(obj.coordinates);
      }
      case 'GeometryCollection':
        return new UllGeoJsonGeometryCollection(
          obj.geometries.map((g: any) => this.buildGeometry(g))
        );
      default:
        throw new Error(`Unsupported geometry type: ${obj.type}`);
    }
  }
    
}
  