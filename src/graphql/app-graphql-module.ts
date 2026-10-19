import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { AppConfigModule } from '../config/app-config.module.js';
import { AppConfigService } from '../config/app-config.service.js';
import { ProfileModule } from './profile/profile.module.js';
import { loggerPlugin } from './plugins/index.js';

@Module({
  imports: [
    ProfileModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        autoSchemaFile: true,
        graphiql: false,
        plugins: [
          loggerPlugin(new Logger('GraphQL')),
          config.enableDevApolloSandbox
            ? ApolloServerPluginLandingPageLocalDefault()
            : ApolloServerPluginLandingPageProductionDefault(),
        ],
      }),
    }),
  ],
})
export class AppGraphQLModule {}
