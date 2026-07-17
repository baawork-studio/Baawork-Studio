'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Stack } from './Stack';
import { palette, typeScale } from '../theme';

type AppShellProps = {
  children: React.ReactNode;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

const navLinks = [
  { label: 'ผลงาน', href: '/#work' },
  { label: 'บริการ', href: '/services' },
  { label: 'ทำไมต้องเรา', href: '/why-us' },
  { label: 'เริ่มโปรเจกต์', href: '/start-project' },
  { label: 'คำถาม', href: '/faq' },
  { label: 'ติดต่อ', href: '/contact' },
];

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
            <Box
              component="a"
              href="/"
              aria-label="กลับไปหน้าแรก"
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                outlineOffset: 4,
                transition: 'opacity 180ms ease',
                '&:hover': {
                  opacity: 0.82,
                },
              }}
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
            </Box>
          </Box>
        </Container>
        <Stack
          component="nav"
          aria-label="เมนูหลัก"
          direction="row"
          spacing={{ sm: 2.25, md: 3.5, lg: 5 }}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            '& a, & a:visited, & a:active': {
              color: '#FFFFFF !important',
            },
          }}
        >
          {navLinks.map((link) => (
            <Box
              key={link.href}
              component="a"
              href={link.href}
              style={{ color: '#FFFFFF' }}
              sx={{
                color: '#FFFFFF !important',
                textDecoration: 'none',
                fontFamily: 'inherit',
                fontSize: 12,
                lineHeight: '44px',
                fontWeight: 400,
                whiteSpace: 'nowrap',
                opacity: 1,
                transition: 'opacity 180ms ease',
                '&:visited, &:active, &:focus': {
                  color: '#FFFFFF !important',
                },
                '&:hover, &:focus-visible': {
                  color: '#FFFFFF !important',
                  opacity: 0.82,
                },
              }}
            >
              {link.label}
            </Box>
          ))}
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
                    fontSize: { xs: 19, md: 21 },
                    lineHeight: 1.2,
                    fontWeight: 600,
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
                สร้างระบบจริงกับทีมที่เข้าใจงาน
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

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 0.94fr) minmax(150px, 1.06fr)',
                  sm: 'minmax(0, 1fr) minmax(180px, 0.95fr)',
                },
                gap: { xs: 2.5, sm: 4, md: 5 },
                alignItems: 'stretch',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: palette.primaryPink,
                    fontSize: 14,
                    lineHeight: 1.35,
                    fontWeight: 700,
                  }}
                >
                  ไปยังส่วนต่างๆ
                </Typography>
                <Stack spacing={1.2}>
                  {[
                    { label: 'ผลงาน', href: '/#work' },
                    { label: 'บริการ', href: '/services' },
                    { label: 'ทำไมต้องเรา', href: '/why-us' },
                    { label: 'วิธีเริ่มโปรเจกต์', href: '/start-project' },
                    { label: 'กระบวนการทำงาน', href: '/#workflow' },
                    { label: 'คำถามที่พบบ่อย', href: '/faq' },
                    { label: 'ติดต่อเรา', href: '/contact' },
                  ].map((link) => (
                    <Typography
                      key={link.href}
                      component="a"
                      href={link.href}
                      sx={{
                        color: '#4B5563',
                        textDecoration: 'none',
                        fontSize: 17,
                        lineHeight: 1.353,
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

              <Box>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: palette.primaryPink,
                    fontSize: 14,
                    lineHeight: 1.35,
                    fontWeight: 700,
                  }}
                >
                  สนใจร่วมงานติดต่อได้ที่
                </Typography>
                <Stack spacing={1.2}>
                  {[
                    {
                      label: 'Facebook',
                      href: 'https://www.facebook.com/BAAWORK',
                      color: '#1877F2',
                      iconSrc: 'https://thesvg.org/icons/facebook/default.svg',
                    },
                    {
                      label: 'YouTube',
                      href: 'https://www.youtube.com/@baawork',
                      color: '#FF0033',
                      iconSrc: 'https://thesvg.org/icons/youtube/default.svg',
                    },
                    {
                      label: 'LINE',
                      href: 'https://line.me/R/ti/p/@baawork',
                      color: '#06C755',
                      iconSrc: 'https://thesvg.org/icons/line/default.svg',
                    },
                  ].map((social) => (
                    <Typography
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.label} Baawork`}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1.25,
                        color: '#4B5563',
                        textDecoration: 'none',
                        fontSize: 17,
                        lineHeight: 1.353,
                        fontWeight: 500,
                        transition: 'color 180ms ease, transform 220ms ease',
                        '&:hover': {
                          color: social.color,
                          transform: 'translate3d(0, -1px, 0)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={social.iconSrc}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        sx={{
                          width: 24,
                          height: 24,
                          minWidth: 24,
                          objectFit: 'contain',
                          flex: '0 0 auto',
                        }}
                      />
                      {social.label}
                    </Typography>
                  ))}
                </Stack>
                <Box
                  component="img"
                  src="/line-qr.png"
                  alt="QR code สำหรับติดต่อ LINE Baawork"
                  loading="lazy"
                  decoding="async"
                  sx={{
                    display: 'block',
                    width: { xs: 112, sm: 148, md: 156 },
                    height: { xs: 112, sm: 148, md: 156 },
                    mt: { xs: 2.25, md: 2.5 },
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Box>
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
