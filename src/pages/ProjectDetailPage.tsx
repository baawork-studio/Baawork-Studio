import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

type MockupTemplate = 'macbook' | 'macbookMobile' | 'mobiles';
type ScreenVariant = 'desktop' | 'mobile' | 'summary';

const mockupAssets: Record<MockupTemplate, string> = {
  macbook: '/project-detail-macbook.png',
  macbookMobile: '/project-detail-macbook-mobile.png',
  mobiles: '/project-detail-mobiles.png',
};

const projectVisuals: Record<string, { accent: string; tint: string; template: MockupTemplate; metric: string }> = {
  'ai-command-center': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile', metric: 'Risk AI' },
  'ai-sales-forecast': { accent: '#7C3AED', tint: '#F5F0FF', template: 'macbook', metric: 'Forecast' },
  'ai-document-review': { accent: '#0EA5E9', tint: '#EFF9FF', template: 'mobiles', metric: 'OCR' },
  'ai-service-agent': { accent: '#10B981', tint: '#ECFDF5', template: 'macbookMobile', metric: 'Chat AI' },
  'ai-api-monitor': { accent: '#F97316', tint: '#FFF7ED', template: 'macbook', metric: 'API Health' },
  'operations-dashboard': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile', metric: 'Ops' },
  'booking-platform': { accent: '#2563EB', tint: '#EFF6FF', template: 'macbook', metric: 'Booking' },
  'crm-workspace': { accent: '#8B5CF6', tint: '#F5F3FF', template: 'macbookMobile', metric: 'CRM' },
  'inventory-control': { accent: '#059669', tint: '#ECFDF5', template: 'mobiles', metric: 'Stock' },
  'analytics-portal': { accent: '#DC2626', tint: '#FEF2F2', template: 'macbook', metric: 'Insight' },
};

function getProjectVisual(project: Project) {
  return projectVisuals[project.slug] ?? {
    accent: palette.primaryPink,
    tint: '#FFF0F8',
    template: 'macbookMobile' as const,
    metric: 'System',
  };
}

