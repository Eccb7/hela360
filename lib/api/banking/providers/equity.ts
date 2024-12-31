import { BankProvider } from './types';
import { ConnectionError, InvalidCredentialsError } from '../errors';

export class EquityBankProvider implements BankProvider {
  private baseUrl = process.env.EQUITY_API_URL;
  private apiKey = process.env.EQUITY_API_KEY;

  async authenticate(credentials: { username: string; password: string }) {
    try {
      const response = await fetch(`${this.baseUrl}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey!,
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new InvalidCredentialsError();
      }

      return await response.json();
    } catch (error) {
      throw new ConnectionError();
    }
  }

  async getTransactions(accountId: string, token: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${accountId}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-API-Key': this.apiKey!,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      return await response.json();
    } catch (error) {
      throw new ConnectionError();
    }
  }
}