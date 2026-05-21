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
          display: 'grid',
          alignItems: 'start',
          py: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Stack spacing={2.5} alignItems="center" sx={{ maxWidth: 880 }}>
              <Typography variant="h1" sx={{ fontSize: { xs: 58, md: 104 }, lineHeight: 0.92 }}>
                Baawork Studio
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.45 }}>
                เราออกแบบและพัฒนาระบบสำหรับโชว์ผลงาน พร้อมหน้าตาที่ประณีต เครื่องมือหลังบ้านที่ใช้งานจริง และเวิร์กโฟลว์ที่เชื่อมต่อ API
              </Typography>
              <Button href="#work" variant="contained" size="large">
                ดูผลงาน
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
