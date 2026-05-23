import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { palette } from '../theme';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const currentScrollY = Math.max(window.scrollY, document.documentElement.scrollTop, 0);

      if (event.deltaY < -2 || currentScrollY <= 40) {
        setHeaderHidden(false);
      } else if (event.deltaY > 2 && currentScrollY > 40) {
        setHeaderHidden(true);
      }
    };

    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
      const lastScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > lastScrollY + 6;
      const scrollingUp = currentScrollY < lastScrollY - 4;

      if (currentScrollY <= 40 || scrollingUp) {
        setHeaderHidden(false);
      } else if (currentScrollY > 80 && scrollingDown) {
        setHeaderHidden(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.background, color: palette.text }}>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          bgcolor: 'rgb(22,22,23)',
          height: 44,
          transform: headerHidden ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: palette.primaryPink }} />
            </Stack>
          </Box>
        </Container>
        <Stack
          component="nav"
          aria-label="เมนูหลัก"
          direction="row"
          spacing={{ sm: 4.5, md: 6 }}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px', fontWeight: 400 }}>
            ผลงาน
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px', fontWeight: 400 }}>
            สตูดิโอ
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px', fontWeight: 400 }}>
            ติดต่อ
          </Typography>
        </Stack>
      </Box>
      {children}
      <Box
        component="footer"
        id="contact"
        sx={{
          py: 8,
          borderTop: `1px solid ${palette.border}`,
          px: { xs: 3, sm: 4, md: 'max(24px, calc((100vw - 1628px) / 2))' },
        }}
      >
        <Box>
          <Stack spacing={2}>
            <Typography variant="h4">
              สร้างระบบถัดไปกับ Baawork Studio
            </Typography>
            <Typography color="text.secondary">
              ระบบโชว์ผลงาน เครื่องมือหลังบ้าน และประสบการณ์ใช้งานที่เชื่อมต่อ API
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
