export interface ChangeEntry<T> {
  key: string;
  state: T;
  timestamp: number;
}