import { injectable } from 'inversify';
import { Roleary } from '../shared/enums/Roleary';
import { Authorizationable } from '../shared/services/Authorizationable';

@injectable()
export class Authorization implements Authorizationable {
  private permissions: { [key in Roleary]: string[] } = {
    [Roleary.Adminary]: ['create', 'read', 'update', 'delete'],
    [Roleary.Userary]: ['read', 'update'],
    [Roleary.Guestary]: ['read'],
  };

  authorize(role: Roleary, action: string): boolean {
    return this.permissions[role].includes(action);
  }
}
