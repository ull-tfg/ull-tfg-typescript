import { simplify } from "../ull-string";

export class UllHexadecimalColor {

    public static readonly LENGTH: number = 7;
    public static readonly REGULAR_EXPRESSION: RegExp = /^#[0-9A-F]{6}$/i;
    public static readonly ERROR_NOT_DEFINED: string = "Color is not defined";
    public static readonly ERROR_LENGTH: string = `Color must be composed of ${UllHexadecimalColor.LENGTH} characters`;
    public static readonly ERROR_WRONG_FORMAT: string = "Color must be in hexadecimal format";
    public readonly value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string): void {
        if (value === null) {
            throw new Error(UllHexadecimalColor.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        if (value.length !== UllHexadecimalColor.LENGTH) {
            throw new Error(UllHexadecimalColor.ERROR_LENGTH);
        }
        if (!UllHexadecimalColor.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllHexadecimalColor.ERROR_WRONG_FORMAT);
        }
    }

    public equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllHexadecimalColor)) {
            return false;
        }
        const otherColor: UllHexadecimalColor = other as UllHexadecimalColor;
        return this.value === otherColor.value;
    }

    public static random(): UllHexadecimalColor {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        return new UllHexadecimalColor(randomColor);
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return `${this.value}`;
    }
}