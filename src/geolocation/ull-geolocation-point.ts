export class UllGeolocationPoint {

    public static readonly LONGITUDE_MIN: number = -180.0;
    public static readonly LONGITUDE_MAX: number = 180.0;
    public static readonly ERROR_LONGITUDE_MIN: string = `Longitude must be equal or greater than ${UllGeolocationPoint.LONGITUDE_MIN}`;
    public static readonly ERROR_LONGITUDE_MAX: string = `Longitude must be lesser or equal to ${UllGeolocationPoint.LONGITUDE_MAX}`;
    public static readonly LATITUDE_MIN: number = -90.0;
    public static readonly LATITUDE_MAX: number = 90.0;
    public static readonly ERROR_LATITUDE_MIN: string = `Latitude must be equal or greater than ${UllGeolocationPoint.LATITUDE_MIN}`;
    public static readonly ERROR_LATITUDE_MAX: string = `Latitude must be lesser or equals to ${UllGeolocationPoint.LATITUDE_MAX}`;
    private readonly longitude: number;
    private readonly latitude: number;

    constructor(longitude: number, latitude: number) {
        UllGeolocationPoint.validateLongitude(longitude);
        UllGeolocationPoint.validateLatitude(latitude);
        this.longitude = longitude;
        this.latitude = latitude;
    }

    private static validateLongitude(longitude: number) {
        if (longitude < UllGeolocationPoint.LONGITUDE_MIN) {
            throw new Error(UllGeolocationPoint.ERROR_LONGITUDE_MIN);
        }
        if (longitude > UllGeolocationPoint.LONGITUDE_MAX) {
            throw new Error(UllGeolocationPoint.ERROR_LONGITUDE_MAX);
        }
    }

    private static validateLatitude(latitude: number) {
        if (latitude < UllGeolocationPoint.LATITUDE_MIN) {
            throw new Error(UllGeolocationPoint.ERROR_LATITUDE_MIN);
        }
        if (latitude > UllGeolocationPoint.LATITUDE_MAX) {
            throw new Error(UllGeolocationPoint.ERROR_LATITUDE_MAX);
        }
    }

    public clone(): UllGeolocationPoint {
        return Object.create(
            Object.getPrototypeOf(this),
            Object.getOwnPropertyDescriptors(this));
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllGeolocationPoint)) {
            return false;
        }
        const otherPoint: UllGeolocationPoint = other as UllGeolocationPoint;
        return (this.longitude === otherPoint.longitude) && (this.latitude === otherPoint.latitude);
    }

    public static externalValidateLongitude(value: number): boolean | string {
        try {
            UllGeolocationPoint.validateLongitude(value);
            return true;
        } catch (error: any) {
            return error.message;
        }
    }

    public static externalValidateLatitude(value: number): boolean | string {
        try {
            UllGeolocationPoint.validateLatitude(value);
            return true;
        } catch (error: any) {
            return error.message;
        }
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLongitude(newLongitude: number): UllGeolocationPoint {
        UllGeolocationPoint.validateLongitude(newLongitude);
        return new UllGeolocationPoint(newLongitude, this.latitude);
    }

    public setLatitude(newLatitude: number): UllGeolocationPoint {
        UllGeolocationPoint.validateLatitude(newLatitude);
        return new UllGeolocationPoint(this.longitude, newLatitude);
    }

    public toString(): string {
        return `UllGeolocationPoint={` +
            `longitude=${this.longitude},` +
            `latitude=${this.latitude}` +
            `}`;
    }
}
