import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { AppConfigService } from '../config/app-config.service.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly _logger = new Logger('PrismaService');

  constructor(configService: AppConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.databaseUrl
    });
    super({ adapter });
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
