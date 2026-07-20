'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Reveal } from '../components/motion/Reveal';
import { restoreHomeSectionScroll } from '../utils/homeSectionNavigation';
import { HomeHero } from '../features/home/HomeHero';
import { WorkShowcase } from '../features/home/WorkShowcase';
import {
  AudienceSection,
  ResultsSection,
  StartProjectSection,
  ToolStackSection,
  WorkflowSection,
} from '../features/home/HomeSections';
import type { HomePageProps } from '../features/home/homeTypes';

export function HomePage(_props: HomePageProps) {
  useEffect(() => {
    restoreHomeSectionScroll();
  }, []);

  return (
    <Box component="main">
      <HomeHero />
      <WorkShowcase />
      <AudienceSection />
      <ToolStackSection />
      <Reveal variant="scale"><WorkflowSection /></Reveal>
      <Reveal variant="slide-right"><ResultsSection /></Reveal>
      <Reveal variant="scale"><StartProjectSection /></Reveal>
    </Box>
  );
}
