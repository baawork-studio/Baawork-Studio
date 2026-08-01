import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../../components/motion/Reveal";
import { ResponsiveStack } from "../../components/ResponsiveStack";
import type { Project } from "../../data/projectCatalog";
import { fontWeight, hover, overlay, palette, radii, shadows, typeScale } from "../../appTheme";
import { useHorizontalDragScroll } from "../../hooks/useHorizontalDragScroll";
import { toolLogos } from "../home/homeContent";
import { detailCarouselVerticalGap, pageGutter, techIcons } from "./projectDetailContent";
import { carouselControlSx, getCapabilityCards, getCapabilityDetailRows, getOutcomeCards, getProjectVisual, getProjectVisualImage, useDetailCarousel } from "./projectDetailHelpers";
import type { CapabilityCard, DetailInfoCard } from "./projectDetailTypes";

const systemPreviewDevices = [
  { name: 'MacBook', label: 'หน้าจอ MacBook', imageUrl: '/project-screen-previews/macbook.png', maxHeight: { xs: 360, sm: 400 }, width: { xs: 'min(100%, 400px)', sm: '400px' }, gap: { xs: 1, md: 1.25 } },
  { name: 'iPad', label: 'หน้าจอ iPad', imageUrl: '/project-screen-previews/ipad.png', maxHeight: { xs: 260, sm: 300, lg: 340 }, width: { xs: 'min(100%, 280px)', sm: '300px' }, gap: { xs: 0.5, md: 0.75 } },
  { name: 'iPhone', label: 'หน้าจอ iPhone', imageUrl: '/project-screen-previews/iphone.png', maxHeight: { xs: 340, sm: 380, lg: 420 }, width: { xs: 'min(100%, 220px)', sm: '240px' }, gap: { xs: 0.25, md: 0.5 } },
] as const;

const projectOutcomeBackgrounds = [
  '/project-details/project-capability-card-background.png',
] as const;

const projectHighlightBackgrounds = [
  '/project-details/project-capability-card-background.png',
] as const;

type SystemPreviewDevice = (typeof systemPreviewDevices)[number];
const systemPreviewImageCount = 6;

const mobileOnlyPreviewSlugs = new Set([
  'linora-facebook-page-analytics',
  'shadow-ceo-business-assistant',
  'ceo-partner-ai-automation',
  'heylth-line-health-tracking',
  'car-sales-line-oa-template',
  'car-rental-line-oa-template',
]);

