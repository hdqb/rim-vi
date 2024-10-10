import { Roleary } from '../enums/Roleary';

export interface Authorizationable {
  authorize(role: Roleary, action: string): boolean;
}
