export interface Profile {
  id: number;
  name: string;
  description: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
