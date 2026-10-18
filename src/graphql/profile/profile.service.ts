import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { Profile, ProfilesPage } from './domain/index.js';

@Injectable()
export class ProfileService {
  constructor(private readonly _prisma: PrismaService) {}

  async getById(id: number): Promise<Profile | null> {
    const profile = await this._prisma.profile.findUnique({
      where: { id },
      include: {
        skills: { include: { skill: true } },
        experiences: { include: { company: true, projects: true } },
      },
    });

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      skills: profile.skills.map((profileSkill) => profileSkill.skill),
    };
  }

  async getAll(
    skip: number,
    take: number,
    includeTotalCount: boolean = false,
  ): Promise<ProfilesPage> {
    const [items, totalCount] = await Promise.all([
      this._prisma.profile.findMany({
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      includeTotalCount
        ? this._prisma.profile.count()
        : Promise.resolve(undefined),
    ]);

    return { items, totalCount };
  }
}
