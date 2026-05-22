import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#FFFFFF',
  text: '#111827',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
};

export const typeScale = {
  hero: {
    fontSize: { xs: 48, sm: 64, md: 80, lg: 96 },
    lineHeight: 1.05,
    fontWeight: 600,
    letterSpacing: 0,
  },
  display: {
    fontSize: { xs: 48, sm: 56, md: 72, lg: 80 },
    lineHeight: 1.05,
    fontWeight: 600,
    letterSpacing: 0,
  },
  sectionTitle: {
    fontSize: { xs: 32, sm: 40, md: 48, lg: 56 },
    lineHeight: 1.08,
    fontWeight: 600,
    letterSpacing: 0,
  },
  cardTitle: {
    fontSize: { xs: 28, sm: 30, md: 32 },
    lineHeight: 1.14,
    fontWeight: 600,
    letterSpacing: 0,
  },
  intro: {
    fontSize: { xs: 21, sm: 24, md: 28, lg: 32 },
    lineHeight: 1.25,
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: { xs: 19, sm: 21, md: 24 },
    lineHeight: 1.38,
    fontWeight: 400,
    letterSpacing: 0,
  },
  body: {
    fontSize: { xs: 17, md: 19 },
    lineHeight: 1.47,
    fontWeight: 400,
    letterSpacing: 0,
  },
} as const;

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
      '"Roboto", "Noto Sans Thai", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: '48px',
      lineHeight: 1.05,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '64px',
      },
      '@media (min-width:900px)': {
        fontSize: '80px',
      },
      '@media (min-width:1200px)': {
        fontSize: '96px',
      },
    },
    h2: {
      fontSize: '48px',
      lineHeight: 1.05,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '56px',
      },
      '@media (min-width:900px)': {
        fontSize: '72px',
      },
      '@media (min-width:1200px)': {
        fontSize: '80px',
      },
    },
    h3: {
      fontSize: '32px',
      lineHeight: 1.08,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '40px',
      },
      '@media (min-width:900px)': {
        fontSize: '48px',
      },
      '@media (min-width:1200px)': {
        fontSize: '56px',
      },
    },
    h4: {
      fontSize: '32px',
      lineHeight: 1.15,
      fontWeight: 600,
      letterSpacing: 0,
    },
    h5: {
      fontSize: '19px',
      lineHeight: 1.38,
      fontWeight: 400,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '21px',
      },
      '@media (min-width:900px)': {
        fontSize: '24px',
      },
    },
    body1: {
      fontSize: '17px',
      lineHeight: 1.47,
      fontWeight: 400,
      letterSpacing: 0,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.43,
      fontWeight: 400,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontSize: '17px',
      lineHeight: 1.23,
      fontWeight: 600,
      letterSpacing: 0,
    },
    overline: {
      fontSize: '12px',
      lineHeight: 1.33,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
