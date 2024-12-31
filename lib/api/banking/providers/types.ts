export interface BankProvider {
  authenticate(credentials: { username: string; password: string }): Promise<any>;
  getTransactions(accountId: string, token: string): Promise<any>;
}

export interface BankConnection {
  id: string;
  provider: string;
  token: string;
  expiresAt: Date;
}