function SystemPreviewCarousel({
  project,
  device,
  onPreviewOpen,
}: {
  project: Project;
  device: SystemPreviewDevice;
  onPreviewOpen: (device: SystemPreviewDevice, imageIndex: number) => void;
}) {
  const { carouselRef, carouselState, scrollCards } = useDetailCarousel();
  const dragScroll = useHorizontalDragScroll();
  const canScroll = carouselState.canScrollPrev || carouselState.canScrollNext;
  const previewMaxHeight = device.name === 'iPad'
    ? { xs: 230, sm: 270, lg: 300 }
    : device.name === 'iPhone'
      ? { xs: 300, sm: 340, lg: 380 }
      : device.maxHeight;
  const previewItemWidth = device.name === 'iPad'
    ? { xs: 180, sm: 245, lg: 260 }
    : device.name === 'iPhone'
      ? { xs: 150, sm: 195, lg: 210 }
      : { xs: 'calc(100vw - 64px)', sm: 400 };

  return (
    <ResponsiveStack
      spacing={{ xs: 2, md: 2.5 }}
      sx={{
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: palette.text,
          textAlign: 'left',
          px: pageGutter,
        }}
      >
        {device.label}
      </Typography>

      <Box>
        <Box
          ref={carouselRef}
          {...dragScroll}
          sx={{
            display: 'flex',
            gap: device.name === 'MacBook'
              ? { xs: 2, md: '20px' }
              : { xs: 1, md: '20px' },
            overflowX: 'auto',
            overscrollBehaviorX: 'contain',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            cursor: 'grab',
            touchAction: 'pan-x pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pr: pageGutter,
            pt: detailCarouselVerticalGap,
            pb: { xs: 7, md: 8 },
            '&::-webkit-scrollbar': { display: 'none' },
            '& img': { WebkitUserDrag: 'none' },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{ flex: '0 0 auto', width: pageGutter }}
          />
          {Array.from({ length: systemPreviewImageCount }).map((_, imageIndex) => (
            <Box
              key={`${device.name}-${imageIndex}`}
              data-carousel-item="true"
              component="button"
              type="button"
              aria-label={`Open ${device.name} preview ${imageIndex + 1}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onPreviewOpen(device, imageIndex)}
              sx={{
                display: 'block',
                flex: '0 0 auto',
                width: previewItemWidth,
                maxWidth: '100%',
                maxHeight: previewMaxHeight,
                objectFit: 'contain',
                objectPosition: 'left center',
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
                cursor: 'zoom-in',
                appearance: 'none',
                WebkitAppearance: 'none',
                outline: 'none',
                border: '0 !important',
                borderRadius: 0,
                bgcolor: 'transparent !important',
                boxShadow: 'none !important',
                p: '0 !important',
                lineHeight: 0,
                overflow: 'visible',
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
                position: 'relative',
                zIndex: 1,
                transition: hover.transition.interactive,
                '&:hover': {
                  transform: hover.lift,
                  opacity: 0.92,
                  zIndex: 2,
                },
                '&:focus-visible': {
                  outline: `2px solid ${palette.primaryPink}`,
                  outlineOffset: 6,
                },
              }}
            >
              <Box
                component="img"
                src={device.imageUrl}
                alt={`${project.title} ${device.name} ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
                sx={{
                  display: 'block',
                  width: '100%',
                  maxHeight: previewMaxHeight,
                  objectFit: 'contain',
                  objectPosition: 'left center',
                  pointerEvents: 'none',
                }}
              />
            </Box>
          ))}
        </Box>

        <ResponsiveStack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{
            mt: { xs: -4, md: -5 },
            px: pageGutter,
            position: 'relative',
            zIndex: 2,
            visibility: canScroll ? 'visible' : 'hidden',
          }}
        >
          <Box
            component="button"
            type="button"
            aria-label={`เลื่อนภาพ ${device.name} ไปก่อนหน้า`}
            disabled={!carouselState.canScrollPrev}
            onClick={() => scrollCards(-1)}
            sx={carouselControlSx(carouselState.canScrollPrev)}
          >
            <Box component="span" sx={{ width: 12, height: 12, ml: 0.5, borderLeft: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(45deg)' }} />
          </Box>
          <Box
            component="button"
            type="button"
            aria-label={`เลื่อนภาพ ${device.name} ไปถัดไป`}
            disabled={!carouselState.canScrollNext}
            onClick={() => scrollCards(1)}
            sx={carouselControlSx(carouselState.canScrollNext)}
          >
            <Box component="span" sx={{ width: 12, height: 12, mr: 0.5, borderRight: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(-45deg)' }} />
          </Box>
        </ResponsiveStack>
      </Box>
    </ResponsiveStack>
  );
}

function SystemPreviewOverlay({
  project,
  device,
  imageIndex,
  onClose,
  onNavigate,
}: {
  project: Project;
  device: SystemPreviewDevice;
  imageIndex: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
}) {
  const stageHeight = device.name === 'iPhone'
    ? { xs: 300, sm: 360, md: 420, lg: 480, xl: 520 }
    : device.name === 'iPad'
      ? { xs: 340, sm: 420, md: 500, lg: 580, xl: 640 }
      : { xs: 220, sm: 280, md: 360, lg: 440, xl: 500 };

  return (
    <Modal
      open
      onClose={onClose}
      aria-label="System preview"
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: overlay.modalBackdrop,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          },
        },
      }}
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        p: { xs: 2, sm: 4 },
        bgcolor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <ResponsiveStack
        spacing={{ xs: 2, md: 2.5 }}
        sx={{
          width: 'min(calc(100vw - 32px), 760px)',
          flex: '0 1 760px',
          m: 0,
          maxHeight: 'calc(100dvh - 32px)',
          overflow: 'visible',
          p: 0,
          borderRadius: 0,
          bgcolor: 'transparent',
          color: palette.textOnDark,
          boxShadow: 'none',
          outline: 'none',
        }}
      >
        <ResponsiveStack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
          <Box
            component="button"
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            sx={{
              width: 42,
              height: 42,
              border: 0,
              borderRadius: radii.circle,
              bgcolor: overlay.control,
              color: palette.textOnDark,
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              transition: hover.transition.interactive,
              '&:hover': { bgcolor: overlay.controlHover, transform: hover.controlScale },
            }}
          >
            ×
          </Box>
        </ResponsiveStack>

        <Box
          sx={{
            position: 'relative',
            display: 'grid',
            placeItems: 'center',
            height: stageHeight,
            minHeight: 0,
            mx: 'auto',
            width: '100%',
            maxWidth: 860,
            overflow: 'visible',
          }}
        >
          <Box
              component="img"
              src={device.imageUrl}
              alt={`${project.title} ${device.name} ${imageIndex + 1}`}
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                display: 'block',
                m: 'auto',
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: stageHeight,
                objectFit: 'contain',
                filter: 'none',
              }}
            />
        </Box>

        <ResponsiveStack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%', alignSelf: 'center', flexShrink: 0, position: 'relative', zIndex: 2 }}>
          <Box
            component="button"
            type="button"
            aria-label="Previous preview"
            onClick={() => onNavigate(-1)}
            sx={carouselControlSx(true)}
          >
            <Box component="span" sx={{ width: 12, height: 12, ml: 0.5, borderLeft: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(45deg)' }} />
          </Box>
          <Box
            component="button"
            type="button"
            aria-label="Next preview"
            onClick={() => onNavigate(1)}
            sx={carouselControlSx(true)}
          >
            <Box component="span" sx={{ width: 12, height: 12, mr: 0.5, borderRight: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(-45deg)' }} />
          </Box>
        </ResponsiveStack>
      </ResponsiveStack>
    </Modal>
  );
}

export function ProjectSystemPreviewSection({ project }: { project: Project }) {
  const previewDevices = mobileOnlyPreviewSlugs.has(project.slug)
    ? systemPreviewDevices.filter((device) => device.name === 'iPhone')
    : systemPreviewDevices;
  const [activePreview, setActivePreview] = useState<{
    device: SystemPreviewDevice;
    imageIndex: number;
  } | null>(null);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: palette.background,
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: 6,
        overflow: 'visible',
      }}
    >
      <Reveal distance={28}>
        <ResponsiveStack sx={{ px: pageGutter, mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
          }}
        >
          พรีวิวหน้าจอระบบจริง
        </Typography>
        </ResponsiveStack>
      </Reveal>

      <Box
        sx={{
          px: pageGutter,
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: { xs: 6, md: 8 },
            alignItems: 'start',
          }}
        >
          {previewDevices.map((device, index) => (
            <Reveal key={device.name} delay={Math.min(index * 0.1, 0.2)} variant={index % 2 === 0 ? 'slide-right' : 'slide-left'}>
              <SystemPreviewCarousel
                project={project}
                device={device}
                onPreviewOpen={(previewDevice, imageIndex) => setActivePreview({ device: previewDevice, imageIndex })}
              />
            </Reveal>
          ))}
        </Box>
      </Box>
      {activePreview && (
        <SystemPreviewOverlay
          project={project}
              device={activePreview.device}
              imageIndex={activePreview.imageIndex}
              onClose={() => setActivePreview(null)}
              onNavigate={(direction) => {
            setActivePreview((current) => current && {
              ...current,
              imageIndex: (current.imageIndex + direction + systemPreviewImageCount) % systemPreviewImageCount,
            });
          }}
        />
      )}
    </Box>
  );
}

