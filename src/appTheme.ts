import { createTheme } from '@mui/material/styles';

// Brand tokens
export const palette = {
  background: '#FFFFFF',
  surfaceAlt: '#F7F8FA',
  surfaceDark: '#05060A',
  surfaceDarkMuted: '#222222',
  text: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#6E6E73',
  textOnDark: '#FFFFFF',
  primaryPink: '#FF008C',
  accentYellow: '#F5FF00',
  softGray: '#F3F4F6',
  border: '#E5E7EB',
  control: '#D2D2D7',
  controlHover: '#B8B8BE',
  controlDisabled: '#E1E1E6',
  controlText: '#4A4A4F',
  controlTextHover: '#1D1D1F',
  controlTextDisabled: '#9A9AA0',
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const;

export const radii = {
  card: { xs: '28px', md: '36px' },
  cardInner: '22px',
  circle: '50%',
} as const;

export const shadows = {
  card: '0 24px 64px rgba(17,24,39,0.09)',
  cardHover: '0 32px 82px rgba(17,24,39,0.13)',
  carouselHover: '0 18px 40px rgba(17,24,39,0.14)',
  carouselHoverSubtle: '0 10px 24px rgba(17,24,39,0.10)',
} as const;

export const layout = {
  pageHeaderPadding: { xs: 8, sm: 9, md: 10, lg: 11 },
  pageHeaderBottomPadding: { xs: 8, sm: 9, md: 11, lg: 12 },
  sectionPadding: { xs: 5, sm: 6, md: 7 },
  cardPadding: { xs: 3, md: 3.5 },
  sectionHeadingGap: { xs: 1.5, md: 2 },
  sectionHeadingMarginBottom: { xs: 4, md: 5 },
  cardGridGap: { xs: 2, md: 2.5 },
  cardContentGap: 1.25,
  cardCompactGap: 1,
  bentoFeatureCardMinHeight: { xs: 220, md: 252 },
  bentoCardMinHeight: { xs: 176, md: 196 },
  marketingCarouselCardWidth: { xs: 'calc(100vw - 48px)', sm: 360, md: 380, lg: 400 },
  marketingCarouselCardMinHeight: { xs: 460, md: 500 },
} as const;

export const motion = {
  reveal: {
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1] as const,
    viewport: { once: true, amount: 0.16, margin: '0px 0px -8% 0px' },
    cardDistance: 28,
    stagger: 0.09,
  },
} as const;

