import { Roleary } from '../enums/Roleary';
import { Statusive } from '../enums/Statusive';

export interface Account {
  id: number;
  name: string;
  email: string;
  role: Roleary;
  status: Statusive;
}
