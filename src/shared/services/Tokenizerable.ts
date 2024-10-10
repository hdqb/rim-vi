import { Account } from '../entities/Account';

export interface Tokenizerable {
  generateToken(account: Account): string;
  verifyToken(token: string): Account | null;
}
