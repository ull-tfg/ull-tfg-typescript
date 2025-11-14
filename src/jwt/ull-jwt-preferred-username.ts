import { simplify } from '../ull-string';

export class UllJWTPreferredUsername {

	public static readonly MAX_LENGTH: number = 100;
	public static readonly REGULAR_EXPRESSION: RegExp = /^[a-zA-Z0-9\-#\.\(\)\/%&\s]{0,19}$/;
	public static readonly ERROR_NOT_DEFINED: string = 'JWT preferred username is not defined';
	public static readonly ERROR_EMPTY: string = 'JWT preferred username cannot be empty';
	public static readonly ERROR_MAX_LENGTH: string = `JWT preferred username must be composed of at most ${this.MAX_LENGTH} characters in length`;
	public static readonly ERROR_WRONG_FORMAT: string = 'JWT preferred username must only contain alphanumeric characters, special characters, and whitespaces';
	private value: string;

	constructor(value: string) {
		this.validate(value);
		this.value = simplify(value);
	}

	private validate(value: string) {
		if (value === null) {
			throw new Error(UllJWTPreferredUsername.ERROR_NOT_DEFINED);
		}
		value = simplify(value);
		const length = value.length;
		if (length === 0) {
			throw new Error(UllJWTPreferredUsername.ERROR_EMPTY);
		}
		if (length > UllJWTPreferredUsername.MAX_LENGTH) {
			throw new Error(UllJWTPreferredUsername.ERROR_MAX_LENGTH);
		}
		if (!UllJWTPreferredUsername.REGULAR_EXPRESSION.test(value)) {
			throw new Error(UllJWTPreferredUsername.ERROR_WRONG_FORMAT);
		}
	}

	public clone(): UllJWTPreferredUsername {
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
		if (!(other instanceof UllJWTPreferredUsername)) {
			return false;
		}
		const otherUsername: UllJWTPreferredUsername = other as UllJWTPreferredUsername;
		return this.value === otherUsername.value;
	}

	public from(value: string): UllJWTPreferredUsername {
		return new UllJWTPreferredUsername(value);
	}

	public getValue(): string {
		return this.value;
	}

	public toString(): string {
		return this.value;
	}
}