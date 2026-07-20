"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Reveal } from "../components/motion/Reveal";
import { ResponsiveStack } from "../components/ResponsiveStack";
import { projectCatalog } from "../data/projectCatalog";
import { palette, typeScale } from "../appTheme";
import { pageGutter } from "../features/project-detail/projectDetailContent";
import { ProjectCapabilitySection, ProjectHighlightsSection, ProjectSystemPreviewSection, ProjectTechSection, ProjectUsageGuideSection } from "../features/project-detail/ProjectDetailSections";
import { ProjectDeviceShowcase, ProjectPurposeSection } from "../features/project-detail/ProjectHeroSections";
import { getProjectVisual } from "../features/project-detail/projectDetailHelpers";
import type { ProjectDetailPageProps } from "../features/project-detail/projectDetailTypes";

export function ProjectDetailPage({ slug, initialProject }: ProjectDetailPageProps) {
  const fallback = useMemo(
    () => projectCatalog.find((project) => project.slug === slug) ?? projectCatalog[0],
    [slug],
  );
  const project = initialProject ?? fallback;
  const alternatingSectionSx = (backgroundColor: string) => ({
    bgcolor: backgroundColor,
    position: 'relative',
    left: `calc(${pageGutter} * -1)`,
    width: `calc(100% + (${pageGutter} * 2))`,
    px: pageGutter,
  });

  return (
    <Box component="main" sx={{ overflowX: 'hidden' }}>
      <Box sx={{ px: pageGutter, pt: { xs: 8, sm: 9, md: 10, lg: 11 }, pb: { xs: 8, sm: 9, md: 11, lg: 12 } }}>
        <ResponsiveStack spacing={{ xs: 5, md: 6 }}>
          <ResponsiveStack
            spacing={{ xs: 1.25, sm: 1.5, md: 1.75 }}
            alignItems="center"
            textAlign="center"
            sx={{ width: '100%', mx: 'auto', maxWidth: 1060, alignSelf: 'center' }}
          >
            <Typography
              variant="h1"
              sx={{
                color: palette.text,
                ...typeScale.hero,
                width: '100%',
                textAlign: 'center',
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: getProjectVisual(project).accent,
                ...typeScale.intro,
                width: '100%',
                maxWidth: 880,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {project.subtitle}
            </Typography>
          </ResponsiveStack>

          <Reveal variant="scale"><ProjectDeviceShowcase project={project} /></Reveal>

          <ResponsiveStack spacing={0} sx={{ width: '100%' }}>
            <Box sx={alternatingSectionSx('#FFFFFF')}>
              <Reveal variant="slide-right"><ProjectPurposeSection project={project} /></Reveal>
            </Box>
            <Box sx={alternatingSectionSx('#F7F8FA')}>
              <Reveal variant="slide-left"><ProjectCapabilitySection project={project} /></Reveal>
            </Box>
            <Box sx={alternatingSectionSx('#FFFFFF')}>
              <Reveal variant="scale"><ProjectSystemPreviewSection project={project} /></Reveal>
            </Box>
            <Box sx={alternatingSectionSx('#F7F8FA')}>
              <Reveal variant="slide-right"><ProjectUsageGuideSection project={project} /></Reveal>
            </Box>
            <Box sx={alternatingSectionSx('#FFFFFF')}>
              <Reveal variant="slide-left"><ProjectHighlightsSection project={project} /></Reveal>
            </Box>
            <Box sx={alternatingSectionSx('#F7F8FA')}>
              <Reveal variant="scale"><ProjectTechSection project={project} /></Reveal>
            </Box>
          </ResponsiveStack>

        </ResponsiveStack>
      </Box>
    </Box>
  );
}
