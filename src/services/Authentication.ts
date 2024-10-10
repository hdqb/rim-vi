import { injectable, inject } from 'inversify';
import TYPES from '../types/Types';
import { Serviceable } from '../shared/services/Serviceable';
import { Authenticationable } from '../shared/services/Authenticationable';

@injectable()
export class Authentication implements Authenticationable {
  constructor(
    @inject(TYPES.Service) private service: Serviceable
  ) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.service.post<{ token: string }>('/auth/login', { email, password });
    return response.token;
  }
}
