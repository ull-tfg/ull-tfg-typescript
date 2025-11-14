import { simplify } from '../ull-string';
import { isDigit, isLetter } from '../lang/ull-char';
import { UllIPAddress } from '../net/ull-ip-address';

export class MinIOBucketName {

    public static readonly MIN_LENGTH: number = 3;
    public static readonly MAX_LENGTH: number = 63;
    public static readonly PREFIX_XN: string = "xn--";
    public static readonly PREFIX_STHREE: string = "sthree-";
    public static readonly PREFIX_STHREE_CONFIGURATOR: string = "sthree-configurator";
    public static readonly SUFFIX_S3_ALIAS: string = "-s3alias";
    public static readonly SUFFIX_OL_S3: string = "--ol-s3";
    public static readonly REGULAR_EXPRESSION: RegExp = /^[a-z\d\\.-]*$/;
    public static readonly ERROR_NOT_DEFINED: string = "Bucket name is not defined";
    public static readonly ERROR_EMPTY: string = "Bucket name cannot be empty";
    public static readonly ERROR_MIN_LENGTH: string = `Bucket name must be at least ${MinIOBucketName.MIN_LENGTH} characters in length`;
    public static readonly ERROR_MAX_LENGTH: string = `Bucket name must be at most ${MinIOBucketName.MAX_LENGTH} characters in length`;
    public static readonly ERROR_WRONG_FORMAT: string = "Bucket names can consist only of lowercase letters, numbers, dots (.), and hyphens (-)";
    public static readonly ERROR_PARSING_FROM_STRING: string = "It was not possible to parse the bucket name from '%s'";
    public static readonly ERROR_FIRST_CHARACTER_LETTER_OR_NUMBER: string = "Bucket names must begin and end with a letter or number";
    public static readonly ERROR_TWO_ADJACENT_PERIODS: string = "Bucket names must not contain two adjacent periods";
    public static readonly ERROR_IP_ADDRESS: string = "Bucket names must not be formatted as an IP address (for example, 192.168.5.4)";
    public static readonly ERROR_PREFIX_XN: string = "Bucket names must not start with the prefix 'xn--'";
    public static readonly ERROR_PREFIX_STHREE: string = "Bucket names must not start with the prefix 'sthree-' and the prefix 'sthree-configurator'";
    public static readonly ERROR_SUFFIX_S3ALIAS: string = "Bucket names must not end with the suffix '-s3alias'";
    public static readonly ERROR_SUFFIX_OL_S3: string = "Bucket names must not end with the suffix '--ol-s3'";
    private readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string): void {
        if (value == null) {
            throw new Error(MinIOBucketName.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        const length = value.length;
        if (length === 0) {
            throw new Error(MinIOBucketName.ERROR_EMPTY);
        }
        // Bucket names must be between 3 (min) and 63 (max) characters long.
        if (length < MinIOBucketName.MIN_LENGTH) {
            throw new Error(MinIOBucketName.ERROR_MIN_LENGTH);
        }
        if (length > MinIOBucketName.MAX_LENGTH) {
            throw new Error(MinIOBucketName.ERROR_MAX_LENGTH);
        }
        // Bucket names can consist only of lowercase letters, numbers, dots (.), and hyphens (-).
        if (!MinIOBucketName.REGULAR_EXPRESSION.test(value)) {
            throw new Error(MinIOBucketName.ERROR_WRONG_FORMAT);
        }
        // Bucket names must begin and end with a letter or number.
        const firstCharacter: string = value.charAt(0);
        const lastCharacter = value.charAt(value.length - 1);
        if (!isLetter(firstCharacter) && !isDigit(firstCharacter)) {
            throw new Error(MinIOBucketName.ERROR_FIRST_CHARACTER_LETTER_OR_NUMBER);
        }
        if (!isLetter(lastCharacter) && !isDigit(lastCharacter)) {
            throw new Error(MinIOBucketName.ERROR_FIRST_CHARACTER_LETTER_OR_NUMBER);
        }
        // Bucket names must not contain two adjacent periods.
        if (value.includes("..")) {
            throw new Error(MinIOBucketName.ERROR_TWO_ADJACENT_PERIODS);
        }
        // Bucket names must not be formatted as an IP address (for example, 192.168.5.4).
        if (UllIPAddress.canBeParsedFromString(value)) {
            throw new Error(MinIOBucketName.ERROR_IP_ADDRESS);
        }
        // Bucket names must not start with the prefix xn--.
        if (value.startsWith(MinIOBucketName.PREFIX_XN)) {
            throw new Error(MinIOBucketName.ERROR_PREFIX_XN);
        }
        // Bucket names must not start with the prefix sthree- and the prefix sthree-configurator.
        if (value.startsWith(MinIOBucketName.PREFIX_STHREE) || value.startsWith(MinIOBucketName.PREFIX_STHREE_CONFIGURATOR)) {
            throw new Error(MinIOBucketName.ERROR_PREFIX_STHREE);
        }
        // Bucket names must not end with the suffix -s3alias.
        if (value.endsWith(MinIOBucketName.SUFFIX_S3_ALIAS)) {
            throw new Error(MinIOBucketName.ERROR_SUFFIX_S3ALIAS);
        }
        // Bucket names must not end with the suffix --ol-s3.
        if (value.endsWith(MinIOBucketName.SUFFIX_OL_S3)) {
            throw new Error(MinIOBucketName.ERROR_SUFFIX_OL_S3);
        }
    }

    public equals(other: any): boolean {
        if (other == this) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof MinIOBucketName)) {
            return false;
        }
        const otherMinIOBucketName = other as MinIOBucketName;
        return this.value === otherMinIOBucketName.value;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
