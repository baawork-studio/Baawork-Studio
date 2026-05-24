import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { fetchProject, type Project } from '../api/projects';
import { fallbackProjects } from '../data/fallbackProjects';
import { palette, typeScale } from '../theme';

type ProjectDetailPageProps = {
  slug: string;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';
const detailCarouselVerticalGap = '24px';
const detailCarouselEdgeTolerance = 24;

type MockupTemplate = 'macbook' | 'macbookMobile' | 'mobiles';
type ScreenImageKey = 'desktop' | 'mobile' | 'mobile1' | 'mobile2' | 'mobile3';
type ScreenSlot = {
  key: ScreenImageKey;
  left: string;
  top: string;
  width: string;
  height: string;
  mask: string;
};
type CapabilityCard = {
  title: string;
  description: string;
};

const mockupAssets: Record<MockupTemplate, string> = {
  macbook: '/project-detail-macbook.png',
  macbookMobile: '/project-detail-macbook-mobile.png',
  mobiles: '/project-detail-mobiles.png',
};

const screenSlots: Record<MockupTemplate, ScreenSlot[]> = {
  macbook: [
    {
      key: 'desktop',
      left: '31.0417%',
      top: '19.4444%',
      width: '41.4062%',
      height: '46.8519%',
      mask: '/project-screen-masks/macbook-screen.png',
    },
  ],
  macbookMobile: [
    {
      key: 'desktop',
      left: '31.0417%',
      top: '19.4444%',
      width: '41.4062%',
      height: '46.8519%',
      mask: '/project-screen-masks/macbook-mobile-desktop.png',
    },
    {
      key: 'mobile',
      left: '70.4167%',
      top: '37.8704%',
      width: '11.3542%',
      height: '43.6111%',
      mask: '/project-screen-masks/macbook-mobile-phone.png',
    },
  ],
  mobiles: [
    {
      key: 'mobile1',
      left: '28.8021%',
      top: '26.7593%',
      width: '13.2812%',
      height: '53.6111%',
      mask: '/project-screen-masks/mobiles-left.png',
    },
    {
      key: 'mobile2',
      left: '42.0833%',
      top: '19.6296%',
      width: '15.8333%',
      height: '60.6481%',
      mask: '/project-screen-masks/mobiles-center.png',
    },
    {
      key: 'mobile3',
      left: '57.8646%',
      top: '26.7593%',
      width: '13.3333%',
      height: '53.6111%',
      mask: '/project-screen-masks/mobiles-right.png',
    },
  ],
};

const projectVisuals: Record<string, { accent: string; tint: string; template: MockupTemplate }> = {
  'ai-command-center': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'ai-sales-forecast': { accent: '#7C3AED', tint: '#F5F0FF', template: 'macbook' },
  'ai-document-review': { accent: '#0EA5E9', tint: '#EFF9FF', template: 'mobiles' },
  'ai-service-agent': { accent: '#10B981', tint: '#ECFDF5', template: 'macbookMobile' },
  'ai-api-monitor': { accent: '#F97316', tint: '#FFF7ED', template: 'macbook' },
  'operations-dashboard': { accent: '#FF008C', tint: '#FFF0F8', template: 'macbookMobile' },
  'booking-platform': { accent: '#2563EB', tint: '#EFF6FF', template: 'macbook' },
  'crm-workspace': { accent: '#8B5CF6', tint: '#F5F3FF', template: 'macbookMobile' },
  'inventory-control': { accent: '#059669', tint: '#ECFDF5', template: 'mobiles' },
  'analytics-portal': { accent: '#DC2626', tint: '#FEF2F2', template: 'macbook' },
};

const capabilityCardsBySlug: Record<string, CapabilityCard[]> = {
  'ai-command-center': [
    {
      title: 'รวมสถานะงาน',
      description: 'ดึงข้อมูลจากหลายทีมมาไว้ในหน้าจอเดียว เพื่อให้เห็นภาพรวมงานที่กำลังเดินอยู่แบบเรียลไทม์',
    },
    {
      title: 'วิเคราะห์ความเสี่ยง',
      description: 'สรุปเคสที่มีแนวโน้มล่าช้า ผิดปกติ หรือควรได้รับการดูแลก่อนจากสัญญาณสำคัญของระบบ',
    },
    {
      title: 'จัดลำดับเคสเร่งด่วน',
      description: 'ช่วยทีมเลือกงานที่ควรลงมือก่อน ลดเวลาค้นหาข้อมูล และทำให้การตัดสินใจแม่นยำขึ้น',
    },
    {
      title: 'สรุปสำหรับผู้บริหาร',
      description: 'เปลี่ยนข้อมูลปฏิบัติการให้เป็น insight ที่อ่านง่าย พร้อมนำไปใช้ประชุมหรือวางแผนต่อได้ทันที',
    },
  ],
  'ai-sales-forecast': [
    {
      title: 'พยากรณ์ยอดขาย',
      description: 'ประเมินแนวโน้มยอดขายจากข้อมูล pipeline และประวัติลูกค้า เพื่อช่วยวางแผนเป้าหมายล่วงหน้า',
    },
    {
      title: 'แยกกลุ่มลูกค้า',
      description: 'ช่วยระบุลูกค้าที่มีโอกาสปิดการขายสูง เพื่อให้ทีมขายโฟกัสกับงานที่มีผลต่อรายได้มากที่สุด',
    },
    {
      title: 'ติดตาม performance',
      description: 'แสดงตัวเลขสำคัญของทีมขายในหน้าเดียว พร้อมเทียบผลลัพธ์กับเป้าหมายของแต่ละช่วงเวลา',
    },
  ],
  'ai-document-review': [
    {
      title: 'อ่านเอกสารอัตโนมัติ',
      description: 'ช่วยสกัดข้อมูลสำคัญจากเอกสาร ลดงานอ่านซ้ำ และทำให้ทีมเห็นใจความสำคัญได้เร็วขึ้น',
    },
    {
      title: 'จัดหมวดหมู่คำขอ',
      description: 'แยกประเภทเอกสารและคำขอตามเงื่อนไขงานจริง เพื่อส่งต่อให้ทีมที่เกี่ยวข้องได้เป็นระบบ',
    },
    {
      title: 'ตรวจสถานะงานเอกสาร',
      description: 'ติดตามว่างานไหนอ่านแล้ว รอตรวจ หรือควรส่งต่อให้คนตรวจละเอียดต่อจากหน้าเดียว',
    },
  ],
  'ai-service-agent': [
    {
      title: 'แนะนำคำตอบ',
      description: 'อ่านบริบทบทสนทนาแล้วช่วยเสนอคำตอบที่เหมาะกับเคส เพื่อให้ทีมตอบกลับได้เร็วขึ้น',
    },
    {
      title: 'ติดตามงานค้าง',
      description: 'แสดงเคสที่ยังไม่ปิด งานที่รอการตอบกลับ และรายการที่ควรติดตามต่ออย่างชัดเจน',
    },
    {
      title: 'ควบคุมคุณภาพบริการ',
      description: 'สรุปคุณภาพการสื่อสารและจุดที่ควรปรับปรุง เพื่อรักษามาตรฐานของทีมบริการ',
    },
  ],
  'ai-api-monitor': [
    {
      title: 'ดูสุขภาพ API',
      description: 'ติดตาม latency, error rate และสถานะ service เพื่อให้ทีมเห็นปัญหาได้ก่อนกระทบผู้ใช้',
    },
    {
      title: 'ตรวจจับ anomaly',
      description: 'ระบุเหตุการณ์ผิดปกติจากข้อมูลระบบ และช่วยแยกเคสที่ควรตรวจสอบเร่งด่วน',
    },
    {
      title: 'แจ้งเตือนทีมดูแลระบบ',
      description: 'ส่งสัญญาณเตือนเมื่อ service มีแนวโน้มผิดปกติ เพื่อให้แก้ไขได้จากข้อมูลที่ชัดเจน',
    },
  ],
  'operations-dashboard': [
    {
      title: 'ติดตามคำขอ',
      description: 'รวมคำขอและสถานะงานจากทีมปฏิบัติการไว้ในที่เดียว เพื่อให้จัดลำดับงานประจำวันง่ายขึ้น',
    },
    {
      title: 'ดูสถานะส่งมอบ',
      description: 'แสดงงานที่กำลังดำเนินการ งานที่ติดขัด และงานที่พร้อมส่งมอบให้ตรวจสอบได้รวดเร็ว',
    },
    {
      title: 'กรองข้อมูลตามทีม',
      description: 'ช่วยให้ผู้ดูแลเลือกดูข้อมูลตามทีม ประเภทงาน หรือสถานะ เพื่อแก้ปัญหาได้ตรงจุด',
    },
  ],
  'booking-platform': [
    {
      title: 'เลือกบริการ',
      description: 'ให้ลูกค้าเลือกบริการและรายละเอียดที่ต้องการผ่านขั้นตอนที่สั้นและเข้าใจง่าย',
    },
    {
      title: 'ตรวจสอบเวลาว่าง',
      description: 'เชื่อมข้อมูลตารางจริงเพื่อให้เห็นช่วงเวลาที่จองได้ และลดการจองซ้ำหรือชนกัน',
    },
    {
      title: 'จัดการหลังบ้าน',
      description: 'ให้ทีมดูรายการจอง ปรับสถานะ และจัดการตารางบริการได้จากระบบเดียว',
    },
  ],
  'crm-workspace': [
    {
      title: 'รวมข้อมูลลูกค้า',
      description: 'รวมประวัติลูกค้า บทสนทนา และงานขายไว้ในหน้าเดียว เพื่อให้ทีมเห็นบริบทครบก่อนติดต่อ',
    },
    {
      title: 'ติดตาม follow-up',
      description: 'แจ้งเตือนงานติดตามและกิจกรรมถัดไป เพื่อให้ทีมขายไม่พลาดจังหวะสำคัญ',
    },
    {
      title: 'ดู pipeline งานขาย',
      description: 'แสดงสถานะดีลและขั้นตอนการขาย ช่วยให้ทีมวางแผนปิดงานได้เป็นระบบมากขึ้น',
    },
  ],
  'inventory-control': [
    {
      title: 'ตรวจนับสินค้า',
      description: 'ช่วยทีมตรวจนับและอัปเดตจำนวนสินค้าให้เป็นปัจจุบันจาก workflow ที่ใช้งานง่าย',
    },
    {
      title: 'แจ้งเตือนสต็อกต่ำ',
      description: 'แสดงรายการที่ควรเติมหรือควรตรวจสอบก่อน เพื่อป้องกันสินค้าขาดหรือข้อมูลคลาดเคลื่อน',
    },
    {
      title: 'เชื่อม Barcode Workflow',
      description: 'รองรับการทำงานกับรหัสสินค้าและกระบวนการตรวจนับที่ต้องใช้ข้อมูลจริงในคลัง',
    },
  ],
  'analytics-portal': [
    {
      title: 'รวม KPI สำคัญ',
      description: 'รวมตัวเลขหลักของธุรกิจไว้ในหน้ารายงานเดียว เพื่อให้ผู้บริหารเห็นภาพรวมได้เร็ว',
    },
    {
      title: 'เปรียบเทียบแนวโน้ม',
      description: 'แสดงกราฟและข้อมูลเปรียบเทียบตามช่วงเวลา เพื่อช่วยมองเห็นการเปลี่ยนแปลงที่สำคัญ',
    },
    {
      title: 'ต่อยอดรายงานใหม่',
      description: 'ออกแบบโครงสร้างข้อมูลให้เพิ่มรายงานหรือมุมมองใหม่ได้ง่ายเมื่อธุรกิจขยายต่อ',
    },
  ],
};

function getProjectVisual(project: Project) {
  return projectVisuals[project.slug] ?? {
    accent: palette.primaryPink,
    tint: '#FFF0F8',
    template: 'macbookMobile' as const,
  };
}

function useDetailCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({ canScrollPrev: false, canScrollNext: false });

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const nextState = {
      canScrollPrev: carousel.scrollLeft > detailCarouselEdgeTolerance,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - detailCarouselEdgeTolerance,
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
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  };
}

