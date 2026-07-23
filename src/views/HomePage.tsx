'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
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
      <WorkflowSection />
      <ResultsSection />
      <StartProjectSection />
    </Box>
  );
}
