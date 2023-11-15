import { simplify } from "./kaizten-string";

export class KaiztenUUID {

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
      throw new Error(KaiztenUUID.ERROR_NOT_DEFINED);
    }
    value = simplify(value);
    const length = value.length;
    if (length === 0) {
      throw new Error(KaiztenUUID.ERROR_EMPTY);
    }
    if (length !== KaiztenUUID.LENGTH) {
      throw new Error(KaiztenUUID.ERROR_LENGTH);
    }
    if (!KaiztenUUID.REGULAR_EXPRESSION.test(value)) {
      throw new Error(KaiztenUUID.ERROR_WRONG_FORMAT);
    }
  }

  public equals(other: KaiztenUUID): boolean {
    if (other == null) {
      return false;
    }
    return this.value === other.value;
  }

  public static random(): KaiztenUUID {
    let value = Math.random().toString(9).substring(2, 2 + 8);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 4);
    value = value + "-" + Math.random().toString(9).substring(2, 2 + 12);
    return new KaiztenUUID(value);
  }

  public from(value: string): KaiztenUUID {
    return new KaiztenUUID(value);
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
