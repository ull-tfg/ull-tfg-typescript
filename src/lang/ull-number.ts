export function random(a: number, b: number): number {
    if (a >= b) {
        throw new Error("Invalid range: 'a' must be less than 'b'.");
    }
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomNumber(rangeMax: number): number {
    return random(0, rangeMax);
}

export function clamp(value: number, min: number, max: number): number {
    if (min > max) {
        throw new Error("Invalid range: 'min' must be less than or equal to 'max'.");
    }
    return Math.min(Math.max(value, min), max);
}

export function isBetween(value: number, min: number, max: number, inclusive: boolean = true): boolean {
    if (min > max) {
        throw new Error("Invalid range: 'min' must be less than or equal to 'max'.");
    }
    return inclusive ? value >= min && value <= max : value > min && value < max;
}

export function roundToDecimalPlaces(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
}
