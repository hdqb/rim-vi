import { Account } from '../shared/entities/Account';
import { Response } from 'express';

export interface Presenterable {
  load(res: Response): Promise<void>;
  add(res: Response, account: Account): Promise<void>;
  login(res: Response, email: string, password: string): Promise<void>;
  logout(res: Response): void;
}
