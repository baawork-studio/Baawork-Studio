import { Box, Container, Stack, Typography } from '@mui/material';
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
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 64 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: palette.primaryPink }} />
            </Stack>
            <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography variant="body2">ผลงาน</Typography>
              <Typography variant="body2">สตูดิโอ</Typography>
              <Typography variant="body2">ติดต่อ</Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      {children}
      <Box component="footer" id="contact" sx={{ py: 8, borderTop: `1px solid ${palette.border}` }}>
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>
              สร้างระบบถัดไปกับ Baawork Studio
            </Typography>
            <Typography color="text.secondary">
              ระบบโชว์ผลงาน เครื่องมือหลังบ้าน และประสบการณ์ใช้งานที่เชื่อมต่อ API
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
