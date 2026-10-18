import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../src/generated/prisma/client.js';
import seedDataJson from './data.json' with { type: 'json' };

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type ProjectJson = {
  name: string;
  description?: string | null;
  url?: string | null;
  repoUrl?: string | null;
  achievements: string[];
};

type ExperienceJson = {
  position: string;
  startDate: string;
  endDate: string | null;
  company: CompanyJson;
  projects: ProjectJson[];
};

type ProfileJson = {
  id: number;
  name: string;
  description: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  experiences: ExperienceJson[];
  skills: string[];
};

type CompanyJson = {
  id: number;
  name: string;
  websiteUrl?: string | null;
};

function toProfileInput(
  profile: ProfileJson,
): Prisma.ProfileCreateInput & { id: number } {
  return {
    id: profile.id,
    name: profile.name,
    description: profile.description,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    websiteUrl: profile.websiteUrl,
    experiences: {
      create: profile.experiences.map((experience) => ({
        position: experience.position,
        startDate: new Date(experience.startDate),
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        companyId: experience.company.id,
        projects: { create: experience.projects },
      })),
    },
    skills: {
      create: profile.skills.map((name) => ({
        skill: { connectOrCreate: { where: { name }, create: { name } } },
      })),
    },
  };
}

async function main() {
  const profiles = seedDataJson as unknown as ProfileJson[];

  const companies: (Prisma.CompanyCreateInput & {
    id: number;
  })[] = [];

  for (const profile of profiles) {
    for (const experience of profile.experiences) {
      companies.push(experience.company);
    }
  }
  const data = profiles.map(toProfileInput);

  await prisma.profile.deleteMany();
  await prisma.company.deleteMany();
  await prisma.skill.deleteMany();

  for (const company of companies) {
    await prisma.company.create({ data: company });
  }

  for (const profile of data) {
    await prisma.profile.create({ data: profile });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
    console.log('Database has been initialized.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
