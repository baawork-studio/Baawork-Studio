import axios from 'axios';

export const adminTokenKey = 'baawork-admin-token';

export type AdminLoginResponse = {
  token: string;
  expiresAt: number;
};

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
  const token = window.sessionStorage.getItem(adminTokenKey);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function loginAdmin(username: string, password: string): Promise<AdminLoginResponse> {
  const response = await api.post<AdminLoginResponse>('/api/v1/admin/login', { username, password });
  return response.data;
}

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
