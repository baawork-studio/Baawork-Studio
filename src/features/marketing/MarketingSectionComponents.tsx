import { Typography } from '@mui/material';
import { ResponsiveStack } from '../../components/ResponsiveStack';
import { palette, typeScale } from '../../appTheme';

export const sectionTitleSx = { ...typeScale.sectionTitle, color: palette.text };
export const bodySx = { ...typeScale.bodyLarge, color: '#4B5563', maxWidth: 760 };
export const cardSx = {
  bgcolor: '#FFFFFF',
  borderRadius: { xs: '24px', md: '28px' },
  p: { xs: 3, md: 3.5 },
  boxShadow: '0 12px 28px rgba(17,24,39,0.05)',
};

export function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <ResponsiveStack spacing={{ xs: 1.5, md: 2 }} sx={{ mb: { xs: 4, md: 5 } }}>
      <Typography component="h2" sx={sectionTitleSx}>{title}</Typography>
      <Typography sx={bodySx}>{description}</Typography>
    </ResponsiveStack>
  );
}
