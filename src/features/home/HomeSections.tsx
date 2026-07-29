import { Box, Typography, useMediaQuery } from "@mui/material";
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import AddBoxRounded from '@mui/icons-material/AddBoxRounded';
import ApiRounded from '@mui/icons-material/ApiRounded';
import DesktopMacRounded from '@mui/icons-material/DesktopMacRounded';
import ExtensionRounded from '@mui/icons-material/ExtensionRounded';
import HubRounded from '@mui/icons-material/HubRounded';
import LaptopMacRounded from '@mui/icons-material/LaptopMacRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';
import StorageRounded from '@mui/icons-material/StorageRounded';
import TabletMacRounded from '@mui/icons-material/TabletMacRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "../../components/motion/Reveal";
import { ResponsiveStack } from "../../components/ResponsiveStack";
import { appTheme, fontWeight, hover, palette, shadows, typeScale } from "../../appTheme";
import { navigateToHomeSection } from "../../utils/homeSectionNavigation";
import { useHorizontalDragScroll } from "../../hooks/useHorizontalDragScroll";
import {
  aiPhoneScreens,
  audienceGroups,
  resultCards,
  toolLogos,
  workCarouselGutter,
  workCarouselVerticalGap,
  workflowPanels,
} from "./homeContent";
import { carouselControlSx, useShowcaseCarousel, useWorkflowCarousel } from "./useHomeCarousels";
import type { HeroCtaPhase, ShowcaseCard } from "./homeTypes";

const futureSystemExpansionIcons = [
  { Icon: TrendingUpRounded, color: '#6D5BFF', bottom: { xs: '26%', sm: '24%', md: '22%', lg: '20%' }, left: '-6%' },
  { Icon: ExtensionRounded, color: '#0F9DA8', bottom: { xs: '26%', sm: '24%', md: '22%', lg: '20%' }, right: '-6%' },
  { Icon: AddBoxRounded, color: '#F15A24', bottom: '-8%', left: '20%' },
  { Icon: AccountTreeRounded, color: '#2563EB', bottom: '-8%', right: '20%' },
];

