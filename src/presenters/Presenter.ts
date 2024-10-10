import { injectable, inject } from 'inversify';
import TYPES from '../types/Types';
import { Interactorable } from '../interactors/Interactorable';
import { Viewable } from '../views/Viewable';
import { Loggerable } from '../shared/services/Loggerable';
import { Notificationable } from '../shared/services/Notificationable';
import { Account } from '../shared/entities/Account';
import { Presenterable } from './Presenterable';

@injectable()
export class Presenter implements Presenterable {
  constructor(
    @inject(TYPES.View) private view: Viewable,
    @inject(TYPES.Interactor) private interactor: Interactorable,
    @inject(TYPES.Logger) private logger: Loggerable,
    @inject(TYPES.Notification) private notification: Notificationable
  ) {}

  async load(): Promise<void> {
    try {
      const data: Account[] = await this.interactor.fetch();
      this.view.display(data);
      this.logger.log('Accounts loaded successfully.');
      this.notification.notify('Accounts loaded successfully.');
    } catch (error) {
      this.view.showError('Failed to load accounts.');
      this.logger.error('Failed to load accounts.');
      this.notification.notify('Failed to load accounts.');
    }
  }

  async add(account: Account): Promise<void> {
    try {
      const newAccount = await this.interactor.create(account);
      this.logger.log(`Account ${newAccount.name} created successfully.`);
      this.notification.notify(`Account ${newAccount.name} created successfully.`);
      await this.load(); // Reload accounts after adding
    } catch (error) {
      this.view.showError('Failed to create account.');
      this.logger.error('Failed to create account.');
      this.notification.notify('Failed to create account.');
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.interactor.login(email, password);
      this.logger.log('Logged in successfully.');
      this.notification.notify('Logged in successfully.');
      this.view.navigate('/dashboard');
    } catch (error) {
      this.view.showError('Login failed.');
      this.logger.error('Login failed.');
      this.notification.notify('Login failed.');
    }
  }

  logout(): void {
    this.interactor.logout();
    this.logger.log('Logged out successfully.');
    this.notification.notify('Logged out successfully.');
    this.view.navigate('/login');
  }
}
