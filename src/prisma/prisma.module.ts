import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { AppConfigModule } from '../config/app-config.module.js';

@Module({
  imports: [AppConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
