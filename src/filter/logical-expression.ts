import { BooleanExpression } from "./boolean-expression";
import { LogicalOperator } from "./logical-operator";

export class LogicalExpression extends BooleanExpression {
    constructor(
        private left: BooleanExpression,
        private operator: LogicalOperator,
        private right: BooleanExpression
    ) {
        super();
    }

    get getLeft(): BooleanExpression {
        return this.left;
    }

    get getOperator(): LogicalOperator {
        return this.operator;
    }

    get getRight(): BooleanExpression {
        return this.right;
    }

    toString(): string {
        return `(${this.left.toString()} ${this.operator} ${this.right.toString()})`;
    }

    toTree(level: number = 0, prefix: string = ""): string {
        return `${prefix} └── ${this.operator}\n${this.left.toTree(level + 1, prefix + "│   ")}${this.right.toTree(level + 1, prefix + "│   ")}`;
    }

    toFilterString(): string {
        return `(${this.left.toFilterString()} ${this.operator} ${this.right.toFilterString()})`;
    }
}