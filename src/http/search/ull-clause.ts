export class UllHttpClause {

    private readonly attribute: string;
    private readonly operator: string;
    private readonly value: string;

    public constructor(attribute: string, operator: string, value: string) {
        this.attribute = attribute;
        this.operator = operator;
        this.value = value;
    }

    public static create(attribute: string, operator: string, value: string): UllHttpClause {
        return new UllHttpClause(attribute, operator, value);
    }

    public getAttribute(): string {
        return this.attribute;
    }

    public getOperator(): string {
        return this.operator;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return `(${this.attribute} ${this.operator} ${this.value})`;
    }
}