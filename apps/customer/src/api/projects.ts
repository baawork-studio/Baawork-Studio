import axios from 'axios';

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  screenImageUrls?: Partial<Record<'desktop' | 'mobile' | 'mobile1' | 'mobile2' | 'mobile3', string>>;
  stack: string[];
  highlights: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  timeout: 8000,
});

export async function fetchProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>('/api/v1/projects');
  return response.data;
}

export async function fetchProject(slug: string): Promise<Project> {
  const response = await api.get<Project>(`/api/v1/projects/${slug}`);
  return response.data;
}
