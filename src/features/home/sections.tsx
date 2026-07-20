import { Box, Typography } from "@mui/material";
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import AddBoxRounded from '@mui/icons-material/AddBoxRounded';
import ExtensionRounded from '@mui/icons-material/ExtensionRounded';
import HubRounded from '@mui/icons-material/HubRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "../../components/motion/Reveal";
import { Stack } from "../../components/Stack";
import { palette, typeScale } from "../../theme";
import { navigateToHomeSection } from "../../utils/sectionNavigation";
import { useHorizontalDragScroll } from "../../utils/useHorizontalDragScroll";
import {
  aiPhoneScreens,
  audienceGroups,
  faqItems,
  resultCards,
  toolLogos,
  workCarouselGutter,
  workCarouselVerticalGap,
  workflowPanels,
} from "./data";
import { carouselControlSx, useShowcaseCarousel, useWorkflowCarousel } from "./hooks";
import type { HeroCtaPhase, ShowcaseCard } from "./types";

const futureSystemExpansionIcons = [
  { Icon: TrendingUpRounded, color: '#6D5BFF', bottom: { xs: '26%', sm: '24%', md: '22%', lg: '20%' }, left: '-6%' },
  { Icon: ExtensionRounded, color: '#0F9DA8', bottom: { xs: '26%', sm: '24%', md: '22%', lg: '20%' }, right: '-6%' },
  { Icon: AddBoxRounded, color: '#F15A24', bottom: '-8%', left: '20%' },
  { Icon: AccountTreeRounded, color: '#2563EB', bottom: '-8%', right: '20%' },
];

