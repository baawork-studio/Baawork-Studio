import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { fetchProjects, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette } from '../theme';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((items) => {
        if (!active) return;
        setProjects(items.length > 0 ? items : fallbackProjects);
      })
      .catch(() => {
        if (!active) return;
        setProjects(fallbackProjects);
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
          minHeight: { xs: 620, md: 'calc(100svh - 44px)' },
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

      <Box id="work" sx={{ bgcolor: palette.background, py: { xs: 7, md: 10 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={1.5} alignItems="center" textAlign="center">
              <Typography
                variant="h2"
                color="primary"
                sx={{ fontSize: { xs: 56, md: 96 }, lineHeight: 1, fontWeight: 800 }}
              >
                ผลงาน
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ maxWidth: 760 }}>
                ระบบที่ออกแบบมาให้ทั้งน่าดูและใช้งานได้จริง
              </Typography>
            </Stack>
          </Stack>
        </Container>
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            display: 'flex',
            gap: { xs: 2, md: 3.5 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            px: { xs: 2.5, md: 'max(48px, calc((100vw - 1240px) / 2))' },
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {projects.map((project) => (
            <Box
              key={project.id}
              component="a"
              href={`/projects/${project.slug}`}
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: '82vw', sm: 420, md: 520 },
                height: { xs: 560, md: 680 },
                overflow: 'hidden',
                borderRadius: { xs: 4, md: 6 },
                bgcolor: '#000',
                color: '#fff',
                scrollSnapAlign: 'start',
                boxShadow: '0 1px 2px rgba(17,24,39,0.16)',
                transition: 'transform 180ms ease',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            >
              <Box
                component="img"
                src={project.coverImageUrl}
                alt={project.title}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(0.9) contrast(1.02)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.24) 34%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.28) 100%)',
                }}
              />
              <Stack
                spacing={2}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  p: { xs: 3, md: 4.5 },
                  pr: { xs: 4, md: 6 },
                }}
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: { xs: 16, md: 18 }, fontWeight: 800 }}>
                  ผลงาน
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    fontSize: { xs: 31, md: 42 },
                    lineHeight: 1.16,
                    fontWeight: 800,
                    maxWidth: 420,
                  }}
                >
                  {project.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: 17, md: 21 }, lineHeight: 1.45 }}>
                  {project.shortDescription}
                </Typography>
              </Stack>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: { xs: 24, md: 30 },
                  bottom: { xs: 24, md: 30 },
                  zIndex: 1,
                  display: 'grid',
                  placeItems: 'center',
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.94)',
                  color: '#111827',
                  fontSize: { xs: 30, md: 36 },
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                +
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
