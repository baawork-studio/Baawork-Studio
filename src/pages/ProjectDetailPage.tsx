import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

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
      <Box sx={{ px: pageGutter, py: { xs: 8, sm: 9, md: 11, lg: 12 } }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Stack
            spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
            alignItems="center"
            textAlign="center"
            sx={{ mx: 'auto', maxWidth: 1080 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: palette.text,
                ...typeScale.hero,
                fontSize: { xs: 42, sm: 58, md: 76, lg: 88 },
                maxWidth: 1120,
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#4B5563',
                ...typeScale.intro,
                maxWidth: 860,
              }}
            >
              {project.subtitle}
            </Typography>
            <Typography
              sx={{
                color: '#4B5563',
                ...typeScale.bodyLarge,
                maxWidth: 980,
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

          <Box
            component="img"
            src={project.coverImageUrl}
            alt={project.title}
            sx={{
              width: '100%',
              maxHeight: 560,
              objectFit: 'cover',
              borderRadius: 2,
              border: `1px solid ${palette.border}`,
            }}
          />

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
