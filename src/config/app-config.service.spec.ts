import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service.js';
import {
  DEFAULT_PORT,
  DEFAULT_ENABLE_DEV_APOLLO_SANDBOX,
} from './env.default.js';
import { validate } from './env.validation.js';

describe('AppConfigService', () => {
  const originalPort = process.env.PORT;
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const originalEnableDevApolloSandbox = process.env.ENABLE_DEV_APOLLO_SANDBOX;
  const TEST_DATABASE_URL = 'postgres://user:password@localhost:5432/test_db';

  beforeEach(() => {
    process.env.DATABASE_URL = TEST_DATABASE_URL;
  });

  afterEach(() => {
    if (originalPort === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = originalPort;
    }

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }

    if (originalEnableDevApolloSandbox === undefined) {
      delete process.env.ENABLE_DEV_APOLLO_SANDBOX;
    } else {
      process.env.ENABLE_DEV_APOLLO_SANDBOX = originalEnableDevApolloSandbox;
    }
  });

  async function createService(): Promise<AppConfigService> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate,
          envFilePath: ['.env.test'],
        }),
      ],
      providers: [AppConfigService],
    }).compile();

    return module.get<AppConfigService>(AppConfigService);
  }

  it('should be defined', async () => {
    const service = await createService();
    expect(service).toBeDefined();
  });

  it('returns default port when PORT is not set', async () => {
    delete process.env.PORT;

    const service = await createService();

    expect(service.port).toBe(DEFAULT_PORT);
  });

  it('returns port from PORT env variable', async () => {
    process.env.PORT = '4000';

    const service = await createService();

    expect(service.port).toBe(4000);
  });

  it('returns databaseUrl from DATABASE_URL env variable', async () => {
    const service = await createService();

    expect(service.databaseUrl).toBe(TEST_DATABASE_URL);
  });

  it('rejects missing DATABASE_URL', async () => {
    delete process.env.DATABASE_URL;

    await expect(createService()).rejects.toThrow();
  });

  it('returns default enableDevApolloSandbox when ENABLE_DEV_APOLLO_SANDBOX is not set', async () => {
    delete process.env.ENABLE_DEV_APOLLO_SANDBOX;

    const service = await createService();

    expect(service.enableDevApolloSandbox).toBe(
      DEFAULT_ENABLE_DEV_APOLLO_SANDBOX,
    );
  });

  it('returns true when ENABLE_DEV_APOLLO_SANDBOX is "true"', async () => {
    process.env.ENABLE_DEV_APOLLO_SANDBOX = 'true';

    const service = await createService();

    expect(service.enableDevApolloSandbox).toBe(true);
  });

  it('returns false when ENABLE_DEV_APOLLO_SANDBOX is "false"', async () => {
    process.env.ENABLE_DEV_APOLLO_SANDBOX = 'false';

    const service = await createService();

    expect(service.enableDevApolloSandbox).toBe(false);
  });
});
