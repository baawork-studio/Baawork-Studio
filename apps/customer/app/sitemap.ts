import type { MetadataRoute } from 'next';
import { fetchProjects } from '../src/api/projects';
import { fallbackProjects } from '../src/data/fallbackProjects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://baawork-studio.up.railway.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects = fallbackProjects;

  try {
    const apiProjects = await fetchProjects();
    if (apiProjects.length > 0) {
      projects = apiProjects;
    }
  } catch {
    projects = fallbackProjects;
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
