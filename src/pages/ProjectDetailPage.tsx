import { useEffect, useMemo, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

type MockupTemplate = 'macbook' | 'macbookMobile' | 'mobiles';

const mockupAssets: Record<MockupTemplate, string> = {
  macbook: '/project-detail-macbook.png',
  macbookMobile: '/project-detail-macbook-mobile.png',
  mobiles: '/project-detail-mobiles.png',
};

const projectVisuals: Record<string, { accent: string; tint: string; template: MockupTemplate }> = {
  'ai-command-center': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'ai-sales-forecast': { accent: '#7C3AED', tint: '#F5F0FF', template: 'macbook' },
  'ai-document-review': { accent: '#0EA5E9', tint: '#EFF9FF', template: 'mobiles' },
  'ai-service-agent': { accent: '#10B981', tint: '#ECFDF5', template: 'macbookMobile' },
  'ai-api-monitor': { accent: '#F97316', tint: '#FFF7ED', template: 'macbook' },
  'operations-dashboard': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'booking-platform': { accent: '#2563EB', tint: '#EFF6FF', template: 'macbook' },
  'crm-workspace': { accent: '#8B5CF6', tint: '#F5F3FF', template: 'macbookMobile' },
  'inventory-control': { accent: '#059669', tint: '#ECFDF5', template: 'mobiles' },
  'analytics-portal': { accent: '#DC2626', tint: '#FEF2F2', template: 'macbook' },
};

function getProjectVisual(project: Project) {
  return projectVisuals[project.slug] ?? {
    accent: palette.primaryPink,
    tint: '#FFF0F8',
    template: 'macbookMobile' as const,
  };
}

const techIcons: Record<string, { src?: string; label?: string; invert?: boolean }> = {
  React: { src: 'https://thesvg.org/icons/react/default.svg' },
  Vite: { src: 'https://thesvg.org/icons/vite/default.svg' },
  TypeScript: { src: 'https://thesvg.org/icons/typescript/default.svg' },
  MUI: { src: 'https://thesvg.org/icons/mui/default.svg' },
  Axios: { src: 'https://thesvg.org/icons/axios/default.svg' },
  Go: { src: 'https://thesvg.org/icons/go/dark.svg', invert: true },
  Gin: { label: 'Gin' },
  PostgreSQL: { src: 'https://thesvg.org/icons/postgresql/default.svg' },
  Redis: { src: 'https://thesvg.org/icons/redis/default.svg' },
  'REST API': { label: 'API' },
  SQL: { label: 'SQL' },
  OCR: { label: 'OCR' },
  'AI Workflow': { label: 'AI' },
  'Forecast Model': { label: 'ML' },
  'Document AI': { label: 'Doc' },
  'Chat Workflow': { label: 'Chat' },
  'AI Assistant': { label: 'AI' },
  Monitoring: { label: 'Mon' },
  'Barcode Workflow': { label: 'Code' },
  'Data Visualization': { label: 'Chart' },
};

function getTechReason(project: Project) {
  if (project.slug.startsWith('ai-')) {
    return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อให้หน้าจอทำงานเร็ว เชื่อมต่อ API และประมวลผลข้อมูล AI ได้เป็นระบบ ตั้งแต่การดึงข้อมูล วิเคราะห์ผล ไปจนถึงส่ง insight ให้ทีมใช้งานจริง`;
  }

  return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อสร้างเว็บแอปที่ดูแลง่าย เชื่อมต่อข้อมูลจริงได้ครบ และรองรับ workflow หลังบ้านที่ทีมต้องใช้งานต่อเนื่องทุกวัน`;
}

function BlankScreen({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#FFFFFF',
        background: `linear-gradient(135deg, #FFFFFF 0%, ${visual.tint} 100%)`,
      }}
    />
  );
}

function ProjectDeviceShowcase({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 960, md: 1260, lg: 1440 },
        mx: 'auto',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={mockupAssets[visual.template]}
        alt={`${project.title} บนหน้าจออุปกรณ์`}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {(visual.template === 'macbook' || visual.template === 'macbookMobile') && (
        <Box
          sx={{
            position: 'absolute',
            left: '34.65%',
            top: '19.65%',
            width: '47.72%',
            height: '47.05%',
            overflow: 'hidden',
          }}
        >
          <BlankScreen project={project} />
        </Box>
      )}

      {visual.template === 'macbookMobile' && (
        <Box
          sx={{
            position: 'absolute',
            left: '79.6%',
            top: '38.9%',
            width: '13.25%',
            height: '43.1%',
            borderRadius: '8% / 4.5%',
            overflow: 'hidden',
          }}
        >
          <BlankScreen project={project} />
        </Box>
      )}

      {visual.template === 'mobiles' && (
        <>
          <Box
            sx={{
              position: 'absolute',
              left: '31.55%',
              top: '31.2%',
              width: '14.8%',
              height: '50.05%',
              borderRadius: '9% / 4.5%',
              overflow: 'hidden',
            }}
          >
            <BlankScreen project={project} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: '45.95%',
              top: '23.35%',
              width: '18.05%',
              height: '57.85%',
              borderRadius: '8% / 4%',
              overflow: 'hidden',
            }}
          >
            <BlankScreen project={project} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: '63.55%',
              top: '31.2%',
              width: '14.8%',
              height: '50.05%',
              borderRadius: '9% / 4.5%',
              overflow: 'hidden',
            }}
          >
            <BlankScreen project={project} />
          </Box>
        </>
      )}
    </Box>
  );
}

function ProjectTechSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.85fr) minmax(420px, 1fr)' },
        alignItems: 'center',
        gap: { xs: 4, md: 7, lg: 9 },
        mt: { xs: 1, md: 2 },
      }}
    >
      <Stack spacing={{ xs: 1.75, md: 2.25 }} sx={{ maxWidth: 620, alignItems: 'flex-start', textAlign: 'left' }}>
        <Typography
          variant="h2"
          sx={{
            color: visual.accent,
            fontSize: { xs: 42, sm: 54, md: 66, lg: 72 },
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: 0,
          }}
        >
          เทคโนโลยีที่ใช้
        </Typography>
        <Typography
          sx={{
            maxWidth: 620,
            color: '#4B5563',
            ...typeScale.bodyLarge,
          }}
        >
          {getTechReason(project)}
        </Typography>
      </Stack>

      <Box
        aria-label={`เทคโนโลยีที่ใช้ใน ${project.title}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, minmax(0, 1fr))',
            sm: 'repeat(5, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 1.5, md: 1.8 },
          justifySelf: { xs: 'stretch', md: 'end' },
          width: '100%',
          maxWidth: { xs: '100%', md: 520 },
        }}
      >
        {project.stack.map((item) => {
          const icon = techIcons[item] ?? { label: item.slice(0, 4) };

          return (
            <Box
              key={item}
              title={item}
              sx={{
                aspectRatio: '1 / 1',
                display: 'grid',
                placeItems: 'center',
                borderRadius: { xs: '18px', md: '20px' },
                bgcolor: '#F7F8FA',
                boxShadow: '0 16px 36px rgba(17,24,39,0.06)',
                transition:
                  'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms ease, box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  bgcolor: '#F3F4F6',
                  boxShadow: '0 20px 42px rgba(17,24,39,0.1)',
                },
              }}
            >
              {icon.src ? (
                <Box
                  component="img"
                  src={icon.src}
                  alt={item}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                  sx={{
                    width: { xs: 34, sm: 38, md: 44 },
                    height: { xs: 34, sm: 38, md: 44 },
                    objectFit: 'contain',
                    filter: icon.invert
                      ? 'invert(1) drop-shadow(0 10px 24px rgba(17,24,39,0.12))'
                      : 'drop-shadow(0 10px 24px rgba(17,24,39,0.12))',
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    color: visual.accent,
                    fontSize: { xs: 18, md: 21 },
                    lineHeight: 1,
                    fontWeight: 800,
                  }}
                >
                  {icon.label}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

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
      <Box sx={{ px: pageGutter, pt: { xs: 8, sm: 9, md: 10, lg: 11 }, pb: { xs: 8, sm: 9, md: 11, lg: 12 } }}>
        <Stack spacing={{ xs: 5, md: 6 }}>
          <Stack
            spacing={{ xs: 1.25, sm: 1.5, md: 1.75 }}
            alignItems="center"
            textAlign="center"
            sx={{ width: '100%', mx: 'auto', maxWidth: 1060, alignSelf: 'center' }}
          >
            <Typography
              variant="h1"
              sx={{
                color: palette.text,
                ...typeScale.hero,
                fontSize: { xs: 48, sm: 64, md: 88, lg: 108 },
                width: '100%',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: getProjectVisual(project).accent,
                ...typeScale.intro,
                width: '100%',
                maxWidth: 880,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {project.subtitle}
            </Typography>
          </Stack>

          <ProjectDeviceShowcase project={project} />

          <Stack
            spacing={{ xs: 4, md: 5 }}
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                color: '#4B5563',
                ...typeScale.bodyLarge,
                width: '100%',
                maxWidth: 1420,
                mx: 'auto',
                textAlign: 'left',
              }}
            >
              {project.description}
            </Typography>
            <ProjectTechSection project={project} />
          </Stack>

          {status === 'fallback' && (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: palette.accentYellow, fontWeight: 600 }}>
              กำลังแสดงเนื้อหาตัวอย่างในเครื่อง เพราะ API ยังไม่พร้อมใช้งาน
            </Box>
          )}

          <Grid container spacing={2}>
            {project.galleryImageUrls.map((imageUrl) => (
              <Grid key={imageUrl} size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={project.title}
                  sx={{ width: '100%', height: 330, objectFit: 'cover', borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2}>
                <Typography variant="h4">
                  จุดเด่น
                </Typography>
                <Stack
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                    gap: 2,
                  }}
                >
                  {project.highlights.map((highlight) => (
                    <Box key={highlight} sx={{ p: 2.5, borderLeft: `4px solid ${palette.primaryPink}`, bgcolor: palette.softGray }}>
                      <Typography>{highlight}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
