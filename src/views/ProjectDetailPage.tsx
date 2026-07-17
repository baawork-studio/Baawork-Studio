"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { Reveal } from "../components/motion/Reveal";
import { Stack } from "../components/Stack";
import { fallbackProjects } from "../data/fallbackProjects";
import { palette, typeScale } from "../theme";
import { pageGutter } from "../features/project-detail/data";
import { ProjectCapabilitySection, ProjectDeviceShowcase, ProjectHighlightsSection, ProjectPurposeSection, ProjectSystemPreviewSection, ProjectTechSection, ProjectUsageGuideSection } from "../features/project-detail/sections";
import { getProjectVisual } from "../features/project-detail/utils";
import type { ProjectDetailPageProps } from "../features/project-detail/types";

export function ProjectDetailPage({ slug, initialProject }: ProjectDetailPageProps) {
  const fallback = useMemo(
    () => fallbackProjects.find((project) => project.slug === slug) ?? fallbackProjects[0],
    [slug],
  );
  const project = initialProject ?? fallback;

  return (
    <Box component="main">
      <Box sx={{ px: pageGutter, pt: { xs: 8, sm: 9, md: 10, lg: 11 }, pb: { xs: 8, sm: 9, md: 11, lg: 12 } }}>
        <Stack spacing={{ xs: 5, md: 6 }}>
          <Stack
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
          </Stack>

          <Reveal variant="scale"><ProjectDeviceShowcase project={project} /></Reveal>

          <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: '100%' }}>
            <Reveal variant="slide-right"><ProjectPurposeSection project={project} /></Reveal>
            <Reveal variant="slide-left"><ProjectCapabilitySection project={project} /></Reveal>
            <Reveal variant="scale"><ProjectSystemPreviewSection project={project} /></Reveal>
            <Reveal variant="slide-right"><ProjectUsageGuideSection project={project} /></Reveal>
            <Reveal variant="slide-left"><ProjectHighlightsSection project={project} /></Reveal>
            <Reveal variant="scale"><ProjectTechSection project={project} /></Reveal>
          </Stack>

        </Stack>
      </Box>
    </Box>
  );
}
