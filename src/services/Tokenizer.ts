import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Account } from '../shared/entities/Account';
import { Tokenizerable } from '../shared/services/Tokenizerable';
import { Statusive } from '../shared/enums/Statusive';

@injectable()
export class Tokenizer implements Tokenizerable {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'your-secret-key';
  }

  generateToken(account: Account): string {
    return jwt.sign(
      { id: account.id, email: account.email, role: account.role },
      this.secret,
      { expiresIn: '1h' }
    );
  }

  verifyToken(token: string): Account | null {
    try {
      const decoded = jwt.verify(token, this.secret) as any;
      return {
        id: decoded.id,
        name: '', // Có thể lấy từ cơ sở dữ liệu nếu cần
        email: decoded.email,
        role: decoded.role,
        status: Statusive.Active,
      };
    } catch (error) {
      return null;
    }
  }
}
