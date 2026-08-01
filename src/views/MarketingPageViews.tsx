'use client';

import { useState } from 'react';
import type { ComponentProps, FormEvent, ReactNode } from 'react';
import { Box, Slide, Snackbar, SnackbarContent, Typography } from '@mui/material';
import BuildRounded from '@mui/icons-material/BuildRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import DashboardRounded from '@mui/icons-material/DashboardRounded';
import DesignServicesRounded from '@mui/icons-material/DesignServicesRounded';
import FactCheckRounded from '@mui/icons-material/FactCheckRounded';
import ForumRounded from '@mui/icons-material/ForumRounded';
import HubRounded from '@mui/icons-material/HubRounded';
import LanguageRounded from '@mui/icons-material/LanguageRounded';
import PaletteRounded from '@mui/icons-material/PaletteRounded';
import RuleRounded from '@mui/icons-material/RuleRounded';
import SupportAgentRounded from '@mui/icons-material/SupportAgentRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import { MarketingPageLayout, MarketingContentSection } from '../components/MarketingPageLayout';
import { ResponsiveStack } from '../components/ResponsiveStack';
import { Reveal } from '../components/motion/Reveal';
import { fontWeight, layout, palette, radii, shadows, typeScale } from '../appTheme';
import { cardSx, SectionHeading } from '../features/marketing/MarketingSectionComponents';
import { carouselControlSx, useShowcaseCarousel } from '../features/home/useHomeCarousels';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import { pageGutter } from '../features/project-detail/projectDetailContent';
import {
  contactChannels,
  projectSteps,
  serviceOfferings,
  services,
} from '../features/marketing/marketingContent';

const serviceOfferingIcons = [DesignServicesRounded, LanguageRounded, DashboardRounded, HubRounded, BuildRounded, SupportAgentRounded];
const projectStepIcons = [ForumRounded, RuleRounded, PaletteRounded, CodeRounded, FactCheckRounded, TrendingUpRounded];
const carouselCardIconSx = { color: palette.primaryPink, lineHeight: 0 };
const SnackbarSlide = (props: ComponentProps<typeof Slide>) => <Slide {...props} direction="up" />;

function MarketingCardCarousel({ label, children }: { label: string; children: ReactNode }) {
  const { carouselRef, carouselState, scrollCards } = useShowcaseCarousel();
  const dragScroll = useHorizontalDragScroll();

  return (
    <>
      <Box
        ref={carouselRef}
        aria-label={label}
        {...dragScroll}
        sx={{
          position: 'relative',
          left: `calc(${pageGutter} * -1)`,
          width: `calc(100% + (${pageGutter} * 2))`,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          overflowY: 'visible',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          cursor: 'grab',
          touchAction: 'pan-x pan-y',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          pr: pageGutter,
          pt: 2,
          pb: { xs: 7, md: 8 },
          '&::-webkit-scrollbar': { display: 'none' },
          '& img': { WebkitUserDrag: 'none' },
        }}
      >
        <Box aria-hidden="true" sx={{ flex: '0 0 auto', width: pageGutter }} />
        {children}
      </Box>

      {carouselState.isScrollable && (
        <ResponsiveStack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{
            mt: { xs: -4, md: -5 },
            position: 'relative',
            left: `calc(${pageGutter} * -1)`,
            width: `calc(100% + (${pageGutter} * 2))`,
            px: pageGutter,
            zIndex: 2,
          }}
        >
          <Box
            component="button"
            type="button"
            aria-label={'เลื่อน' + label + 'ไปทางซ้าย'}
            disabled={!carouselState.canScrollPrev}
            onClick={() => scrollCards(-1)}
            sx={carouselControlSx(carouselState.canScrollPrev)}
          >
            <Box component="span" sx={{ width: 12, height: 12, ml: 0.5, borderRight: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(135deg)' }} />
          </Box>
          <Box
            component="button"
            type="button"
            aria-label={'เลื่อน' + label + 'ไปทางขวา'}
            disabled={!carouselState.canScrollNext}
            onClick={() => scrollCards(1)}
            sx={carouselControlSx(carouselState.canScrollNext)}
          >
            <Box component="span" sx={{ width: 12, height: 12, mr: 0.5, borderRight: '3px solid currentColor', borderBottom: '3px solid currentColor', transform: 'rotate(-45deg)' }} />
          </Box>
        </ResponsiveStack>
      )}
    </>
  );
}


function LegacyServicesPage() {
  return (
    <MarketingPageLayout title="บริการของ Baawork" subtitle="ออกแบบประสบการณ์ใช้งานและพัฒนาระบบที่เชื่อมกับงานจริงของธุรกิจ">
      <MarketingContentSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="บริการที่ต่อกันเป็นระบบเดียว" description="ทุกส่วนของงานถูกวางให้ทำงานต่อเนื่อง ตั้งแต่หน้าจอที่ผู้ใช้เห็น ไปจนถึงข้อมูลและระบบหลังบ้าน" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 } }}>
          {services.map(([title, description]) => (
            <ResponsiveStack key={title} spacing={1.25} sx={cardSx}>
              <Typography sx={{ ...typeScale.cardTitle, color: palette.primaryPink }}>{title}</Typography>
              <Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{description}</Typography>
            </ResponsiveStack>
          ))}
        </Box>
      </MarketingContentSection>
      <MarketingContentSection backgroundColor={palette.softGray} variant="slide-left">
        <SectionHeading title="พร้อมใช้งานและต่อยอดได้" description="เราออกแบบให้ UX/UI, frontend, backend, API และฐานข้อมูลไปในทิศทางเดียวกันตั้งแต่ต้น" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {['UX/UI', 'ระบบหลังบ้าน', 'Production'].map((item) => <Box key={item} sx={{ ...cardSx, textAlign: 'center' }}><Typography sx={{ ...typeScale.cardTitle }}>{item}</Typography></Box>)}
        </Box>
      </MarketingContentSection>
    </MarketingPageLayout>
  );
}

