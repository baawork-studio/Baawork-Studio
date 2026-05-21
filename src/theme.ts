import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#FFFFFF',
  text: '#111827',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primaryPink,
    },
    secondary: {
      main: palette.accentYellow,
    },
    text: {
      primary: palette.text,
      secondary: '#4B5563',
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
