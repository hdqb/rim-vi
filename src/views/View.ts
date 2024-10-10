import { injectable } from 'inversify';
import { Account } from '../shared/entities/Account';
import { Viewable } from './Viewable';
import { Response } from 'express';

@injectable()
export class View implements Viewable {
  display(res: Response, accounts: Account[]): void {
    let html = '<html><body>';
    html += '<h1>Accounts</h1>';
    html += '<ul>';
    accounts.forEach(account => {
      html += `<li>${account.name} (${account.email}) - ${account.role}</li>`;
    });
    html += '</ul>';
    html += '<a href="/logout">Logout</a>';
    html += '</body></html>';
    res.send(html);
  }

  showError(res: Response, message: string): void {
    let html = '<html><body>';
    html += `<h1>Error: ${message}</h1>`;
    html += '<a href="/login">Back to Login</a>';
    html += '</body></html>';
    res.status(500).send(html);
  }

  navigate(res: Response, path: string): void {
    res.redirect(path);
  }
}
