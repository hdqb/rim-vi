import { injectable } from 'inversify';
import { Sessionable } from '../shared/services/Sessionable';

@injectable()
export class Session implements Sessionable {
  private token: string | null = null;

  setSession(token: string): void {
    this.token = token;
    localStorage.setItem('session_token', token);
  }

  getSession(): string | null {
    return this.token || localStorage.getItem('session_token');
  }

  clearSession(): void {
    this.token = null;
    localStorage.removeItem('session_token');
  }
}
