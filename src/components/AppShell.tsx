'use client';

import { Box } from '@mui/material';
import { palette } from '../appTheme';
import { AppFooter } from './app-shell/AppFooter';
import { AppHeader } from './app-shell/AppHeader';
import { PageMotion } from './motion/PageMotion';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', overflowX: 'clip', bgcolor: palette.background, color: palette.text }}>
      <AppHeader />
      <PageMotion>{children}</PageMotion>
      <AppFooter />
    </Box>
  );
}
