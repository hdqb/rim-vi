import { injectable, inject } from 'inversify';
import TYPES from '../types/Types';
import { Account } from '../shared/entities/Account';
import { Serviceable } from '../shared/services/Serviceable';
import { Authenticationable } from '../shared/services/Authenticationable';
import { Authorizationable } from '../shared/services/Authorizationable';
import { Sessionable } from '../shared/services/Sessionable';
import { Tokenizerable } from '../shared/services/Tokenizerable';
import { Interactorable } from './Interactorable';

@injectable()
export class Interactor implements Interactorable {
  constructor(
    @inject(TYPES.Service) private service: Serviceable,
    @inject(TYPES.Authentication) private auth: Authenticationable,
    @inject(TYPES.Authorization) private authorization: Authorizationable,
    @inject(TYPES.Session) private session: Sessionable,
    @inject(TYPES.Tokenizer) private tokenizer: Tokenizerable
  ) {}

  async fetch(): Promise<Account[]> {
    const token = this.session.getSession();
    if (!token) throw new Error('No session token found');

    // Giả định Service đã xử lý việc thêm token vào headers
    return this.service.get<Account[]>('/accounts');
  }

  async create(account: Account): Promise<Account> {
    if (!this.authorization.authorize(account.role, 'create')) {
      throw new Error('Unauthorized to create account');
    }
    return this.service.post<Account>('/accounts', account);
  }

  async login(email: string, password: string): Promise<void> {
    const token = await this.auth.login(email, password);
    this.session.setSession(token);
  }

  logout(): void {
    this.session.clearSession();
  }
}
