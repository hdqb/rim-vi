import { injectable, inject } from 'inversify';
import TYPES from '../types/Types';
import { Presenterable } from '../presenters/Presenterable';
import express, { Request, Response } from 'express';
import { Routerable } from './Routerable';
import { Viewable } from '../views/Viewable';

@injectable()
export class Router implements Routerable {
  constructor(
    @inject(TYPES.Presenter) private presenter: Presenterable,
    @inject(TYPES.View) private view: Viewable
  ) {}

  routes = {
    home: '/',
    login: '/login',
    register: '/register',
    logout: '/logout',
    dashboard: '/dashboard',
    profile: '/profile',
  };

  setupRoutes(app: express.Application): void {
    // Trang chủ chuyển hướng đến dashboard
    app.get(this.routes.home, (req: Request, res: Response) => {
      res.redirect(this.routes.dashboard);
    });

    // Trang đăng nhập
    app.get(this.routes.login, (req: Request, res: Response) => {
      let html = `
        <html><body>
        <h1>Login</h1>
        <form method="POST" action="${this.routes.login}">
          Email: <input type="email" name="email" required/><br/>
          Password: <input type="password" name="password" required/><br/>
          <input type="submit" value="Login"/>
        </form>
        </body></html>
      `;
      res.send(html);
    });

    // Xử lý đăng nhập
    app.post(this.routes.login, (req: Request, res: Response) => {
      const { email, password } = req.body;
      // Gán đối tượng Response cho View để có thể trả về HTML
      (this.view as any).setResponse(res);
      this.presenter.login(email, password);
    });

    // Trang dashboard
    app.get(this.routes.dashboard, (req: Request, res: Response) => {
      (this.view as any).setResponse(res);
      this.presenter.load();
    });

    // Xử lý đăng xuất
    app.get(this.routes.logout, (req: Request, res: Response) => {
      (this.view as any).setResponse(res);
      this.presenter.logout();
    });

    // Bạn có thể thêm các route khác như register, profile theo nhu cầu
  }

  start(app: express.Application): void {
    this.setupRoutes(app);
    console.log('Router has been set up.');
  }
}
