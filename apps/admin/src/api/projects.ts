import axios from 'axios';

export type CreateProjectPayload = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  stack: string[];
  highlights: string[];
  published: boolean;
};

export type Project = CreateProjectPayload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const username = import.meta.env.VITE_ADMIN_USERNAME ?? '';
  const password = import.meta.env.VITE_ADMIN_PASSWORD ?? '';

  if (username && password) {
    config.headers.Authorization = `Basic ${window.btoa(`${username}:${password}`)}`;
  }

  return config;
});

export async function createProject(payload: CreateProjectPayload): Promise<Project> {
  const response = await api.post<Project>('/api/v1/projects', payload);
  return response.data;
}

export async function uploadProjectImage(projectId: string, image: File): Promise<Project> {
  const formData = new FormData();
  formData.append('image', image);
  const response = await api.post<Project>(`/api/v1/projects/${projectId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