function DetailSectionHeading({
  title,
  description,
  accent,
}: {
  title: string;
  description?: string;
  accent: string;
}) {
  return (
    <Reveal distance={28}>
    <ResponsiveStack spacing={{ xs: 1, md: 1.25 }} sx={{ maxWidth: 860 }}>
      <Typography
        variant="h2"
        sx={{
          color: accent,
          ...typeScale.sectionTitle,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: palette.textSecondary,
            ...typeScale.bodyLarge,
            maxWidth: 760,
          }}
        >
          {description}
        </Typography>
      )}
    </ResponsiveStack>
    </Reveal>
  );
}

function VisualInfoCard({
  title,
  description,
  imageUrl,
  accent,
  label,
  centered = false,
  tall = false,
  dark = true,
}: {
  title: string;
  description: string;
  imageUrl: string;
  accent: string;
  label?: string;
  centered?: boolean;
  tall?: boolean;
  dark?: boolean;
}) {
  return (
    <ResponsiveStack
      component="article"
      sx={{
        position: 'relative',
        minHeight: tall ? { xs: 360, md: 460 } : { xs: 300, md: 360 },
        overflow: 'hidden',
        borderRadius: radii.card,
        bgcolor: dark ? palette.surfaceDark : palette.background,
        color: dark ? palette.textOnDark : palette.text,
        boxShadow: shadows.card,
        transition: hover.transition.card,
        '&:hover': {
          transform: hover.lift,
          boxShadow: shadows.cardHover,
        },
        '&:hover img': {
          transform: hover.detailImageScale,
        },
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: dark ? 0.86 : 0.2,
          filter: 'blur(8px)',
          transform: 'scale(1.06)',
          transition: hover.transition.image,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'transparent'
            : `linear-gradient(180deg, ${overlay.imageOverlayLightStart} 0%, ${visualTintFromAccent(accent)} 100%)`,
        }}
      />
      <ResponsiveStack
        spacing={{ xs: 1.35, md: 1.6 }}
        sx={{
          position: dark ? 'absolute' : 'relative',
          ...(dark ? { inset: { xs: '18px', md: '20px' } } : {}),
          zIndex: 1,
          height: dark ? 'auto' : '100%',
          minHeight: dark ? 0 : 'inherit',
          justifyContent: centered ? 'center' : 'flex-end',
          alignItems: centered ? 'center' : 'stretch',
          textAlign: centered ? 'center' : 'left',
          p: { xs: 3, md: 3.75 },
          borderRadius: dark ? radii.cardInner : 0,
          bgcolor: dark ? overlay.darkCard : 'transparent',
          backdropFilter: dark ? 'blur(6px)' : 'none',
          WebkitBackdropFilter: dark ? 'blur(6px)' : 'none',
          boxShadow: 'none',
        }}
      >
        {label && (
          <Typography
            sx={{
              color: dark ? overlay.textOnDarkMuted : accent,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1,
              fontWeight: fontWeight.extraBold,
            }}
          >
            {label}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{
            color: 'currentColor',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: dark ? overlay.textOnDarkSecondary : palette.textSecondary,
            ...typeScale.bodyLarge,
            maxWidth: 560,
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {description}
        </Typography>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}

function visualTintFromAccent(accent: string) {
  return accent === palette.primaryPink ? overlay.lightTintPink : overlay.lightTintNeutral;
}

export function ProjectUsageGuideSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const outcomeCards = getOutcomeCards(project);

  return (
    <ResponsiveStack component="section" spacing={{ xs: 6, md: 8 }} sx={{ overflow: 'visible' }}>
      <Box
        sx={{
          bgcolor: palette.softGray,
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          alignSelf: 'stretch',
          py: 6,
          px: pageGutter,
        }}
      >
        <ResponsiveStack spacing={{ xs: 3, md: 4 }}>
          <DetailSectionHeading
            title="ผลลัพธ์ที่ลูกค้าจะได้"
            accent={palette.text}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {outcomeCards.map((card, index) => (
              <Reveal key={`${card.title}-${index}`} delay={Math.min(index * 0.1, 0.3)} distance={30}>
                <VisualInfoCard
                  title={card.title}
                  description={card.description}
                  imageUrl={projectOutcomeBackgrounds[index % projectOutcomeBackgrounds.length]}
                  accent={visual.accent}
                  centered
                />
              </Reveal>
            ))}
          </Box>
        </ResponsiveStack>
      </Box>
    </ResponsiveStack>
  );
}

export function ProjectHighlightsSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: palette.background,
        py: 6,
        overflow: 'visible',
      }}
    >
      <ResponsiveStack spacing={{ xs: 3, md: 4 }}>
        <DetailSectionHeading
          title="จุดเด่นของระบบ"
          accent={palette.text}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2.25 },
          }}
        >
          {project.highlights.map((highlight, index) => (
            <Reveal key={highlight} delay={Math.min(index * 0.1, 0.3)} distance={30}>
            <VisualInfoCard
              title={highlight}
              description={getOutcomeCards(project)[index]?.description ?? 'ออกแบบให้ทีมเข้าใจง่าย ใช้ซ้ำได้จริง และต่อยอดกับระบบเดิมของธุรกิจได้'}
              imageUrl={projectHighlightBackgrounds[index % projectHighlightBackgrounds.length]}
              accent={visual.accent}
              centered
            />
            </Reveal>
          ))}
        </Box>
      </ResponsiveStack>
    </Box>
  );
}

