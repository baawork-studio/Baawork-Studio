# Baawork Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an end-to-end Baawork Studio portfolio system with a public showcase site, one-page admin project entry app, and Go API backed by PostgreSQL and Redis.

**Architecture:** The public Vite/React app consumes published project data from the Go API and renders an Apple-like home page plus editorial project detail pages. The admin Vite/React app posts project metadata and images to the same API through one focused add-work page. The Go/Gin API owns validation, PostgreSQL persistence, Redis public-read caching, static upload serving, and CORS for local development.

**Tech Stack:** Vite, React, TypeScript, MUI, Axios, Go, Gin, PostgreSQL, Redis, pgx, go-redis.

---

## File Structure

### `/Users/pachara/Documents/GitHub/Baawork-Studio`

- Create `package.json`: frontend scripts and dependencies for the public app.
- Create `index.html`: Vite entry document.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite config.
- Create `src/main.tsx`: React root.
- Create `src/App.tsx`: route switch for home and project detail.
- Create `src/theme.ts`: MUI theme using the approved palette.
- Create `src/api/projects.ts`: Axios client and project types.
- Create `src/data/fallbackProjects.ts`: fallback project content for graceful local rendering.
- Create `src/components/AppShell.tsx`: public top nav and footer shell.
- Create `src/pages/HomePage.tsx`: Apple-like showcase home page.
- Create `src/pages/ProjectDetailPage.tsx`: editorial detail/case-study page.
- Create `src/styles.css`: global responsive styling.
- Create `.env.example`: public API URL example.

### `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin`

- Create `package.json`: frontend scripts and dependencies for the admin app.
- Create `index.html`: Vite entry document.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite config.
- Create `src/main.tsx`: React root.
- Create `src/App.tsx`: one-page add-work form and preview.
- Create `src/theme.ts`: MUI theme using the approved palette.
- Create `src/api/projects.ts`: Axios admin create/upload client.
- Create `src/styles.css`: global admin layout styling.
- Create `.env.example`: API URL example.

### `/Users/pachara/Documents/GitHub/Baawork-Studio-Api`

- Create `go.mod`: Go module and dependencies.
- Create `.env.example`: local API, PostgreSQL, Redis, and upload configuration.
- Create `docker-compose.yml`: local PostgreSQL and Redis services.
- Create `main.go`: API bootstrap.
- Create `internal/config/config.go`: environment parsing.
- Create `internal/database/postgres.go`: PostgreSQL pool and schema creation.
- Create `internal/cache/redis.go`: Redis client setup.
- Create `internal/projects/model.go`: data model and DTOs.
- Create `internal/projects/repository.go`: PostgreSQL queries.
- Create `internal/projects/cache.go`: Redis cache keys and helpers.
- Create `internal/projects/handler.go`: Gin handlers and validation.
- Create `internal/server/router.go`: CORS, static uploads, routes.
- Create `uploads/.gitkeep`: keep the upload directory present in git.

---

## Task 1: Public App Scaffold

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/package.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/index.html`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/tsconfig.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/tsconfig.node.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/vite.config.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/main.tsx`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/styles.css`

- [ ] **Step 1: Create the public app package manifest**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/package.json`:

```json
{
  "name": "baawork-studio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.0",
    "axios": "^1.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.5",
    "@types/react-dom": "^19.1.5",
    "@vitejs/plugin-react": "^4.5.0",
    "typescript": "^5.8.3",
    "vite": "^6.3.5"
  }
}
```

- [ ] **Step 2: Create Vite and TypeScript config files**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Baawork Studio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