function getCapabilityCards(project: Project) {
  const cards = capabilityCardsBySlug[project.slug] ?? project.highlights.map((highlight) => ({
    title: highlight,
    description: `ออกแบบให้ทีมใช้ ${highlight} ได้จากระบบเดียว พร้อมเชื่อมข้อมูลจริงและต่อยอด workflow ได้ในระยะยาว`,
  }));

  const supportCards: CapabilityCard[] = [
    {
      title: 'เชื่อมต่อข้อมูลจริง',
      description: 'ต่อข้อมูลจาก API ฐานข้อมูล และระบบหลังบ้าน เพื่อให้สิ่งที่แสดงในหน้าใช้งานตรงกับข้อมูลจริง',
    },
    {
      title: 'ใช้งานได้ทุกอุปกรณ์',
      description: 'วาง responsive layout ให้เหมาะกับ desktop, tablet และ mobile เพื่อให้ทีมเข้าถึงงานได้สะดวก',
    },
    {
      title: 'ต่อยอดระบบได้',
      description: 'จัดโครงสร้างหน้าบ้าน หลังบ้าน และข้อมูลให้เพิ่มฟีเจอร์ใหม่ได้ง่ายเมื่อ workflow เติบโต',
    },
  ];

  const nextCards = [...cards];
  for (const supportCard of supportCards) {
    if (nextCards.length >= 5) break;
    if (!nextCards.some((card) => card.title === supportCard.title)) {
      nextCards.push(supportCard);
    }
  }

  return nextCards;
}

