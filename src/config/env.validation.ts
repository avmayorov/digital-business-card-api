import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import {
  DEFAULT_PORT,
  DEFAULT_ENABLE_DEV_APOLLO_SANDBOX,
  DEFAULT_LOG_LEVEL,
} from './env.default.js';
import { ToBoolean } from './transformers/to-boolean.transform.js';
import { LogLevel } from './types/index.js';

class EnvironmentVariables {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = DEFAULT_PORT;

  @IsString()
  DATABASE_URL: string;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  ENABLE_DEV_APOLLO_SANDBOX = DEFAULT_ENABLE_DEV_APOLLO_SANDBOX;

  @IsOptional()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel = DEFAULT_LOG_LEVEL;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
