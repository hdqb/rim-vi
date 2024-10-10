import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { Account } from '../shared/entities/Account';
import { Statusive } from '../shared/enums/Statusive';
import { Roleary } from '../shared/enums/Roleary';
import { Routerable } from './Routerable';
import { injectable } from 'inversify';

@injectable()
export class ApiRouter implements Routerable {
  private router: express.Router;
  private accounts: Account[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: Roleary.Adminary, status: Statusive.Active },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: Roleary.Userary, status: Statusive.Active },
  ];

  private secret: string = process.env.JWT_SECRET || 'your-secret-key';

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Route đăng nhập
    this.router.post('/auth/login', (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = this.accounts.find(acc => acc.email === email);
      if (user && password === 'password') {
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, this.secret, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });

    // Middleware bảo vệ các route
    const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        res.sendStatus(401);
        return;
      }

      jwt.verify(token, this.secret, (err, user) => {
        if (err) {
          res.sendStatus(403);
        } else {
          (req as any).user = user;
          next();
        }
      });
    };

    // Apply middleware bảo vệ các route
    this.router.use(authMiddleware);

    // Route lấy danh sách tài khoản
    this.router.get('/accounts', (req: Request, res: Response) => {
      res.json(this.accounts);
    });

    // Route tạo tài khoản mới
    this.router.post('/accounts', (req: Request, res: Response) => {
      const { name, email, role, status } = req.body;
      const newAccount: Account = {
        id: this.accounts.length + 1,
        name,
        email,
        role: role as Roleary,
        status: status as Statusive,
      };
      this.accounts.push(newAccount);
      res.status(201).json(newAccount);
    });
  }

  public setupRoutes(app: express.Application): void {
    app.use('/api', this.router);
    console.log('API Router has been set up.');
  }

  public start(app: express.Application): void {
    this.setupRoutes(app);
  }
}