function MobileOnlyReveal({ children }: { children: ReactNode }) {
  const isMobileViewport = useMediaQuery(appTheme.breakpoints.down('sm'));

  return isMobileViewport ? <Reveal delay={0.08}>{children}</Reveal> : <>{children}</>;
}

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
      aria-label="ดูผลงานของเรา"
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
            `width 560ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 260ms linear, transform 620ms cubic-bezier(0.25, 0.1, 0.25, 1), ${hover.transition.surface}`,
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
          ดูผลงานของเรา
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
            `opacity 260ms linear, transform 560ms cubic-bezier(0.25, 0.1, 0.25, 1), ${hover.transition.surface}`,
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
        <ResponsiveStack spacing={1.2} sx={{ height: '100%' }}>
          <ResponsiveStack direction="row" alignItems="center" justifyContent="space-between">
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
          </ResponsiveStack>

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
                <ResponsiveStack direction="row" alignItems="flex-end" spacing={0.6}>
                  <Typography sx={{ fontSize: 30, lineHeight: 1, fontWeight: 600 }}>{screen.score}</Typography>
                  <Typography sx={{ pb: 0.35, fontSize: 10, color: palette.accentYellow }}>{screen.delta}</Typography>
                </ResponsiveStack>
              </Box>

              <ResponsiveStack spacing={0.7}>
                {screen.items.map(([label, width], itemIndex) => (
                  <Box key={label} sx={{ p: 1, borderRadius: '12px', bgcolor: panelColor, boxShadow: panelShadow }}>
                    <ResponsiveStack direction="row" justifyContent="space-between" sx={{ mb: 0.7 }}>
                      <Typography sx={{ fontSize: 8.5, fontWeight: 600, color: textColor }}>
                        {label}
                      </Typography>
                      <Typography sx={{ fontSize: 8.5, color: mutedColor }}>{width}%</Typography>
                    </ResponsiveStack>
                  </Box>
                ))}
              </ResponsiveStack>
            </>
          )}

          {screen.variant === 'document' && (
            <ResponsiveStack spacing={0.85}>
              <Box sx={{ p: 1.2, borderRadius: '16px', bgcolor: '#111827', color: '#fff' }}>
                <ResponsiveStack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.68)' }}>{screen.label}</Typography>
                  <Typography sx={{ fontSize: 10, fontWeight: 600, color: palette.accentYellow }}>{screen.delta}</Typography>
                </ResponsiveStack>
                <Typography sx={{ fontSize: 31, lineHeight: 1.05, fontWeight: 600 }}>{screen.score}</Typography>
              </Box>
              {screen.documents.map(([label, status], itemIndex) => (
                <ResponsiveStack key={label} direction="row" alignItems="center" spacing={0.9} sx={{ p: 1, borderRadius: '13px', bgcolor: panelColor, boxShadow: panelShadow }}>
                  <Box sx={{ width: 20, height: 24, borderRadius: '6px', bgcolor: itemIndex === 2 ? palette.primaryPink : '#E5E7EB' }} />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontSize: 9, fontWeight: 600, color: textColor }}>{label}</Typography>
                    <Typography sx={{ fontSize: 8, color: mutedColor }}>AI extract</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 8.5, fontWeight: 600, color: itemIndex === 2 ? palette.primaryPink : mutedColor }}>{status}</Typography>
                </ResponsiveStack>
              ))}
            </ResponsiveStack>
          )}

          {screen.variant === 'agent' && (
            <ResponsiveStack spacing={0.8}>
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
            </ResponsiveStack>
          )}

          {screen.variant === 'monitor' && (
            <ResponsiveStack spacing={0.9}>
              <Box sx={{ p: 1.2, borderRadius: '16px', bgcolor: '#111827', color: '#fff' }}>
                <ResponsiveStack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.68)' }}>{screen.label}</Typography>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ADE80' }} />
                </ResponsiveStack>
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
            </ResponsiveStack>
          )}
        </ResponsiveStack>
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
                transition: hover.transition.card,
                willChange: 'transform',
                '&:hover': {
                  transform: hover.lift,
                  boxShadow: shadows.carouselHover,
                  zIndex: 2,
                },
                '&:hover img': {
                  transform: isPhoneAi ? 'scale(1)' : hover.imageScale,
                },
              }}
            >
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
                  transition: hover.transition.image,
                  willChange: 'transform',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <ResponsiveStack
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
              </ResponsiveStack>
              </Box>
            </motion.div>
          );
        })}
      </Box>
      {carouselState.isScrollable && (
      <ResponsiveStack
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
      </ResponsiveStack>
      )}
    </>
  );
}

