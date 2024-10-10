export interface Historyable {
  add(entry: string): void;
  getAll(): string[];
}
