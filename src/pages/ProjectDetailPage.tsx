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
            กลับไปหน้าผลงาน
          </Button>
          <Grid container spacing={5} alignItems="end">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="primary" fontWeight={800}>
                  รายละเอียดผลงาน
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
                <Typography variant="h4" fontWeight={800}>
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
                <Typography variant="h4" fontWeight={800}>
                  เทคโนโลยีที่ใช้
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
