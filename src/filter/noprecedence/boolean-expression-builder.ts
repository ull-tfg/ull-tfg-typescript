import { BooleanExpression } from "../boolean-expression";
import { Condition } from "../condition";
import { LogicalExpression } from "../logical-expression";
import { LogicalOperator } from "../logical-operator";
import { NotExpression } from "../not-expression";
import { Operator } from "../operator";

export class BooleanExpressionBuilder {

    private static readonly ERROR_NO_AND_EXPRESSION = "No existing expression to apply AND";
    private static readonly ERROR_NO_OR_EXPRESSION = "No existing expression to apply OR";
    private static readonly ERROR_NO_NOT_EXPRESSION = "No existing expression to apply NOT";
    private static readonly ERROR_NO_EXPRESSION_BUILT = "No expression built";

    private expression: BooleanExpression | null = null;

    addCondition(attribute: string, operator: Operator, value: string | number | boolean): this {
        const condition = new Condition(attribute, operator, value);
        this.expression = this.expression ? new LogicalExpression(this.expression, LogicalOperator.AND, condition) : condition;
        return this;
    }

    and(expression: BooleanExpression): this {
        if (!this.expression) {
            throw new Error(BooleanExpressionBuilder.ERROR_NO_AND_EXPRESSION);
        }
        this.expression = new LogicalExpression(this.expression, LogicalOperator.AND, expression);
        return this;
    }

    or(expression: BooleanExpression): this {
        if (!this.expression) {
            throw new Error(BooleanExpressionBuilder.ERROR_NO_OR_EXPRESSION);
        }
        this.expression = new LogicalExpression(this.expression, LogicalOperator.OR, expression);
        return this;
    }

    not(): this {
        if (!this.expression) {
            throw new Error(BooleanExpressionBuilder.ERROR_NO_NOT_EXPRESSION);
        }
        this.expression = new NotExpression(this.expression);
        return this;
    }

    build(): BooleanExpression {
        if (!this.expression) {
            throw new Error(BooleanExpressionBuilder.ERROR_NO_EXPRESSION_BUILT);
        }
        return this.expression;
    }

    toStructuredTree(): any {
        if (!this.expression) {
            return null;
        }
        return this.convertExpressionToTree(this.expression);
    }

    private convertExpressionToTree(expression: BooleanExpression): any {
        if (expression instanceof Condition) {
            return {
                type: "condition",
                name: `${expression.getAttribute} ${expression.getOperator} ${expression.getValue}`,
                attribute: expression.getAttribute,
                operator: expression.getOperator,
                value: expression.getValue,
                children: []
            };
        } else if (expression instanceof LogicalExpression) {
            return {
                type: "logical",
                name: `(${expression.getOperator})`,
                operator: expression.getOperator,
                children: [
                    this.convertExpressionToTree(expression.getLeft),
                    this.convertExpressionToTree(expression.getRight)
                ]
            };
        } else if (expression instanceof NotExpression) {
            return {
                type: "not",
                name: "NOT",
                children: [this.convertExpressionToTree(expression.getExpression)]
            };
        }
        return null;
    }
}

/*
const filter = new BooleanExpressionBuilder()
    .addCondition("age", Operator.GREATER_THAN, 1)
    .and(new Condition("name", Operator.EQUAL, "pepe"))
    .or(
        new LogicalExpression(
            new Condition("salary", Operator.LESS_THAN, true),
            LogicalOperator.OR,
            new LogicalExpression(
                new Condition("age", Operator.GREATER_THAN, 4),
                LogicalOperator.AND,
                new Condition("name", Operator.EQUAL, "5")
            )
        )
    )
    .build();

console.log(filter.toString());
console.log(filter.toTree());
*/