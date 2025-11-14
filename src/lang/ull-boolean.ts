export function allFalse(structure: boolean[]): boolean {
    return structure.every(value => !value);
}

export function allTrue(structure: boolean[]): boolean {
    return structure.every(value => value);
}

export function countFalse(structure: boolean[]): number {
    return structure.filter(value => !value).length;
}

export function countOccurrences(structure: boolean[], value: boolean): number {
    return structure.filter(item => item === value).length;
}

export function countTrue(structure: boolean[]): number {
    return structure.filter(value => value).length;
}

export function findFirstFalseIndex(structure: boolean[]): number {
    return structure.indexOf(false);
}

export function findFirstTrueIndex(structure: boolean[]): number {
    return structure.indexOf(true);
}

export function fromNumberArray(structure: number[]): boolean[] {
    return structure.map(value => value === 1);
}

export function fromStringArray(structure: string[]): boolean[] {
    return structure.map(value => value === "true");
}

export function hasFalse(structure: boolean[]): boolean {
    return structure.some(value => !value);
}

export function hasTrue(structure: boolean[]): boolean {
    return structure.some(value => value);
}

export function invertBooleans(structure: boolean[]): boolean[] {
    return structure.map(value => !value);
}

export function isUniform(structure: boolean[]): boolean {
    return structure.every(value => value === structure[0]);
}

export function partitionByValue(structure: boolean[], value: boolean): { matching: boolean[]; nonMatching: boolean[] } {
    return {
        matching: structure.filter(item => item === value),
        nonMatching: structure.filter(item => item !== value)
    };
}

export function randomBoolean(): boolean {
    return Math.random() >= 0.5;
}

export function randomBooleanArray(length: number): boolean[] {
    return Array.from({ length }, () => randomBoolean());
}
export function splitByIndex(structure: boolean[], index: number): { left: boolean[]; right: boolean[] } {
    if (index < 0 || index > structure.length) {
        throw new Error('Index out of bounds');
    }
    return {
        left: structure.slice(0, index),
        right: structure.slice(index)
    };
}

export function splitByValue(structure: boolean[]): { trueValues: boolean[]; falseValues: boolean[] } {
    return {
        trueValues: structure.filter(value => value),
        falseValues: structure.filter(value => !value)
    };
}

export function toggleAllBooleans(structure: boolean[]): boolean[] {
    return structure.map(value => !value);
}

export function toggleBoolean(value: boolean): boolean {
    return !value;
}

export function toNumberArray(structure: boolean[]): number[] {
    return structure.map(value => (value ? 1 : 0));
}

export function toStringArray(structure: boolean[]): string[] {
    return structure.map(value => (value ? "true" : "false"));
}

