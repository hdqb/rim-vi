import { Account } from '../shared/entities/Account';

export interface Interactorable {
  fetch(): Promise<Account[]>;
  create(account: Account): Promise<Account>;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}