export function ToolStackSection() {
  const shouldReduceMotion = useReducedMotion();
  const isDesktopViewport = useMediaQuery('(min-width:1069px)');

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#FFFFFF',
        color: palette.text,
        py: '48px',
      }}
    >
      <Box
        sx={{
          px: workCarouselGutter,
        }}
      >
        <Reveal>
          <ResponsiveStack
            spacing={{ xs: 2, md: 2.5 }}
            alignItems="center"
            textAlign="center"
            sx={{ maxWidth: 840, mx: 'auto' }}
          >
            <Typography
              variant="h2"
              sx={{
                color: palette.text,
                ...typeScale.display,
              }}
            >
              เครื่องมือที่เราใช้
            </Typography>
            <Typography
              sx={{
                maxWidth: 720,
                color: palette.textMuted,
                ...typeScale.bodyLarge,
                fontWeight: fontWeight.bold,
              }}
            >
              เราเลือกเทคโนโลยีที่เสถียร เชื่อมต่อกันได้ดี และเหมาะกับการสร้างระบบที่ใช้งานจริงตั้งแต่เริ่มต้นจนดูแลต่อใน production
            </Typography>
          </ResponsiveStack>
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
                whileHover={shouldReduceMotion ? undefined : hover.icon}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.52,
                  delay: shouldReduceMotion ? 0 : tool.delay,
                  ease: [0.22, 1, 0.36, 1],
                  y: hover.motion,
                  scale: hover.motion,
                }}
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
                      bgcolor: 'transparent',
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
                        width: isDesktopViewport ? '100%' : '64%',
                        height: isDesktopViewport ? '100%' : '64%',
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
        py: '48px',
      }}
    >
      <Reveal variant="scale">
        <ResponsiveStack spacing={{ xs: 1.5, md: 2 }} alignItems="center" textAlign="center" sx={{ maxWidth: 820, mx: 'auto' }}>
          <Typography id="audience-title" variant="h2" sx={{ color: palette.text, ...typeScale.sectionTitle }}>
            ออกแบบสำหรับทีมที่ทำงานจริง
          </Typography>
          <Typography sx={{ color: palette.textMuted, ...typeScale.bodyLarge, fontWeight: fontWeight.bold }}>
            ตั้งแต่ทีมเล็กที่กำลังเติบโต ไปจนถึงองค์กรที่ต้องจัดการข้อมูล คน และ workflow หลายส่วนพร้อมกัน
          </Typography>
        </ResponsiveStack>
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
            whileHover={shouldReduceMotion ? undefined : hover.icon}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.48,
              delay: shouldReduceMotion ? 0 : index * 0.07,
              ease: [0.22, 1, 0.36, 1],
              y: hover.motion,
              scale: hover.motion,
            }}
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
  const iconSize = { xs: 52, md: 60 };

  if (icon === 'data') {
    return (
      <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color }}>
        <ApiRounded sx={{ fontSize: iconSize }} />
        <StorageRounded sx={{ fontSize: iconSize }} />
      </Box>
    );
  }

  if (icon === 'spark') {
    return (
      <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 0.75 }, color }}>
        <DesktopMacRounded sx={{ fontSize: { xs: 44, md: 52 } }} />
        <LaptopMacRounded sx={{ fontSize: { xs: 44, md: 52 } }} />
        <TabletMacRounded sx={{ fontSize: { xs: 42, md: 50 } }} />
        <PhoneIphoneRounded sx={{ fontSize: { xs: 38, md: 46 } }} />
      </Box>
    );
  }

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
  const shouldReduceMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery(appTheme.breakpoints.down('sm'));

  return (
    <Box
      component="section"
      id="workflow"
      sx={{
        bgcolor: palette.softGray,
        py: '48px',
      }}
    >
      <Box
        sx={{
          px: workCarouselGutter,
        }}
      >
      <Reveal>
        <ResponsiveStack
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
        </ResponsiveStack>
      </Reveal>
      </Box>

      <MobileOnlyReveal>
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
        {workflowPanels.map((panel, index) => (
            <Box
              key={panel.title}
              component={motion.article}
              initial={isMobileViewport || shouldReduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
              whileInView={isMobileViewport ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.72,
                delay: isMobileViewport || shouldReduceMotion ? 0 : Math.min(index * 0.1, 0.3),
                ease: [0.22, 1, 0.36, 1],
                y: hover.motion,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: hover.liftY }}
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
                transition: hover.transition.card,
                willChange: 'transform',
                '&:hover': {
                  boxShadow: shadows.carouselHover,
                  zIndex: 2,
                },
                '&:hover img': {
                  transform: hover.imageScale,
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
                  transition: hover.transition.image,
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
              <ResponsiveStack
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
                  variant="h2"
                  sx={{
                    color: '#FFFFFF',
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
              </ResponsiveStack>
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
      </MobileOnlyReveal>

      {carouselState.isScrollable && (
      <ResponsiveStack
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
      </ResponsiveStack>
      )}
    </Box>
  );
}

function ResultCard({ card, index }: { card: (typeof resultCards)[number]; index: number }) {
  const isLarge = card.size === 'large';
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box
      component={motion.article}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.72,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.1, 0.3),
        ease: [0.22, 1, 0.36, 1],
        y: hover.motion,
      }}
      whileHover={shouldReduceMotion ? undefined : { y: hover.liftY }}
      sx={{
        position: 'relative',
        minHeight: isLarge
          ? { xs: 380, sm: 560, md: 610, lg: 650 }
          : { xs: 250, sm: 280, md: 310, lg: 340 },
        height: isLarge
          ? { xs: 380, sm: 560, md: 610, lg: 650 }
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
        boxShadow: shadows.card,
        transform: 'translate3d(0, 0, 0)',
        transition: hover.transition.card,
        willChange: 'transform',
        '&:hover': {
          boxShadow: shadows.cardHover,
        },
      }}
    >
      {!isLarge && <ResultIcon icon={card.icon} color={card.color} />}

      <Typography
        variant="h3"
        sx={{
          maxWidth: isLarge ? 520 : 470,
          color: '#6E6E73',
          textAlign: 'center',
          mt: isLarge ? { xs: 3.5, sm: 4.5, md: 5 } : 0,
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
                  <Icon sx={{ fontSize: { xs: 104, sm: 124, md: 138, lg: 158 }, color }} />
                </Box>
              ))}
          <HubRounded
            sx={{
              position: 'absolute',
              left: '50%',
              top: '58%',
              transform: 'translate(-50%, -50%)',
              fontSize: { xs: 96, sm: 112, md: 124, lg: 144 },
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
              <ResponsiveStack
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
              </ResponsiveStack>
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
        py: '48px',
      }}
    >
      <Box sx={{ px: workCarouselGutter }}>
        <Reveal>
          <ResponsiveStack
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
          </ResponsiveStack>
        </Reveal>

        <Box
          sx={{
            mt: workCarouselVerticalGap,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {[leftCards, rightCards].map((column, columnIndex) => (
            <ResponsiveStack key={columnIndex} spacing={{ xs: 2, md: 3 }}>
              {column.map((card, cardIndex) => (
                <ResultCard key={card.title} card={card} index={columnIndex * 2 + cardIndex} />
              ))}
            </ResponsiveStack>
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
        py: '48px',
        textAlign: 'center',
      }}
    >
      <Reveal>
        <ResponsiveStack
        spacing={{ xs: 2.5, md: 3 }}
        alignItems="center"
        >
        <Typography
          variant="h2"
          sx={{
            color: palette.text,
            ...typeScale.sectionTitle,
            maxWidth: 1120,
          }}
        >
          พร้อมเริ่มโปรเจกต์กับเรา
        </Typography>
        <Typography
          sx={{
            color: palette.textMuted,
            ...typeScale.bodyLarge,
            fontWeight: fontWeight.bold,
            maxWidth: 920,
          }}
        >
          เล่าไอเดียหรือปัญหาของระบบที่อยากสร้าง แล้วเราช่วยวางแนวทางให้พร้อมเริ่มพัฒนาได้จริง
        </Typography>
        <ResponsiveStack
          direction="row"
          spacing={{ xs: 1, sm: 1.5 }}
          alignItems="center"
          justifyContent="center"
          sx={{ pt: { xs: 1, md: 1.5 }, width: { xs: '100%', sm: 'auto' }, flexWrap: 'nowrap' }}
        >
          <Box
            component="a"
            href="/consult"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: { xs: 0, sm: 210 },
              flex: { xs: '1 1 0', sm: '0 0 auto' },
              height: { xs: 50, sm: 58 },
              px: { xs: 1.5, sm: 4.5 },
              borderRadius: 999,
              bgcolor: palette.primaryPink,
              color: '#FFFFFF !important',
              textDecoration: 'none',
              ...appTheme.typography.button,
              boxShadow: '0 18px 44px rgba(255,0,140,0.24)',
              transition: hover.transition.interactive,
              '&:visited, &:active': {
                color: '#FFFFFF !important',
              },
              '&:hover': {
                bgcolor: '#FF1495',
                color: '#FFFFFF !important',
                transform: hover.subtleLift,
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
              minWidth: { xs: 0, sm: 210 },
              flex: { xs: '1 1 0', sm: '0 0 auto' },
              height: { xs: 50, sm: 58 },
              px: { xs: 1.5, sm: 4.5 },
              borderRadius: 999,
              bgcolor: '#FFFFFF',
              color: palette.text,
              border: 0,
              boxShadow: '0 8px 22px rgba(17,24,39,0.06)',
              textDecoration: 'none',
              ...appTheme.typography.button,
              transition: hover.transition.interactive,
              '&:hover': {
                bgcolor: '#FFFFFF',
                boxShadow: '0 12px 28px rgba(17,24,39,0.1)',
                transform: hover.subtleLift,
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
        </ResponsiveStack>
        </ResponsiveStack>
      </Reveal>
    </Box>
  );
}
