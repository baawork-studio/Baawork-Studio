import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
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
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          alignItems: 'end',
          minHeight: { xs: 620, md: 'calc(100svh - 64px)' },
          pb: { xs: 5, md: 7 },
          pt: { xs: 6, md: 5 },
          bgcolor: palette.text,
        }}
      >
        <Box
          component="img"
          src={featured.coverImageUrl}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1,
            filter: 'saturate(0.95) contrast(1.02)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.18) 42%, rgba(17,24,39,0.78) 100%)',
          }}
        />
        <Container maxWidth={false} sx={{ maxWidth: 1680, px: { xs: 2.5, md: 4 } }}>
          <Stack
            spacing={{ xs: 1.5, md: 2.25 }}
            alignItems="center"
            textAlign="center"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Typography
              variant="h1"
              sx={{
                width: '100%',
                color: '#fff',
                fontSize: { xs: 48, sm: 72, md: 88, lg: 96 },
                lineHeight: 1,
                textShadow: '0 18px 50px rgba(0,0,0,0.42)',
              }}
            >
              Baawork Studio
            </Typography>
            <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center" sx={{ maxWidth: 980 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: { xs: 20, md: 34 },
                  lineHeight: 1.35,
                  fontWeight: 400,
                  textShadow: '0 12px 34px rgba(0,0,0,0.48)',
                }}
              >
                เราออกแบบและพัฒนาระบบสำหรับโชว์ผลงาน พร้อมหน้าตาที่ประณีต เครื่องมือหลังบ้านที่ใช้งานจริง และเวิร์กโฟลว์ที่เชื่อมต่อ API
              </Typography>
              <Button
                href="#work"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 3.5,
                  py: 1.15,
                  boxShadow: '0 16px 42px rgba(0,0,0,0.28)',
                }}
              >
                ดูผลงาน
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box id="work" sx={{ bgcolor: palette.softGray, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="overline" color="primary" fontWeight={800}>
                  ผลงาน
                </Typography>
                <Typography variant="h3" fontWeight={800}>
                  ระบบที่ออกแบบมาให้ทั้งน่าดูและใช้งานได้จริง
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
                {status === 'fallback'
                  ? 'กำลังแสดงตัวอย่างผลงานในเครื่องระหว่างที่ API ยังไม่พร้อมใช้งาน'
                  : 'ผลงานที่เผยแพร่จาก Baawork Studio'}
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
                    <Box
                      component="img"
                      src={project.coverImageUrl}
                      alt={project.title}
                      sx={{ width: '100%', height: 320, objectFit: 'cover' }}
                    />
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