export function ProjectCapabilitySection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const cards = getCapabilityCards(project);
  const { carouselRef, carouselState, scrollCards } = useDetailCarousel();
  const dragScroll = useHorizontalDragScroll();

  return (
    <Box
      sx={{
        bgcolor: palette.softGray,
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: 6,
        overflow: 'visible',
      }}
    >
      <ResponsiveStack
        spacing={1.25}
        sx={{
          px: pageGutter,
          maxWidth: { xs: '100%', md: 900, lg: 980 },
          alignItems: 'flex-start',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
            whiteSpace: { sm: 'nowrap' },
          }}
        >
          ระบบทำอะไรได้บ้าง
        </Typography>
      </ResponsiveStack>

      <Reveal delay={0.08}>
        <Box
          ref={carouselRef}
        aria-label={`รายละเอียดการทำงานของ ${project.title}`}
        {...dragScroll}
        sx={{
          mt: 0,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          cursor: 'grab',
          touchAction: 'pan-x pan-y',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          '& img': { WebkitUserDrag: 'none' },
          overscrollBehaviorX: 'contain',
          pr: pageGutter,
          pt: detailCarouselVerticalGap,
          pb: { xs: 7, md: 8 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: pageGutter,
          }}
        />
        {cards.map((card, index) => {
          const detailRows = getCapabilityDetailRows(project, card);

          return (
            <Box
              key={card.title}
              data-carousel-item="true"
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: 'calc(100vw - 64px)', sm: 372, md: 372 },
                height: { xs: 620, md: 680 },
                overflow: 'hidden',
                borderRadius: radii.card,
                bgcolor: palette.surfaceDarkMuted,
                backgroundImage:
                  "url('/project-details/project-detail-carousel-background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: palette.textOnDark,
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
                display: 'block',
                boxShadow: 'none',
                zIndex: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: hover.transition.card,
                willChange: 'transform',
                '&:hover': {
                  transform: hover.lift,
                  boxShadow: shadows.carouselHover,
                  zIndex: 2,
                },
              }}
            >
              <ResponsiveStack
                spacing={{ xs: 1.45, md: 2 }}
                sx={{
                  position: 'absolute',
                  inset: { xs: '18px', md: '20px' },
                  zIndex: 2,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
                  borderRadius: radii.cardInner,
                  bgcolor: overlay.darkCard,
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: overlay.darkCardBorder,
                }}
              >
                <Typography
                  sx={{
                    color: overlay.textOnDarkMuted,
                    fontSize: 17,
                    lineHeight: 1.353,
                    fontWeight: fontWeight.bold,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: palette.textOnDark,
                    maxWidth: 430,
                  }}
                >
                  {card.title}
                </Typography>
                <ResponsiveStack
                  spacing={{ xs: 1.15, md: 1.25 }}
                  sx={{
                    pt: { xs: 0.35, md: 0.5 },
                  }}
                >
                  {detailRows.map((row) => (
                    <Box key={`${card.title}-${row.label}`}>
                      <Typography
                        sx={{
                          color: visual.accent,
                          fontSize: 13,
                          lineHeight: 1.231,
                          fontWeight: fontWeight.bold,
                          mb: 0.35,
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: overlay.textOnDarkSecondary,
                          fontSize: { xs: 15, md: 16 },
                          lineHeight: 1.38,
                          fontWeight: fontWeight.medium,
                        }}
                      >
                        {row.text}
                      </Typography>
                    </Box>
                  ))}
                </ResponsiveStack>
              </ResponsiveStack>
            </Box>
          );
        })}
        </Box>
      </Reveal>

      <ResponsiveStack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: { xs: -4, md: -5 }, px: pageGutter, position: 'relative', zIndex: 2 }}
      >
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางซ้าย"
          disabled={!carouselState.canScrollPrev}
          onClick={() => scrollCards(-1)}
          sx={carouselControlSx(carouselState.canScrollPrev)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              ml: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(135deg)',
            }}
          />
        </Box>
        <Box
          component="button"
          type="button"
          aria-label="เลื่อนรายละเอียดการทำงานไปทางขวา"
          disabled={!carouselState.canScrollNext}
          onClick={() => scrollCards(1)}
          sx={carouselControlSx(carouselState.canScrollNext)}
        >
          <Box
            component="span"
            sx={{
              width: 12,
              height: 12,
              mr: 0.5,
              borderRight: '3px solid currentColor',
              borderBottom: '3px solid currentColor',
              transform: 'rotate(-45deg)',
            }}
          />
        </Box>
      </ResponsiveStack>
    </Box>
  );
}

