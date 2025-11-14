import { simplify } from '../ull-string';

export class MinIOPath {

    public static readonly MIN_LENGTH: number = 2;
    public static readonly MAX_LENGTH: number = 10000;
    public static readonly BUCKET_NAME_REGULAR_EXPRESSION: string = '(?!xn--)[a-z0-9](?!.*--)(?![0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+)(?!.*\\.\\-)(?!.*\\.\\.)(?!.*\\-s3alias$)([a-z0-9\\.-]){2,63}';
    public static readonly FILE_NAME_REGULAR_EXPRESSION: string = '(?!.*[-_:.]{2})[a-zA-Z0-9_\\:.-]{1,255}';
    public static readonly REGULAR_EXPRESION = new RegExp(
        `^${MinIOPath.BUCKET_NAME_REGULAR_EXPRESSION}/${MinIOPath.FILE_NAME_REGULAR_EXPRESSION}$`
    );
    public static readonly ERROR_NOT_DEFINED: string = 'Path is not defined';
    public static readonly ERROR_EMPTY: string = 'Path cannot be empty';
    public static readonly ERROR_MIN_LENGTH: string = `Path must be composed of at least ${this.MIN_LENGTH} characters in length`;
    public static readonly ERROR_MAX_LENGTH: string = `Path must be composed of at most ${this.MAX_LENGTH} characters in length`;
    public static readonly ERROR_WRONG_FORMAT: string = `Path must be in the format: ${MinIOPath.REGULAR_EXPRESION}`;
    private readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string) {
        if (value == null) {
            throw new Error(MinIOPath.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        const length = value.length;
        if (length === 0) {
            throw new Error(MinIOPath.ERROR_EMPTY);
        }
        if (length < MinIOPath.MIN_LENGTH) {
            throw new Error(MinIOPath.ERROR_MIN_LENGTH);
        }
        if (length > MinIOPath.MAX_LENGTH) {
            throw new Error(MinIOPath.ERROR_MAX_LENGTH);
        }
        if (!MinIOPath.REGULAR_EXPRESION.test(value)) {
            throw new Error(MinIOPath.ERROR_WRONG_FORMAT);
        }
    }

    public equals(other: any): boolean {
        if (other == this) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof MinIOPath)) {
            return false;
        }
        const otherMinIOPath = other as MinIOPath;
        return this.value === otherMinIOPath.value;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
