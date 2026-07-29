'use client';

import type { FormEvent, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
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

const consultationEmail = process.env.NEXT_PUBLIC_CONSULT_EMAIL ?? 'baaworkstudio@gmail.com';

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
      <MarketingContentSection backgroundColor="#F7F8FA" variant="slide-left">
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
          description="เลือกทำเฉพาะส่วนที่ตอบโจทย์ธุรกิจ หรือวางให้ทุกส่วนทำงานเชื่อมกันตั้งแต่ต้นก็ได้"
        />
        <Reveal delay={0.08}>
          <MarketingCardCarousel label="บริการที่ออกแบบตามงานจริง">
          {serviceOfferings.map(({ title, description, suitedFor }) => (
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
                    bgcolor: palette.surfaceAlt,
                    borderRadius: radii.card.xs,
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
              </ResponsiveStack>
            </Box>
          ))}
          </MarketingCardCarousel>
        </Reveal>
      </MarketingContentSection>

      <MarketingContentSection backgroundColor={palette.surfaceAlt} variant="slide-left">
        <SectionHeading
          title="เริ่มงานอย่างเป็นขั้นตอน"
          description="สรุปสิ่งที่ต้องทำให้เห็นภาพเดียวกันก่อน แล้วค่อยออกแบบ พัฒนา และส่งมอบอย่างเป็นระบบ"
        />
        <Reveal delay={0.08}>
          <MarketingCardCarousel label="เริ่มงานอย่างเป็นขั้นตอน">
          {projectSteps.map(([step, title, description]) => (
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
                    borderRadius: radii.card.xs,
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
              </ResponsiveStack>
            </Box>
          ))}
          </MarketingCardCarousel>
        </Reveal>
      </MarketingContentSection>

    </MarketingPageLayout>
  );
}

export function StartProjectPage() {
  return (
    <MarketingPageLayout title="เริ่มโปรเจกต์กับเรา" subtitle="คุยโจทย์ให้ชัด วางขอบเขตให้เห็นภาพ แล้วพัฒนาเป็นระบบที่พร้อมใช้งานจริง">
      <MarketingContentSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="ขั้นตอนการทำงาน" description="เราแบ่งงานเป็นขั้นตอนที่ชัดเจน เพื่อให้ทุกฝ่ายเห็นภาพและติดตามงานได้ตลอดโปรเจกต์" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 } }}>
          {projectSteps.map(([number, title, description]) => <ResponsiveStack key={number} spacing={3} sx={{ ...cardSx, minHeight: { xs: 220, lg: 300 }, justifyContent: 'space-between' }}><Typography sx={{ color: palette.primaryPink, fontWeight: 700 }}>{number}</Typography><Box><Typography sx={{ ...typeScale.cardTitle, mb: 1 }}>{title}</Typography><Typography sx={{ ...typeScale.body, color: '#4B5563' }}>{description}</Typography></Box></ResponsiveStack>)}
        </Box>
      </MarketingContentSection>
      <MarketingContentSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="เตรียมข้อมูลเพียงเล็กน้อย" description="ยังไม่ต้องมีเอกสารครบ แค่แชร์เป้าหมาย ตัวอย่างที่ชอบ ข้อมูลที่ต้องเชื่อม และช่วงเวลาที่ต้องการใช้งาน" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: 2 }}>
          {['เป้าหมายของระบบ', 'ตัวอย่างที่อยากได้', 'ข้อมูลที่ต้องเชื่อม', 'ช่วงเวลาที่ต้องการ'].map((item) => <Box key={item} sx={cardSx}><Typography sx={{ ...typeScale.cardTitle }}>{item}</Typography></Box>)}
        </Box>
      </MarketingContentSection>
    </MarketingPageLayout>
  );
}

