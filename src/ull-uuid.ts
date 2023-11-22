import { simplify } from "./ull-string";

export class UllUUID {

  public static readonly REGULAR_EXPRESSION = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  public static readonly ERROR_NOT_DEFINED = "UUID of the resource is not defined";
  public static readonly ERROR_EMPTY = "UUID of the resource cannot be empty";
  public static readonly ERROR_WRONG_FORMAT = "UUID of the resource must only contain alphanumeric characters separated by '-'";
  public static readonly ERROR_LENGTH = "UUID must be represented by 36 characters (32 hex digits + 4 dashes)";
  public static readonly LENGTH = 36;

  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = simplify(value);
  }

  private validate(value: string) {
    if (value === null) {
      throw new Error(UllUUID.ERROR_NOT_DEFINED);
    }
    value = simplify(value);
    const length = value.length;
    if (length === 0) {
      throw new Error(UllUUID.ERROR_EMPTY);
    }
    if (length !== UllUUID.LENGTH) {
      throw new Error(UllUUID.ERROR_LENGTH);
    }
    if (!UllUUID.REGULAR_EXPRESSION.test(value)) {
      throw new Error(UllUUID.ERROR_WRONG_FORMAT);
    }
  }

  public equals(other: UllUUID): boolean {
    if (other == null) {
      return false;
    }
    return this.value === other.value;
  }

  public static random(): UllUUID {
    let value = Math.random().toString(9).substring(2, 2 + 8);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 12);
    return new UllUUID(value);
  }

  public from(value: string): UllUUID {
    return new UllUUID(value);
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