function ProjectScreenContent({
  project,
  variant,
  index = 0,
}: {
  project: Project;
  variant: ScreenVariant;
  index?: number;
}) {
  const visual = getProjectVisual(project);
  const compact = variant !== 'desktop';
  const progress = 56 + ((project.title.length + index * 9) % 32);
  const values = [
    `${progress}%`,
    `${project.highlights.length}`,
    `${project.stack.length}`,
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        bgcolor: '#F8FAFC',
        background: `radial-gradient(circle at 82% 14%, ${visual.tint} 0, transparent 32%), linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)`,
        color: palette.text,
        p: compact ? '7%' : '5.2%',
        fontFamily: 'inherit',
      }}
    >
      <Stack spacing={compact ? 1.3 : 2} sx={{ height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              sx={{
                color: visual.accent,
                fontSize: compact ? 'clamp(8px, 2.1vw, 12px)' : 'clamp(10px, 1vw, 15px)',
                lineHeight: 1.1,
                fontWeight: 800,
              }}
            >
              {visual.metric}
            </Typography>
            <Typography
              sx={{
                mt: 0.45,
                color: palette.text,
                fontSize: compact ? 'clamp(12px, 3.4vw, 20px)' : 'clamp(17px, 1.75vw, 28px)',
                lineHeight: 1.05,
                fontWeight: 800,
              }}
            >
              {project.title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: compact ? '18%' : '14%',
              aspectRatio: '1',
              borderRadius: '50%',
              bgcolor: visual.accent,
              boxShadow: `0 18px 45px ${visual.accent}33`,
            }}
          />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)',
            gap: compact ? 0.8 : 1.2,
          }}
        >
          {values.map((value, itemIndex) => (
            <Box
              key={value}
              sx={{
                borderRadius: compact ? 1.2 : 1.5,
                bgcolor: '#FFFFFF',
                p: compact ? '6%' : '7%',
                boxShadow: '0 12px 30px rgba(17, 24, 39, 0.08)',
                display: itemIndex > 0 && compact ? 'none' : 'block',
              }}
            >
              <Typography sx={{ fontSize: compact ? 9 : 11, color: '#64748B', fontWeight: 700 }}>
                {project.stack[itemIndex] ?? 'Workflow'}
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: compact ? 22 : 28, lineHeight: 1, fontWeight: 800 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            borderRadius: compact ? 1.6 : 2,
            bgcolor: '#FFFFFF',
            p: compact ? '6%' : '4.5%',
            boxShadow: '0 14px 34px rgba(17, 24, 39, 0.08)',
            display: 'grid',
            alignContent: 'center',
            gap: compact ? 1 : 1.35,
          }}
        >
          {[0.86, 0.62, 0.74, 0.48].map((scale, barIndex) => (
            <Box
              key={scale}
              sx={{
                height: compact ? 6 : 9,
                width: `${scale * 100}%`,
                borderRadius: 999,
                bgcolor: barIndex === 1 ? visual.accent : '#E5E7EB',
              }}
            />
          ))}
          {!compact && (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 1.4, mt: 1 }}>
              <Box sx={{ height: 82, borderRadius: 2, bgcolor: visual.tint, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: '48% 8% auto', height: 3, borderRadius: 999, bgcolor: visual.accent }} />
                <Box sx={{ position: 'absolute', left: '12%', bottom: '18%', width: '70%', height: '36%', borderRadius: '50%', border: `3px solid ${visual.accent}`, opacity: 0.45 }} />
              </Box>
              <Stack spacing={0.8}>
                {project.highlights.slice(0, 3).map((highlight) => (
                  <Box key={highlight} sx={{ display: 'flex', gap: 0.8, alignItems: 'center' }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: visual.accent, flex: '0 0 auto' }} />
                    <Typography sx={{ fontSize: 10.5, color: '#475569', lineHeight: 1.2, fontWeight: 700 }}>
                      {highlight}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
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
      <Stack
        spacing={{ xs: 0.65, sm: 0.9, md: 1 }}
        sx={{
          position: 'absolute',
          left: { xs: '6.2%', md: '6.4%' },
          bottom: { xs: '7.5%', md: '8%' },
          zIndex: 2,
          width: { xs: '68%', sm: '58%', md: '48%' },
          maxWidth: 720,
          pointerEvents: 'none',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: palette.text,
            fontSize: { xs: 28, sm: 42, md: 64, lg: 78 },
            lineHeight: 0.98,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {project.title}
        </Typography>
        <Typography
          sx={{
            color: visual.accent,
            fontSize: { xs: 13, sm: 17, md: 21, lg: 24 },
            lineHeight: 1.25,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {project.subtitle}
        </Typography>
      </Stack>

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
          <ProjectScreenContent project={project} variant="desktop" />
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
          <ProjectScreenContent project={project} variant="mobile" />
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
            <ProjectScreenContent project={project} variant="summary" index={1} />
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
            <ProjectScreenContent project={project} variant="mobile" />
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
            <ProjectScreenContent project={project} variant="summary" index={2} />
          </Box>
        </>
      )}
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
          <ProjectDeviceShowcase project={project} />

          <Stack
            spacing={{ xs: 1.5, sm: 1.75, md: 2 }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            textAlign={{ xs: 'center', md: 'left' }}
            sx={{ width: '100%', maxWidth: 960 }}
          >
            <Typography
              sx={{
                color: '#4B5563',
                ...typeScale.bodyLarge,
                width: '100%',
                maxWidth: 980,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {project.description}
            </Typography>
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
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                <Typography variant="h4">
                  จุดเด่น
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
                <Typography variant="h4">
                  เทคโนโลยีที่ใช้
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {project.stack.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: palette.accentYellow, fontWeight: 600 }} />
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
