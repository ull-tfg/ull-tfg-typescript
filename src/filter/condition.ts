import { BooleanExpression } from "./boolean-expression";
import { Operator } from "./operator";

export class Condition extends BooleanExpression {
    constructor(
        private attribute: string,
        private operator: Operator,
        private value: string | number | boolean
    ) {
        super();
    }

    get getAttribute(): string {
        return this.attribute;
    }

    get getOperator(): Operator {
        return this.operator;
    }

    get getValue(): string | number | boolean {
        return this.value;
    }

    toString(): string {
        const formattedValue = typeof this.value === "string" ? `'${this.value}'` : this.value;
        return `${this.attribute} ${this.operator} ${formattedValue}`;
    }

    toTree(level: number = 0, prefix: string = ""): string {
        return `${prefix} └── Condition: ${this.attribute} ${this.operator} ${this.value}\n`;
    }

    toFilterString(): string {
        const formattedValue = typeof this.value === "string" ? `'${encodeURIComponent(this.value)}'` : this.value;
        return `${encodeURIComponent(this.attribute)}${this.operator}${formattedValue}`;
    }
    
}
