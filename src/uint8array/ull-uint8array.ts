/**
 * Generates a random Uint8Array of the specified length.
 * 
 * @param length - The length of the Uint8Array to generate.
 * @returns A Uint8Array filled with random values.
 */
export function randomUint8Array(length: number): Uint8Array {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return array;
}