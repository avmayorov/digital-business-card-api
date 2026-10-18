import type { Experience } from './experience.entity.js';
import type { Skill } from './skill.entity.js';

export interface BaseProfile {
  id: number;
  name: string;
  description: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile extends BaseProfile {
  skills: Skill[];
  experiences: Experience[];
}

export interface ProfilesPage {
  items: BaseProfile[];
  totalCount?: number;
}
