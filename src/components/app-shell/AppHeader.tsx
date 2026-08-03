'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ResponsiveStack } from '../ResponsiveStack';
import { hover, palette } from '../../appTheme';
import { navigateToHomeSection } from '../../utils/homeSectionNavigation';
import { useAutoHideHeader } from '../../hooks/useAutoHideHeader';
import { mobileNavigation, primaryNavigation } from './navigation';

function MobileMenuGlyph({ open }: { open: boolean }) {
  return (
    <Box sx={{ position: 'relative', display: 'block', width: 20, height: 18 }} aria-hidden="true">
      {[5, 11].map((top, index) => (
        <Box
          key={top}
          sx={{
            position: 'absolute',
            top,
            left: 0,
            width: 20,
            height: 2,
            borderRadius: 99,
            bgcolor: '#FFFFFF',
            transform: open
              ? `translateY(${index === 0 ? 3 : -3}px) rotate(${index === 0 ? 45 : -45}deg)`
              : 'translateY(0) rotate(0deg)',
            transformOrigin: 'center',
            transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      ))}
    </Box>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const headerHidden = useAutoHideHeader(!mobileMenuOpen && !mobileMenuClosing);

  const closeMobileMenu = () => {
    if (!mobileMenuOpen) return;
    setMobileMenuOpen(false);
    setMobileMenuClosing(true);
  };

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
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen, mobileMenuClosing]);

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
        height: 44,
        bgcolor: 'rgb(22,22,23)',
        transform: headerHidden ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
        transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        '@media (max-width: 800px)': { transform: 'none !important' },
      }}
    >
      <Container maxWidth={false} sx={{ height: '100%', px: { xs: 3, md: 6, lg: '120.384px' } }}>
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            // Keep the header itself fixed.  Only ease its contents in, without
            // fading them, so a refresh or route change never looks like a flash.
            animation: 'baawork-header-content-in 960ms cubic-bezier(0.16, 1, 0.3, 1) both',
            '@keyframes baawork-header-content-in': {
              from: { transform: 'translateY(-14px)' },
              to: { transform: 'translateY(0)' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          <Box
            component="a"
            href="/"
            aria-label="Baawork - คนบ้างาน"
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
              transition: hover.transition.interactive,
              '&:hover': { opacity: 0.82 },
              '@media (max-width: 800px)': { left: '50%', transform: 'translate(-50%, -50%)' },
            }}
          >
            <Image src="/homepage/baawork-logo.png" alt="คนบ้างงาน" width={28} height={28} priority sizes="28px" style={{ display: 'block', borderRadius: '50%', objectFit: 'contain' }} />
            <Typography component="span" sx={{ color: '#FFFFFF', fontSize: { xs: 12, sm: 13 }, lineHeight: 1, fontWeight: 400, whiteSpace: 'nowrap' }}>
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
              if (mobileMenuOpen) closeMobileMenu();
              else {
                setMobileMenuClosing(false);
                setMobileMenuOpen(true);
              }
            }}
            sx={{
              position: 'absolute', right: 0, top: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, p: 0, border: 0, borderRadius: '14px', bgcolor: 'transparent', color: '#FFFFFF', cursor: 'pointer',
              transform: 'translateY(-50%)', '@media (min-width: 801px)': { display: 'none' },
              '&:hover, &:active, &:focus': { bgcolor: 'transparent' },
              '&:focus-visible': { outline: `2px solid ${palette.accentYellow}`, outlineOffset: 2 },
            }}
          >
            <MobileMenuGlyph open={mobileMenuOpen} />
          </Box>

          <ResponsiveStack component="nav" aria-label="เมนูหลัก" direction="row" spacing={{ sm: 2.25, md: 3.5, lg: 5 }} sx={{ display: 'none', '@media (min-width: 801px)': { display: 'flex' }, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', '& a, & a:visited, & a:active': { color: '#FFFFFF !important' } }}>
            {primaryNavigation.map((link) => (
              <Box
                key={`${link.href}-${link.label}`}
                component="a"
                href={link.href}
                onClick={link.sectionId ? (event) => navigateToHomeSection(event, link.sectionId!) : undefined}
                sx={{ color: '#FFFFFF !important', textDecoration: 'none', fontSize: 12, lineHeight: '44px', fontWeight: 300, whiteSpace: 'nowrap', opacity: 1, transition: hover.transition.interactive, '&:visited, &:active, &:focus': { color: '#FFFFFF !important' }, '&:hover, &:focus-visible': { color: '#FFFFFF !important', opacity: 0.82 } }}
              >
                {link.label}
              </Box>
            ))}
          </ResponsiveStack>

          <Box
            component="a"
            href="/consult"
            sx={{
              position: 'absolute', right: 0, top: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 30, px: { xs: 1.6, sm: 2 }, borderRadius: 999,
              bgcolor: '#D10075', color: '#FFFFFF !important', textDecoration: 'none', fontSize: { xs: 11, sm: 12 }, lineHeight: 1, fontWeight: 500, whiteSpace: 'nowrap', transform: 'translateY(-50%)', zIndex: 1,
              transition: hover.transition.interactive, boxShadow: '0 6px 14px rgba(255,0,140,0.2)',
              '&:visited, &:active': { color: '#FFFFFF !important' },
              '&:hover': { bgcolor: '#BE0069', color: '#FFFFFF !important', filter: 'brightness(1.03)', boxShadow: '0 8px 18px rgba(255,0,140,0.28)' },
              '&:focus-visible': { outline: `2px solid ${palette.accentYellow}`, outlineOffset: 3 },
              '@media (max-width: 800px)': { display: 'none' },
            }}
          >
            ปรึกษาเรา
          </Box>
        </Box>
      </Container>

      {(mobileMenuOpen || mobileMenuClosing) && typeof document !== 'undefined'
        ? createPortal(
            <Box
              id="baawork-mobile-menu"
              component="nav"
              aria-label="เมนูหลักบนมือถือ"
              sx={{
                position: 'fixed', top: 44, right: 0, bottom: 0, left: 0, zIndex: 1200, display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: '#FBFBFD', color: palette.text, transformOrigin: 'top center',
                animation: mobileMenuClosing ? 'baawork-mobile-menu-out 280ms cubic-bezier(0.4, 0, 1, 1) both' : 'baawork-mobile-menu-in 460ms cubic-bezier(0.22, 1, 0.36, 1)',
                '@keyframes baawork-mobile-menu-in': { from: { opacity: 0, transform: 'translateY(0) scaleY(0.985)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                '@keyframes baawork-mobile-menu-out': { from: { opacity: 1, transform: 'translateY(0)' }, to: { opacity: 0, transform: 'translateY(0) scaleY(0.99)' } },
                '@keyframes baawork-mobile-menu-item-in': { from: { opacity: 0, transform: 'translateY(-10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                '@media (min-width: 801px)': { display: 'none' }, '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            >
              <Box sx={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', px: { xs: '48px', sm: '56px' }, pt: '28px', pb: '12px' }}>
                {mobileNavigation.map((link, index) => (
                  <Box
                    key={`${link.href}-${link.label}`}
                    component="a"
                    href={link.href}
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                      if (link.sectionId) navigateToHomeSection(event, link.sectionId);
                      closeMobileMenu();
                    }}
                    sx={{ display: 'flex', alignItems: 'center', minHeight: 0, px: 0, py: 0, mb: '10px', borderRadius: 0, bgcolor: 'transparent', color: '#1D1D1F', fontSize: { xs: 26, sm: 28 }, fontWeight: 500, lineHeight: 1.22, letterSpacing: '-0.03em', textDecoration: 'none', transition: hover.transition.interactive, animation: `baawork-mobile-menu-item-in 360ms cubic-bezier(0.22, 1, 0.36, 1) ${80 + index * 45}ms both`, '&:hover, &:focus-visible': { bgcolor: 'transparent', color: '#1D1D1F', opacity: 0.62 } }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Box>,
            document.body,
          )
        : null}
    </Box>
  );
}
