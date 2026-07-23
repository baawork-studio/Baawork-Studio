import { Typography } from '@mui/material';
import { ResponsiveStack } from '../../components/ResponsiveStack';
import { hover, layout, palette, radii, shadows, typeScale } from '../../appTheme';

export const sectionTitleSx = { ...typeScale.sectionTitle, color: palette.text };
export const bodySx = { ...typeScale.bodyLarge, color: palette.textSecondary, maxWidth: 760 };
export const cardSx = {
  bgcolor: palette.background,
  borderRadius: radii.card,
  p: layout.cardPadding,
  boxShadow: shadows.card,
  transition: hover.transition.card,
  willChange: 'transform',
  '&:hover': {
    transform: hover.lift,
    boxShadow: shadows.cardHover,
  },
};

export function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <ResponsiveStack spacing={layout.sectionHeadingGap} sx={{ mb: layout.sectionHeadingMarginBottom }}>
      <Typography component="h2" sx={sectionTitleSx}>{title}</Typography>
      <Typography sx={bodySx}>{description}</Typography>
    </ResponsiveStack>
  );
}
