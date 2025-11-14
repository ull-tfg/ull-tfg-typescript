/**
 * Represents a mathematical fraction with a numerator and a denominator.
 * Provides methods for parsing, formatting, and performing basic operations.
 */
export class UllFraction {
  private numerator: number;
  private denominator: number;

  /**
   * Constructs a new KaiztenFraction instance.
   * @param numerator The numerator of the fraction.
   * @param denominator The denominator of the fraction. Must not be zero.
   * @throws {Error} If the denominator is zero.
   */
  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    this.numerator = numerator;
    this.denominator = denominator;
  }

  /**
   * Parses a fraction string in the format "numerator/denominator".
   * @param input The fraction string to parse.
   * @returns A new KaiztenFraction instance.
   * @throws {Error} If the string format is invalid.
   */
  public static parse(input: string): UllFraction {
    const parts = input.split('/');
    if (parts.length !== 2) {
      throw new Error('Invalid fraction format. Expected "numerator/denominator".');
    }
    const numerator = parseInt(parts[0], 10);
    const denominator = parseInt(parts[1], 10);
    return new UllFraction(numerator, denominator);
  }

  /**
   * Returns the numerator of the fraction.
   * @returns The numerator as a number.
   */
  public getNumerator(): number {
    return this.numerator;
  }

  /**
   * Returns the denominator of the fraction.
   * @returns The denominator as a number.
   */
  public getDenominator(): number {
    return this.denominator;
  }

  /**
   * Converts the fraction to a decimal number.
   * @returns The decimal value of the fraction.
   */
  public toNumber(): number {
    return this.numerator / this.denominator;
  }

  /**
   * Returns the string representation of the fraction in "numerator/denominator" format.
   * @returns The fraction as a string.
   */
  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * Checks whether this fraction is equal to another fraction.
   * Fractions are compared by their reduced numeric value, not by their literal form.
   * @param other The other KaiztenFraction instance.
   * @returns True if the fractions are equivalent, false otherwise.
   */
  public equals(other: UllFraction): boolean {
    return this.numerator * other.denominator === this.denominator * other.numerator;
  }

  /**
   * Creates a clone (deep copy) of this KaiztenFraction instance.
   * @returns A new KaiztenFraction instance with the same numerator and denominator.
   */
  public clone(): UllFraction {
    return new UllFraction(this.numerator, this.denominator);
  }
}  