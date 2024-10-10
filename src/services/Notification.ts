import { injectable } from 'inversify';
import { Notificationable } from '../shared/services/Notificationable';

@injectable()
export class Notification implements Notificationable {
  notify(message: string): void {
    console.log('Notification:', message);
  }
}