const techIcons: Record<string, { src?: string; label?: string; invert?: boolean }> = {
  React: { src: 'https://thesvg.org/icons/react/default.svg' },
  Vite: { src: 'https://thesvg.org/icons/vite/default.svg' },
  TypeScript: { src: 'https://thesvg.org/icons/typescript/default.svg' },
  MUI: { src: 'https://thesvg.org/icons/mui/default.svg' },
  Axios: { src: 'https://thesvg.org/icons/axios/default.svg' },
  Go: { src: 'https://thesvg.org/icons/go/dark.svg', invert: true },
  Gin: { label: 'Gin' },
  PostgreSQL: { src: 'https://thesvg.org/icons/postgresql/default.svg' },
  Redis: { src: 'https://thesvg.org/icons/redis/default.svg' },
  'REST API': { label: 'API' },
  SQL: { label: 'SQL' },
  OCR: { label: 'OCR' },
  'AI Workflow': { label: 'AI' },
  'Forecast Model': { label: 'ML' },
  'Document AI': { label: 'Doc' },
  'Chat Workflow': { label: 'Chat' },
  'AI Assistant': { label: 'AI' },
  Monitoring: { label: 'Mon' },
  'Barcode Workflow': { label: 'Code' },
  'Data Visualization': { label: 'Chart' },
};

