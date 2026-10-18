import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AppGraphQLModule } from './graphql/app-graphql-module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, AppGraphQLModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
