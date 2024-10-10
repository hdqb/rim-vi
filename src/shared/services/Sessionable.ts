export interface Sessionable {
  setSession(token: string): void;
  getSession(): string | null;
  clearSession(): void;
}
