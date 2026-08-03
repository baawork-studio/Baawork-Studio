'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { ResponsiveStack } from '../../components/ResponsiveStack';
import { palette, typeScale } from '../../appTheme';
import { HeroCta } from './HomeSections';
import type { HeroCtaPhase } from './homeTypes';

const heroBackgroundImage = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1920&q=85';

function useHeroCtaPhase() {
  const [phase, setPhase] = useState<HeroCtaPhase>('hidden');
  const modeRef = useRef<'closed' | 'open' | null>(null);
  const timersRef = useRef<number[]>([]);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const schedule = (mode: 'closed' | 'open') => {
      if (modeRef.current === mode) return;
      clearTimers();
      modeRef.current = mode;

      if (mode === 'open') {
        setPhase('hidden');
        timersRef.current = [
          window.setTimeout(() => setPhase('seed'), 80),
          window.setTimeout(() => setPhase('open'), 260),
        ];
        return;
      }

      setPhase('seed');
      timersRef.current = [window.setTimeout(() => setPhase('hidden'), 360)];
    };

    const update = () => schedule(window.scrollY > 42 ? 'closed' : 'open');
    schedule('open');
    const initialScrollCheck = window.setTimeout(update, 760);
    const onScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        update();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(initialScrollCheck);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
      clearTimers();
      modeRef.current = null;
    };
  }, []);

  return phase;
}

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();
  const ctaPhase = useHeroCtaPhase();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        alignItems: 'end',
        minHeight: '100svh',
        pb: { xs: 5, md: 7 },
        pt: { xs: 6, md: 5 },
        bgcolor: palette.text,
        backgroundImage: `url(${heroBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
      }}
    >
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, bgcolor: 'transparent' }} />
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.18) 42%, rgba(17,24,39,0.78) 100%)' }} />
      <Container maxWidth={false} sx={{ maxWidth: 1680, px: { xs: 2.5, md: 4 } }}>
        <ResponsiveStack spacing={{ xs: 1.5, md: 2.25 }} alignItems="center" textAlign="center" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 56, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <Typography variant="h1" sx={{ width: '100%', color: '#fff', ...typeScale.hero, textShadow: '0 18px 50px rgba(0,0,0,0.42)' }}>
              Baawork Studio
            </Typography>
          </motion.div>
          <div>
            <ResponsiveStack spacing={{ xs: 2.5, md: 3 }} alignItems="center" sx={{ maxWidth: 980 }}>
              <Typography component="p" sx={{ color: 'rgba(255,255,255,0.92)', ...typeScale.intro, textShadow: '0 12px 34px rgba(0,0,0,0.48)', textAlign: 'center' }}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'none', lg: 'inline' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ ประสบการณ์ใช้งาน และเทคโนโลยีให้พร้อมใช้งานในธุรกิจจริง
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline', lg: 'none' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ ประสบการณ์ใช้งาน<br />และเทคโนโลยีให้พร้อมใช้งานในธุรกิจจริง
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', md: 'none' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ<br />ประสบการณ์ใช้งาน และเทคโนโลยี<br />ให้พร้อมใช้งานในธุรกิจจริง
                </Box>
              </Typography>
              <HeroCta phase={ctaPhase} />
            </ResponsiveStack>
          </div>
        </ResponsiveStack>
      </Container>
    </Box>
  );
}
