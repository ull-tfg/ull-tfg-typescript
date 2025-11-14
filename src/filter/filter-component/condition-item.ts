import { Operator } from '../operator';
import { LogicalOperator } from '../logical-operator';

export interface ConditionItem {
  field: string;
  operator: Operator;
  value: string | number | boolean;
  connector?: LogicalOperator | null;
}