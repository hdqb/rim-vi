export interface Authenticationable {
  login(email: string, password: string): Promise<string>;
}