export function ConsultPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`ปรึกษาโปรเจกต์จาก ${String(values.get('name') ?? '')}`);
    const body = encodeURIComponent(['ชื่อ: ' + String(values.get('name') ?? ''), 'อีเมล: ' + String(values.get('email') ?? ''), 'โทรศัพท์: ' + String(values.get('phone') ?? '-'), 'บริษัท: ' + String(values.get('company') ?? '-'), 'ประเภทระบบ: ' + String(values.get('projectType') ?? '-'), '', 'รายละเอียด:', String(values.get('message') ?? '')].join('\n'));
    window.location.href = `mailto:${consultationEmail}?subject=${subject}&body=${body}`;
  };

  const inputSx = { width: '100%', minHeight: 48, boxSizing: 'border-box', border: '1px solid #D1D5DB', borderRadius: '14px', px: 1.5, bgcolor: '#FFFFFF', color: palette.text, font: 'inherit', outline: 'none', '&:focus': { borderColor: palette.primaryPink, boxShadow: '0 0 0 3px rgba(255,0,140,0.14)' } };

  return (
    <MarketingPageLayout title="ปรึกษา Baawork" subtitle="ส่งโจทย์ ระบบที่อยากทำ หรือปัญหาที่อยากแก้มาให้เราเริ่มดูภาพรวมร่วมกัน">
      <MarketingContentSection backgroundColor="#FFFFFF" variant="slide-right">
        <SectionHeading title="เล่าโจทย์ให้เราฟัง" description="กรอกข้อมูลแล้วกดส่ง ระบบจะเปิดอีเมลพร้อมรายละเอียดของคุณให้ส่งหา Baawork ได้ทันที" />
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, md: 2.5 }, ...cardSx }}>
          {[['ชื่อของคุณ', 'name', 'text'], ['อีเมลสำหรับติดต่อกลับ', 'email', 'email'], ['เบอร์โทรศัพท์ (ถ้ามี)', 'phone', 'tel'], ['บริษัทหรือองค์กร (ถ้ามี)', 'company', 'text']].map(([label, name, type]) => <Box key={name} component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>{label}<Box component="input" name={name} type={type} required={name === 'name' || name === 'email'} sx={inputSx} /></Box>)}
          <Box component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>ประเภทระบบที่สนใจ<Box component="select" name="projectType" defaultValue="" required sx={inputSx}><option value="" disabled>เลือกประเภทระบบ</option><option>เว็บแอปพลิเคชัน</option><option>ระบบ AI</option><option>ระบบหลังบ้าน / Dashboard</option><option>เชื่อมต่อ API และข้อมูล</option></Box></Box>
          <Box component="label" sx={{ display: 'grid', gap: 0.8, fontSize: 14, fontWeight: 700 }}>รายละเอียดที่อยากปรึกษา<Box component="textarea" name="message" required rows={5} sx={{ ...inputSx, p: 1.5, resize: 'vertical' }} /></Box>
          <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: { xs: 'stretch', sm: 'flex-end' } }}><Box component="button" type="submit" sx={{ minHeight: 50, minWidth: { xs: '100%', sm: 190 }, border: 0, borderRadius: 999, px: 3, bgcolor: palette.primaryPink, color: '#FFFFFF', cursor: 'pointer', font: 'inherit', fontWeight: 700 }}>ส่งรายละเอียดทางอีเมล</Box></Box>
        </Box>
      </MarketingContentSection>
      <MarketingContentSection backgroundColor="#F7F8FA" variant="slide-left">
        <SectionHeading title="หรือติดต่อได้ที่" description="ติดตามผลงานและส่งข้อความหาเราได้ผ่านช่องทางด้านล่าง" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
          {contactChannels.map(([label, href]) => <Box key={label} component="a" href={href} target="_blank" rel="noreferrer" sx={{ ...cardSx, color: palette.text, textDecoration: 'none', textAlign: 'center' }}><Typography sx={{ ...typeScale.cardTitle }}>{label}</Typography></Box>)}
        </Box>
      </MarketingContentSection>
    </MarketingPageLayout>
  );
}
