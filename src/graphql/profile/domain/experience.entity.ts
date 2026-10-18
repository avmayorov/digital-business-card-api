import type { Company } from './company.entity.js';
import type { Project } from './project.entity.js';

export interface Experience {
  id: number;
  position: string;
  startDate: Date;
  endDate: Date | null;
  companyId: number;
  profileId: number;
  company: Company;
  projects: Project[];
}
