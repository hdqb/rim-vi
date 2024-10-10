import { injectable } from 'inversify';
import { Historyable } from '../shared/services/Historyable';

@injectable()
export class History implements Historyable {
  private entries: string[] = [];

  add(entry: string): void {
    this.entries.push(entry);
    // Lưu lịch sử vào nơi thích hợp nếu cần
  }

  getAll(): string[] {
    return this.entries;
  }
}
