import { simplify } from "../ull-string";
import { randomAlphabeticChar } from "../lang/ull-char";
import { random, randomNumber } from "../lang/ull-number";

export class UllIPAddress {

    public static readonly REGULAR_EXPRESSION = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\.(?!$)|$)){4}$/;
    public static readonly ERROR_NOT_DEFINED: string = "IP address is not defined";
    public static readonly ERROR_EMPTY = "IP address cannot be empty";
    public static readonly ERROR_WRONG_FORMAT = "IP address must be of the form '123.26.51.217'";
    private value: string;

    constructor(value: string) {
        this.validate(value);
        this.value = simplify(value);
    }

    private validate(value: string): void {
        if (value == null) {
            throw new Error(UllIPAddress.ERROR_NOT_DEFINED);
        }
        value = simplify(value);
        const length = value.length;
        if (length == 0) {
            throw new Error(UllIPAddress.ERROR_EMPTY);
        }
        if (!UllIPAddress.REGULAR_EXPRESSION.test(value)) {
            throw new Error(UllIPAddress.ERROR_WRONG_FORMAT);
        }
    }

    public equals(other: any): boolean {
        if (other == this) {
            return true;
        }
        if (other === null || other === undefined) {
            return false;
        }
        if (!(other instanceof UllIPAddress)) {
            return false;
        }
        const otherIpAddress = other as UllIPAddress;
        return this.value === otherIpAddress.value;
    }

    public static fromString(ip: string): UllIPAddress {
        return new UllIPAddress(ip);
    }

    public static canBeParsedFromString(ip: string): boolean {
        try {
            new UllIPAddress(ip);
        } catch (error) {
            return false;
        }
        return true;
    }

    public hashCode(): number {
        let hash = 0;
        if (this.value.length === 0) {
            return hash;
        }
        for (let i = 0; i < this.value.length; i++) {
            const char = this.value.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return hash;
    }

    public static random(): UllIPAddress {
        const value: string = UllIPAddress.randomValidValue();
        return new UllIPAddress(value);
    }

    public static randomValidValue(): string {
        let value: string = "";
        for (let i = 0; i < 3; i++) {
            value += "" + randomNumber(255) + ".";
        }
        value += "" + randomNumber(255);
        return value;
    }

    public static randomInvalidValue(): string {
        let value: string = "";
        const length: number = random(1, 10);
        for (let i = 0; i < length; i++) {
            value += randomAlphabeticChar();
        }
        return value;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}