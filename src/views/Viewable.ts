import { Account } from '../shared/entities/Account';
import { Response } from 'express';

export interface Viewable {
  display(res: Response, accounts: Account[]): void;
  showError(res: Response, message: string): void;
  navigate(res: Response, path: string): void;
}
