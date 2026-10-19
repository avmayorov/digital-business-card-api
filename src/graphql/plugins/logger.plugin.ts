import { Logger } from '@nestjs/common';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';

export function loggerPlugin(logger: Logger): ApolloServerPlugin<BaseContext> {
  return {
    async requestDidStart(
      requestContext: GraphQLRequestContext<BaseContext>,
    ): Promise<GraphQLRequestListener<BaseContext>> {
      const { query, variables } = requestContext.request;
      logger.debug(`Request: ${query}`);
      if (variables && Object.keys(variables).length > 0) {
        logger.debug(`Variables: ${JSON.stringify(variables)}`);
      }

      return {
        async willSendResponse({ response }) {
          if (response.body.kind === 'single') {
            const { data, errors } = response.body.singleResult;
            logger.debug(`Response: ${JSON.stringify(data)}`);
            if (errors?.length) {
              logger.error(`Errors: ${JSON.stringify(errors)}`);
            }
          }
        },
      };
    },
  };
}
