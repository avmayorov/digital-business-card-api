import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service.js';
import { DEFAULT_PORT } from './env.default.js';
import { validate } from './env.validation.js';

describe('AppConfigService', () => {
  const originalPort = process.env.PORT;

  afterEach(() => {
    if (originalPort === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = originalPort;
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

  it('rejects invalid PORT value', async () => {
    process.env.PORT = 'ItsNotInt';

    await expect(createService()).rejects.toThrow();
  });
});
