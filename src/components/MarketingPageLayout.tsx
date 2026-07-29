'use client';

import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { Reveal } from './motion/Reveal';
import { ResponsiveStack } from './ResponsiveStack';
import { layout, palette, typeScale } from '../appTheme';
import { pageGutter } from '../features/project-detail/projectDetailContent';

export function MarketingPageLayout({
  title,
  subtitle,
  accent = palette.primaryPink,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <Box component="main" sx={{ overflowX: 'hidden' }}>
      <Box sx={{ px: pageGutter, pt: layout.pageHeaderPadding, pb: 0 }}>
        <ResponsiveStack spacing={{ xs: 5, md: 6 }}>
          <Reveal distance={28}>
            <ResponsiveStack spacing={{ xs: 1.25, sm: 1.5, md: 1.75 }} alignItems="center" textAlign="center" sx={{ width: '100%', mx: 'auto', maxWidth: 1060, alignSelf: 'center' }}>
              <Typography variant="h1" sx={{ color: palette.text, ...typeScale.hero, width: '100%', textAlign: 'center' }}>
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="h5" sx={{ color: accent, ...typeScale.intro, width: '100%', maxWidth: 880, fontWeight: 700, textAlign: 'center' }}>
                  {subtitle}
                </Typography>
              ) : null}
            </ResponsiveStack>
          </Reveal>

          <ResponsiveStack spacing={0} sx={{ width: '100%' }}>
            {children}
          </ResponsiveStack>
        </ResponsiveStack>
      </Box>
    </Box>
  );
}

export function MarketingContentSection({
  backgroundColor,
  children,
  variant = 'scale',
}: {
  backgroundColor: string;
  children: ReactNode;
  variant?: 'slide-left' | 'slide-right' | 'scale';
}) {
  return (
    <Box sx={{ bgcolor: backgroundColor, position: 'relative', left: `calc(${pageGutter} * -1)`, width: `calc(100% + (${pageGutter} * 2))`, px: pageGutter }}>
      <Reveal variant={variant}>
        <Box sx={{ py: layout.sectionPadding }}>{children}</Box>
      </Reveal>
    </Box>
  );
}
