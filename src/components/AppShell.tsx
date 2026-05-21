import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { palette } from '../theme';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: palette.background, color: palette.text }}>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(18px)',
          bgcolor: 'rgba(255,255,255,0.82)',
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: palette.primaryPink }} />
              <Typography fontWeight={800}>Baawork Studio</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography variant="body2">Work</Typography>
              <Typography variant="body2">Studio</Typography>
              <Typography variant="body2">Contact</Typography>
            </Stack>
            <Button href="#contact" variant="contained" size="small">
              Start a project
            </Button>
          </Stack>
        </Container>
      </Box>
      {children}
      <Box component="footer" id="contact" sx={{ py: 8, borderTop: `1px solid ${palette.border}` }}>
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>
              Build the next system with Baawork Studio.
            </Typography>
            <Typography color="text.secondary">
              Portfolio systems, admin tools, and API-backed product experiences.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