export function ServicesPage() {
  return (
    <MarketingPageLayout
      title="บริการของเรา"
      subtitle="ออกแบบประสบการณ์ใช้งานและพัฒนาระบบที่เชื่อมกับงานจริงของธุรกิจ"
    >
      <MarketingContentSection backgroundColor={palette.background} variant="slide-right">
        <SectionHeading
          title="บริการที่ออกแบบตามงานจริง"
        />
        <Reveal delay={0.08}>
          <MarketingCardCarousel label="บริการที่ออกแบบตามงานจริง">
          {serviceOfferings.map(({ title, description, suitedFor }, index) => {
            const Icon = serviceOfferingIcons[index];

            return (
            <Box
              key={title}
              data-carousel-item="true"
              sx={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: layout.marketingCarouselCardWidth,
                minHeight: layout.marketingCarouselCardMinHeight,
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
              }}
            >
              <ResponsiveStack
                  spacing={layout.cardContentGap}
                  sx={{
                    ...cardSx,
                    height: '100%',
                    minHeight: layout.marketingCarouselCardMinHeight,
                    position: 'relative',
                    bgcolor: palette.surfaceAlt,
                    borderRadius: radii.card,
                    boxShadow: 'none',
                    '&:hover': {
                      ...cardSx['&:hover'],
                      boxShadow: shadows.carouselHoverSubtle,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ color: palette.text }}>{title}</Typography>
                  <Typography sx={{ color: palette.textSecondary, fontSize: { xs: 15, md: 16 }, lineHeight: 1.38, fontWeight: fontWeight.regular }}>
                    {description}
                  </Typography>
                  <Typography sx={{ color: palette.textSecondary, fontSize: { xs: 15, md: 16 }, lineHeight: 1.231, fontWeight: fontWeight.regular }}>
                    {suitedFor}
                  </Typography>
                  <Box sx={{ ...carouselCardIconSx, position: 'absolute', left: '50%', bottom: 80, transform: 'translateX(-50%)' }}><Icon sx={{ fontSize: 120 }} /></Box>
              </ResponsiveStack>
            </Box>
            );
          })}
          </MarketingCardCarousel>
        </Reveal>
      </MarketingContentSection>

      <MarketingContentSection backgroundColor={palette.softGray} variant="slide-left">
        <SectionHeading
          title="เริ่มงานอย่างเป็นขั้นตอน"
        />
        <Reveal delay={0.08}>
          <MarketingCardCarousel label="เริ่มงานอย่างเป็นขั้นตอน">
          {projectSteps.map(([step, title, description], index) => {
            const Icon = projectStepIcons[index];

            return (
            <Box
              key={step}
              data-carousel-item="true"
              sx={{
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: layout.marketingCarouselCardWidth,
                minHeight: layout.marketingCarouselCardMinHeight,
                scrollSnapAlign: 'start',
                scrollMarginInline: pageGutter,
              }}
            >
              <ResponsiveStack
                  spacing={layout.cardCompactGap}
                  sx={{
                    ...cardSx,
                    height: '100%',
                    minHeight: layout.marketingCarouselCardMinHeight,
                    position: 'relative',
                    borderRadius: radii.card,
                    boxShadow: 'none',
                    '&:hover': {
                      ...cardSx['&:hover'],
                      boxShadow: shadows.carouselHoverSubtle,
                    },
                  }}
                >
                  <Typography sx={{ color: palette.primaryPink, fontSize: 17, lineHeight: 1.353, fontWeight: fontWeight.bold }}>{step}</Typography>
                  <Typography variant="h3" sx={{ color: palette.text }}>{title}</Typography>
                  <Typography sx={{ color: palette.textSecondary, fontSize: { xs: 15, md: 16 }, lineHeight: 1.38, fontWeight: fontWeight.regular }}>
                    {description}
                  </Typography>
                  <Box sx={{ ...carouselCardIconSx, position: 'absolute', left: '50%', bottom: 80, transform: 'translateX(-50%)' }}><Icon sx={{ fontSize: 120 }} /></Box>
              </ResponsiveStack>
            </Box>
            );
          })}
          </MarketingCardCarousel>
        </Reveal>
      </MarketingContentSection>

    </MarketingPageLayout>
  );
}


