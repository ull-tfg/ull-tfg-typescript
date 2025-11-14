import { ALPHABET } from '../ull-string';

export function isDigit(char: string): boolean {
    if (char.length !== 1) {
        throw new Error('Input must be a single character');
    }
    return char >= '0' && char <= '9';
}

export function isLetter(char: string): boolean {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return /^[a-zA-Z]$/.test(char);
}

export function randomAlphabeticChar(): string {
    const randomIndex: number = Math.floor(Math.random() * ALPHABET.length);
    return ALPHABET[randomIndex];
}

export function isUpperCase(char: string): boolean {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return /^[A-Z]$/.test(char);
}

export function isLowerCase(char: string): boolean {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return /^[a-z]$/.test(char);
}

export function isSpecialCharacter(char: string): boolean {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return /[^a-zA-Z0-9]/.test(char);
}

export function toUpperCase(char: string): string {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return char.toUpperCase();
}

export function toLowerCase(char: string): string {
    if (char.length !== 1) {
        throw new Error("Input must be a single character");
    }
    return char.toLowerCase();
}