// Shared hover behavior. Keep every interactive response quick and consistent
// across cards, controls, links, and Motion components.
export const hover = {
  lift: 'translate3d(0, -6px, 0)',
  liftY: -6,
  subtleLift: 'translate3d(0, -1px, 0)',
  imageScale: 'scale(1.035)',
  detailImageScale: 'scale(1.045)',
  controlScale: 'scale(1.05)',
  icon: { y: -8, scale: 1.06 },
  motion: {
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1],
  },
  transition: {
    color: 'color 180ms ease',
    control: 'background-color 180ms ease, color 180ms ease',
    interactive: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms ease, color 180ms ease, box-shadow 180ms ease, filter 180ms ease, opacity 180ms ease',
    surface: 'background-color 180ms ease, box-shadow 180ms ease',
    card: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease',
    image: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const;

export const overlay = {
  modalBackdrop: 'rgba(9, 11, 18, 0.5)',
  darkCard: 'rgba(0,0,0,0.2)',
  darkCardBorder: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
  textOnDarkMuted: 'rgba(255,255,255,0.68)',
  textOnDarkSecondary: 'rgba(255,255,255,0.78)',
  control: 'rgba(255,255,255,0.12)',
  controlHover: 'rgba(255,255,255,0.2)',
  lightTintPink: 'rgba(255,240,248,0.92)',
  lightTintNeutral: 'rgba(247,248,250,0.92)',
  imageOverlayDark: 'linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.78) 100%)',
  imageOverlayLightStart: 'rgba(255,255,255,0.82)',
} as const;

export const appFontFamily =
  '"SF Pro TH", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", var(--font-noto-sans-thai, "Noto Sans Thai"), sans-serif';

// These values intentionally match Apple Thailand's type breakpoints.
// 0–734px: iPhone | 735–1068px: iPad | 1069px+: MacBook and desktop
const media = {
  tablet: '@media (min-width:735px)',
  desktop: '@media (min-width:1069px)',
} as const;

const typographyStyles = {
  // Main page heading: 36 / 52 / 64 px
  primaryHeading: {
    fontSize: '36px',
    lineHeight: 1.125,
    fontWeight: fontWeight.semibold,
    letterSpacing: '.002em',
    [media.tablet]: {
      fontSize: '52px',
      lineHeight: 1.0834933333,
      letterSpacing: '-.002em',
    },
    [media.desktop]: {
      fontSize: '64px',
      lineHeight: 1.125,
      letterSpacing: '-.005em',
    },
  },

  // Section heading: 32 / 48 / 56 px
  sectionHeading: {
    fontSize: '32px',
    lineHeight: 1.125,
    fontWeight: fontWeight.semibold,
    letterSpacing: '.002em',
    [media.tablet]: {
      fontSize: '48px',
      lineHeight: 1.0834933333,
      letterSpacing: '-.002em',
    },
    [media.desktop]: {
      fontSize: '56px',
      lineHeight: 1.3392857143,
      letterSpacing: '-.005em',
    },
  },

  // Card heading: 32 / 32 / 40 px
  cardHeading: {
    fontSize: '32px',
    lineHeight: 1.125,
    fontWeight: fontWeight.semibold,
    letterSpacing: '.002em',
    [media.desktop]: {
      fontSize: '40px',
      lineHeight: 1.1,
      letterSpacing: 0,
    },
  },

  // Third-level heading: 22 / 24 / 28 px
  tertiaryHeading: {
    fontSize: '22px',
    lineHeight: 1.2,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0,
    [media.tablet]: {
      fontSize: '24px',
    },
    [media.desktop]: {
      fontSize: '28px',
      lineHeight: 1.15,
    },
  },

  // Lead paragraph: 19 / 24 / 28 px
  lead: {
    fontSize: '19px',
    lineHeight: 1.2105263158,
    fontWeight: fontWeight.regular,
    letterSpacing: '.012em',
    [media.tablet]: {
      fontSize: '24px',
      lineHeight: 1.1666666667,
      letterSpacing: '.009em',
    },
    [media.desktop]: {
      fontSize: '28px',
      lineHeight: 1.3928571429,
      letterSpacing: '.007em',
    },
  },

  // Supporting paragraph: 19 / 19 / 21 px
  supporting: {
    fontSize: '19px',
    lineHeight: 1.2105263158,
    fontWeight: fontWeight.regular,
    letterSpacing: '.012em',
    [media.desktop]: {
      fontSize: '21px',
      lineHeight: 1.381002381,
      letterSpacing: '.011em',
    },
  },
} as const;

// Use these values in `sx` when a component needs the shared scale.
export const typeScale = {
  // Use this only for the primary page heading (`h1`).
  hero: typographyStyles.primaryHeading,
  display: typographyStyles.sectionHeading,
  sectionTitle: typographyStyles.sectionHeading,
  tertiary: typographyStyles.tertiaryHeading,
  cardTitle: typographyStyles.cardHeading,
  intro: typographyStyles.lead,
  bodyLarge: typographyStyles.supporting,
  body: {
    fontSize: { xs: 17, md: 17 },
    lineHeight: { xs: 1.353, md: 1.353 },
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
  caption: {
    fontSize: { xs: 14, md: 14 },
    lineHeight: { xs: 1.43, md: 1.43 },
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  },
} as const;

export const appTheme = createTheme({
  palette: {
    primary: { main: palette.primaryPink },
    secondary: { main: palette.accentYellow },
    text: {
      primary: palette.text,
      secondary: palette.textSecondary,
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    divider: palette.border,
  },
  typography: {
    fontFamily: appFontFamily,
    h1: typographyStyles.primaryHeading,
    h2: typographyStyles.sectionHeading,
    h3: typographyStyles.tertiaryHeading,
    h4: typographyStyles.cardHeading,
    h5: typographyStyles.supporting,
    body1: {
      fontSize: '17px',
      lineHeight: 1.47,
      fontWeight: fontWeight.regular,
      letterSpacing: 0,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.43,
      fontWeight: fontWeight.regular,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontSize: '17px',
      lineHeight: 1.23,
      fontWeight: fontWeight.semibold,
      letterSpacing: 0,
    },
    overline: {
      fontSize: '12px',
      lineHeight: 1.33,
      fontWeight: fontWeight.semibold,
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
