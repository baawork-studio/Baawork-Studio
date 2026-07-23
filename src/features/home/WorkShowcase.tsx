import { Box, Typography } from '@mui/material';
import { ResponsiveStack } from '../../components/ResponsiveStack';
import { Reveal } from '../../components/motion/Reveal';
import { palette, typeScale } from '../../appTheme';
import { aiShowcaseCards, lineLiffShowcaseCards, webAppShowcaseCards, workCarouselGutter } from './homeContent';
import { ShowcaseCarousel } from './HomeSections';

const showcaseGroups = [
  { title: 'ระบบ AI อัจฉริยะ', cards: aiShowcaseCards, label: 'ผลงานระบบ AI', background: '#FFFFFF', padding: { xs: 4, sm: 5, md: 6 } },
  { title: 'ระบบเว็บแอปผ่าน LINE LIFF', cards: lineLiffShowcaseCards, label: 'ผลงานระบบ LINE LIFF', background: palette.softGray, padding: { xs: 6, sm: 7, md: 8 } },
  { title: 'ระบบเว็บแอป', cards: webAppShowcaseCards, label: 'ผลงานระบบ Web App', background: '#FFFFFF', padding: { xs: 6, sm: 7, md: 8 } },
];

export function WorkShowcase() {
  return (
    <Box id="work" sx={{ bgcolor: palette.background, overflow: 'hidden' }}>
      <Box sx={{ px: workCarouselGutter, pt: { xs: 7, sm: 8, md: 10, lg: 12 }, pb: { xs: 4, sm: 5, md: 6 } }}>
        <Reveal>
        <Typography variant="h2" sx={{ color: palette.primaryPink, ...typeScale.sectionTitle, textAlign: 'center' }}>
          ผลงานของเรา
        </Typography>
        </Reveal>
      </Box>

      <ResponsiveStack spacing={0}>
        {showcaseGroups.map((group) => (
          <Box key={group.label} sx={{ bgcolor: group.background, py: group.padding }}>
            <ResponsiveStack spacing={1.25} sx={{ px: workCarouselGutter, maxWidth: { xs: '100%', md: 900, lg: 980 }, alignItems: 'flex-start', textAlign: 'left' }}>
              <Reveal variant="slide-right">
              <Typography variant="h2" sx={{ color: palette.text, ...typeScale.sectionTitle, whiteSpace: { sm: 'nowrap' } }}>
                {group.title}
              </Typography>
              </Reveal>
            </ResponsiveStack>
            <Reveal delay={0.08}>
              <ShowcaseCarousel cards={group.cards} label={group.label} />
            </Reveal>
          </Box>
        ))}
      </ResponsiveStack>
    </Box>
  );
}
