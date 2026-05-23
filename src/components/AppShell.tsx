import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { palette, typeScale } from '../theme';

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
          bgcolor: '#111827',
          color: '#FFFFFF',
          py: { xs: 7, sm: 8, md: 10 },
          px: { xs: 3, sm: 4, md: 'max(24px, calc((100vw - 1628px) / 2))' },
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 1628 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)' },
              gap: { xs: 5, md: 8 },
              alignItems: 'start',
            }}
          >
            <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 760 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: palette.primaryPink }} />
                <Typography
                  sx={{
                    fontSize: { xs: 20, md: 22 },
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: 0,
                  }}
                >
                  Baawork Studio
                </Typography>
              </Stack>
              <Typography
                variant="h2"
                sx={{
                  ...typeScale.sectionTitle,
                  color: '#FFFFFF',
                  maxWidth: 720,
                }}
              >
                สร้างระบบที่พร้อมใช้งานจริงกับทีมที่เข้าใจทั้งดีไซน์และเทคโนโลยี
              </Typography>
              <Typography
                sx={{
                  ...typeScale.bodyLarge,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: 680,
                }}
              >
                คุยโจทย์ วางแนวทาง และต่อยอดเป็นระบบเว็บแอป ระบบ AI หรือเครื่องมือหลังบ้านที่เชื่อมต่อข้อมูลจริงได้อย่างเป็นระบบ
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: palette.primaryPink,
                    fontSize: 15,
                    lineHeight: 1.2,
                    fontWeight: 700,
                  }}
                >
                  ไปยังส่วนต่างๆ
                </Typography>
                <Stack spacing={1.2}>
                  {[
                    { label: 'ผลงาน', href: '#work' },
                    { label: 'กระบวนการทำงาน', href: '#workflow' },
                    { label: 'คำถามที่พบบ่อย', href: '#faq' },
                    { label: 'เริ่มโปรเจกต์', href: '#start-project' },
                  ].map((link) => (
                    <Typography
                      key={link.href}
                      component="a"
                      href={link.href}
                      sx={{
                        color: 'rgba(255,255,255,0.76)',
                        textDecoration: 'none',
                        fontSize: { xs: 18, md: 19 },
                        lineHeight: 1.45,
                        fontWeight: 500,
                        transition: 'color 180ms ease',
                        '&:hover': {
                          color: '#FFFFFF',
                        },
                      }}
                    >
                      {link.label}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box
                component="a"
                href="#start-project"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  minWidth: 190,
                  height: 56,
                  px: 4,
                  borderRadius: 999,
                  bgcolor: palette.primaryPink,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 19,
                  lineHeight: 1,
                  fontWeight: 700,
                  boxShadow: '0 18px 46px rgba(255,0,140,0.24)',
                  transition: 'background-color 220ms ease, transform 220ms ease',
                  '&:hover': {
                    bgcolor: '#FF1495',
                    transform: 'translate3d(0, -1px, 0)',
                  },
                }}
              >
                เริ่มคุยโปรเจกต์
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              pt: { xs: 3, md: 4 },
              borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: 'rgba(255,255,255,0.56)', fontSize: 14, lineHeight: 1.5 }}>
              Baawork Studio
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.56)', fontSize: 14, lineHeight: 1.5 }}>
              ออกแบบ พัฒนา และส่งมอบระบบดิจิทัลสำหรับใช้งานจริง
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
