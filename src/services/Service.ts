import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { Serviceable } from '../shared/services/Serviceable';

@injectable()
export class Service implements Serviceable {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/api', // Điều chỉnh baseURL nếu cần
      timeout: 5000,
    });
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.axios.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axios.post<T>(url, data);
    return response.data;
  }
}
