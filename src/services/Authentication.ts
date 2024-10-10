import { injectable, inject } from 'inversify';
import { Serviceable } from '../shared/services/Serviceable';
import { Authenticationable } from '../shared/services/Authenticationable';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Account } from '../shared/entities/Account';
import TYPES from '../types/Types';

@injectable()
export class Authentication implements Authenticationable {
  private secret: string = process.env.JWT_SECRET || 'super-secret-key';

  constructor(
    @inject(TYPES.Service) private service: Serviceable
  ) {}

  async login(email: string, password: string): Promise<string> {
    const account: Account = await this.service.get<Account>(`/accounts?email=${email}`);
    
    if (account && await bcrypt.compare(password, account.passwordHash)) {
      return jwt.sign({ id: account.id, email: account.email, role: account.role }, this.secret, { expiresIn: '1h' });
    }

    throw new Error('Invalid credentials');
  }

  async register(account: Account, password: string): Promise<Account> {
    const passwordHash = await bcrypt.hash(password, 10);
    const newAccount = { ...account, passwordHash };
    return this.service.post<Account>('/accounts', newAccount);
  }
}
