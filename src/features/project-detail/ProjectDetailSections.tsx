import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { ResponsiveStack } from "../../components/ResponsiveStack";
import type { Project } from "../../data/projectCatalog";
import { palette, typeScale } from "../../appTheme";
import { useHorizontalDragScroll } from "../../hooks/useHorizontalDragScroll";
import { detailCarouselVerticalGap, pageGutter, techIcons } from "./projectDetailContent";
import { carouselControlSx, getAudienceCards, getCapabilityCards, getCapabilityDetailRows, getConnectionItems, getOutcomeCards, getProjectVisual, getProjectVisualImage, getTechReason, getWorkflowSteps, useDetailCarousel } from "./projectDetailHelpers";
import type { CapabilityCard, DetailInfoCard } from "./projectDetailTypes";

const systemPreviewDevices = [
  { name: 'MacBook', label: 'หน้าจอ MacBook', imageUrl: '/project-screen-previews/macbook.png', maxHeight: { xs: 360, sm: 400 }, width: { xs: 'min(100%, 400px)', sm: '400px' }, gap: { xs: 1, md: 1.25 } },
  { name: 'iPad', label: 'หน้าจอ iPad', imageUrl: '/project-screen-previews/ipad.png', maxHeight: { xs: 260, sm: 300, lg: 340 }, width: { xs: 'min(100%, 280px)', sm: '300px' }, gap: { xs: 0.5, md: 0.75 } },
  { name: 'iPhone', label: 'หน้าจอ iPhone', imageUrl: '/project-screen-previews/iphone.png', maxHeight: { xs: 340, sm: 380, lg: 420 }, width: { xs: 'min(100%, 220px)', sm: '240px' }, gap: { xs: 0.25, md: 0.5 } },
] as const;

type SystemPreviewDevice = (typeof systemPreviewDevices)[number];
const systemPreviewImageCount = 6;

const mobileOnlyPreviewSlugs = new Set([
  'linora-facebook-page-analytics',
  'shadow-ceo-business-assistant',
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

  return (
    <ResponsiveStack spacing={{ xs: 2, md: 2.5 }}>
      <Typography
        variant="h3"
        sx={{
          color: palette.text,
          fontSize: { xs: 20, md: 23 },
          lineHeight: 1.2,
          fontWeight: 700,
          textAlign: 'left',
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
            gap: device.gap,
            overflowX: 'auto',
            overscrollBehaviorX: 'contain',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            cursor: 'grab',
            touchAction: 'pan-x pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            px: { xs: 3, md: 4 },
            pt: 3,
            pb: 4,
            scrollPaddingInline: { xs: 3, md: 4 },
            '&::-webkit-scrollbar': { display: 'none' },
            '& img': { WebkitUserDrag: 'none' },
          }}
        >
          {Array.from({ length: systemPreviewImageCount }).map((_, imageIndex) => (
            <Box
              key={`${device.name}-${imageIndex}`}
              data-carousel-item="true"
              component={"button" as unknown as "img"}
              role="button"
              tabIndex={0}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onPreviewOpen(device, imageIndex)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onPreviewOpen(device, imageIndex);
                }
              }}
              src={device.imageUrl}
              alt={`${project.title} บน ${device.name} ${imageIndex + 1}`}
              loading="lazy"
              decoding="async"
              sx={{
                display: 'block',
                flex: '0 0 auto',
                width: device.width,
                maxWidth: '100%',
                maxHeight: device.maxHeight,
                objectFit: 'contain',
                objectPosition: 'left center',
                scrollSnapAlign: 'start',
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
                transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  opacity: 0.92,
                  zIndex: 2,
                },
                '&:focus-visible': {
                  outline: '2px solid #FF008C',
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
                  maxHeight: device.maxHeight,
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
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 1.5, visibility: canScroll ? 'visible' : 'hidden' }}
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
    ? { xs: 480, sm: 560, md: 640 }
    : device.name === 'iPad'
      ? { xs: 400, sm: 480, md: 580 }
      : { xs: 330, sm: 440, md: 560 };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="system-preview-overlay-title"
      sx={{
        display: 'grid',
        placeItems: 'center',
        p: { xs: 2, sm: 4 },
        bgcolor: 'transparent',
        backdropFilter: 'none',
      }}
    >
      <ResponsiveStack
        spacing={{ xs: 2, md: 2.5 }}
        sx={{
          width: 'min(100%, 1000px)',
          maxHeight: '92vh',
          overflow: 'auto',
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 0,
          bgcolor: 'transparent',
          color: '#fff',
          boxShadow: 'none',
          outline: 'none',
        }}
      >
        <ResponsiveStack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <ResponsiveStack spacing={0.3}>
            <Typography id="system-preview-overlay-title" sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700 }}>
              {device.label}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600 }}>
              {imageIndex + 1} / {systemPreviewImageCount}
            </Typography>
          </ResponsiveStack>
          <Box
            component="button"
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            sx={{
              width: 42,
              height: 42,
              border: 0,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.12)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              transition: 'background-color 180ms ease, transform 180ms ease',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)', transform: 'scale(1.05)' },
            }}
          >
            ×
          </Box>
        </ResponsiveStack>

        <Box sx={{ position: 'relative', height: stageHeight, mx: 'auto', width: '100%', maxWidth: 860 }}>
          <Box
            key={`${device.name}-${imageIndex}`}
            component="img"
            src={device.imageUrl}
            alt={`${project.title} ${device.name} ${imageIndex + 1}`}
            sx={{
              position: 'absolute',
              zIndex: 1,
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'none',
              animation: 'system-preview-slide-in 360ms cubic-bezier(0.22, 1, 0.36, 1)',
              '@keyframes system-preview-slide-in': {
                from: { opacity: 0, transform: 'translate3d(7%, 0, 0) scale(0.96)' },
                to: { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
              },
            }}
          />
        </Box>

        <ResponsiveStack direction="row" justifyContent="center" spacing={1.25}>
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
        bgcolor: '#FFFFFF',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
        overflow: 'visible',
      }}
    >
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
          {previewDevices.map((device) => (
            <SystemPreviewCarousel
              key={device.name}
              project={project}
              device={device}
              onPreviewOpen={(previewDevice, imageIndex) => setActivePreview({ device: previewDevice, imageIndex })}
            />
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
            color: '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 760,
          }}
        >
          {description}
        </Typography>
      )}
    </ResponsiveStack>
  );
}

