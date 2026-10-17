import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly _config: ConfigService) {}

  get port(): number {
    return this._config.getOrThrow<number>('PORT');
  }

  get databaseUrl(): string {
    return this._config.getOrThrow<string>('DATABASE_URL');
  }
}