export function HeroCta({ phase }: { phase: HeroCtaPhase }) {
  const isOpen = phase === 'open';
  const isHidden = phase === 'hidden';
  const isExpanded = isOpen;
  const isArrowVisible = !isHidden;

  return (
    <Box
      component="a"
      href="/"
      onClick={(event) => navigateToHomeSection(event, 'work')}
      aria-label="ดูผลงานของพวกเรา"
      data-phase={phase}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      sx={{
        '--hero-cta-label-width': { xs: '218px', sm: '274px' },
        '--hero-cta-circle-size': { xs: '56px', sm: '58px' },
        '--hero-cta-gap': { xs: '12px', sm: '16px' },
        display: 'inline-block',
        width: isOpen
          ? 'calc(var(--hero-cta-label-width) + var(--hero-cta-gap) + var(--hero-cta-circle-size))'
          : isExpanded
            ? 'var(--hero-cta-label-width)'
            : 'var(--hero-cta-circle-size)',
        height: 'var(--hero-cta-circle-size)',
        position: 'relative',
        alignItems: 'center',
        color: '#FFFFFF',
        textDecoration: 'none',
        pointerEvents: isOpen ? 'auto' : 'none',
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? 'translate3d(0, 64px, 0)' : 'translate3d(0, 0, 0)',
        transformOrigin: 'center',
        transition:
          'width 560ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 260ms linear, transform 620ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        '&:focus': {
          outline: 'none',
        },
        '&:focus-visible .hero-cta-label, &:focus-visible .hero-cta-arrow': {
          outline: '2px solid rgba(255,255,255,0.86)',
          outlineOffset: 4,
        },
        ...(isOpen
          ? {
              '&:hover .hero-cta-label': {
                bgcolor: '#FF1495',
                boxShadow: '0 17px 44px rgba(0,0,0,0.31)',
              },
              '&:hover .hero-cta-arrow': {
                bgcolor: '#F71C91',
              },
            }
          : {}),
        '@media (prefers-reduced-motion: reduce)': {
          '& .hero-cta-label, & .hero-cta-text, & .hero-cta-arrow, & .hero-cta-arrow-motion': {
            animation: 'none',
            transition: 'none',
          },
        },
      }}
    >
      <Box
        component="span"
        className="hero-cta-label"
        style={{
          width: isExpanded ? 'var(--hero-cta-label-width)' : 'var(--hero-cta-circle-size)',
        }}
        sx={{
          display: 'inline-flex',
          flex: '0 0 auto',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 2,
          width: 'var(--hero-cta-circle-size)',
          minWidth: 0,
          height: { xs: 56, sm: 58 },
          boxSizing: 'border-box',
          px: 0,
          borderRadius: 999,
          bgcolor: palette.primaryPink,
          color: '#FFFFFF !important',
          boxShadow: '0 16px 42px rgba(0,0,0,0.28)',
          overflow: 'hidden',
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          transformOrigin: 'center',
          transition:
            'width 560ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 260ms linear, transform 620ms cubic-bezier(0.25, 0.1, 0.25, 1), background-color 220ms ease, box-shadow 220ms ease',
        }}
      >
        <Box
          component="span"
          className="hero-cta-text"
          style={{
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'translate(-50%, -50%)' : 'translate(calc(-50% - 8px), -50%)',
            transitionDelay: isExpanded ? '220ms' : '0ms',
          }}
          sx={{
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'max-content',
            color: '#FFFFFF',
            opacity: 0,
            transform: 'translate(calc(-50% - 8px), -50%)',
            transition: 'opacity 220ms linear, transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          ดูผลงานของพวกเรา
        </Box>
      </Box>
      <Box
        component="span"
        className="hero-cta-arrow"
        aria-hidden="true"
        style={{
          opacity: isArrowVisible ? 1 : 0,
          transform: isHidden
            ? 'translate3d(0, 0, 0)'
            : isOpen
              ? 'translate3d(calc(var(--hero-cta-label-width) + var(--hero-cta-gap)), 0, 0)'
              : 'translate3d(0, 0, 0)',
          boxShadow: isArrowVisible ? '0 16px 42px rgba(0,0,0,0.26)' : '0 0 0 rgba(0,0,0,0)',
        }}
        sx={{
          flex: '0 0 auto',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          display: 'grid',
          placeItems: 'center',
          width: { xs: 56, sm: 58 },
          height: { xs: 56, sm: 58 },
          borderRadius: '50%',
          bgcolor: 'rgba(255,0,140,0.84)',
          boxShadow: '0 16px 42px rgba(0,0,0,0.26)',
          color: '#FFFFFF',
          opacity: 1,
          transform: 'translate3d(0, 0, 0) scale(1)',
          transformOrigin: 'center',
          transition:
            'opacity 260ms linear, transform 560ms cubic-bezier(0.25, 0.1, 0.25, 1), background-color 220ms ease, box-shadow 220ms ease',
          '@keyframes heroArrowDown': {
            '0%, 100%': { transform: 'translate3d(0, -1px, 0)' },
            '50%': { transform: 'translate3d(0, 2px, 0)' },
          },
        }}
      >
        <Box
          component="span"
          className="hero-cta-arrow-motion"
          sx={{
            display: 'grid',
            placeItems: 'center',
            animation: isOpen ? 'heroArrowDown 1800ms ease-in-out 520ms infinite' : 'none',
          }}
        >
          <Box component="svg" viewBox="0 0 24 24" sx={{ width: 25, height: 25 }}>
            <path
              d="M12 5v13m0 0 6-6m-6 6-6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function AiPhoneScreen({
  index,
  presentation,
}: {
  index: number;
  presentation: NonNullable<ShowcaseCard['presentation']>;
}) {
  const screen = aiPhoneScreens[index % aiPhoneScreens.length];
  const isDarkPhone = presentation === 'phoneAiDark';
  const screenFrame = isDarkPhone
    ? {
        left: '31.7%',
        top: '38.6%',
        width: '36.8%',
        height: '43.6%',
        borderRadius: '26px',
      }
    : {
        left: '25.6%',
        top: '33.3%',
        width: '48.8%',
        height: '56.9%',
        borderRadius: '24px',
      };
  const textColor = isDarkPhone ? '#F9FAFB' : palette.text;
  const mutedColor = isDarkPhone ? 'rgba(249,250,251,0.64)' : '#6B7280';
  const panelColor = isDarkPhone ? 'rgba(255,255,255,0.08)' : '#FFFFFF';
  const panelShadow = isDarkPhone ? 'none' : '0 8px 22px rgba(17,24,39,0.08)';

  return (
    <Box
      aria-hidden="true"
      data-phone-screen="true"
      sx={{
        position: 'absolute',
        ...screenFrame,
        zIndex: 1,
        overflow: 'hidden',
        bgcolor: isDarkPhone ? '#161A22' : '#F7F8FA',
        color: textColor,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          p: '18px 14px',
          background: isDarkPhone
            ? 'radial-gradient(circle at 22% 12%, rgba(255,0,140,0.28), transparent 34%), linear-gradient(180deg, #20242D 0%, #111827 100%)'
            : 'linear-gradient(180deg, #FFFFFF 0%, #F7F8FA 48%, rgba(255,0,140,0.08) 100%)',
        }}
      >
        <Stack spacing={1.2} sx={{ height: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: palette.primaryPink,
                boxShadow: isDarkPhone ? '0 0 28px rgba(255,0,140,0.38)' : 'none',
              }}
            />
            <Typography sx={{ fontSize: 10, lineHeight: 1, fontWeight: 600, color: mutedColor }}>
              AI LIVE
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: 18,
              lineHeight: 1.08,
              fontWeight: 600,
              color: textColor,
            }}
          >
            {screen.title}
          </Typography>

          {(screen.variant === 'command' || screen.variant === 'forecast') && (
            <>
              <Box sx={{ p: 1.2, borderRadius: '14px', bgcolor: isDarkPhone ? '#0B0F19' : '#111827', color: '#fff' }}>
                <Typography sx={{ fontSize: 9, lineHeight: 1.2, color: 'rgba(255,255,255,0.64)' }}>{screen.label}</Typography>
                <Stack direction="row" alignItems="flex-end" spacing={0.6}>
                  <Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 600 }}>{screen.score}</Typography>
                  <Typography sx={{ pb: 0.35, fontSize: 10, color: palette.accentYellow }}>{screen.delta}</Typography>
                </Stack>
              </Box>

              <Stack spacing={0.7}>
                {screen.items.map(([label, width], itemIndex) => (
                  <Box key={label} sx={{ p: 1, borderRadius: '12px', bgcolor: panelColor, boxShadow: panelShadow }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.7 }}>
                      <Typography sx={{ fontSize: 8.5, fontWeight: 600, color: textColor }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: 8.5, color: mutedColor }}>{width}%</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </>
          )}

          {screen.variant === 'document' && (
            <Stack spacing={0.85}>
              <Box sx={{ p: 1.2, borderRadius: '16px', bgcolor: '#111827', color: '#fff' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.68)' }}>{screen.label}</Typography>
                  <Typography sx={{ fontSize: 10, fontWeight: 600, color: palette.accentYellow }}>{screen.delta}</Typography>
                </Stack>
                <Typography sx={{ fontSize: 31, lineHeight: 1.05, fontWeight: 600 }}>{screen.score}</Typography>
              </Box>
              {screen.documents.map(([label, status], itemIndex) => (
                <Stack key={label} direction="row" alignItems="center" spacing={0.9} sx={{ p: 1, borderRadius: '13px', bgcolor: panelColor, boxShadow: panelShadow }}>
                  <Box sx={{ width: 20, height: 24, borderRadius: '6px', bgcolor: itemIndex === 2 ? palette.primaryPink : '#E5E7EB' }} />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontSize: 9, fontWeight: 600, color: textColor }}>{label}</Typography>
                    <Typography sx={{ fontSize: 8, color: mutedColor }}>AI extract</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 8.5, fontWeight: 600, color: itemIndex === 2 ? palette.primaryPink : mutedColor }}>{status}</Typography>
                </Stack>
              ))}
            </Stack>
          )}

          {screen.variant === 'agent' && (
            <Stack spacing={0.8}>
              {screen.messages.map(([label, value], itemIndex) => (
                <Box
                  key={label}
                  sx={{
                    alignSelf: itemIndex % 2 === 0 ? 'flex-start' : 'flex-end',
                    width: itemIndex % 2 === 0 ? '88%' : '78%',
                    p: 1,
                    borderRadius: itemIndex % 2 === 0 ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                    bgcolor: itemIndex % 2 === 0 ? 'rgba(255,255,255,0.1)' : palette.primaryPink,
                    color: '#fff',
                  }}
                >
                  <Typography sx={{ fontSize: 8.5, fontWeight: 600 }}>{label}</Typography>
                  <Typography sx={{ mt: 0.25, fontSize: 8, color: 'rgba(255,255,255,0.72)' }}>{value}</Typography>
                </Box>
              ))}
              <Box sx={{ mt: 'auto', p: 1, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.08)' }}>
                <Typography sx={{ fontSize: 8.5, color: 'rgba(255,255,255,0.62)' }}>AI draft ready...</Typography>
              </Box>
            </Stack>
          )}

          {screen.variant === 'monitor' && (
            <Stack spacing={0.9}>
              <Box sx={{ p: 1.2, borderRadius: '16px', bgcolor: '#111827', color: '#fff' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.68)' }}>{screen.label}</Typography>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ADE80' }} />
                </Stack>
                <Typography sx={{ fontSize: 31, lineHeight: 1.05, fontWeight: 600 }}>{screen.score}</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.8 }}>
                {screen.stats.map(([label, value], itemIndex) => (
                  <Box key={label} sx={{ p: 1, minHeight: 50, borderRadius: '12px', bgcolor: panelColor, boxShadow: panelShadow }}>
                    <Typography sx={{ fontSize: 8, color: mutedColor }}>{label}</Typography>
                    <Typography sx={{ mt: 0.4, fontSize: 13, lineHeight: 1, fontWeight: 600, color: itemIndex === 1 ? palette.primaryPink : textColor }}>{value}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ height: 42, borderRadius: '14px', bgcolor: panelColor, boxShadow: panelShadow, overflow: 'hidden', position: 'relative' }}>
                {[16, 48, 30, 66, 52, 82].map((height, barIndex) => (
                  <Box
                    key={barIndex}
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: `${10 + barIndex * 14}%`,
                      width: 5,
                      height,
                      maxHeight: 28,
                      borderRadius: 999,
                      bgcolor: barIndex === 5 ? palette.primaryPink : isDarkPhone ? 'rgba(245,255,0,0.78)' : '#111827',
                    }}
                  />
                ))}
              </Box>
            </Stack>
          )}
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 10,
          width: 54,
          height: 17,
          borderRadius: 999,
          bgcolor: '#000',
          transform: 'translateX(-50%)',
          boxShadow: isDarkPhone ? '0 0 0 1px rgba(255,255,255,0.04)' : 'none',
        }}
      />
    </Box>
  );
}