export function ProjectTechSection({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      sx={{
        color: palette.text,
        py: 6,
      }}
    >
      <Box
        sx={{
          px: pageGutter,
        }}
      >
        <Reveal>
          <ResponsiveStack spacing={{ xs: 2, md: 2.5 }} alignItems="center" textAlign="center" sx={{ maxWidth: 840, mx: 'auto' }}>
            <Typography variant="h2" sx={{ color: palette.text, ...typeScale.display }}>
              เทคโนโลยีที่ใช้
            </Typography>
          </ResponsiveStack>
        </Reveal>

        <Box
          aria-label={`เทคโนโลยีที่ใช้ใน ${project.title}`}
          role="list"
          sx={{
            position: 'relative',
            display: { xs: 'flex', md: 'block' },
            flexWrap: { xs: 'wrap' },
            justifyContent: { xs: 'center' },
            alignItems: { xs: 'center' },
            columnGap: { xs: 2, sm: 2.5 },
            rowGap: { xs: 2.5, sm: 3 },
            width: '100%',
            maxWidth: 1040,
            minHeight: { xs: 'auto', md: 460 },
            mx: 'auto',
            mt: { xs: 4.5, md: 6 },
            isolation: 'isolate',
          }}
        >
          {project.stack.map((item, index) => {
            const icon = techIcons[item] ?? { label: item.slice(0, 4) };
            const position = toolLogos[index % toolLogos.length];

            return (
              <Box
                key={item}
                role="listitem"
                sx={{
                  position: { xs: 'relative', md: 'absolute' },
                  left: { md: `${position.x}%` },
                  top: { md: `${position.y}%` },
                  width: { xs: position.mobileSize, sm: position.size, md: position.size },
                  transform: { xs: 'none', md: 'translate(-50%, -50%)' },
                }}
              >
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={shouldReduceMotion ? undefined : hover.icon}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.52,
                    delay: shouldReduceMotion ? 0 : position.delay,
                    ease: [0.22, 1, 0.36, 1],
                    y: hover.motion,
                    scale: hover.motion,
                  }}
                >
                  <motion.div
                    whileInView={shouldReduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, -1, 0, 1, 0] }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 5.4 + position.delay * 2, delay: position.delay, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Box title={item} sx={{ aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', bgcolor: 'transparent' }}>
                      {icon.src ? (
                        <Box
                          component="img"
                          src={icon.src}
                          alt={item}
                          loading="lazy"
                          decoding="async"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                          sx={{ width: { xs: '64%', md: '100%' }, height: { xs: '64%', md: '100%' }, objectFit: 'contain', filter: icon.invert ? 'invert(1)' : undefined }}
                        />
                      ) : (
                        <Typography sx={{ color: palette.primaryPink, fontSize: { xs: 18, md: 21 }, lineHeight: 1, fontWeight: fontWeight.extraBold }}>
                          {icon.label}
                        </Typography>
                      )}
                    </Box>
                  </motion.div>
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
