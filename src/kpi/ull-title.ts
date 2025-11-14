import { simplify } from "../ull-string";

export class UllTitle {

    public static readonly MIN_LENGTH: number = 1;
    public static readonly MAX_LENGTH: number = 100;
    public static readonly REGULAR_EXPRESSION: RegExp = /^[a-zA-Z0-9\s\-()_.,:;'"¡!¿?&%$@#€*\[\]áéíóúÁÉÍÓÚüÜñÑ]+$/;
    public static readonly ERROR_NOT_DEFINED: string = "Title is not defined";
    public static readonly ERROR_MIN_LENGTH: string = `Title must be composed of at least ${this.MIN_LENGTH} characters in length`;
    public static readonly ERROR_MAX_LENGTH: string = `Title must be composed of at most ${this.MAX_LENGTH} characters in length`;
    public static readonly ERROR_WRONG_FORMAT: string = "Title must be alphanumeric with spaces";
    public readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    protected validate(value: string): void {
        if (value === null) {
            throw new Error(UllTitle.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        if (value.length < UllTitle.MIN_LENGTH) {
            throw new Error(UllTitle.ERROR_MIN_LENGTH);
        }
        if (value.length > UllTitle.MAX_LENGTH) {
            throw new Error(UllTitle.ERROR_MAX_LENGTH);
        }
        if (!UllTitle.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllTitle.ERROR_WRONG_FORMAT);
        }
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: UllTitle): boolean {
        return other.value === this.value;
    }

    public toString(): string {
        return `${this.value}`;
    }
}