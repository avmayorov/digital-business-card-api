import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from './types/index.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly _config: ConfigService) {}

  get port(): number {
    return this._config.getOrThrow<number>('PORT');
  }

  get databaseUrl(): string {
    return this._config.getOrThrow<string>('DATABASE_URL');
  }

  get enableDevApolloSandbox(): boolean {
    return this._config.getOrThrow<boolean>('ENABLE_DEV_APOLLO_SANDBOX');
  }

  get logLevel(): LogLevel {
    return this._config.getOrThrow<LogLevel>('LOG_LEVEL');
  }
}
