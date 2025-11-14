import { BooleanExpression } from "./boolean-expression";

export class NotExpression extends BooleanExpression {
    constructor(private expression: BooleanExpression) {
        super();
    }

    get getExpression(): BooleanExpression {
        return this.expression;
    }

    toString(): string {
        return `NOT (${this.expression.toString()})`;
    }

    toTree(level: number = 0, prefix: string = ""): string {
        return `${prefix} └── NOT\n${this.expression.toTree(level + 1, prefix + "    ")}`;
    }

    toFilterString(): string {
        return `NOT(${this.expression.toFilterString()})`;
    }
}