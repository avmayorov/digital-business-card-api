import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  const findUnique = vi.fn();
  const findMany = vi.fn();
  const count = vi.fn();
  const prisma = {
    profile: { findUnique, findMany, count },
  } as unknown as PrismaService;

  let service: ProfileService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  describe('getById', () => {
    it('returns null when the profile does not exist', async () => {
      findUnique.mockResolvedValue(null);

      await expect(service.getById(1)).resolves.toBeNull();
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          skills: { include: { skill: true } },
          experiences: { include: { company: true, projects: true } },
        },
      });
    });
  });

  describe('getAll', () => {
    const items = [
      {
        id: 1,
        name: 'Test',
        description: 'Test',
        githubUrl: null,
        linkedinUrl: null,
        websiteUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('returns page of items ordered by id with totalCount = undefined', async () => {
      findMany.mockResolvedValue(items);
      count.mockResolvedValue(100);

      await expect(service.getAll(0, 20, false)).resolves.toEqual({
        items,
        totalCount: undefined,
      });
      expect(findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 20,
        orderBy: { id: 'asc' },
      });
      expect(count).not.toHaveBeenCalled();
    });

    it('includes totalCount when requested', async () => {
      findMany.mockResolvedValue(items);
      count.mockResolvedValue(100);

      await expect(service.getAll(0, 20, true)).resolves.toEqual({
        items,
        totalCount: 100,
      });
      expect(count).toHaveBeenCalledTimes(1);
    });
  });
});
