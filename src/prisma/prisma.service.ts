import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client.js';
import { AppConfigService } from '../config/app-config.service.js';
import { LogLevel } from '../config/types/index.js';

function toPrismaLogLevels(logLevel: LogLevel): Prisma.LogLevel[] {
  switch (logLevel) {
    case LogLevel.FATAL:
    case LogLevel.ERROR:
      return ['error'];
    case LogLevel.WARN:
      return ['error', 'warn'];
    case LogLevel.INFO:
      return ['error', 'warn', 'info'];
    case LogLevel.DEBUG:
    case LogLevel.VERBOSE:
      return ['error', 'warn', 'info', 'query'];
  }
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly _logger = new Logger('PrismaService');

  constructor(configService: AppConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.databaseUrl,
    });
    super({
      adapter,
      log: toPrismaLogLevels(configService.logLevel),
    });
  }

  async onModuleInit() {
    await this.$connect();
    this._logger.log('Prisma client is connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this._logger.log('Prisma client is disconnected');
  }
}
