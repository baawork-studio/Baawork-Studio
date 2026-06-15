import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell } from '../../../src/components/AppShell';
import { fetchProject, fetchProjects, type Project } from '../../../src/api/projects';
import { fallbackProjects } from '../../../src/data/fallbackProjects';
import { ProjectDetailPage } from '../../../src/views/ProjectDetailPage';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://baawork-studio.up.railway.app';

function getFallbackProject(slug: string) {
  return fallbackProjects.find((project) => project.slug === slug);
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    return await fetchProject(slug);
  } catch {
    return getFallbackProject(slug) ?? null;
  }
}

export async function generateStaticParams() {
  try {
    const projects = await fetchProjects();
    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    return fallbackProjects.map((project) => ({ slug: project.slug }));
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: 'ไม่พบผลงาน',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `/projects/${project.slug}`;
  const description = project.shortDescription || project.description;
  const image = project.coverImageUrl || '/baawork-logo.png';

  return {
    title: `${project.title} | ${project.subtitle}`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      locale: 'th_TH',
      url: `${siteUrl}${canonical}`,
      siteName: 'Baawork Studio',
      title: `${project.title} | Baawork Studio`,
      description,
      images: [
        {
          url: image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Baawork Studio`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <ProjectDetailPage slug={slug} initialProject={project} />
    </AppShell>
  );
}
