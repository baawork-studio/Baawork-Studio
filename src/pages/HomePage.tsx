import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { fetchProjects, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';
import carouselMobileImage from '../assets/carousel-mobile.png';
import carouselMobileImageAlt from '../assets/carousel-mobile-2.png';

type ShowcaseCard = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  presentation?: 'phoneAiLight' | 'phoneAiDark';
};

const aiShowcaseCards: ShowcaseCard[] = [
  {
    id: 'ai-command-center',
    slug: 'baawork-command-center',
    title: 'ศูนย์สั่งการ AI',
    shortDescription: 'ศูนย์วิเคราะห์งานแบบเรียลไทม์ที่สรุปสถานะ เคสเร่งด่วน และแนวโน้มความเสี่ยงให้ทีมตัดสินใจเร็วขึ้น',
    coverImageUrl: carouselMobileImageAlt,
    presentation: 'phoneAiDark',
  },
  {
    id: 'ai-sales-forecast',
    slug: 'studio-booking-flow',
    title: 'ระบบคาดการณ์ยอดขาย',
    shortDescription: 'แดชบอร์ดคาดการณ์ยอดขายและพฤติกรรมลูกค้าด้วยโมเดล Machine Learning สำหรับทีมบริหาร',
    coverImageUrl: carouselMobileImage,
    presentation: 'phoneAiLight',
  },
  {
    id: 'ai-document-review',
    slug: 'baawork-command-center',
    title: 'ระบบอ่านเอกสาร AI',
    shortDescription: 'ระบบช่วยอ่านเอกสาร สกัดใจความสำคัญ และจัดหมวดหมู่คำขอจากหน้าจอเดียว',
    coverImageUrl: carouselMobileImage,
    presentation: 'phoneAiLight',
  },
  {
    id: 'ai-service-agent',
    slug: 'studio-booking-flow',
    title: 'ผู้ช่วยบริการอัตโนมัติ',
    shortDescription: 'ระบบผู้ช่วยตอบกลับอัตโนมัติที่ติดตามบทสนทนา งานค้าง และคุณภาพบริการของทีม',
    coverImageUrl: carouselMobileImageAlt,
    presentation: 'phoneAiDark',
  },
  {
    id: 'ai-devops-monitor',
    slug: 'baawork-command-center',
    title: 'ระบบเฝ้าระวัง API',
    shortDescription: 'หน้าจอตรวจจับ anomaly ของระบบ API พร้อมแจ้งเตือนเหตุการณ์ผิดปกติก่อนกระทบผู้ใช้',
    coverImageUrl: carouselMobileImage,
    presentation: 'phoneAiLight',
  },
];

