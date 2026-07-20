import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#FFFFFF',
  text: '#111827',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
};

export const appFontFamily =
  'var(--font-roboto, "Roboto"), var(--font-noto-sans-thai, "Noto Sans Thai"), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const typeScale = {
  hero: {
    fontSize: { xs: 32, sm: 44, md: 56, lg: 56 },
    lineHeight: { xs: 1.125, md: 1.1 },
    fontWeight: 600,
    letterSpacing: 0,
  },
  display: {
    fontSize: { xs: 32, sm: 44, md: 56, lg: 56 },
    lineHeight: { xs: 1.125, md: 1.1 },
    fontWeight: 600,
    letterSpacing: 0,
  },
  sectionTitle: {
    fontSize: { xs: 32, sm: 44, md: 56, lg: 56 },
    lineHeight: { xs: 1.125, md: 1.1 },
    fontWeight: 600,
    letterSpacing: 0,
  },
  cardTitle: {
    fontSize: { xs: 32, sm: 32, md: 40 },
    lineHeight: { xs: 1.125, md: 1.1 },
    fontWeight: 600,
    letterSpacing: 0,
  },
  intro: {
    fontSize: { xs: 19, sm: 21, md: 28, lg: 28 },
    lineHeight: { xs: 1.368, md: 1.393 },
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: { xs: 19, sm: 19, md: 21 },
    lineHeight: { xs: 1.368, md: 1.381 },
    fontWeight: 400,
    letterSpacing: 0,
  },
  body: {
    fontSize: { xs: 17, md: 17 },
    lineHeight: { xs: 1.353, md: 1.353 },
    fontWeight: 400,
    letterSpacing: 0,
  },
} as const;

export const appTheme = createTheme({
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
    fontFamily: appFontFamily,
    h1: {
      fontSize: '32px',
      lineHeight: 1.125,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '44px',
      },
      '@media (min-width:900px)': {
        fontSize: '56px',
        lineHeight: 1.1,
      },
      '@media (min-width:1200px)': {
        fontSize: '56px',
      },
    },
    h2: {
      fontSize: '32px',
      lineHeight: 1.125,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '44px',
      },
      '@media (min-width:900px)': {
        fontSize: '56px',
        lineHeight: 1.1,
      },
      '@media (min-width:1200px)': {
        fontSize: '56px',
      },
    },
    h3: {
      fontSize: '32px',
      lineHeight: 1.125,
      fontWeight: 600,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '32px',
      },
      '@media (min-width:900px)': {
        fontSize: '40px',
        lineHeight: 1.1,
      },
      '@media (min-width:1200px)': {
        fontSize: '40px',
      },
    },
    h4: {
      fontSize: '32px',
      lineHeight: 1.125,
      fontWeight: 600,
      letterSpacing: 0,
    },
    h5: {
      fontSize: '19px',
      lineHeight: 1.38,
      fontWeight: 400,
      letterSpacing: 0,
      '@media (min-width:600px)': {
        fontSize: '19px',
      },
      '@media (min-width:900px)': {
        fontSize: '21px',
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
