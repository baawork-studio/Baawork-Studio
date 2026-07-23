import { Box, Typography } from '@mui/material';
import { Reveal } from '../../components/motion/Reveal';
import { ResponsiveStack } from '../../components/ResponsiveStack';
import type { Project } from '../../data/projectCatalog';
import { palette, typeScale } from '../../appTheme';
import { getProjectVisual, getProjectVisualImages, renderHighlightedDescription } from './projectDetailHelpers';

export function ProjectDeviceShowcase({ project }: { project: Project }) {
  const imageUrl = project.detailImageUrl ?? getProjectVisualImages(project)[0] ?? project.coverImageUrl;

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: 680, sm: 880, md: 1120, lg: 1280 }, mx: 'auto', aspectRatio: '16 / 9' }}>
      <Box
        component="img"
        src={imageUrl}
        alt={`${project.title} บนหน้าจออุปกรณ์`}
        sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none', pointerEvents: 'none' }}
      />
    </Box>
  );
}

export function ProjectPurposeSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box component="section" sx={{ width: '100%', py: { xs: 2, md: 3.5 } }}>
      <Reveal variant="slide-right" distance={32}>
      <ResponsiveStack spacing={{ xs: 2, md: 2.5 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h2" sx={{ color: visual.accent, ...typeScale.display }}>
          สร้างมาเพื่ออะไร
        </Typography>
        <ResponsiveStack spacing={{ xs: 1.5, md: 2 }}>
          {(project.purposeParagraphs ?? [project.description]).map((paragraph, index) => (
            <Typography key={`${project.slug}-purpose-${index}`} sx={{ color: palette.textMuted, ...typeScale.intro }}>
              {renderHighlightedDescription(project, visual.accent, paragraph)}
            </Typography>
          ))}
        </ResponsiveStack>
      </ResponsiveStack>
      </Reveal>
    </Box>
  );
}