- [ ] **Step 3: Create the React entry and global styles**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from './theme';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/styles.css`:

```css
:root {
  color: #111827;
  background: #ffffff;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}
```

- [ ] **Step 4: Install dependencies and verify the scaffold builds**

Run:

```bash
npm install
npm run build
```

Expected: `npm run build` completes with TypeScript and Vite build success.

- [ ] **Step 5: Commit public scaffold**

Run:

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src/main.tsx src/styles.css
git commit -m "feat: scaffold public portfolio app"
```

Expected: Git creates a commit containing only the public app scaffold.

---

## Task 2: Public App Theme, API Client, And Fallback Data

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/theme.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/api/projects.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/data/fallbackProjects.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/.env.example`

- [ ] **Step 1: Create the MUI theme**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/theme.ts`:

```ts
import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#FFFFFF',
  text: '#111827',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryPink,
    },
    secondary: {
      main: palette.accentYellow,
    },
    text: {
      primary: palette.text,
      secondary: '#4B5563',
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
```

- [ ] **Step 2: Create the public project API client**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/api/projects.ts`:

```ts
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
```

- [ ] **Step 3: Create fallback projects for local rendering**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/data/fallbackProjects.ts`:

```ts
import type { Project } from '../api/projects';

export const fallbackProjects: Project[] = [
  {
    id: 'demo-1',
    slug: 'baawork-command-center',
    title: 'Baawork Command Center',
    subtitle: 'Operations dashboard for service teams',
    shortDescription:
      'A polished operating system for tracking work, requests, and delivery status.',
    description:
      'Baawork Command Center brings project status, service requests, and operational context into one fast interface. The system is designed for teams that need clean visibility without exposing unnecessary complexity.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['React', 'Go', 'PostgreSQL', 'Redis'],
    highlights: [
      'Real-time operational visibility',
      'Clean case workflow for daily teams',
      'Responsive interface for repeated use',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    slug: 'studio-booking-flow',
    title: 'Studio Booking Flow',
    subtitle: 'Reservation flow for creative services',
    shortDescription:
      'A direct booking experience that keeps choices clear and confirmation fast.',
    description:
      'This booking system focuses on reducing friction between discovery, service selection, and confirmation. The interface keeps the visual language premium while staying practical for daily business operations.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['Vite', 'MUI', 'Axios', 'Gin'],
    highlights: [
      'Simple service selection',
      'Image-led presentation',
      'Fast API-backed publishing',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
```

- [ ] **Step 4: Create environment example**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/.env.example`:

```dotenv
VITE_API_URL=http://localhost:8080
```

- [ ] **Step 5: Verify TypeScript**

Run:

```bash
npm run build
```

Expected: TypeScript resolves `theme`, `projects`, and `fallbackProjects` without errors.

- [ ] **Step 6: Commit theme and API foundation**

Run:

```bash
git add .env.example src/theme.ts src/api/projects.ts src/data/fallbackProjects.ts
git commit -m "feat: add public theme and project client"
```

Expected: Git creates a focused commit for public app foundations.

---

## Task 3: Public Home And Detail Pages

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/components/AppShell.tsx`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/pages/HomePage.tsx`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/pages/ProjectDetailPage.tsx`
- Modify: `/Users/pachara/Documents/GitHub/Baawork-Studio/src/App.tsx`

- [ ] **Step 1: Create the public app shell**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/components/AppShell.tsx`:

```tsx
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { palette } from '../theme';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.background, color: palette.text }}>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(18px)',
          bgcolor: 'rgba(255,255,255,0.82)',
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: palette.primaryPink }} />
              <Typography fontWeight={800}>Baawork Studio</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography variant="body2">Work</Typography>
              <Typography variant="body2">Studio</Typography>
              <Typography variant="body2">Contact</Typography>
            </Stack>
            <Button href="#contact" variant="contained" size="small">
              Start a project
            </Button>
          </Stack>
        </Container>
      </Box>
      {children}
      <Box component="footer" id="contact" sx={{ py: 8, borderTop: `1px solid ${palette.border}` }}>
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>
              Build the next system with Baawork Studio.
            </Typography>
            <Typography color="text.secondary">
              Portfolio systems, admin tools, and API-backed product experiences.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Create the Apple-like home page**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/pages/HomePage.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { fetchProjects, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette } from '../theme';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((items) => {
        if (!active) return;
        setProjects(items.length > 0 ? items : fallbackProjects);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setProjects(fallbackProjects);
        setStatus('fallback');
      });

    return () => {
      active = false;
    };
  }, []);

  const featured = projects[0];

  return (
    <Box component="main">
      <Box sx={{ minHeight: { xs: 'auto', md: 'calc(100vh - 64px)' }, display: 'grid', alignItems: 'center', py: { xs: 9, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 880 }}>
              <Chip label="Selected systems" sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: 58, md: 104 }, lineHeight: 0.92 }}>
                Baawork Studio
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.45 }}>
                We design and build portfolio-ready systems with polished interfaces, practical admin tools, and API-backed workflows.
              </Typography>
              <Button href="#work" variant="contained" size="large">
                View work
              </Button>
            </Stack>
            <Box
              component="img"
              src={featured.coverImageUrl}
              alt={featured.title}
              sx={{
                width: '100%',
                maxHeight: 460,
                objectFit: 'cover',
                borderRadius: 2,
                border: `1px solid ${palette.border}`,
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Box id="work" sx={{ bgcolor: palette.softGray, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="overline" color="primary" fontWeight={800}>
                  Work
                </Typography>
                <Typography variant="h3" fontWeight={800}>
                  Systems built to be seen and used.
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
                {status === 'fallback'
                  ? 'Showing local sample work while the API is unavailable.'
                  : 'Published work from Baawork Studio.'}
              </Typography>
            </Stack>
            <Grid container spacing={2.5}>
              {projects.map((project) => (
                <Grid key={project.id} size={{ xs: 12, md: 6 }}>
                  <Box
                    component="a"
                    href={`/projects/${project.slug}`}
                    sx={{
                      display: 'block',
                      height: '100%',
                      bgcolor: '#fff',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: `1px solid ${palette.border}`,
                      transition: 'transform 180ms ease, box-shadow 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 22px 60px rgba(17,24,39,0.12)',
                      },
                    }}
                  >
                    <Box component="img" src={project.coverImageUrl} alt={project.title} sx={{ width: '100%', height: 320, objectFit: 'cover' }} />
                    <Stack spacing={1.5} sx={{ p: 3 }}>
                      <Typography variant="h5" fontWeight={800}>
                        {project.title}
                      </Typography>
                      <Typography color="text.secondary">{project.shortDescription}</Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 3: Create the editorial detail page**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/pages/ProjectDetailPage.tsx`:

```tsx
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
};

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const fallback = useMemo(
    () => fallbackProjects.find((project) => project.slug === slug) ?? fallbackProjects[0],
    [slug],
  );
  const [project, setProject] = useState<Project>(fallback);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    let active = true;

    fetchProject(slug)
      .then((item) => {
        if (!active) return;
        setProject(item);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setProject(fallback);
        setStatus('fallback');
      });

    return () => {
      active = false;
    };
  }, [fallback, slug]);

  return (
    <Box component="main">
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Stack spacing={5}>
          <Button href="/" sx={{ alignSelf: 'flex-start' }}>
            Back to work
          </Button>
          <Grid container spacing={5} alignItems="end">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="primary" fontWeight={800}>
                  Project detail
                </Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: 48, md: 86 }, lineHeight: 0.95 }}>
                  {project.title}
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ lineHeight: 1.45 }}>
                  {project.subtitle}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {project.description}
              </Typography>
            </Grid>
          </Grid>

          {status === 'fallback' && (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: palette.accentYellow, fontWeight: 800 }}>
              Showing local sample content because the API is unavailable.
            </Box>
          )}

          <Box
            component="img"
            src={project.coverImageUrl}
            alt={project.title}
            sx={{ width: '100%', maxHeight: 560, objectFit: 'cover', borderRadius: 2, border: `1px solid ${palette.border}` }}
          />

          <Grid container spacing={2}>
            {project.galleryImageUrls.map((imageUrl) => (
              <Grid key={imageUrl} size={{ xs: 12, md: 6 }}>
                <Box component="img" src={imageUrl} alt={project.title} sx={{ width: '100%', height: 330, objectFit: 'cover', borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={800}>
                  Highlights
                </Typography>
                {project.highlights.map((highlight) => (
                  <Box key={highlight} sx={{ p: 2, borderLeft: `4px solid ${palette.primaryPink}`, bgcolor: palette.softGray }}>
                    <Typography>{highlight}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h4" fontWeight={800}>
                  Stack
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {project.stack.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Wire the public routes**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio/src/App.tsx`:

```tsx
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

function getProjectSlug() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

export default function App() {
  const slug = getProjectSlug();

  return (
    <AppShell>
      {slug ? <ProjectDetailPage slug={slug} /> : <HomePage />}
    </AppShell>
  );
}
```

- [ ] **Step 5: Verify public app build**

Run:

```bash
npm run build
```

Expected: public app builds successfully.

- [ ] **Step 6: Commit public pages**

Run:

```bash
git add src/App.tsx src/components/AppShell.tsx src/pages/HomePage.tsx src/pages/ProjectDetailPage.tsx
git commit -m "feat: build public portfolio pages"
```

Expected: Git creates a focused commit for public UI pages.

---

## Task 4: Backend Scaffold, Database, And Cache

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/go.mod`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/.env.example`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/docker-compose.yml`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/main.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/config/config.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/database/postgres.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/cache/redis.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/uploads/.gitkeep`

- [ ] **Step 1: Create Go module and local environment files**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/go.mod`:

```go
module baawork-studio-api

go 1.23

require (
	github.com/gin-contrib/cors v1.7.2
	github.com/gin-gonic/gin v1.10.1
	github.com/jackc/pgx/v5 v5.7.2
	github.com/redis/go-redis/v9 v9.7.0
)
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/.env.example`:

```dotenv
PORT=8080
DATABASE_URL=postgres://baawork:baawork@localhost:5432/baawork_studio?sslmode=disable
REDIS_ADDR=localhost:6379
REDIS_PASSWORD=
UPLOAD_DIR=uploads
PUBLIC_BASE_URL=http://localhost:8080
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: baawork_studio
      POSTGRES_USER: baawork
      POSTGRES_PASSWORD: baawork
    ports:
      - "5432:5432"
    volumes:
      - baawork_postgres:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  baawork_postgres:
```

- [ ] **Step 2: Create config parsing**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/config/config.go`:

```go
package config

import "os"

type Config struct {
	Port          string
	DatabaseURL   string
	RedisAddr     string
	RedisPassword string
	UploadDir     string
	PublicBaseURL string
}

func Load() Config {
	return Config{
		Port:          getEnv("PORT", "8080"),
		DatabaseURL:   getEnv("DATABASE_URL", "postgres://baawork:baawork@localhost:5432/baawork_studio?sslmode=disable"),
		RedisAddr:     getEnv("REDIS_ADDR", "localhost:6379"),
		RedisPassword: getEnv("REDIS_PASSWORD", ""),
		UploadDir:     getEnv("UPLOAD_DIR", "uploads"),
		PublicBaseURL: getEnv("PUBLIC_BASE_URL", "http://localhost:8080"),
	}
}

func getEnv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
```

- [ ] **Step 3: Create PostgreSQL setup**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/database/postgres.go`:

```go
package database

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect(ctx context.Context, databaseURL string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, err
	}
	return pool, nil
}

func EnsureSchema(ctx context.Context, pool *pgxpool.Pool) error {
	_, err := pool.Exec(ctx, `
		create table if not exists projects (
			id uuid primary key default gen_random_uuid(),
			slug text not null unique,
			title text not null,
			subtitle text not null,
			short_description text not null,
			description text not null,
			cover_image_url text not null,
			gallery_image_urls text[] not null default '{}',
			stack text[] not null default '{}',
			highlights text[] not null default '{}',
			published boolean not null default true,
			created_at timestamptz not null default now(),
			updated_at timestamptz not null default now()
		);
		create index if not exists projects_published_idx on projects (published, created_at desc);
	`)
	return err
}
```

- [ ] **Step 4: Create Redis setup**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/cache/redis.go`:

```go
package cache

import (
	"context"

	"github.com/redis/go-redis/v9"
)

func Connect(ctx context.Context, addr string, password string) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       0,
	})
	if err := client.Ping(ctx).Err(); err != nil {
		return nil, err
	}
	return client, nil
}
```

- [ ] **Step 5: Create API bootstrap**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/main.go`:

```go
package main

import (
	"context"
	"log"

	"baawork-studio-api/internal/cache"
	"baawork-studio-api/internal/config"
	"baawork-studio-api/internal/database"
	"baawork-studio-api/internal/server"
)

func main() {
	ctx := context.Background()
	cfg := config.Load()

	db, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("connect postgres: %v", err)
	}
	defer db.Close()

	if err := database.EnsureSchema(ctx, db); err != nil {
		log.Fatalf("ensure schema: %v", err)
	}

	redisClient, err := cache.Connect(ctx, cfg.RedisAddr, cfg.RedisPassword)
	if err != nil {
		log.Fatalf("connect redis: %v", err)
	}
	defer redisClient.Close()

	router := server.NewRouter(cfg, db, redisClient)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("run server: %v", err)
	}
}
```

- [ ] **Step 6: Create upload directory marker**

Write an empty file at `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/uploads/.gitkeep`.

- [ ] **Step 7: Resolve Go modules**

Run:

```bash
go mod tidy
```

Expected: `go.sum` is created and dependencies resolve.

- [ ] **Step 8: Commit backend scaffold**

Run:

```bash
git add go.mod go.sum .env.example docker-compose.yml main.go internal/config/config.go internal/database/postgres.go internal/cache/redis.go uploads/.gitkeep
git commit -m "feat: scaffold baawork studio api"
```

Expected: Git creates a focused backend scaffold commit.

---

## Task 5: Backend Project Endpoints

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/model.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/repository.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/cache.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/handler.go`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/server/router.go`

- [ ] **Step 1: Create project models and request DTOs**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/model.go`:

```go
package projects

import "time"

type Project struct {
	ID               string    `json:"id"`
	Slug             string    `json:"slug"`
	Title            string    `json:"title"`
	Subtitle         string    `json:"subtitle"`
	ShortDescription string    `json:"shortDescription"`
	Description      string    `json:"description"`
	CoverImageURL    string    `json:"coverImageUrl"`
	GalleryImageURLs []string  `json:"galleryImageUrls"`
	Stack            []string  `json:"stack"`
	Highlights       []string  `json:"highlights"`
	Published        bool      `json:"published"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type CreateProjectRequest struct {
	Slug             string   `json:"slug" binding:"required"`
	Title            string   `json:"title" binding:"required"`
	Subtitle         string   `json:"subtitle" binding:"required"`
	ShortDescription string   `json:"shortDescription" binding:"required"`
	Description      string   `json:"description" binding:"required"`
	CoverImageURL    string   `json:"coverImageUrl"`
	GalleryImageURLs []string `json:"galleryImageUrls"`
	Stack            []string `json:"stack"`
	Highlights       []string `json:"highlights"`
	Published        *bool    `json:"published"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
```

- [ ] **Step 2: Create the PostgreSQL repository**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/repository.go`:

```go
package projects

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) Repository {
	return Repository{db: db}
}

func (r Repository) ListPublished(ctx context.Context) ([]Project, error) {
	rows, err := r.db.Query(ctx, `
		select id::text, slug, title, subtitle, short_description, description, cover_image_url,
		       gallery_image_urls, stack, highlights, published, created_at, updated_at
		from projects
		where published = true
		order by created_at desc
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	projects := make([]Project, 0)
	for rows.Next() {
		project, err := scanProject(rows)
		if err != nil {
			return nil, err
		}
		projects = append(projects, project)
	}
	return projects, rows.Err()
}

func (r Repository) FindPublishedBySlug(ctx context.Context, slug string) (Project, error) {
	row := r.db.QueryRow(ctx, `
		select id::text, slug, title, subtitle, short_description, description, cover_image_url,
		       gallery_image_urls, stack, highlights, published, created_at, updated_at
		from projects
		where slug = $1 and published = true
	`, slug)

	project, err := scanProject(row)
	if errors.Is(err, pgx.ErrNoRows) {
		return Project{}, pgx.ErrNoRows
	}
	return project, err
}

func (r Repository) Create(ctx context.Context, request CreateProjectRequest) (Project, error) {
	published := true
	if request.Published != nil {
		published = *request.Published
	}

	row := r.db.QueryRow(ctx, `
		insert into projects (
			slug, title, subtitle, short_description, description, cover_image_url,
			gallery_image_urls, stack, highlights, published
		)
		values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
		returning id::text, slug, title, subtitle, short_description, description, cover_image_url,
		          gallery_image_urls, stack, highlights, published, created_at, updated_at
	`, request.Slug, request.Title, request.Subtitle, request.ShortDescription, request.Description,
		request.CoverImageURL, request.GalleryImageURLs, request.Stack, request.Highlights, published)

	return scanProject(row)
}

func (r Repository) AddImage(ctx context.Context, id string, imageURL string) (Project, error) {
	row := r.db.QueryRow(ctx, `
		update projects
		set gallery_image_urls = array_append(gallery_image_urls, $2),
		    cover_image_url = case when cover_image_url = '' then $2 else cover_image_url end,
		    updated_at = now()
		where id = $1
		returning id::text, slug, title, subtitle, short_description, description, cover_image_url,
		          gallery_image_urls, stack, highlights, published, created_at, updated_at
	`, id, imageURL)

	return scanProject(row)
}

type projectScanner interface {
	Scan(dest ...any) error
}

func scanProject(scanner projectScanner) (Project, error) {
	var project Project
	err := scanner.Scan(
		&project.ID,
		&project.Slug,
		&project.Title,
		&project.Subtitle,
		&project.ShortDescription,
		&project.Description,
		&project.CoverImageURL,
		&project.GalleryImageURLs,
		&project.Stack,
		&project.Highlights,
		&project.Published,
		&project.CreatedAt,
		&project.UpdatedAt,
	)
	return project, err
}
```

- [ ] **Step 3: Create Redis cache helper**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/cache.go`:

```go
package projects

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
)

type Cache struct {
	redis *redis.Client
}

func NewCache(redisClient *redis.Client) Cache {
	return Cache{redis: redisClient}
}

func (c Cache) GetProjects(ctx context.Context) ([]Project, bool) {
	value, err := c.redis.Get(ctx, "projects:published").Result()
	if err != nil {
		return nil, false
	}
	var projects []Project
	if err := json.Unmarshal([]byte(value), &projects); err != nil {
		return nil, false
	}
	return projects, true
}

func (c Cache) SetProjects(ctx context.Context, projects []Project) {
	value, err := json.Marshal(projects)
	if err != nil {
		return
	}
	c.redis.Set(ctx, "projects:published", value, 5*time.Minute)
}

func (c Cache) GetProject(ctx context.Context, slug string) (Project, bool) {
	value, err := c.redis.Get(ctx, "projects:slug:"+slug).Result()
	if err != nil {
		return Project{}, false
	}
	var project Project
	if err := json.Unmarshal([]byte(value), &project); err != nil {
		return Project{}, false
	}
	return project, true
}

func (c Cache) SetProject(ctx context.Context, project Project) {
	value, err := json.Marshal(project)
	if err != nil {
		return
	}
	c.redis.Set(ctx, "projects:slug:"+project.Slug, value, 5*time.Minute)
}

func (c Cache) ClearPublic(ctx context.Context) {
	c.redis.Del(ctx, "projects:published")
}
```

- [ ] **Step 4: Create Gin handlers**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/projects/handler.go`:

```go
package projects

import (
	"errors"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

type Handler struct {
	repository    Repository
	cache         Cache
	uploadDir     string
	publicBaseURL string
}

func NewHandler(repository Repository, cache Cache, uploadDir string, publicBaseURL string) Handler {
	return Handler{
		repository:    repository,
		cache:         cache,
		uploadDir:     uploadDir,
		publicBaseURL: strings.TrimRight(publicBaseURL, "/"),
	}
}

func (h Handler) List(c *gin.Context) {
	ctx := c.Request.Context()
	if cached, ok := h.cache.GetProjects(ctx); ok {
		c.JSON(http.StatusOK, cached)
		return
	}

	items, err := h.repository.ListPublished(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to list projects"})
		return
	}
	h.cache.SetProjects(ctx, items)
	c.JSON(http.StatusOK, items)
}

func (h Handler) Detail(c *gin.Context) {
	ctx := c.Request.Context()
	slug := c.Param("slug")

	if cached, ok := h.cache.GetProject(ctx, slug); ok {
		c.JSON(http.StatusOK, cached)
		return
	}

	project, err := h.repository.FindPublishedBySlug(ctx, slug)
	if errors.Is(err, pgx.ErrNoRows) {
		c.JSON(http.StatusNotFound, ErrorResponse{Error: "project not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to fetch project"})
		return
	}

	h.cache.SetProject(ctx, project)
	c.JSON(http.StatusOK, project)
}

func (h Handler) Create(c *gin.Context) {
	var request CreateProjectRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "invalid project payload"})
		return
	}

	project, err := h.repository.Create(c.Request.Context(), request)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "failed to create project"})
		return
	}

	h.cache.ClearPublic(c.Request.Context())
	c.JSON(http.StatusCreated, project)
}

func (h Handler) UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "image file is required"})
		return
	}

	filename := filepath.Base(file.Filename)
	target := filepath.Join(h.uploadDir, filename)
	if err := c.SaveUploadedFile(file, target); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to save image"})
		return
	}

	imageURL := h.publicBaseURL + "/uploads/" + filename
	project, err := h.repository.AddImage(c.Request.Context(), c.Param("id"), imageURL)
	if errors.Is(err, pgx.ErrNoRows) {
		c.JSON(http.StatusNotFound, ErrorResponse{Error: "project not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "failed to attach image"})
		return
	}

	h.cache.ClearPublic(c.Request.Context())
	c.JSON(http.StatusOK, project)
}
```

- [ ] **Step 5: Create router with CORS, static uploads, and health**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Api/internal/server/router.go`:

```go
package server

import (
	"net/http"
	"os"

	"baawork-studio-api/internal/config"
	"baawork-studio-api/internal/projects"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

func NewRouter(cfg config.Config, db *pgxpool.Pool, redisClient *redis.Client) *gin.Engine {
	_ = os.MkdirAll(cfg.UploadDir, 0o755)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:5174"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: false,
	}))

	repository := projects.NewRepository(db)
	cache := projects.NewCache(redisClient)
	handler := projects.NewHandler(repository, cache, cfg.UploadDir, cfg.PublicBaseURL)

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
	router.Static("/uploads", cfg.UploadDir)

	v1 := router.Group("/api/v1")
	{
		v1.GET("/projects", handler.List)
		v1.GET("/projects/:slug", handler.Detail)
		v1.POST("/projects", handler.Create)
		v1.POST("/projects/:id/images", handler.UploadImage)
	}

	return router
}
```

- [ ] **Step 6: Format and verify backend compilation**

Run:

```bash
gofmt -w main.go internal
go test ./...
```

Expected: all packages compile and `go test ./...` succeeds.

- [ ] **Step 7: Commit backend project endpoints**

Run:

```bash
git add internal/projects internal/server/router.go main.go
git commit -m "feat: add project API endpoints"
```

Expected: Git creates a focused backend endpoint commit.

---

## Task 6: Admin App Scaffold And Client

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/package.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/index.html`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/tsconfig.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/tsconfig.node.json`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/vite.config.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/main.tsx`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/theme.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/api/projects.ts`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/styles.css`
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/.env.example`

- [ ] **Step 1: Create admin package and config files**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/package.json`:

```json
{
  "name": "baawork-studio-admin",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 5174",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 4174"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.0",
    "axios": "^1.9.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.5",
    "@types/react-dom": "^19.1.5",
    "@vitejs/plugin-react": "^4.5.0",
    "typescript": "^5.8.3",
    "vite": "^6.3.5"
  }
}
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Baawork Studio Admin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
});
```

- [ ] **Step 2: Create admin theme and entry**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/theme.ts`:

