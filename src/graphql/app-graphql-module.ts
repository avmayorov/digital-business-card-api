import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { AppConfigModule } from '../config/app-config.module.js';
import { AppConfigService } from '../config/app-config.service.js';
import { HealthResolver } from './health/health.resolver.js';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        autoSchemaFile: true,
        graphiql: false,
        plugins: [
          config.enableDevApolloSandbox
            ? ApolloServerPluginLandingPageLocalDefault()
            : ApolloServerPluginLandingPageProductionDefault(),
        ],
      }),
    }),
  ],
  providers: [HealthResolver],
})
export class AppGraphQLModule {}
