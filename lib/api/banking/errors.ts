export class BankingError extends Error {
  constructor(message: string, public code: string, public status: number) {
    super(message);
    this.name = 'BankingError';
  }
}

export class InvalidCredentialsError extends BankingError {
  constructor() {
    super('Invalid bank credentials', 'INVALID_CREDENTIALS', 401);
  }
}

export class AccountNotFoundError extends BankingError {
  constructor() {
    super('Bank account not found', 'ACCOUNT_NOT_FOUND', 404);
  }
}

export class ConnectionError extends BankingError {
  constructor() {
    super('Failed to connect to bank', 'CONNECTION_ERROR', 503);
  }
}