export function ConsultPage() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting'>('idle');
  const [notification, setNotification] = useState({ open: false, tone: 'success' as 'success' | 'error', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setSubmitState('submitting');

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          phone: values.get('phone'),
          company: values.get('company'),
          message: values.get('message'),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? 'ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }

      form.reset();
      setSubmitState('idle');
      setNotification({ open: true, tone: 'success', message: 'ส่งรายละเอียดเรียบร้อยแล้ว' });
    } catch (error) {
      setSubmitState('idle');
      setNotification({ open: true, tone: 'error', message: error instanceof Error ? error.message : 'ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' });
    }
  };

  const inputSx = { width: '100%', minHeight: 48, boxSizing: 'border-box', border: '1px solid #D1D5DB', borderRadius: '14px', px: 1.5, bgcolor: '#FFFFFF', color: palette.text, font: 'inherit', outline: 'none', '&:focus': { borderColor: palette.primaryPink, boxShadow: '0 0 0 3px rgba(255,0,140,0.14)' } };

  return (
    <MarketingPageLayout title="ปรึกษา Baawork" subtitle="ส่งโจทย์ ระบบที่อยากทำ หรือปัญหาที่อยากแก้มาให้เราเริ่มดูภาพรวมร่วมกัน">
      <MarketingContentSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="เล่าโจทย์ให้เราฟัง" />
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 }, ...cardSx }}>
          {[['ชื่อของคุณ', 'name', 'text'], ['อีเมลสำหรับติดต่อกลับ', 'email', 'email'], ['เบอร์โทรศัพท์ (ถ้ามี)', 'phone', 'tel'], ['บริษัทหรือองค์กร (ถ้ามี)', 'company', 'text']].map(([label, name, type]) => <Box key={name} component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>{label}<Box component="input" name={name} type={type} required={name === 'name' || name === 'email'} sx={inputSx} /></Box>)}
          <Box component="label" sx={{ gridColumn: '1 / -1', display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>รายละเอียดที่อยากปรึกษา<Box component="textarea" name="message" required rows={5} sx={{ ...inputSx, p: 1.5, resize: 'vertical' }} /></Box>
          <Box sx={{ gridColumn: '1 / -1', display: 'grid', gap: 1.25, justifyItems: { xs: 'stretch', sm: 'end' } }}>
            <Box component="button" type="submit" disabled={submitState === 'submitting'} sx={{ minHeight: 50, minWidth: { xs: '100%', sm: 190 }, border: 0, borderRadius: 999, px: 3, bgcolor: palette.primaryPink, color: '#FFFFFF', cursor: submitState === 'submitting' ? 'wait' : 'pointer', font: 'inherit', fontWeight: 700, opacity: submitState === 'submitting' ? 0.7 : 1 }}>
              {submitState === 'submitting' ? 'กำลังส่ง...' : 'ส่งรายละเอียดทางอีเมล'}
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={notification.open}
          autoHideDuration={4500}
          onClose={() => setNotification((current) => ({ ...current, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          slots={{ content: SnackbarContent, transition: SnackbarSlide }}
          message={notification.message}
          slotProps={{
            content: {
              role: notification.tone === 'error' ? 'alert' : 'status',
              sx: {
                bgcolor: notification.tone === 'success' ? '#15803D' : '#B91C1C',
                color: '#FFFFFF',
                borderRadius: '14px',
                fontWeight: 700,
              },
            },
          }}
        />
      </MarketingContentSection>
      <MarketingContentSection backgroundColor={palette.softGray} variant="slide-left">
        <SectionHeading title="หรือติดต่อได้ที่" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {contactChannels.map(([label, href, iconSrc]) => (
            <Box
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              sx={{ ...cardSx, color: palette.text, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}
            >
              <Box component="img" src={iconSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" sx={{ width: 32, height: 32, objectFit: 'contain', flex: '0 0 auto' }} />
              <Typography sx={{ ...typeScale.cardTitle }}>{label}</Typography>
            </Box>
          ))}
        </Box>
      </MarketingContentSection>
    </MarketingPageLayout>
  );
}
