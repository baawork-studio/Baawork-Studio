import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { fetchProjects, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ShowcaseCard = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
};

const aiShowcaseCards: ShowcaseCard[] = [
  {
    id: 'ai-command-center',
    slug: 'baawork-command-center',
    title: 'ศูนย์สั่งการ AI',
    shortDescription: 'ศูนย์วิเคราะห์งานแบบเรียลไทม์ที่สรุปสถานะ เคสเร่งด่วน และแนวโน้มความเสี่ยงให้ทีมตัดสินใจเร็วขึ้น',
    coverImageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ai-sales-forecast',
    slug: 'studio-booking-flow',
    title: 'ระบบคาดการณ์ยอดขาย',
    shortDescription: 'แดชบอร์ดคาดการณ์ยอดขายและพฤติกรรมลูกค้าด้วยโมเดล Machine Learning สำหรับทีมบริหาร',
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ai-document-review',
    slug: 'baawork-command-center',
    title: 'ระบบอ่านเอกสาร AI',
    shortDescription: 'ระบบช่วยอ่านเอกสาร สกัดใจความสำคัญ และจัดหมวดหมู่คำขอจากหน้าจอเดียว',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ai-service-agent',
    slug: 'studio-booking-flow',
    title: 'ผู้ช่วยบริการอัตโนมัติ',
    shortDescription: 'ระบบผู้ช่วยตอบกลับอัตโนมัติที่ติดตามบทสนทนา งานค้าง และคุณภาพบริการของทีม',
    coverImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ai-devops-monitor',
    slug: 'baawork-command-center',
    title: 'ระบบเฝ้าระวัง API',
    shortDescription: 'หน้าจอตรวจจับ anomaly ของระบบ API พร้อมแจ้งเตือนเหตุการณ์ผิดปกติก่อนกระทบผู้ใช้',
    coverImageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
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
const workCarouselEdgeTolerance = 24;

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
  };
}

function ShowcaseCarousel({ cards, label }: { cards: ShowcaseCard[]; label: string }) {
  const { carouselRef, carouselState, scrollCards } = useShowcaseCarousel();

  return (
    <>
      <Box
        ref={carouselRef}
        aria-label={label}
        sx={{
          mt: { xs: 3, md: 4 },
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          overscrollBehaviorX: 'contain',
          pr: workCarouselGutter,
          pt: { xs: 2.5, md: 3 },
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
        {cards.map((project) => {
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
                  transform: 'scale(1.035)',
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
                  filter: 'saturate(1.04) contrast(1.02)',
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
                    'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 36%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0.18) 100%)',
                }}
              />
              <Stack
                spacing={{ xs: 1.7, md: 2.5 }}
                sx={{
                  position: 'relative',
                  zIndex: 1,
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
                  zIndex: 1,
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
                เราออกแบบและพัฒนาระบบสำหรับโชว์ผลงาน พร้อมหน้าตาที่ประณีต เครื่องมือหลังบ้านที่ใช้งานจริง และเวิร์กโฟลว์ที่เชื่อมต่อ API
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
                }}
              >
                ระบบ AI ที่คิดทันงานจริง
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
                }}
              >
                ระบบ Web App สำหรับทีมที่ต้องทำงานเร็ว
              </Typography>
            </Stack>
            <ShowcaseCarousel cards={webAppShowcaseCards} label="ผลงานระบบ Web App" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
