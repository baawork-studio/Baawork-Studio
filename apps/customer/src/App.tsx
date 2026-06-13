import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function getProjectSlug() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

export default function App() {
  const slug = getProjectSlug();

  return <AppShell>{slug ? <ProjectDetailPage slug={slug} /> : <HomePage />}</AppShell>;
}