```ts
import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#FFFFFF',
  text: '#111827',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryPink,
    },
    secondary: {
      main: palette.accentYellow,
    },
    text: {
      primary: palette.text,
      secondary: '#4B5563',
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from './theme';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/styles.css`:

```css
:root {
  color: #111827;
  background: #f3f4f6;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #f3f4f6;
}
```

- [ ] **Step 3: Create admin API client**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/api/projects.ts`:

```ts
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
```

- [ ] **Step 4: Create admin environment example**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/.env.example`:

```dotenv
VITE_API_URL=http://localhost:8080
```

- [ ] **Step 5: Install dependencies for the admin scaffold**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created. The admin app build runs after `src/App.tsx` is created in Task 7.

---

## Task 7: Admin Add-Work Page

**Files:**
- Create: `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/App.tsx`

- [ ] **Step 1: Create the one-page admin add-work app**

Write `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin/src/App.tsx`:

```tsx
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { createProject, uploadProjectImage, type Project } from './api/projects';
import { palette } from './theme';

type FormState = {
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  stack: string;
  highlights: string;
  published: boolean;
};

const initialForm: FormState = {
  title: '',
  subtitle: '',
  shortDescription: '',
  description: '',
  stack: '',
  highlights: '',
  published: true,
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function App() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const slug = useMemo(() => toSlug(form.title), [form.title]);
  const coverPreview = coverImage ? URL.createObjectURL(coverImage) : '';

  function updateField(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setCoverImage(file);
  }

  function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    setGalleryImages(Array.from(event.target.files ?? []));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title || !form.subtitle || !form.shortDescription || !form.description) {
      setStatus('error');
      setMessage('Please complete title, subtitle, short description, and description.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const project = await createProject({
        slug,
        title: form.title,
        subtitle: form.subtitle,
        shortDescription: form.shortDescription,
        description: form.description,
        coverImageUrl: '',
        galleryImageUrls: [],
        stack: splitLines(form.stack),
        highlights: splitLines(form.highlights),
        published: form.published,
      });

      let latest = project;
      if (coverImage) {
        latest = await uploadProjectImage(project.id, coverImage);
      }
      for (const image of galleryImages) {
        latest = await uploadProjectImage(project.id, image);
      }

      setCreatedProject(latest);
      setStatus('success');
      setMessage('Project published successfully.');
      setForm(initialForm);
      setCoverImage(null);
      setGalleryImages([]);
    } catch {
      setStatus('error');
      setMessage('Could not save project. Check that the API is running.');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.softGray }}>
      <Box sx={{ bgcolor: '#111827', color: '#fff', py: 2 }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: palette.primaryPink }} />
              <Typography fontWeight={800}>Baawork Studio Admin</Typography>
            </Stack>
            <Chip label="Add work" sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h4" fontWeight={800}>
                    Add portfolio work
                  </Typography>
                  <Typography color="text.secondary">
                    Upload images and describe the system for the public showcase.
                  </Typography>
                </Box>

                {message && <Alert severity={status === 'success' ? 'success' : 'error'}>{message}</Alert>}

                <Button component="label" variant="outlined" sx={{ minHeight: 170, borderStyle: 'dashed', bgcolor: '#fff' }}>
                  {coverPreview ? (
                    <Box component="img" src={coverPreview} alt="Cover preview" sx={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 1 }} />
                  ) : (
                    <Typography fontWeight={800}>Choose cover image</Typography>
                  )}
                  <input hidden type="file" accept="image/*" onChange={handleCoverChange} />
                </Button>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Project title" value={form.title} onChange={(event) => updateField('title', event.target.value)} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField fullWidth label="Slug" value={slug} disabled />
                  </Grid>
                </Grid>

                <TextField fullWidth label="Subtitle" value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} />
                <TextField fullWidth label="Short description" value={form.shortDescription} onChange={(event) => updateField('shortDescription', event.target.value)} />
                <TextField fullWidth multiline minRows={5} label="System description" value={form.description} onChange={(event) => updateField('description', event.target.value)} />
                <TextField fullWidth multiline minRows={3} label="Stack, one per line" value={form.stack} onChange={(event) => updateField('stack', event.target.value)} />
                <TextField fullWidth multiline minRows={3} label="Highlights, one per line" value={form.highlights} onChange={(event) => updateField('highlights', event.target.value)} />

                <Button component="label" variant="outlined">
                  Add gallery images
                  <input hidden multiple type="file" accept="image/*" onChange={handleGalleryChange} />
                </Button>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography fontWeight={700}>Publish immediately</Typography>
                  <Switch checked={form.published} onChange={(event) => updateField('published', event.target.checked)} />
                </Stack>

                <Button type="submit" variant="contained" size="large" disabled={status === 'saving'}>
                  {status === 'saving' ? 'Saving...' : 'Publish work'}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, position: 'sticky', top: 24 }}>
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight={800}>
                  Preview
                </Typography>
                <Box sx={{ minHeight: 260, borderRadius: 2, bgcolor: '#fff', border: `1px solid ${palette.border}`, overflow: 'hidden' }}>
                  {coverPreview ? (
                    <Box component="img" src={coverPreview} alt="Preview" sx={{ width: '100%', height: 260, objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ height: 260, display: 'grid', placeItems: 'center', bgcolor: palette.accentYellow }}>
                      <Typography fontWeight={900}>Image preview</Typography>
                    </Box>
                  )}
                </Box>
                <Typography variant="h4" fontWeight={900}>
                  {form.title || 'Project title'}
                </Typography>
                <Typography color="text.secondary">{form.shortDescription || 'Short description appears here.'}</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {splitLines(form.stack).map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: palette.accentYellow, fontWeight: 800 }} />
                  ))}
                </Stack>
                {createdProject && (
                  <Alert severity="success">
                    Last created: {createdProject.title}
                  </Alert>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Install dependencies and verify admin build**

Run:

```bash
npm install
npm run build
```

Expected: admin app builds successfully.

- [ ] **Step 3: Commit admin app**

Run:

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts .env.example src
git commit -m "feat: build admin add-work app"
```