function getTechReason(project: Project) {
  if (project.slug.startsWith('ai-')) {
    return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อให้หน้าจอทำงานเร็ว เชื่อมต่อ API และประมวลผลข้อมูล AI ได้เป็นระบบ ตั้งแต่การดึงข้อมูล วิเคราะห์ผล ไปจนถึงส่ง insight ให้ทีมใช้งานจริง`;
  }

  return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อสร้างเว็บแอปที่ดูแลง่าย เชื่อมต่อข้อมูลจริงได้ครบ และรองรับ workflow หลังบ้านที่ทีมต้องใช้งานต่อเนื่องทุกวัน`;
}

const descriptionHighlightTerms = [
  'หน้าจอเดียว',
  'ความเสี่ยง',
  'เคสเร่งด่วน',
  'สัญญาณ',
  'การตัดสินใจเร็วและแม่นยำขึ้น',
  'คาดการณ์ยอดขาย',
  'พฤติกรรมลูกค้า',
  'โอกาสปิดการขาย',
  'สกัดข้อมูลสำคัญ',
  'จัดหมวดหมู่คำขอ',
  'แนะนำคำตอบ',
  'ติดตามงานค้าง',
  'error rate',
  'เหตุการณ์ผิดปกติ',
  'คำขอ',
  'สถานะส่งมอบ',
  'ตรวจสอบช่วงเวลาว่าง',
  'ยืนยันรายการ',
  'ประวัติการติดต่อ',
  'follow-up',
  'จำนวนสินค้า',
  'รายการที่ต้องเติม',
  'ตัวเลขสำคัญ',
  'insight',
];

function getDescriptionHighlightTerms(project: Project) {
  return Array.from(new Set([...project.highlights, ...descriptionHighlightTerms]))
    .filter((term) => project.description.includes(term))
    .sort((a, b) => b.length - a.length);
}

function renderHighlightedDescription(project: Project, accent: string) {
  const terms = getDescriptionHighlightTerms(project);
  const nodes = [];
  let remaining = project.description;
  let key = 0;

  while (remaining.length > 0) {
    const nextMatch = terms
      .map((term) => ({ term, index: remaining.indexOf(term) }))
      .filter((match) => match.index >= 0)
      .sort((a, b) => a.index - b.index || b.term.length - a.term.length)[0];

    if (!nextMatch) {
      nodes.push(remaining);
      break;
    }

    if (nextMatch.index > 0) {
      nodes.push(remaining.slice(0, nextMatch.index));
    }

    nodes.push(
      <Box
        key={`${nextMatch.term}-${key}`}
        component="span"
        sx={{
          color: accent,
          fontWeight: 700,
        }}
      >
        {nextMatch.term}
      </Box>,
    );

    remaining = remaining.slice(nextMatch.index + nextMatch.term.length);
    key += 1;
  }

  return nodes;
}

function getScreenImage(project: Project, key: ScreenImageKey, index: number) {
  const explicitImage = project.screenImageUrls?.[key];
  if (explicitImage) return explicitImage;

  if (key === 'mobile') {
    return project.screenImageUrls?.mobile1 ?? project.galleryImageUrls[1] ?? project.coverImageUrl;
  }

  const fallbackImages = Array.from(new Set([
    project.coverImageUrl,
    ...project.galleryImageUrls,
  ].filter(Boolean)));

  return fallbackImages[index % fallbackImages.length] ?? project.coverImageUrl;
}

function ProjectDeviceShowcase({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const slots = screenSlots[visual.template];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 960, md: 1260, lg: 1440 },
        mx: 'auto',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={mockupAssets[visual.template]}
        alt={`${project.title} บนหน้าจออุปกรณ์`}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />

      {slots.map((slot, index) => {
        const imageUrl = getScreenImage(project, slot.key, index);

        return (
          <Box
            key={`${slot.key}-${slot.mask}`}
            sx={{
              position: 'absolute',
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
              overflow: 'hidden',
              WebkitMaskImage: `url(${slot.mask})`,
              maskImage: `url(${slot.mask})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={`${project.title} ${slot.key}`}
              loading="lazy"
              decoding="async"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

function ProjectPurposeSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Stack
      spacing={{ xs: 2.25, sm: 2.75, md: 3.25 }}
      alignItems="center"
      textAlign="center"
      sx={{
        width: '100%',
        maxWidth: 1180,
        mx: 'auto',
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: visual.accent,
          ...typeScale.display,
        }}
      >
        สร้างมาเพื่ออะไร
      </Typography>
      <Typography
        sx={{
          color: '#86868B',
          ...typeScale.intro,
          maxWidth: 1080,
          mx: 'auto',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {renderHighlightedDescription(project, visual.accent)}
      </Typography>
    </Stack>
  );
}

function ProjectCapabilitySection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);
  const cards = getCapabilityCards(project);
  const { carouselRef, carouselState, scrollCards } = useDetailCarousel();
  const fallbackImages = Array.from(new Set([project.coverImageUrl, ...project.galleryImageUrls].filter(Boolean)));

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
      <Stack
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
      </Stack>

      <Box
        ref={carouselRef}
        aria-label={`รายละเอียดการทำงานของ ${project.title}`}
        sx={{
          mt: 0,
          display: 'flex',
          gap: { xs: 2, md: '20px' },
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
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
          const imageUrl = fallbackImages[index % fallbackImages.length] ?? project.coverImageUrl;

          return (
            <Box
              key={card.title}
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
                '&:hover img': {
                  transform: 'scale(1.035)',
                },
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={card.title}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.04) contrast(1.02)',
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
                    'linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 42%, rgba(0,0,0,0.14) 72%, rgba(0,0,0,0.22) 100%)',
                  zIndex: 1,
                }}
              />
              <Stack
                spacing={{ xs: 1.7, md: 2.5 }}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  p: { xs: '28px', md: '32px' },
                  pr: { xs: '32px', md: '34px' },
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
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.78)',
                    ...typeScale.body,
                  }}
                >
                  {card.description}
                </Typography>
              </Stack>
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  right: { xs: 22, md: 28 },
                  bottom: { xs: 22, md: 28 },
                  zIndex: 2,
                  display: 'grid',
                  placeItems: 'center',
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,255,255,0.94)',
                  color: visual.accent,
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
      </Stack>
    </Box>
  );
}

function ProjectTechSection({ project }: { project: Project }) {
  const visual = getProjectVisual(project);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(360px, 0.85fr) minmax(420px, 1fr)' },
        alignItems: 'center',
        gap: { xs: 4, md: 7, lg: 9 },
        mt: { xs: 1, md: 2 },
      }}
    >
      <Stack spacing={{ xs: 1.75, md: 2.25 }} sx={{ maxWidth: 620, alignItems: 'flex-start', textAlign: 'left' }}>
        <Typography
          variant="h2"
          sx={{
            color: visual.accent,
            ...typeScale.display,
            fontWeight: 600,
          }}
        >
          เทคโนโลยีที่ใช้
        </Typography>
        <Typography
          sx={{
            maxWidth: 620,
            color: '#4B5563',
            ...typeScale.bodyLarge,
          }}
        >
          {getTechReason(project)}
        </Typography>
      </Stack>

      <Box
        aria-label={`เทคโนโลยีที่ใช้ใน ${project.title}`}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, minmax(0, 1fr))',
            sm: 'repeat(5, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 1.5, md: 1.8 },
          justifySelf: { xs: 'stretch', md: 'end' },
          width: '100%',
          maxWidth: { xs: '100%', md: 520 },
        }}
      >
        {project.stack.map((item) => {
          const icon = techIcons[item] ?? { label: item.slice(0, 4) };

          return (
            <Box
              key={item}
              title={item}
              sx={{
                aspectRatio: '1 / 1',
                display: 'grid',
                placeItems: 'center',
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
                    width: { xs: 34, sm: 38, md: 44 },
                    height: { xs: 34, sm: 38, md: 44 },
                    objectFit: 'contain',
                    filter: icon.invert
                      ? 'invert(1) drop-shadow(0 10px 24px rgba(17,24,39,0.12))'
                      : 'drop-shadow(0 10px 24px rgba(17,24,39,0.12))',
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
          );
        })}
      </Box>
    </Box>
  );
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const fallback = useMemo(
    () => fallbackProjects.find((project) => project.slug === slug) ?? fallbackProjects[0],
    [slug],
  );
  const [project, setProject] = useState<Project>(fallback);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    let active = true;

    fetchProject(slug)
      .then((item) => {
        if (!active) return;
        setProject(item);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        setProject(fallback);
        setStatus('fallback');
      });

    return () => {
      active = false;
    };
  }, [fallback, slug]);

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

          <ProjectDeviceShowcase project={project} />

          <Stack spacing={{ xs: 4, md: 5 }} sx={{ width: '100%' }}>
            <ProjectPurposeSection project={project} />
            <ProjectCapabilitySection project={project} />
            <ProjectTechSection project={project} />
          </Stack>

          {status === 'fallback' && (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: palette.accentYellow, fontWeight: 600 }}>
              กำลังแสดงเนื้อหาตัวอย่างในเครื่อง เพราะ API ยังไม่พร้อมใช้งาน
            </Box>
          )}

          <Grid container spacing={2}>
            {project.galleryImageUrls.map((imageUrl) => (
              <Grid key={imageUrl} size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src={imageUrl}
                  alt={project.title}
                  sx={{ width: '100%', height: 330, objectFit: 'cover', borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2}>
                <Typography variant="h4">
                  จุดเด่น
                </Typography>
                <Stack
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                    gap: 2,
                  }}
                >
                  {project.highlights.map((highlight) => (
                    <Box key={highlight} sx={{ p: 2.5, borderLeft: `4px solid ${palette.primaryPink}`, bgcolor: palette.softGray }}>
                      <Typography>{highlight}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
