import { injectable } from 'inversify';
import { Loggerable } from '../shared/services/Loggerable';

@injectable()
export class Logger implements Loggerable {
  log(message: string): void {
    console.log('Log:', message);
  }

  error(message: string): void {
    console.error('Error:', message);
  }
}