Expected: Git creates a focused admin app commit.

---

## Task 8: End-To-End Local Verification

**Files:**
- No code changes expected unless verification reveals defects.

- [ ] **Step 1: Start PostgreSQL and Redis**

Run in `/Users/pachara/Documents/GitHub/Baawork-Studio-Api`:

```bash
docker compose up -d
```

Expected: PostgreSQL listens on `localhost:5432` and Redis listens on `localhost:6379`.

- [ ] **Step 2: Start API**

Run in `/Users/pachara/Documents/GitHub/Baawork-Studio-Api`:

```bash
go run main.go
```

Expected: API runs on `http://localhost:8080`.

- [ ] **Step 3: Verify API health**

Run:

```bash
curl -s http://127.0.0.1:8080/health
```

Expected:

```json
{"status":"ok"}
```

- [ ] **Step 4: Start public app**

Run in `/Users/pachara/Documents/GitHub/Baawork-Studio`:

```bash
npm run dev
```

Expected: public app runs on `http://localhost:5173`.

- [ ] **Step 5: Start admin app**

Run in `/Users/pachara/Documents/GitHub/Baawork-Studio-Admin`:

```bash
npm run dev
```

Expected: admin app runs on `http://localhost:5174`.

- [ ] **Step 6: Create a project through admin**

