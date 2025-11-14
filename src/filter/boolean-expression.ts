export abstract class BooleanExpression {
    abstract toFilterString(): string;
    abstract toString(): string;
    abstract toTree(level?: number, prefix?: string): string;
}