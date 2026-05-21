import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { fetchProjects, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette } from '../theme';

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const workCarouselRef = useRef<HTMLDivElement>(null);

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
  const carouselProjects =
    projects.length > 0
      ? Array.from({ length: Math.max(projects.length, 4) }, (_, index) => projects[index % projects.length])
      : fallbackProjects;

  const scrollWorkCards = (direction: -1 | 1) => {
    workCarouselRef.current?.scrollBy({ left: direction * 392, behavior: 'smooth' });
  };

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
          ref={workCarouselRef}
          sx={{
            mt: { xs: 4, md: 5 },
            display: 'flex',
            gap: { xs: 2, md: '20px' },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            mx: { xs: 3, sm: 4, md: 'max(22px, calc((100vw - 1107px) / 2))' },
            pt: { xs: 1.5, md: 2 },
            pb: { xs: 2, md: 3 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {carouselProjects.map((project, index) => {
            const isFullBleed = index % 2 === 1;

            return (
            <Box
              key={`${project.id}-${index}`}
              component="a"
              href={`/projects/${project.slug}`}
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: 'calc(100vw - 64px)', sm: 372, md: 372 },
                height: { xs: 620, md: 680 },
                overflow: 'hidden',
                borderRadius: '28px',
                bgcolor: '#000',
                color: '#fff',
                scrollSnapAlign: 'start',
                boxShadow: 'none',
                transition: 'transform 180ms ease',
                transformOrigin: 'center center',
                '&:hover': { transform: 'scale(1.006)' },
              }}
            >
              <Box
                component="img"
                src={project.coverImageUrl}
                alt={project.title}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: isFullBleed ? 0 : 'auto',
                  width: '100%',
                  height: isFullBleed ? '100%' : { xs: 432, md: 420 },
                  objectFit: 'cover',
                  filter: isFullBleed ? 'grayscale(1) contrast(1.05)' : 'saturate(1.04) contrast(1.02)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    isFullBleed
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.10) 100%)'
                      : 'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.86) 26%, rgba(0,0,0,0.24) 64%, rgba(0,0,0,0.08) 100%)',
                }}
              />
              <Stack
                spacing={{ xs: 1.7, md: 2.5 }}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
                }}
              >
                <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: { xs: 16, md: 17 }, fontWeight: 800 }}>
                  ผลงาน
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    fontSize: { xs: 30, md: 31 },
                    lineHeight: 1.16,
                    fontWeight: 800,
                    maxWidth: 430,
                  }}
                >
                  {project.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.78)', fontSize: { xs: 17, md: 18 }, lineHeight: 1.45 }}>
                  {project.shortDescription}
                </Typography>
              </Stack>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: { xs: 22, md: 28 },
                  bottom: { xs: 22, md: 28 },
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
            );
          })}
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: 3, px: { xs: 3, sm: 4, md: 'max(22px, calc((100vw - 1107px) / 2))' } }}
        >
          <Box
            component="button"
            type="button"
            aria-label="เลื่อนผลงานไปทางซ้าย"
            onClick={() => scrollWorkCards(-1)}
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 48,
              height: 48,
              border: 0,
              borderRadius: '50%',
              bgcolor: '#F5F5F7',
              color: '#86868B',
              fontSize: 34,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#E8E8ED', color: '#1D1D1F' },
            }}
          >
            ‹
          </Box>
          <Box
            component="button"
            type="button"
            aria-label="เลื่อนผลงานไปทางขวา"
            onClick={() => scrollWorkCards(1)}
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 48,
              height: 48,
              border: 0,
              borderRadius: '50%',
              bgcolor: '#E8E8ED',
              color: '#6E6E73',
              fontSize: 34,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#D2D2D7', color: '#1D1D1F' },
            }}
          >
            ›
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
