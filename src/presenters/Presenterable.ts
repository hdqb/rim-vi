import { Account } from '../shared/entities/Account';

export interface Presenterable {
  load(): Promise<void>;
  add(account: Account): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}
