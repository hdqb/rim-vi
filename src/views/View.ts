import { injectable } from 'inversify';
import { Account } from '../shared/entities/Account';
import { Viewable } from './Viewable';
import { Response } from 'express';

@injectable()
export class View implements Viewable {
  private response: Response | null = null;

  setResponse(res: Response): void {
    this.response = res;
  }

  display(accounts: Account[]): void {
    if (!this.response) throw new Error('Response not set.');

    let html = '<html><body>';
    html += '<h1>Accounts</h1>';
    html += '<ul>';
    accounts.forEach(account => {
      html += `<li>${account.name} (${account.email}) - ${account.role}</li>`;
    });
    html += '</ul>';
    html += '<a href="/logout">Logout</a>';
    html += '</body></html>';
    this.response.send(html);
  }

  showError(message: string): void {
    if (!this.response) throw new Error('Response not set.');

    let html = '<html><body>';
    html += `<h1>Error: ${message}</h1>`;
    html += '<a href="/login">Back to Login</a>';
    html += '</body></html>';
    this.response.status(500).send(html);
  }

  navigate(path: string): void {
    if (!this.response) throw new Error('Response not set.');
    this.response.redirect(path);
  }
}