export function ShowcaseCarousel({ cards, label }: { cards: ShowcaseCard[]; label: string }) {
  const { carouselRef, carouselState, scrollCards } = useShowcaseCarousel();
  const dragScroll = useHorizontalDragScroll();

  return (
    <>
      <Box
        ref={carouselRef}
        aria-label={label}
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
          pr: workCarouselGutter,
          pt: workCarouselVerticalGap,
          pb: { xs: 7, md: 8 },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: workCarouselGutter,
          }}
        />
        {cards.map((project, index) => {
          const isPhoneAi = project.presentation === 'phoneAiLight' || project.presentation === 'phoneAiDark';

          return (
            <motion.div
              key={project.slug}
              data-carousel-item="true"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.56, delay: Math.min(index * 0.07, 0.28), ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: '0 0 auto' }}
            >
              <Box
              component="a"
              href={`/projects/${project.slug}`}
              sx={{
                position: 'relative',
                flex: '0 0 auto',
                width: { xs: 'calc(100vw - 64px)', sm: 372, md: 372 },
                height: { xs: 620, md: 680 },
                overflow: 'hidden',
                borderRadius: '28px',
                bgcolor: '#000',
                color: '#fff',
                scrollSnapAlign: 'start',
                scrollMarginInline: workCarouselGutter,
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
                '&:hover img': {
                  transform: isPhoneAi ? 'scale(1)' : 'scale(1.035)',
                },
              }}
            >
              {isPhoneAi && project.presentation && (
                <AiPhoneScreen index={index} presentation={project.presentation} />
              )}
              <Box
                component="img"
                src={project.coverImageUrl}
                alt={project.title}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1)',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <Stack
                spacing={{ xs: 1.7, md: 2.5 }}
                sx={{
                  position: 'relative',
                  zIndex: 4,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: '#fff',
                    ...typeScale.cardTitle,
                    maxWidth: 430,
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.78)',
                    ...typeScale.body,
                  }}
                >
                  {project.shortDescription}
                </Typography>
              </Stack>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: { xs: 22, md: 28 },
                  bottom: { xs: 22, md: 28 },
                  zIndex: 4,
                  display: 'grid',
                  placeItems: 'center',
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.94)',
                  color: '#111827',
                  fontSize: { xs: 30, md: 36 },
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                +
              </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
      {carouselState.isScrollable && (
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: { xs: -4, md: -5 }, px: workCarouselGutter, position: 'relative', zIndex: 2 }}
      >
        <Box
          component="button"
          type="button"
          aria-label={`เลื่อน${label}ไปทางซ้าย`}
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
          aria-label={`เลื่อน${label}ไปทางขวา`}
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
      </Stack>
      )}
    </>
  );
}

