import { BooleanExpression } from "../boolean-expression";
import { Condition } from "../condition";
import { LogicalExpression } from "../logical-expression";
import { LogicalOperator } from "../logical-operator";
import { NotExpression } from "../not-expression";
import { Operator } from "../operator";

export class BooleanExpressionBuilder {

    private static readonly ERROR_INVALID_STRUCTURE = "Invalid expression structure";

    private expressionStack: BooleanExpression[] = [];
    private operatorStack: LogicalOperator[] = [];
    private pendingNot: boolean = false;

    private applyLastOperator(): void {
        if (this.expressionStack.length < 2 || this.operatorStack.length === 0) return;
        const right = this.expressionStack.pop()!;
        const left = this.expressionStack.pop()!;
        const operator = this.operatorStack.pop()!;
        this.expressionStack.push(new LogicalExpression(left, operator, right));
    }

    addCondition(attribute: string, operator: Operator, value: string | number | boolean): this {
        let condition: BooleanExpression = new Condition(attribute, operator, value);
        if (this.pendingNot) {
            condition = new NotExpression(condition);
            this.pendingNot = false;
        }
        this.expressionStack.push(condition);
        return this;
    }

    not(): this {
        this.pendingNot = true;
        return this;
    }

    and(): this {
        while (this.operatorStack.length > 0 && this.operatorStack[this.operatorStack.length - 1] === LogicalOperator.AND) {
            this.applyLastOperator();
        }
        this.operatorStack.push(LogicalOperator.AND);
        return this;
    }

    or(): this {
        while (this.operatorStack.length > 0) {
            this.applyLastOperator();
        }
        this.operatorStack.push(LogicalOperator.OR);
        return this;
    }

    build(): BooleanExpression {
        while (this.operatorStack.length > 0) {
            this.applyLastOperator();
        }
        if (this.expressionStack.length !== 1) {
            throw new Error(BooleanExpressionBuilder.ERROR_INVALID_STRUCTURE);
        }
        return this.expressionStack[0];
    }
}

/*
const filter = new BooleanExpressionBuilder()
    .addCondition("age", Operator.GREATER_THAN, 1)
    .and()
    .not()
    .addCondition("name", Operator.EQUAL, "pepe")
    .or()
    .addCondition("salary", Operator.LESS_THAN, true)
    .or()
    .not()
    .addCondition("age", Operator.GREATER_THAN, 4)
    .and()
    .addCondition("name", Operator.EQUAL, "5")
    .or()
    .addCondition("salary", Operator.LESS_THAN, true)
    .build();

console.log(filter.toString());
console.log(filter.toTree());
*/