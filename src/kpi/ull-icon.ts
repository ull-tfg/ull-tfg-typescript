import { simplify } from "../ull-string";

export class UllIcon {

    public static readonly MIN_LENGTH: number = 5;
    public static readonly MAX_LENGTH: number = 120;
    public static readonly REGULAR_EXPRESSION: RegExp = /^[a-zA-Z0-9\-]+$/;
    public static readonly ERROR_NOT_DEFINED: string = "Icon is not defined";
    public static readonly ERROR_MIN_LENGTH: string = `Icon must be composed of at least ${this.MIN_LENGTH} characters in length`;
    public static readonly ERROR_MAX_LENGTH: string = `Icon must be composed of at most ${this.MAX_LENGTH} characters in length`;
    public static readonly ERROR_WRONG_FORMAT: string = "Icon is not valid";
    public readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    protected validate(value: string): void {
        if (value === null) {
            throw new Error(UllIcon.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        if (value.length < UllIcon.MIN_LENGTH) {
            throw new Error(UllIcon.ERROR_MIN_LENGTH);
        }
        if (value.length > UllIcon.MAX_LENGTH) {
            throw new Error(UllIcon.ERROR_MAX_LENGTH);
        }
        if (!UllIcon.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllIcon.ERROR_WRONG_FORMAT);
        }
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllIcon)) {
            return false;
        }
        const otherIcon: UllIcon = other as UllIcon;
        return this.value === otherIcon.value;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return `${this.value}`;
    }
}