const webAppShowcaseCards: ShowcaseCard[] = [
  {
    id: 'operations-dashboard',
    slug: 'baawork-command-center',
    title: 'แดชบอร์ดควบคุมงาน',
    shortDescription: 'ระบบติดตามคำขอ สถานะงาน และการส่งมอบสำหรับทีมปฏิบัติการที่ต้องดูข้อมูลหลายมุมพร้อมกัน',
    coverImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'booking-platform',
    slug: 'studio-booking-flow',
    title: 'ระบบจองบริการออนไลน์',
    shortDescription: 'เว็บแอปสำหรับเลือกบริการ ตรวจสอบเวลาว่าง และยืนยันการจองได้ทันทีจากทุกอุปกรณ์',
    coverImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'crm-workspace',
    slug: 'baawork-command-center',
    title: 'พื้นที่ทำงาน CRM',
    shortDescription: 'ระบบจัดการลูกค้า งานขาย และประวัติการติดต่อในหน้าเดียวเพื่อให้ทีมทำงานต่อเนื่อง',
    coverImageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'inventory-control',
    slug: 'studio-booking-flow',
    title: 'ระบบจัดการสต็อก',
    shortDescription: 'เว็บแอปสำหรับตรวจนับสินค้า อัปเดตสถานะ และดูคำเตือนเมื่อจำนวนคงเหลือต่ำกว่ากำหนด',
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'analytics-portal',
    slug: 'baawork-command-center',
    title: 'พอร์ทัลวิเคราะห์ธุรกิจ',
    shortDescription: 'หน้ารายงานผู้บริหารที่รวมตัวเลขสำคัญ กราฟเปรียบเทียบ และ insight เพื่อใช้ตัดสินใจเร็วขึ้น',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
];

const workCarouselGutter = 'clamp(24px, 6.27vw, 127.5px)';
const workCarouselVerticalGap = '24px';
const workCarouselEdgeTolerance = 24;

const toolLogos = [
  { title: 'React', src: 'https://thesvg.org/icons/react/default.svg' },
  { title: 'Vite', src: 'https://thesvg.org/icons/vite/default.svg' },
  { title: 'TypeScript', src: 'https://thesvg.org/icons/typescript/default.svg' },
  { title: 'MUI', src: 'https://thesvg.org/icons/mui/default.svg' },
  { title: 'Axios', src: 'https://thesvg.org/icons/axios/default.svg' },
  { title: 'Go', src: 'https://thesvg.org/icons/go/dark.svg', invert: true },
  { title: 'PostgreSQL', src: 'https://thesvg.org/icons/postgresql/default.svg' },
  { title: 'Redis', src: 'https://thesvg.org/icons/redis/default.svg' },
  { title: 'Docker', src: 'https://thesvg.org/icons/docker/default.svg' },
  { title: 'GitHub', src: 'https://thesvg.org/icons/github/default.svg' },
  { title: 'Vercel', src: 'https://thesvg.org/icons/vercel/dark.svg', invert: true },
  { title: 'Cloudflare', src: 'https://thesvg.org/icons/cloudflare/default.svg' },
  { title: 'Google Cloud', src: 'https://thesvg.org/icons/google-cloud/default.svg' },
  { title: 'Kubernetes', src: 'https://thesvg.org/icons/kubernetes/default.svg' },
  { title: 'GitHub Actions', src: 'https://thesvg.org/icons/github-actions/default.svg' },
  { title: 'Git', src: 'https://thesvg.org/icons/git/default.svg' },
  { title: 'Nginx', src: 'https://thesvg.org/icons/nginx/default.svg' },
  { title: 'Figma', src: 'https://thesvg.org/icons/figma/default.svg' },
];

const aiPhoneScreens = [
  {
    variant: 'command',
    title: 'AI Command',
    label: 'Risk Index',
    score: '87',
    delta: '+12%',
    items: [
      ['Critical', 74],
      ['Queue', 52],
      ['Quality', 88],
    ],
  },
  {
    variant: 'forecast',
    title: 'Forecast',
    label: 'Revenue Fit',
    score: '92',
    delta: '+18%',
    items: [
      ['Lead', 82],
      ['Pipeline', 69],
      ['Close', 91],
    ],
  },
  {
    variant: 'document',
    title: 'Doc Reader',
    label: 'Processed',
    score: '128',
    delta: 'docs',
    documents: [
      ['สัญญาเช่า', 'ผ่าน'],
      ['ใบเสนอราคา', 'ตรวจ'],
      ['คำขอใหม่', 'ด่วน'],
    ],
  },
  {
    variant: 'agent',
    title: 'Service AI',
    label: 'Reply Score',
    score: '95',
    delta: '+31%',
    messages: [
      ['ลูกค้ารอคำตอบ', 'AI สรุปประเด็นแล้ว'],
      ['เคสเร่งด่วน', 'แนะนำขั้นตอนต่อไป'],
      ['คุณภาพบริการ', 'อยู่ในเกณฑ์ดี'],
    ],
  },
  {
    variant: 'monitor',
    title: 'API Guard',
    label: 'Health',
    score: '99',
    delta: '+7%',
    stats: [
      ['Latency', '42ms'],
      ['Error', '0.04%'],
      ['Uptime', '99.9%'],
      ['Load', '68%'],
    ],
  },
] as const;

function useShowcaseCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({ canScrollPrev: false, canScrollNext: false });

  const updateWorkCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const nextState = {
      canScrollPrev: carousel.scrollLeft > workCarouselEdgeTolerance,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - workCarouselEdgeTolerance,
    };

    setCarouselState((current) => {
      if (
        current.canScrollPrev === nextState.canScrollPrev &&
        current.canScrollNext === nextState.canScrollNext
      ) {
        return current;
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    carousel.scrollLeft = 0;
    updateWorkCarouselState();

    const handleScroll = () => {
      updateWorkCarouselState();
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateWorkCarouselState]);

  const scrollCards = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (direction === -1 && !carouselState.canScrollPrev) return;
    if (direction === 1 && !carouselState.canScrollNext) return;

    carousel.scrollBy({ left: direction * 392, behavior: 'smooth' });
  };

  return { carouselRef, carouselState, scrollCards };
}

function useWorkflowCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({ canScrollPrev: false, canScrollNext: false });

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const nextState = {
      canScrollPrev: carousel.scrollLeft > workCarouselEdgeTolerance,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - workCarouselEdgeTolerance,
    };

    setCarouselState((current) => {
      if (
        current.canScrollPrev === nextState.canScrollPrev &&
        current.canScrollNext === nextState.canScrollNext
      ) {
        return current;
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    carousel.scrollLeft = 0;
    updateCarouselState();

    const handleScroll = () => updateCarouselState();
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateCarouselState]);

  const scrollCards = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (direction === -1 && !carouselState.canScrollPrev) return;
    if (direction === 1 && !carouselState.canScrollNext) return;

    const firstCard = carousel.querySelector('[data-workflow-card="true"]') as HTMLElement | null;
    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const distance = firstCard ? firstCard.offsetWidth + gap : carousel.clientWidth * 0.86;

    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  return { carouselRef, carouselState, scrollCards };
}

function carouselControlSx(enabled: boolean) {
  return {
    display: 'grid',
    placeItems: 'center',
    width: 48,
    height: 48,
    p: 0,
    border: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    appearance: 'none',
    bgcolor: enabled ? '#E8E8ED' : '#F5F5F7',
    color: enabled ? '#6E6E73' : '#C7C7CC',
    cursor: enabled ? 'pointer' : 'default',
    transition: 'background-color 180ms ease, color 180ms ease',
    '&:hover': {
      bgcolor: enabled ? '#D2D2D7' : '#F5F5F7',
      color: enabled ? '#1D1D1F' : '#C7C7CC',
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  };
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
                    <Box sx={{ height: 4, borderRadius: 999, bgcolor: isDarkPhone ? 'rgba(255,255,255,0.14)' : '#E5E7EB', overflow: 'hidden' }}>
                      <Box sx={{ width: `${width}%`, height: '100%', borderRadius: 999, bgcolor: itemIndex === 1 ? palette.primaryPink : isDarkPhone ? palette.accentYellow : '#111827' }} />
                    </Box>
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

function ShowcaseCarousel({ cards, label }: { cards: ShowcaseCard[]; label: string }) {
  const { carouselRef, carouselState, scrollCards } = useShowcaseCarousel();

  return (
    <>
      <Box
        ref={carouselRef}
        aria-label={label}
        sx={{
          mt: 0,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
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
            <Box
              key={project.id}
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
                  filter: isPhoneAi ? 'saturate(1.02) contrast(1.02)' : 'saturate(1.04) contrast(1.02)',
                  transform: 'scale(1)',
                  transition: 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    isPhoneAi
                      ? 'linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.18) 100%)'
                      : 'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 36%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.18) 100%)',
                  zIndex: 3,
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
          );
        })}
      </Box>
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
    </>
  );
}

function ToolStackSection() {
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
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.85fr) minmax(420px, 1fr)' },
          alignItems: 'center',
          gap: { xs: 5, md: 7, lg: 9 },
        }}
      >
        <Stack
          spacing={{ xs: 2, md: 2.5 }}
          sx={{
            maxWidth: 620,
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: palette.primaryPink,
              fontSize: { xs: 46, sm: 58, md: 70, lg: 76 },
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            เครื่องมือที่เราใช้
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              color: '#4B5563',
              ...typeScale.bodyLarge,
            }}
          >
            เราเลือกใช้เครื่องมือที่เสถียร เชื่อมต่อกันได้ดี และเหมาะกับงานจริง ตั้งแต่หน้าบ้าน หลังบ้าน ฐานข้อมูล ไปจนถึงระบบ deploy และดูแล production
          </Typography>
        </Stack>

        <Box
          aria-label="เครื่องมือและเทคโนโลยีที่ใช้"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(4, minmax(0, 1fr))', sm: 'repeat(6, minmax(0, 1fr))' },
            gap: { xs: 1.25, sm: 1.5, md: 1.8 },
            justifySelf: { xs: 'stretch', md: 'end' },
            width: '100%',
            maxWidth: { xs: '100%', md: 590 },
          }}
        >
          {toolLogos.map((tool) => (
            <Box
              key={tool.title}
              title={tool.title}
              sx={{
                aspectRatio: '1 / 1',
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                borderRadius: { xs: '18px', md: '20px' },
                bgcolor: '#F7F8FA',
                boxShadow: '0 16px 36px rgba(17,24,39,0.06)',
                transition:
                  'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 260ms ease, box-shadow 260ms ease',
                '&:hover': {
                  transform: 'translate3d(0, -4px, 0)',
                  bgcolor: '#F3F4F6',
                  boxShadow: '0 20px 42px rgba(17,24,39,0.1)',
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
                  width: { xs: 34, sm: 38, md: 44 },
                  height: { xs: 34, sm: 38, md: 44 },
                  objectFit: 'contain',
                  filter: tool.invert
                    ? 'invert(1) drop-shadow(0 10px 24px rgba(17,24,39,0.12))'
                    : 'drop-shadow(0 10px 24px rgba(17,24,39,0.12))',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const workflowPanels = [
  {
    title: 'วิเคราะห์โจทย์',
    description: 'เก็บเป้าหมาย ผู้ใช้จริง ข้อมูลที่ต้องใช้ และข้อจำกัดของระบบให้ชัดก่อนเริ่มงาน',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=86',
  },
  {
    title: 'ออกแบบ UX/UI',
    description: 'วางโครงหน้าจอ ลำดับการใช้งาน และรายละเอียดการโต้ตอบให้ทีมเห็นภาพเดียวกัน',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=86',
  },
  {
    title: 'พัฒนาระบบ',
    description: 'สร้างหน้าบ้าน หลังบ้าน ฐานข้อมูล และ API ให้เชื่อมต่อกันเป็นระบบที่ใช้งานได้จริง',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=86',
  },
  {
    title: 'ทดสอบและส่งมอบ',
    description: 'ตรวจการแสดงผลทุกหน้าจอ ความง่ายในการใช้งาน ความเร็ว และความพร้อมก่อนใช้งานจริง',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=86',
  },
];

const resultCards = [
  {
    title: 'ระบบพร้อมใช้งานจริง',
    highlight: 'ตั้งแต่วันส่งมอบ',
    color: palette.primaryPink,
    icon: 'screen',
    size: 'large',
  },
  {
    title: 'หน้าจอใช้งานง่าย',
    highlight: 'ลดเวลาทำงานของทีม',
    color: '#6D5BFF',
    icon: 'spark',
    size: 'compact',
  },
  {
    title: 'ข้อมูลเชื่อมต่อครบ',
    highlight: 'ทั้ง API และฐานข้อมูล',
    color: '#0F9DA8',
    icon: 'data',
    size: 'compact',
  },
  {
    title: 'ต่อยอดได้ในอนาคต',
    highlight: 'รองรับการขยายระบบ',
    color: '#F15A24',
    icon: 'growth',
    size: 'large',
  },
] as const;

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

function WorkflowSection() {
  const { carouselRef, carouselState, scrollCards } = useWorkflowCarousel();

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

        <Box
          ref={carouselRef}
          aria-label="กระบวนการทำงาน"
          sx={{
            mt: workCarouselVerticalGap,
            display: { xs: 'flex', md: 'grid' },
            gridTemplateColumns: {
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: { xs: 2, md: 2.5 },
            overflowX: { xs: 'auto', md: 'visible' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            scrollBehavior: 'smooth',
            overscrollBehaviorX: 'contain',
            pb: { xs: 7, md: 2 },
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {workflowPanels.map((panel) => (
            <Box
              key={panel.title}
              component="article"
              data-workflow-card="true"
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
                boxShadow: 'none',
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms ease',
                willChange: 'transform',
                '&:hover': {
                  transform: 'translate3d(0, -6px, 0)',
                  boxShadow: '0 18px 40px rgba(17,24,39,0.14)',
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
                  filter: 'saturate(1.02) contrast(1.02)',
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
                    fontSize: { xs: 34, sm: 34, md: 48, lg: 56 },
                    lineHeight: 1.08,
                    fontWeight: 600,
                    letterSpacing: 0,
                    textShadow: '0 3px 22px rgba(0,0,0,0.34)',
                  }}
                >
                  {panel.title}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 560,
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: { xs: 17, sm: 17, md: 22, lg: 24 },
                    lineHeight: 1.38,
                    fontWeight: 400,
                    letterSpacing: 0,
                    textShadow: '0 2px 18px rgba(0,0,0,0.34)',
                  }}
                >
                  {panel.description}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{
            display: { xs: 'flex', md: 'none' },
            mt: -5,
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
      </Box>
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
          ? { xs: 430, sm: 520, md: 570, lg: 620 }
          : { xs: 250, sm: 280, md: 310, lg: 340 },
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
          fontSize: isLarge
            ? { xs: 30, sm: 36, md: 42, lg: 46 }
            : { xs: 28, sm: 32, md: 37, lg: 40 },
          lineHeight: 1.18,
          fontWeight: 600,
          letterSpacing: 0,
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
            mt: 'auto',
            width: '112%',
            maxWidth: 720,
            height: { xs: 170, sm: 230, md: 270, lg: 310 },
            position: 'relative',
          }}
        >
          {card.icon === 'screen' ? (
            <Box
              sx={{
                position: 'absolute',
                inset: '0 6% -18px',
                borderRadius: '24px 24px 0 0',
                border: '10px solid #111827',
                bgcolor: '#F7F8FA',
                overflow: 'hidden',
                boxShadow: '0 -16px 42px rgba(17,24,39,0.1)',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  background:
                    'linear-gradient(135deg, rgba(255,0,140,0.18), transparent 38%), linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)',
                }}
              />
              {[18, 36, 54].map((top, index) => (
                <Box
                  key={top}
                  sx={{
                    position: 'absolute',
                    left: '12%',
                    right: `${24 + index * 10}%`,
                    top: `${top}%`,
                    height: 10,
                    borderRadius: 999,
                    bgcolor: index === 1 ? card.color : '#D1D5DB',
                  }}
                />
              ))}
            </Box>
          ) : (
            <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ pt: { xs: 2, md: 3 } }}>
              {['#EEF7FA', '#E7ECEF', '#F3EFE7', '#111827'].map((barColor, index) => (
                <Box
                  key={barColor}
                  sx={{
                    height: { xs: 18, md: 22 },
                    borderRadius: 999,
                    bgcolor: barColor,
                    boxShadow: '0 10px 24px rgba(17,24,39,0.08)',
                    transform: `translateX(${index % 2 === 0 ? '-4%' : '4%'})`,
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}

function ResultsSection() {
  const leftCards = [resultCards[0], resultCards[2]];
  const rightCards = [resultCards[1], resultCards[3]];

  return (
    <Box
      component="section"
      id="results"
      sx={{
        bgcolor: palette.softGray,
        color: palette.text,
        py: { xs: 7, sm: 8, md: 10, lg: 12 },
      }}
    >
      <Box sx={{ px: workCarouselGutter }}>
        <Typography
          variant="h2"
          sx={{
            mx: 'auto',
            maxWidth: 'none',
            color: palette.text,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(18px, 4.7vw, 72px)',
            lineHeight: 1.12,
            fontWeight: 600,
            letterSpacing: 0,
          }}
        >
          สิ่งที่ลูกค้าจะได้หลังจบโปรเจกต์
        </Typography>

        <Box
          sx={{
            mt: { xs: 5, md: 7 },
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

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((items) => {
        if (!active) return;
        setProjects(items.length > 0 ? items : fallbackProjects);
      })
      .catch(() => {
        if (!active) return;
        setProjects(fallbackProjects);
      });

    return () => {
      active = false;
    };
  }, []);

  const featured = projects[0];

  return (
    <Box component="main">
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          alignItems: 'end',
          minHeight: { xs: 620, md: 'calc(100svh - 44px)' },
          pb: { xs: 5, md: 7 },
          pt: { xs: 6, md: 5 },
          bgcolor: palette.text,
        }}
      >
        <Box
          component="img"
          src={featured.coverImageUrl}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1,
            filter: 'saturate(0.95) contrast(1.02)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(17,24,39,0.08) 0%, rgba(17,24,39,0.18) 42%, rgba(17,24,39,0.78) 100%)',
          }}
        />
        <Container maxWidth={false} sx={{ maxWidth: 1680, px: { xs: 2.5, md: 4 } }}>
          <Stack
            spacing={{ xs: 1.5, md: 2.25 }}
            alignItems="center"
            textAlign="center"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Typography
              variant="h1"
              sx={{
                width: '100%',
                color: '#fff',
                ...typeScale.hero,
                textShadow: '0 18px 50px rgba(0,0,0,0.42)',
              }}
            >
              Baawork Studio
            </Typography>
            <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center" sx={{ maxWidth: 980 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.92)',
                  ...typeScale.intro,
                  textShadow: '0 12px 34px rgba(0,0,0,0.48)',
                }}
              >
                สตูดิโอพัฒนาระบบดิจิทัลที่รวมงานออกแบบ ประสบการณ์ใช้งาน และเทคโนโลยีให้พร้อมใช้งานในธุรกิจจริง
              </Typography>
              <Button
                href="#work"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 3.5,
                  py: 1.15,
                  boxShadow: '0 16px 42px rgba(0,0,0,0.28)',
                }}
              >
                ดูผลงาน
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box id="work" sx={{ bgcolor: palette.background, overflow: 'hidden' }}>
        <Box
          sx={{
            px: workCarouselGutter,
            pt: { xs: 7, sm: 8, md: 10, lg: 12 },
            pb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: palette.primaryPink,
              ...typeScale.hero,
              textAlign: 'center',
            }}
          >
            ผลงาน Baawork
          </Typography>
        </Box>

        <Stack spacing={0}>
          <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 4, sm: 5, md: 6 } }}>
            <Stack
              spacing={1.25}
              sx={{
                px: workCarouselGutter,
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
                ระบบ AI อัจฉริยะ
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={aiShowcaseCards} label="ผลงานระบบ AI" />
          </Box>

          <Box sx={{ bgcolor: '#F7F8FA', py: { xs: 6, sm: 7, md: 8 } }}>
            <Stack
              spacing={1.25}
              sx={{
                px: workCarouselGutter,
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
                ระบบเว็บแอป
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={webAppShowcaseCards} label="ผลงานระบบ Web App" />
          </Box>
        </Stack>

        <ToolStackSection />
        <WorkflowSection />
        <ResultsSection />
      </Box>
    </Box>
  );
}
