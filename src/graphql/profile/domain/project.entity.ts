export interface Project {
  id: number;
  name: string;
  description: string | null;
  url: string | null;
  repoUrl: string | null;
  achievements: string[];
  experienceId: number;
}
