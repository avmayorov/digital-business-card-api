import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppConfigService } from './config/app-config.service.js';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get(AppConfigService);
  await app.listen(config.port);
  logger.log(`Server is started on ${config.port} port`);
}
await bootstrap();