export function ToolStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#FFFFFF',
        color: palette.text,
        py: { xs: 7, sm: 8, md: 10 },
      }}
    >
      <Box
        sx={{
          px: workCarouselGutter,
        }}
      >
        <Reveal>
          <Stack
            spacing={{ xs: 2, md: 2.5 }}
            alignItems="center"
            textAlign="center"
            sx={{ maxWidth: 840, mx: 'auto' }}
          >
            <Typography
              variant="h2"
              sx={{
                color: palette.primaryPink,
                ...typeScale.display,
              }}
            >
              เครื่องมือที่เราใช้
            </Typography>
            <Typography
              sx={{
                maxWidth: 720,
                color: '#4B5563',
                ...typeScale.bodyLarge,
              }}
            >
              เราเลือกเทคโนโลยีที่เสถียร เชื่อมต่อกันได้ดี และเหมาะกับการสร้างระบบที่ใช้งานจริงตั้งแต่เริ่มต้นจนดูแลต่อใน production
            </Typography>
          </Stack>
        </Reveal>

        <Box
          aria-label="เครื่องมือและเทคโนโลยีที่ใช้"
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
          {toolLogos.map((tool) => (
            <Box
              key={tool.title}
              role="listitem"
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                left: { md: `${tool.x}%` },
                top: { md: `${tool.y}%` },
                width: { xs: tool.mobileSize, sm: tool.size, md: tool.size },
                transform: { xs: 'none', md: 'translate(-50%, -50%)' },
              }}
            >
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.52, delay: shouldReduceMotion ? 0 : tool.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                whileInView={shouldReduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, -1, 0, 1, 0] }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 5.4 + tool.delay * 2, delay: tool.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Box
                    title={tool.title}
                    sx={{
                      aspectRatio: '1 / 1',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: { xs: '20px', md: '24px' },
                      bgcolor: 'rgba(243,244,246,0.86)',
                      boxShadow: '0 14px 30px rgba(17,24,39,0.045), inset 0 1px 0 rgba(255,255,255,0.72)',
                      transition: 'background-color 220ms ease, box-shadow 220ms ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.66)',
                        boxShadow: '0 20px 42px rgba(17,24,39,0.08), inset 0 1px 0 rgba(255,255,255,0.86)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={tool.src}
                      alt={tool.title}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                      sx={{
                        width: '53%',
                        height: '53%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function AudienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component="section"
      aria-labelledby="audience-title"
      sx={{
        bgcolor: palette.softGray,
        color: palette.text,
        px: workCarouselGutter,
        py: { xs: 7, sm: 8, md: 10, lg: 12 },
      }}
    >
      <Reveal variant="scale">
        <Stack spacing={{ xs: 1.5, md: 2 }} alignItems="center" textAlign="center" sx={{ maxWidth: 820, mx: 'auto' }}>
          <Typography id="audience-title" variant="h2" sx={{ color: palette.primaryPink, ...typeScale.sectionTitle }}>
            ออกแบบสำหรับทีมที่ทำงานจริง
          </Typography>
          <Typography sx={{ color: '#4B5563', ...typeScale.bodyLarge }}>
            ตั้งแต่ทีมเล็กที่กำลังเติบโต ไปจนถึงองค์กรที่ต้องจัดการข้อมูล คน และ workflow หลายส่วนพร้อมกัน
          </Typography>
        </Stack>
      </Reveal>

      <Box
        role="list"
        aria-label="กลุ่มองค์กรที่ระบบเหมาะกับ"
        sx={{
          mt: { xs: 4, md: 5 },
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' },
          gap: { xs: 1.25, sm: 1.5, md: 2 },
        }}
      >
        {audienceGroups.map((group, index) => (
          <motion.div
            key={group.src}
            role="listitem"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.06 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.48, delay: shouldReduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                aspectRatio: '1 / 1',
                p: { xs: 0.5, sm: 1 },
              }}
            >
              <Box
                component="img"
                src={group.src}
                alt=""
                aria-hidden="true"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

function ResultIcon({ icon, color }: { icon: (typeof resultCards)[number]['icon']; color: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
      sx={{
        width: { xs: 42, md: 48 },
        height: { xs: 42, md: 48 },
        color,
      }}
    >
      {icon === 'screen' && (
        <>
          <rect x="8" y="10" width="32" height="22" rx="4" {...common} />
          <path d="M18 38h12M24 32v6M15 19h8M15 25h16" {...common} />
        </>
      )}
      {icon === 'spark' && (
        <>
          <path d="M25 5 13 25h11l-2 18 13-24H24l1-14Z" {...common} />
        </>
      )}
      {icon === 'data' && (
        <>
          <path d="M12 16c0-4 5.4-7 12-7s12 3 12 7-5.4 7-12 7-12-3-12-7Z" {...common} />
          <path d="M12 16v16c0 4 5.4 7 12 7s12-3 12-7V16M12 24c0 4 5.4 7 12 7s12-3 12-7" {...common} />
        </>
      )}
      {icon === 'growth' && (
        <>
          <path d="M9 34h30M14 30V19M24 30V12M34 30V21" {...common} />
          <path d="M14 19l6 5 9-12 5 5" {...common} />
        </>
      )}
    </Box>
  );
}

export function WorkflowSection() {
  const { carouselRef, carouselState, scrollCards } = useWorkflowCarousel();
  const dragScroll = useHorizontalDragScroll();

  return (
    <Box
      component="section"
      id="workflow"
      sx={{
        bgcolor: palette.softGray,
        py: { xs: 6, sm: 7, md: 8 },
      }}
    >
      <Box
        sx={{
          px: workCarouselGutter,
        }}
      >
      <Stack
          spacing={1.25}
          sx={{
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
            กระบวนการทำงาน
          </Typography>
        </Stack>
      </Box>

      <Box
        ref={carouselRef}
        aria-label="กระบวนการทำงาน"
        {...dragScroll}
        sx={{
          mt: workCarouselVerticalGap,
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: {
            md: 'repeat(2, minmax(0, 1fr))',
          },
          gap: { xs: 2, md: 2.5 },
          px: { md: workCarouselGutter },
          pr: { xs: workCarouselGutter, md: workCarouselGutter },
          pt: { xs: 1.5, md: 0 },
          pb: { xs: 8, md: 2 },
          overflowX: { xs: 'auto', md: 'visible' },
          scrollSnapType: { xs: 'x mandatory', md: 'none' },
          scrollBehavior: 'smooth',
          cursor: { xs: 'grab', md: 'default' },
          touchAction: 'pan-x pan-y',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          '& img': { WebkitUserDrag: 'none' },
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: workCarouselGutter,
            display: { xs: 'block', md: 'none' },
          }}
        />
        {workflowPanels.map((panel) => (
            <Box
              key={panel.title}
              component="article"
              data-workflow-card="true"
              data-carousel-item="true"
              sx={{
                position: 'relative',
                flex: {
                  xs: '0 0 calc(100vw - 64px)',
                  sm: '0 0 min(560px, calc(100vw - 96px))',
                  md: 'initial',
                },
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                borderRadius: { xs: '24px', md: '28px' },
                color: '#FFFFFF',
                bgcolor: '#111827',
                scrollSnapAlign: 'start',
                scrollMarginInline: workCarouselGutter,
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
                '&:hover img': {
                  transform: 'scale(1.035)',
                },
              }}
            >
              <Box
                component="img"
                src={panel.imageUrl}
                alt={panel.title}
                loading="lazy"
                decoding="async"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1)',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.40) 42%, rgba(0,0,0,0.62) 100%)',
                }}
              />
              <Stack
                spacing={{ xs: 1.9, md: 2.35 }}
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  height: '100%',
                  px: { xs: 3.25, sm: 3.5, md: 5, lg: 7 },
                  py: { xs: 4.5, md: 6, lg: 8 },
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: '#FFFFFF',
                    ...typeScale.cardTitle,
                    textShadow: '0 3px 22px rgba(0,0,0,0.34)',
                  }}
                >
                  {panel.title}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 560,
                    color: 'rgba(255,255,255,0.9)',
                    ...typeScale.bodyLarge,
                    textShadow: '0 2px 18px rgba(0,0,0,0.34)',
                  }}
                >
                  {panel.description}
                </Typography>
              </Stack>
            </Box>
          ))}
        <Box
          aria-hidden="true"
          sx={{
            flex: '0 0 auto',
            width: workCarouselGutter,
            display: { xs: 'block', md: 'none' },
          }}
        />
      </Box>

      {carouselState.isScrollable && (
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{
          display: { xs: 'flex', md: 'none' },
          mt: -5,
          px: workCarouselGutter,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
            component="button"
            type="button"
            aria-label="เลื่อนกระบวนการทำงานไปทางซ้าย"
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
            aria-label="เลื่อนกระบวนการทำงานไปทางขวา"
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
      </Stack>
      )}
    </Box>
  );
}

function ResultCard({ card }: { card: (typeof resultCards)[number] }) {
  const isLarge = card.size === 'large';

  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        minHeight: isLarge
          ? { xs: 560, sm: 650, md: 700, lg: 740 }
          : { xs: 250, sm: 280, md: 310, lg: 340 },
        height: isLarge
          ? { xs: 560, sm: 650, md: 700, lg: 740 }
          : 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isLarge ? 'flex-start' : 'center',
        gap: { xs: 2.2, md: 2.8 },
        p: isLarge
          ? { xs: '34px 28px 0', sm: '42px 36px 0', md: '54px 54px 0' }
          : { xs: 3.5, sm: 4, md: 5 },
        overflow: 'hidden',
        borderRadius: { xs: '28px', md: '34px' },
        bgcolor: '#FFFFFF',
        boxShadow: '0 18px 48px rgba(17,24,39,0.055)',
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
        willChange: 'transform',
        '&:hover': {
          transform: 'translate3d(0, -6px, 0)',
          boxShadow: '0 24px 56px rgba(17,24,39,0.11)',
        },
      }}
    >
      <Box sx={{ transform: isLarge ? 'scale(1.06)' : 'scale(1)', transformOrigin: 'center' }}>
        <ResultIcon icon={card.icon} color={card.color} />
      </Box>

      <Typography
        variant="h3"
        sx={{
          maxWidth: isLarge ? 520 : 470,
          color: '#6E6E73',
          textAlign: 'center',
          ...typeScale.cardTitle,
        }}
      >
        {card.title}{' '}
        <Box component="span" sx={{ color: card.color }}>
          {card.highlight}
        </Box>
      </Typography>

      {isLarge && (
        <Box
          aria-hidden="true"
          sx={{
            mt: card.icon === 'growth' ? 0 : 'auto',
            width: card.icon === 'growth' ? '100%' : card.icon === 'screen' ? { xs: '132%', sm: '126%', md: '132%', lg: '138%' } : '112%',
            maxWidth: card.icon === 'growth' || card.icon === 'screen' ? 'none' : 720,
            height: card.icon === 'screen'
              ? { xs: 240, sm: 310, md: 370, lg: 430 }
              : card.icon === 'growth'
                ? '100%'
              : { xs: 170, sm: 230, md: 270, lg: 310 },
            mb: 0,
            position: card.icon === 'growth' ? 'absolute' : 'relative',
            inset: card.icon === 'growth' ? 0 : undefined,
            zIndex: 1,
            transform: card.icon === 'screen'
              ? { xs: 'translateX(-2.5%)', md: 'translateX(-3.5%)', lg: 'translateX(-5%)' }
              : 'none',
          }}
        >
          {card.icon === 'growth' ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              {futureSystemExpansionIcons.map(({ Icon, color, ...position }, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    ...position,
                  }}
                >
                  <Icon sx={{ fontSize: { xs: 104, sm: 142, md: 174, lg: 212 }, color }} />
                </Box>
              ))}
          <HubRounded
            sx={{
              position: 'absolute',
              left: '50%',
              top: '58%',
              transform: 'translate(-50%, -50%)',
              fontSize: { xs: 96, sm: 128, md: 156, lg: 188 },
                  color: palette.primaryPink,
                }}
              />
            </Box>
          ) : Boolean(card.imageUrl) ? (
            <Box
              component="img"
              src={card.imageUrl ?? ''}
              alt=""
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center bottom',
              }}
            />
          ) : card.icon === 'screen' ? (
            <Box
              sx={{
                position: 'absolute',
                inset: '0 6% -18px',
                borderRadius: '24px 24px 0 0',
                border: '10px solid #111827',
                bgcolor: '#FFFFFF',
                overflow: 'hidden',
                boxShadow: '0 -16px 42px rgba(17,24,39,0.1)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,0,140,0.14), transparent 46%)',
                }}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  position: 'absolute',
                  top: '11%',
                  left: '10%',
                  right: '10%',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: card.color }} />
                <Box
                  sx={{
                    px: 1.3,
                    py: 0.45,
                    borderRadius: 999,
                    bgcolor: 'rgba(255,0,140,0.12)',
                    color: card.color,
                    fontSize: 10,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  READY
                </Box>
              </Stack>
              {[29, 47, 65].map((top, index) => (
                <Box
                  key={top}
                  sx={{
                    position: 'absolute',
                    left: '10%',
                    right: '10%',
                    top: `${top}%`,
                    display: 'grid',
                    gridTemplateColumns: '20px 58px',
                    alignItems: 'center',
                    gap: 1.25,
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: index === 0 ? card.color : '#E5E7EB',
                    }}
                  />
                  <Box
                    sx={{
                      height: 20,
                      borderRadius: 999,
                      bgcolor: index === 0 ? 'rgba(255,0,140,0.14)' : '#F3F4F6',
                    }}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ position: 'absolute', inset: { xs: '6px 0 0', md: '12px 0 0' } }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '18%',
                  bottom: '16%',
                  width: 4,
                  borderRadius: 999,
                  bgcolor: '#F3D7CC',
                  transform: 'translateX(-50%)',
                }}
              />
              {[
                { label: 'API', x: '18%', y: '24%', color: '#F15A24' },
                { label: 'AI', x: '61%', y: '20%', color: '#6D5BFF' },
                { label: 'DB', x: '27%', y: '58%', color: '#0F9DA8' },
                { label: '+', x: '69%', y: '58%', color: '#111827' },
              ].map((node) => (
                <Box
                  key={node.label}
                  sx={{
                    position: 'absolute',
                    left: node.x,
                    top: node.y,
                    display: 'grid',
                    placeItems: 'center',
                    width: { xs: 58, md: 74 },
                    height: { xs: 58, md: 74 },
                    borderRadius: '22px',
                    bgcolor: '#FFFFFF',
                    color: node.color,
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 800,
                    boxShadow: '0 18px 42px rgba(17,24,39,0.12)',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {node.label}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export function ResultsSection() {
  const leftCards = [resultCards[0], resultCards[2]];
  const rightCards = [resultCards[1], resultCards[3]];

  return (
    <Box
      component="section"
      id="results"
      sx={{
        bgcolor: '#FFFFFF',
        color: palette.text,
        py: { xs: 7, sm: 8, md: 10, lg: 12 },
      }}
    >
      <Box sx={{ px: workCarouselGutter }}>
        <Stack
          spacing={1.25}
          sx={{
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
            สิ่งที่ลูกค้าจะได้หลังจบโปรเจกต์
          </Typography>
        </Stack>

        <Box
          sx={{
            mt: workCarouselVerticalGap,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {[leftCards, rightCards].map((column, columnIndex) => (
            <Stack key={columnIndex} spacing={{ xs: 2, md: 3 }}>
              {column.map((card) => (
                <ResultCard key={card.title} card={card} />
              ))}
            </Stack>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function StartProjectSection() {
  return (
    <Box
      component="section"
      id="start-project"
      sx={{
        bgcolor: palette.softGray,
        color: palette.text,
        px: workCarouselGutter,
        py: { xs: 8, sm: 10, md: 13, lg: 15 },
        textAlign: 'center',
      }}
    >
      <Stack
        spacing={{ xs: 2.5, md: 3 }}
        alignItems="center"
      >
        <Typography
          variant="h2"
          sx={{
            color: palette.primaryPink,
            ...typeScale.hero,
            maxWidth: 1120,
          }}
        >
          พร้อมเริ่มโปรเจกต์กับ Baawork
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#4B5563',
            ...typeScale.intro,
            maxWidth: 920,
          }}
        >
          เล่าไอเดียหรือปัญหาของระบบที่อยากสร้าง แล้วเราช่วยวางแนวทางให้พร้อมเริ่มพัฒนาได้จริง
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems="center"
          justifyContent="center"
          sx={{ pt: { xs: 1, md: 1.5 } }}
        >
          <Box
            component="a"
            href="/consult"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: { xs: 190, sm: 210 },
              height: { xs: 54, sm: 58 },
              px: { xs: 3.5, sm: 4.5 },
              borderRadius: 999,
              bgcolor: palette.primaryPink,
              color: '#FFFFFF !important',
              textDecoration: 'none',
              fontSize: { xs: 14, sm: 17 },
              fontWeight: 600,
              lineHeight: 1.2,
              boxShadow: '0 18px 44px rgba(255,0,140,0.24)',
              transition: 'transform 220ms ease, background-color 220ms ease, box-shadow 220ms ease',
              '&:visited, &:active': {
                color: '#FFFFFF !important',
              },
              '&:hover': {
                bgcolor: '#FF1495',
                color: '#FFFFFF !important',
                transform: 'translate3d(0, -1px, 0)',
                boxShadow: '0 22px 54px rgba(255,0,140,0.3)',
              },
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                color: '#FFFFFF !important',
                outline: `3px solid ${palette.accentYellow}`,
                outlineOffset: 4,
              },
            }}
          >
            ปรึกษาเรา
          </Box>
          <Box
            component="a"
            href="/"
            onClick={(event) => navigateToHomeSection(event, 'work')}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: { xs: 190, sm: 210 },
              height: { xs: 54, sm: 58 },
              px: { xs: 3.5, sm: 4.5 },
              borderRadius: 999,
              bgcolor: '#F5F5F7',
              color: palette.text,
              textDecoration: 'none',
              fontSize: { xs: 14, sm: 17 },
              fontWeight: 600,
              lineHeight: 1.2,
              transition: 'transform 220ms ease, background-color 220ms ease',
              '&:hover': {
                bgcolor: '#E8E8ED',
                transform: 'translate3d(0, -1px, 0)',
              },
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                outline: `3px solid ${palette.primaryPink}`,
                outlineOffset: 4,
              },
            }}
          >
            ดูผลงานอีกครั้ง
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export function FaqSection() {
  return (
    <Box
      component="section"
      id="faq"
      sx={{
        bgcolor: '#FFFFFF',
        color: palette.text,
        px: workCarouselGutter,
        py: { xs: 7, sm: 8, md: 10, lg: 12 },
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Typography
          variant="h2"
          sx={{
            color: palette.primaryPink,
            ...typeScale.sectionTitle,
            textAlign: 'center',
          }}
        >
          คำถามที่พบบ่อย
        </Typography>

        <Stack spacing={1.5}>
          {faqItems.map((item) => (
            <Box
              key={item.question}
              component="details"
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: { xs: '24px', md: '30px' },
                boxShadow: '0 16px 48px rgba(17,24,39,0.06)',
                overflow: 'hidden',
                transition: 'box-shadow 220ms ease, transform 220ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -1px, 0)',
                  boxShadow: '0 20px 58px rgba(17,24,39,0.08)',
                },
                '&[open] .faq-plus': {
                  transform: 'rotate(45deg)',
                  bgcolor: palette.primaryPink,
                  color: '#FFFFFF !important',
                },
                '& summary:focus': {
                  outline: 'none',
                },
                '& summary:focus-visible': {
                  outline: 'none',
                },
                '& summary::-webkit-details-marker': {
                  display: 'none',
                },
              }}
            >
              <Box
                component="summary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: { xs: 2, md: 4 },
                  cursor: 'pointer',
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 2.5, sm: 3, md: 3.5 },
                  listStyle: 'none',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: palette.text,
                    fontSize: { xs: 19, sm: 21, md: 24 },
                    lineHeight: 1.25,
                    fontWeight: 600,
                    letterSpacing: 0,
                  }}
                >
                  {item.question}
                </Typography>
                <Box
                  component="span"
                  className="faq-plus"
                  aria-hidden="true"
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    flex: '0 0 auto',
                    width: { xs: 38, sm: 42 },
                    height: { xs: 38, sm: 42 },
                    borderRadius: '50%',
                    bgcolor: '#F5F5F7',
                    color: palette.text,
                    fontSize: { xs: 28, sm: 30 },
                    lineHeight: 1,
                    fontWeight: 500,
                    transition: 'transform 220ms ease, background-color 220ms ease, color 220ms ease',
                  }}
                >
                  +
                </Box>
              </Box>
              <Typography
                sx={{
                  color: '#4B5563',
                  ...typeScale.body,
                  px: { xs: 3, sm: 4, md: 5 },
                  pb: { xs: 3, sm: 3.5, md: 4 },
                  maxWidth: 920,
                }}
              >
                {item.answer}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
