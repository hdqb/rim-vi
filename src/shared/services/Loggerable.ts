export interface Loggerable {
  log(message: string): void;
  error(message: string): void;
}
