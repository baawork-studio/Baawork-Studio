'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Container, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { PageMotion } from './motion/PageMotion';
import { Reveal } from './motion/Reveal';
import { Stack } from './Stack';
import { palette, typeScale } from '../theme';
import { navigateToHomeSection } from '../utils/sectionNavigation';

type AppShellProps = {
  children: React.ReactNode;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';

const navLinks = [
  { label: 'ผลงาน', href: '/', sectionId: 'work' },
  { label: 'บริการ', href: '/services' },
  { label: 'ทำไมต้องเรา', href: '/why-us' },
  { label: 'เริ่มโปรเจกต์', href: '/start-project' },
];

const mobileNavLinks = [
  ...navLinks,
  { label: 'ปรึกษาเรา', href: '/consult' },
];

function MobileMenuGlyph({ open }: { open: boolean }) {
  return (
    <Box sx={{ position: 'relative', display: 'block', width: '16px', height: '16px' }} aria-hidden="true">
      <Box
        sx={{
          position: 'absolute', top: '5px', left: 0, width: '16px', height: '1px', borderRadius: 99, bgcolor: 'rgba(255,255,255,0.92)',
          transform: open ? 'translateY(2.5px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
          transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute', top: '10px', left: 0, width: '16px', height: '1px', borderRadius: 99, bgcolor: 'rgba(255,255,255,0.92)',
          transform: open ? 'translateY(-2.5px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
          transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </Box>
  );
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [headerHidden, setHeaderHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const lastScrollYRef = useRef(0);
  const headerHiddenRef = useRef(false);

  const closeMobileMenu = () => {
    if (!mobileMenuOpen) return;
    setMobileMenuOpen(false);
    setMobileMenuClosing(true);
  };

  useEffect(() => {
    let frameId: number | null = null;

    const updateHeader = () => {
      frameId = null;
      const currentScrollY = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
      const lastScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > lastScrollY + 6;
      const scrollingUp = currentScrollY < lastScrollY - 4;
      const nextHidden = currentScrollY > 80 && scrollingDown ? true : currentScrollY <= 40 || scrollingUp ? false : headerHiddenRef.current;

      if (nextHidden !== headerHiddenRef.current) {
        headerHiddenRef.current = nextHidden;
        setHeaderHidden(nextHidden);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateHeader);
    };

    lastScrollYRef.current = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
    headerHiddenRef.current = false;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMenuClosing(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuClosing) return;

    const timeoutId = window.setTimeout(() => setMobileMenuClosing(false), 280);
    return () => window.clearTimeout(timeoutId);
  }, [mobileMenuClosing]);

  useEffect(() => {
    if (!mobileMenuOpen && !mobileMenuClosing) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setHeaderHidden(false);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen, mobileMenuClosing]);

  return (
    <Box sx={{ minHeight: '100vh', overflowX: 'clip', bgcolor: palette.background, color: palette.text }}>
      <Box
        key={pathname}
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          bgcolor: 'rgb(22,22,23)',
          height: 44,
          transform: headerHidden && !mobileMenuOpen ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
          transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
          animation: headerHidden ? 'none' : 'navbar-enter 520ms cubic-bezier(0.22, 1, 0.36, 1) both',
          willChange: 'transform',
          '@keyframes navbar-enter': {
            from: { transform: 'translate3d(0, -100%, 0)' },
            to: { transform: 'translate3d(0, 0, 0)' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            animation: 'none',
          },
          '@media (max-width: 800px)': {
            transform: 'none !important',
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: '100%',
            px: { xs: 3, md: 6, lg: '120.384px' },
          }}
        >
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
                gap: 1,
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                outlineOffset: 4,
                transition: 'opacity 180ms ease',
                '&:hover': {
                  opacity: 0.82,
                },
                '@media (max-width: 800px)': {
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                },
              }}
            >
              <Box
                component="img"
                src="/homepage/baawork-logo.png"
                alt="คนบ้างงาน"
                sx={{
                  display: 'block',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  objectFit: 'contain',
                }}
              />
              <Typography
                component="span"
                sx={{
                  color: '#FFFFFF',
                  fontSize: { xs: 12, sm: 13 },
                  lineHeight: 1,
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                }}
              >
                Baawork - คนบ้างาน
              </Typography>
            </Box>
            <Box
              component="button"
              type="button"
              aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-controls="baawork-mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                if (mobileMenuOpen) {
                  closeMobileMenu();
                  return;
                }
                setMobileMenuClosing(false);
                setMobileMenuOpen(true);
              }}
              sx={{
                position: 'absolute', right: 0, top: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44, p: 0, border: 0, borderRadius: '14px', bgcolor: 'transparent', color: '#FFFFFF', cursor: 'pointer',
                transform: 'translateY(-50%)',
                '@media (min-width: 801px)': { display: 'none' },
                '&:hover, &:active, &:focus': { bgcolor: 'transparent' },
                '&:focus-visible': { outline: `2px solid ${palette.accentYellow}`, outlineOffset: 2 },
              }}
            >
              <MobileMenuGlyph open={mobileMenuOpen} />
            </Box>
          </Box>
        </Container>
        <Stack
          component="nav"
          aria-label="เมนูหลัก"
          direction="row"
          spacing={{ sm: 2.25, md: 3.5, lg: 5 }}
          sx={{
            display: 'none',
            '@media (min-width: 801px)': { display: 'flex' },
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
              onClick={link.sectionId ? (event) => navigateToHomeSection(event, link.sectionId) : undefined}
              style={{ color: '#FFFFFF' }}
              sx={{
                color: '#FFFFFF !important',
                textDecoration: 'none',
                fontFamily: 'inherit',
                fontSize: 12,
                lineHeight: '44px',
                fontWeight: 300,
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
        <Box
          component="a"
          href="/consult"
          sx={{
            position: 'absolute',
            right: { xs: 3, md: 6, lg: '120.384px' },
            top: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 30,
            px: { xs: 1.6, sm: 2 },
            borderRadius: 999,
            bgcolor: palette.primaryPink,
            color: '#FFFFFF !important',
            textDecoration: 'none',
            fontSize: { xs: 11, sm: 12 },
            lineHeight: 1,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transform: 'translateY(-50%)',
            transition: 'background-color 220ms ease, box-shadow 220ms ease, filter 220ms ease',
            boxShadow: '0 6px 14px rgba(255,0,140,0.2)',
            '&:visited, &:active': {
              color: '#FFFFFF !important',
            },
            '&:hover': {
              bgcolor: '#FF1495',
              color: '#FFFFFF !important',
              filter: 'brightness(1.03)',
              boxShadow: '0 8px 18px rgba(255,0,140,0.28)',
            },
            '&:focus-visible': {
              outline: `2px solid ${palette.accentYellow}`,
              outlineOffset: 3,
            },
            '@media (max-width: 800px)': {
              display: 'none',
            },
          }}
        >
          ปรึกษาเรา
        </Box>
        {(mobileMenuOpen || mobileMenuClosing) && typeof document !== 'undefined' ? createPortal(
          <Box
            id="baawork-mobile-menu"
            component="nav"
            aria-label="เมนูหลักบนมือถือ"
            sx={{
              position: 'fixed', top: 44, right: 0, bottom: 0, left: 0, zIndex: 1200,
              display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: '#FBFBFD', color: palette.text,
              transformOrigin: 'top center',
              animation: mobileMenuClosing
                ? 'baawork-mobile-menu-out 280ms cubic-bezier(0.4, 0, 1, 1) both'
                : 'baawork-mobile-menu-in 460ms cubic-bezier(0.22, 1, 0.36, 1)',
              '@keyframes baawork-mobile-menu-in': {
                from: { opacity: 0, transform: 'translateY(0) scaleY(0.985)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
              '@keyframes baawork-mobile-menu-out': {
                from: { opacity: 1, transform: 'translateY(0)' },
                to: { opacity: 0, transform: 'translateY(0) scaleY(0.99)' },
              },
              '@keyframes baawork-mobile-menu-item-in': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
              '@media (min-width: 801px)': { display: 'none' },
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                overscrollBehavior: 'contain',
                px: { xs: '48px', sm: '56px' },
                pt: '28px',
                pb: '12px',
              }}
            >
              {mobileNavLinks.map((link, index) => {
                const active = link.href === pathname;
                return (
                  <Box
                    key={link.href}
                    component="a"
                    href={link.href}
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                      if (link.sectionId) navigateToHomeSection(event, link.sectionId);
                      closeMobileMenu();
                    }}
                    sx={{
                      display: 'flex', alignItems: 'center', minHeight: 0, px: 0, py: 0, mb: '10px', borderRadius: 0,
                      bgcolor: 'transparent', color: '#1D1D1F', fontSize: { xs: 26, sm: 28 }, fontWeight: 500,
                      lineHeight: 1.22, letterSpacing: '-0.03em', textDecoration: 'none',
                      transition: 'opacity 180ms ease',
                      animation: `baawork-mobile-menu-item-in 360ms cubic-bezier(0.22, 1, 0.36, 1) ${80 + index * 45}ms both`,
                      '&:hover, &:focus-visible': { bgcolor: 'transparent', color: '#1D1D1F', opacity: 0.62 },
                    }}
                  >
                    {link.label}
                  </Box>
                );
              })}
            </Box>
          </Box>,
          document.body,
        ) : null}
      </Box>
      <PageMotion>{children}</PageMotion>
      <Reveal>
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
                  src="/homepage/baawork-logo.png"
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
                    { label: 'ผลงาน', href: '/', sectionId: 'work' },
                    { label: 'บริการ', href: '/services' },
                    { label: 'ทำไมต้องเรา', href: '/why-us' },
                    { label: 'วิธีเริ่มโปรเจกต์', href: '/start-project' },
                    { label: 'กระบวนการทำงาน', href: '/', sectionId: 'workflow' },
                    { label: 'ปรึกษา Baawork', href: '/consult' },
                  ].map((link) => (
                    <Typography
                      key={link.label}
                      component="a"
                      href={link.href}
                      onClick={link.sectionId ? (event) => navigateToHomeSection(event, link.sectionId) : undefined}
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
                  src="/homepage/line-qr.png"
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
            <Typography
              sx={{
                color: '#4B5563',
                fontSize: { xs: 13, sm: 14 },
                lineHeight: 1.5,
                fontWeight: 600,
                letterSpacing: 0,
              }}
            >
              บริษัท คนบ้างาน จำกัด
            </Typography>
            <Typography sx={{ color: '#6B7280', fontSize: { xs: 13, sm: 14 }, lineHeight: 1.5 }}>
              ออกแบบ พัฒนา และส่งมอบระบบดิจิทัลสำหรับใช้งานจริง
            </Typography>
          </Box>
        </Box>
        </Box>
      </Reveal>
    </Box>
  );
}
