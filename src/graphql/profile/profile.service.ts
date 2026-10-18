import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import type { Profile } from './domain/profile.entity.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  getById(id: number): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  getAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }
}
