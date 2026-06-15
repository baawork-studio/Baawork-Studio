import { AppShell } from '../src/components/AppShell';
import { fetchProjects } from '../src/api/projects';
import { fallbackProjects } from '../src/data/fallbackProjects';
import { HomePage } from '../src/views/HomePage';

async function getProjectsForHome() {
  try {
    const projects = await fetchProjects();
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function Page() {
  const projects = await getProjectsForHome();

  return (
    <AppShell>
      <HomePage initialProjects={projects} />
    </AppShell>
  );
}
