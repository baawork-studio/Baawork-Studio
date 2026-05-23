import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { palette, typeScale } from '../theme';

type AppShellProps = {
  children: React.ReactNode;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

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
              <Box
                component="img"
                src="/baawork-logo.png"
                alt="คนบ้างงาน"
                sx={{
                  display: 'block',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  objectFit: 'contain',
                }}
              />
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
          bgcolor: palette.background,
          color: palette.text,
          py: { xs: 7, sm: 8, md: 10 },
          px: pageGutter,
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)' },
              gap: { xs: 5, md: 7, lg: 8 },
              alignItems: 'start',
            }}
          >
            <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 760 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  component="img"
                  src="/baawork-logo.png"
                  alt="คนบ้างงาน"
                  sx={{
                    display: 'block',
                    width: { xs: 48, md: 56 },
                    height: { xs: 48, md: 56 },
                    borderRadius: '50%',
                    objectFit: 'contain',
                  }}
                />
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
                  color: palette.text,
                  maxWidth: 720,
                }}
              >
                สร้างระบบที่พร้อมใช้งานจริงกับทีมที่เข้าใจทั้งดีไซน์และเทคโนโลยี
              </Typography>
              <Typography
                sx={{
                  ...typeScale.bodyLarge,
                  color: '#4B5563',
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
                        color: '#4B5563',
                        textDecoration: 'none',
                        fontSize: { xs: 18, md: 19 },
                        lineHeight: 1.45,
                        fontWeight: 500,
                        transition: 'color 180ms ease',
                        '&:hover': {
                          color: palette.text,
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
                href="https://www.facebook.com/BAAWORK"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook Baawork"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.25,
                  width: '100%',
                  minHeight: 64,
                  px: { xs: 2, md: 2.25 },
                  py: 1.25,
                  borderRadius: '22px',
                  bgcolor: '#F3F4F6',
                  color: palette.text,
                  textDecoration: 'none',
                  fontSize: { xs: 17, md: 18 },
                  lineHeight: 1.35,
                  fontWeight: 700,
                  transition: 'background-color 220ms ease, color 180ms ease, transform 220ms ease',
                  '&:hover': {
                    bgcolor: '#ECEEF2',
                    color: palette.primaryPink,
                    transform: 'translate3d(0, -1px, 0)',
                  },
                  '&:hover .facebook-icon-ring': {
                    bgcolor: palette.primaryPink,
                    color: '#FFFFFF',
                    boxShadow: '0 16px 36px rgba(255,0,140,0.24)',
                  },
                  '&:hover .facebook-icon': {
                    animation: 'facebookIconPulse 620ms ease both',
                  },
                  '@keyframes facebookIconPulse': {
                    '0%': { transform: 'scale(1)' },
                    '38%': { transform: 'scale(0.86)' },
                    '72%': { transform: 'scale(1.08)' },
                    '100%': { transform: 'scale(1)' },
                  },
                }}
              >
                <Box component="span">Facebook</Box>
                <Box
                  component="span"
                  className="facebook-icon-ring"
                  aria-hidden="true"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: '#FFFFFF',
                    color: palette.primaryPink,
                    transition: 'background-color 220ms ease, color 220ms ease, box-shadow 220ms ease',
                  }}
                >
                  <Box
                    component="svg"
                    className="facebook-icon"
                    viewBox="0 0 24 24"
                    sx={{
                      width: 24,
                      height: 24,
                      transformOrigin: 'center',
                    }}
                  >
                    <path
                      d="M14.2 8.3V6.9c0-.7.5-1.1 1.2-1.1h1.7V3.1c-.8-.1-1.7-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2v1.1H7.8v3h2.6V21h3.2v-9.7h2.7l.4-3h-3.1Z"
                      fill="currentColor"
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              pt: { xs: 3, md: 4 },
              borderTop: `1px solid ${palette.border}`,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ color: '#6B7280', fontSize: 14, lineHeight: 1.5 }}>
              Baawork Studio
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 14, lineHeight: 1.5 }}>
              ออกแบบ พัฒนา และส่งมอบระบบดิจิทัลสำหรับใช้งานจริง
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
