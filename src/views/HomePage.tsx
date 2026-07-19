"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../components/motion/Reveal";
import { Stack } from "../components/Stack";
import { palette, typeScale } from "../theme";
import { restoreHomeSectionScroll } from "../utils/sectionNavigation";
import { aiShowcaseCards, lineLiffShowcaseCards, webAppShowcaseCards, workCarouselGutter } from "../features/home/data";
import { AudienceSection, FaqSection, HeroCta, ResultsSection, ShowcaseCarousel, StartProjectSection, ToolStackSection, WorkflowSection } from "../features/home/sections";
import type { HeroCtaPhase, HomePageProps } from "../features/home/types";

const heroBackgroundImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=82';

export function HomePage(_props: HomePageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [heroCtaPhase, setHeroCtaPhase] = useState<HeroCtaPhase>('hidden');
  const heroCtaModeRef = useRef<'closed' | 'open' | null>(null);
  const heroCtaTimersRef = useRef<number[]>([]);
  const heroCtaScrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    restoreHomeSectionScroll();
  }, []);

  useEffect(() => {
    heroCtaModeRef.current = null;

    const clearHeroCtaTimers = () => {
      heroCtaTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      heroCtaTimersRef.current = [];
    };

    const scheduleHeroCta = (mode: 'closed' | 'open') => {
      if (heroCtaModeRef.current === mode) return;

      clearHeroCtaTimers();
      heroCtaModeRef.current = mode;

      if (mode === 'open') {
        setHeroCtaPhase('hidden');
        heroCtaTimersRef.current = [
          window.setTimeout(() => setHeroCtaPhase('seed'), 80),
          window.setTimeout(() => setHeroCtaPhase('open'), 260),
        ];
        return;
      }

      setHeroCtaPhase('seed');
      heroCtaTimersRef.current = [window.setTimeout(() => setHeroCtaPhase('hidden'), 360)];
    };

    const updateHeroCta = () => {
      scheduleHeroCta(window.scrollY > 42 ? 'closed' : 'open');
    };

    scheduleHeroCta('open');
    const initialScrollCheck = window.setTimeout(updateHeroCta, 760);
    const handleScroll = () => {
      if (heroCtaScrollFrameRef.current !== null) return;
      heroCtaScrollFrameRef.current = window.requestAnimationFrame(() => {
        heroCtaScrollFrameRef.current = null;
        updateHeroCta();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(initialScrollCheck);
      if (heroCtaScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(heroCtaScrollFrameRef.current);
        heroCtaScrollFrameRef.current = null;
      }
      clearHeroCtaTimers();
      heroCtaModeRef.current = null;
    };
  }, []);

  return (
    <Box component="main">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          alignItems: 'end',
          minHeight: { xs: 620, md: '100svh' },
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
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'transparent',
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
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 56, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography
                variant="h1"
                sx={{
                  width: '100%',
                  color: '#fff',
                  ...typeScale.hero,
                  textShadow: '0 18px 50px rgba(0,0,0,0.42)',
                }}
              >
                Baawork Studio
              </Typography>
            </motion.div>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
            <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center" sx={{ maxWidth: 980 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.92)',
                  ...typeScale.intro,
                  textShadow: '0 12px 34px rgba(0,0,0,0.48)',
                  textAlign: 'center',
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', md: 'none', lg: 'inline' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ ประสบการณ์ใช้งาน และเทคโนโลยีให้พร้อมใช้งานในธุรกิจจริง
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline', lg: 'none' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ ประสบการณ์ใช้งาน<br />
                  และเทคโนโลยีให้พร้อมใช้งานในธุรกิจจริง
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', md: 'none' }, whiteSpace: 'nowrap' }}>
                  สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ<br />
                  ประสบการณ์ใช้งาน และเทคโนโลยี<br />
                  ให้พร้อมใช้งานในธุรกิจจริง
                </Box>
              </Typography>
              <HeroCta phase={heroCtaPhase} />
            </Stack>
            </motion.div>
          </Stack>
        </Container>
      </Box>

      <Box id="work" sx={{ bgcolor: palette.background, overflow: 'hidden' }}>
        <Box
          sx={{
            px: workCarouselGutter,
            pt: { xs: 7, sm: 8, md: 10, lg: 12 },
            pb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: palette.primaryPink,
              ...typeScale.hero,
              textAlign: 'center',
            }}
          >
            ผลงาน Baawork
          </Typography>
        </Box>

        <Stack spacing={0}>
          <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 4, sm: 5, md: 6 } }}>
            <Stack
              spacing={1.25}
              sx={{
                px: workCarouselGutter,
                maxWidth: { xs: '100%', md: 900, lg: 980 },
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: palette.text,
                  ...typeScale.sectionTitle,
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                ระบบ AI อัจฉริยะ
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={aiShowcaseCards} label="ผลงานระบบ AI" />
          </Box>

          <Box sx={{ bgcolor: palette.softGray, py: { xs: 6, sm: 7, md: 8 } }}>
            <Stack
              spacing={1.25}
              sx={{
                px: workCarouselGutter,
                maxWidth: { xs: '100%', md: 900, lg: 980 },
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: palette.text,
                  ...typeScale.sectionTitle,
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                ระบบเว็บแอปผ่าน LINE LIFF
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={lineLiffShowcaseCards} label="ผลงานระบบ LINE LIFF" />
          </Box>

          <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 6, sm: 7, md: 8 } }}>
            <Stack
              spacing={1.25}
              sx={{
                px: workCarouselGutter,
                maxWidth: { xs: '100%', md: 900, lg: 980 },
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: palette.text,
                  ...typeScale.sectionTitle,
                  whiteSpace: { sm: 'nowrap' },
                }}
              >
                ระบบเว็บแอป
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={webAppShowcaseCards} label="ผลงานระบบ Web App" />
          </Box>
        </Stack>

        <AudienceSection />
        <ToolStackSection />
        <Reveal variant="scale"><WorkflowSection /></Reveal>
        <Reveal variant="slide-right"><ResultsSection /></Reveal>
        <Reveal variant="scale"><StartProjectSection /></Reveal>
        <Reveal variant="slide-left"><FaqSection /></Reveal>
      </Box>
    </Box>
  );
}