function VisualInfoCard({
  title,
  description,
  imageUrl,
  accent,
  label,
  tall = false,
  dark = true,
}: {
  title: string;
  description: string;
  imageUrl: string;
  accent: string;
  label?: string;
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
        borderRadius: { xs: '28px', md: '36px' },
        bgcolor: dark ? '#05060A' : '#FFFFFF',
        color: dark ? '#FFFFFF' : palette.text,
        boxShadow: '0 24px 64px rgba(17,24,39,0.09)',
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease',
        '&:hover': {
          transform: 'translate3d(0, -6px, 0)',
          boxShadow: '0 32px 82px rgba(17,24,39,0.13)',
        },
        '&:hover img': {
          transform: 'scale(1.045)',
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
          transform: 'scale(1.01)',
          transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0.78) 100%)'
            : `linear-gradient(180deg, rgba(255,255,255,0.82) 0%, ${visualTintFromAccent(accent)} 100%)`,
        }}
      />
      <ResponsiveStack
        spacing={{ xs: 1.35, md: 1.6 }}
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          minHeight: 'inherit',
          justifyContent: 'flex-end',
          p: { xs: 3, md: 3.75 },
        }}
      >
        {label && (
          <Typography
            sx={{
              color: dark ? 'rgba(255,255,255,0.72)' : accent,
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            {label}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{
            color: 'currentColor',
            fontSize: { xs: 31, sm: 35, md: 42 },
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: dark ? 'rgba(255,255,255,0.78)' : '#4B5563',
            ...typeScale.bodyLarge,
            maxWidth: 560,
          }}
        >
          {description}
        </Typography>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}

function visualTintFromAccent(accent: string) {
  return accent === '#FF008C' ? 'rgba(255,240,248,0.92)' : 'rgba(247,248,250,0.92)';
}

export function ProjectUsageGuideSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const audienceCards = getAudienceCards(project);
  const workflowSteps = getWorkflowSteps(project);
  const connectionItems = getConnectionItems(project);
  const outcomeCards = getOutcomeCards(project);

  return (
    <ResponsiveStack component="section" spacing={{ xs: 6, md: 8 }} sx={{ py: { xs: 2, md: 3 }, overflow: 'visible' }}>
      <ResponsiveStack spacing={{ xs: 3, md: 4 }}>
        <DetailSectionHeading
          title="ระบบนี้ช่วยงานใครบ้าง"
          description="ดูจากบทบาทจริงในทีมก่อน แล้วค่อยลงรายละเอียดว่าหน้าจอไหนช่วยงานส่วนไหน"
          accent={visual.accent}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2.25 },
          }}
        >
          {audienceCards.map((card, index) => (
            <VisualInfoCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={getProjectVisualImage(project, index)}
              accent={visual.accent}
              label={`บทบาท ${String(index + 1).padStart(2, '0')}`}
              tall={index === 0}
            />
          ))}
        </Box>
      </ResponsiveStack>

      <Box
        sx={{
          bgcolor: '#F7F8FA',
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          alignSelf: 'stretch',
          py: { xs: 6, md: 8 },
          overflow: 'visible',
        }}
      >
        <ResponsiveStack spacing={{ xs: 3, md: 4 }} sx={{ px: pageGutter }}>
          <DetailSectionHeading
            title="Flow การใช้งานจริง"
            description="ภาพรวมการไหลของงานจริง ตั้งแต่รับข้อมูล ไปจนถึงทีมเห็นผลลัพธ์พร้อมใช้งาน"
            accent={palette.text}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
              gap: { xs: 1.5, md: 2.25 },
            }}
          >
            {workflowSteps.map((step, index) => (
              <VisualInfoCard
                key={step.label}
                title={step.title}
                description={step.description}
                imageUrl={getProjectVisualImage(project, index + 2)}
                accent={visual.accent}
                label={step.label}
                dark={index !== 1}
              />
            ))}
          </Box>
        </ResponsiveStack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(320px, 0.72fr) minmax(0, 1.28fr)' },
          gap: { xs: 3, md: 5, lg: 7 },
          alignItems: 'center',
        }}
      >
        <DetailSectionHeading
          title="ข้อมูลที่ระบบเชื่อมต่อได้"
          description="ทำให้ลูกค้าเห็นทันทีว่าระบบไม่ได้เป็นแค่หน้าจอสวย แต่ต่อกับข้อมูลจริงและเครื่องมือที่ใช้อยู่ได้"
          accent={visual.accent}
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.25, md: 1.5 },
          }}
        >
          {connectionItems.map((item, index) => (
            <Box
              key={item}
              sx={{
                minHeight: { xs: 126, md: 148 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: { xs: 2, md: 2.35 },
                borderRadius: { xs: '22px', md: '28px' },
                bgcolor: index === 0 ? visual.accent : '#F7F8FA',
                color: palette.text,
                boxShadow: '0 18px 42px rgba(17,24,39,0.05)',
                transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  boxShadow: '0 22px 54px rgba(17,24,39,0.09)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 34, md: 42 },
                  height: { xs: 34, md: 42 },
                  borderRadius: '50%',
                  bgcolor: index === 0 ? 'rgba(255,255,255,0.24)' : visual.tint,
                }}
              />
              <Typography
                sx={{
                  color: index === 0 ? '#FFFFFF' : palette.text,
                  fontSize: { xs: 21, md: 25 },
                  lineHeight: 1.08,
                  fontWeight: 700,
                  letterSpacing: 0,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: '#F7F8FA',
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          alignSelf: 'stretch',
          py: { xs: 6, md: 8 },
          px: pageGutter,
        }}
      >
        <ResponsiveStack spacing={{ xs: 3, md: 4 }}>
          <DetailSectionHeading
            title="ผลลัพธ์ที่ลูกค้าจะได้"
            description="สรุปเป็นภาษาง่ายๆ ว่าหลังใช้งานแล้วทีมควรเห็นความเปลี่ยนแปลงตรงไหน"
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
              <VisualInfoCard
                key={`${card.title}-${index}`}
                title={card.title}
                description={card.description}
                imageUrl={getProjectVisualImage(project, index + 4)}
                accent={visual.accent}
                label={`ผลลัพธ์ ${String(index + 1).padStart(2, '0')}`}
                tall={index === 0}
                dark={index !== 1}
              />
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
        bgcolor: '#FFFFFF',
        py: { xs: 2, md: 3 },
        overflow: 'visible',
      }}
    >
      <ResponsiveStack spacing={{ xs: 3, md: 4 }}>
        <DetailSectionHeading
          title="จุดเด่นของระบบ"
          description="เล่าเป็นภาพให้เห็นว่าสิ่งที่เด่นจริงของระบบนี้ช่วยให้งานง่ายขึ้นตรงไหน"
          accent={visual.accent}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2.25 },
          }}
        >
          {project.highlights.map((highlight, index) => (
            <VisualInfoCard
              key={highlight}
              title={highlight}
              description={getOutcomeCards(project)[index]?.description ?? 'ออกแบบให้ทีมเข้าใจง่าย ใช้ซ้ำได้จริง และต่อยอดกับระบบเดิมของธุรกิจได้'}
              imageUrl={getProjectVisualImage(project, index + 6)}
              accent={visual.accent}
              label={String(index + 1).padStart(2, '0')}
              dark={index !== 1}
            />
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
        bgcolor: '#F7F8FA',
        position: 'relative',
        left: `calc(${pageGutter} * -1)`,
        width: `calc(100% + (${pageGutter} * 2))`,
        alignSelf: 'stretch',
        py: { xs: 6, sm: 7, md: 8 },
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
                borderRadius: '28px',
                bgcolor: '#222',
                backgroundImage:
                  "url('/project-details/project-detail-carousel-background.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
                display: 'block',
                boxShadow: 'none',
                zIndex: 1,
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                willChange: 'transform',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 18px 40px rgba(17,24,39,0.14)',
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
                  borderRadius: '22px',
                  bgcolor: 'rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.68)',
                    fontSize: 17,
                    lineHeight: 1.353,
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    ...typeScale.cardTitle,
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
                          fontWeight: 700,
                          mb: 0.35,
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.78)',
                          fontSize: { xs: 15, md: 16 },
                          lineHeight: 1.38,
                          fontWeight: 500,
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
  const visual = getProjectVisual(project);
  const technologyPositions = [
    { x: 12, y: 24, size: 108, mobileSize: 72 },
    { x: 31, y: 62, size: 132, mobileSize: 82 },
    { x: 50, y: 20, size: 120, mobileSize: 78 },
    { x: 69, y: 57, size: 128, mobileSize: 84 },
    { x: 87, y: 28, size: 104, mobileSize: 70 },
    { x: 20, y: 88, size: 96, mobileSize: 68 },
    { x: 50, y: 91, size: 112, mobileSize: 76 },
    { x: 80, y: 87, size: 98, mobileSize: 70 },
  ];

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
      }}
    >
      <ResponsiveStack spacing={{ xs: 1.75, md: 2.25 }} alignItems="center" textAlign="center" sx={{ maxWidth: 840, mx: 'auto' }}>
        <Typography
          variant="h2"
          sx={{
            color: visual.accent,
            ...typeScale.display,
          }}
        >
          เทคโนโลยีที่ใช้
        </Typography>
        <Typography
          sx={{
            maxWidth: 720,
            color: '#4B5563',
            ...typeScale.bodyLarge,
          }}
        >
          {getTechReason(project)}
        </Typography>
      </ResponsiveStack>

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
          const position = technologyPositions[index % technologyPositions.length];

          return (
            <Box
              key={item}
              role="listitem"
              title={item}
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                left: { md: `${position.x}%` },
                top: { md: `${position.y}%` },
                width: { xs: position.mobileSize, sm: position.size, md: position.size },
                transform: { xs: 'none', md: 'translate(-50%, -50%)' },
              }}
            >
              <Box
                sx={{
                  aspectRatio: '1 / 1',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: { xs: '20px', md: '24px' },
                  bgcolor: 'rgba(243,244,246,0.86)',
                  boxShadow: '0 14px 30px rgba(17,24,39,0.045), inset 0 1px 0 rgba(255,255,255,0.72)',
                  transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 220ms ease, box-shadow 220ms ease',
                  '&:hover': {
                    transform: 'translate3d(0, -4px, 0)',
                    bgcolor: 'rgba(255,255,255,0.66)',
                    boxShadow: '0 20px 42px rgba(17,24,39,0.08), inset 0 1px 0 rgba(255,255,255,0.86)',
                  },
                }}
              >
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
                    sx={{
                      width: '53%',
                      height: '53%',
                      objectFit: 'contain',
                      filter: icon.invert ? 'invert(1)' : undefined,
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: visual.accent,
                      fontSize: { xs: 18, md: 21 },
                      lineHeight: 1,
                      fontWeight: 800,
                    }}
                  >
                    {icon.label}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
