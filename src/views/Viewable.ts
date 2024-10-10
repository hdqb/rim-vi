import { Account } from '../shared/entities/Account';
import { Response } from 'express';

export interface Viewable {
  setResponse(res: Response): void;
  display(accounts: Account[]): void;
  showError(message: string): void;
  navigate(path: string): void;
}
