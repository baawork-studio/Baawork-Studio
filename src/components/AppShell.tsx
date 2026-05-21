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
          bgcolor: 'rgba(22,22,23,0.92)',
          height: 44,
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: palette.primaryPink }} />
            </Stack>
          </Box>
        </Container>
        <Stack
          component="nav"
          aria-label="เมนูหลัก"
          direction="row"
          spacing={{ sm: 4.5, md: 6 }}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px' }}>
            ผลงาน
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px' }}>
            สตูดิโอ
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: '44px' }}>
            ติดต่อ
          </Typography>
        </Stack>
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