Use the admin page at `http://localhost:5174`:

```text
Title: Baawork Studio Demo
Subtitle: Portfolio system demo
Short description: A published project created from the admin add-work page.
Description: This project verifies that the admin form, API, PostgreSQL storage, Redis invalidation, and public showcase work together.
Stack:
React
Go
PostgreSQL
Redis
Highlights:
Created from admin
Published through API
Rendered on public site
```

Expected: form shows success and the project is stored in PostgreSQL.

- [ ] **Step 7: Verify public list and detail**

Open:

```text
http://localhost:5173
http://localhost:5173/projects/baawork-studio-demo
```

Expected: public home lists the new project, and clicking the project opens the editorial detail page.

- [ ] **Step 8: Confirm final repository status**

Run in each repository:

```bash
git status --short
```

Expected: no unexpected uncommitted changes remain after the implementation commits.

---

## Self-Review

- Spec coverage: The plan covers the public Apple-like home, editorial detail pages, admin add-work page, Go/Gin API, PostgreSQL persistence, Redis cache, upload endpoint, CORS, health check, and local end-to-end verification.
- Forbidden-pattern scan: The plan does not contain unfinished implementation markers or undefined implementation steps.
- Type consistency: Public and admin TypeScript project fields match the API JSON contract: `shortDescription`, `coverImageUrl`, `galleryImageUrls`, `createdAt`, and `updatedAt`.
