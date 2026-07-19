import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Stack } from "../../components/Stack";
import type { Project } from "../../data/fallbackProjects";
import { palette, typeScale } from "../../theme";
import { capabilityCardsBySlug, defaultSystemPreviewCopy, descriptionHighlightTerms, detailCarouselEdgeTolerance, projectVisuals, systemPreviewCopyBySlug } from "./data";
import type { CapabilityCard, CapabilityDetailRow, DetailFlowStep, DetailInfoCard, ScreenImageKey, SystemPreviewItem } from "./types";

export function getProjectVisual(project: Project) {
  return projectVisuals[project.slug] ?? {
    accent: palette.primaryPink,
    tint: '#FFF0F8',
  };
}

export function useDetailCarousel() {
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

export function carouselControlSx(enabled: boolean) {
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
    bgcolor: enabled ? '#D2D2D7' : '#E1E1E6',
    color: enabled ? '#4A4A4F' : '#9A9AA0',
    cursor: enabled ? 'pointer' : 'default',
    transition: 'background-color 180ms ease, color 180ms ease',
    '&:hover': {
      bgcolor: enabled ? '#B8B8BE' : '#E1E1E6',
      color: enabled ? '#1D1D1F' : '#9A9AA0',
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

export function getCapabilityCards(project: Project) {
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

export function getCapabilityDetailRows(project: Project, card: CapabilityCard): CapabilityDetailRow[] {
  const title = card.title;

  const patterns = [
    {
      test: /(รวม|ติดตาม|ดูสถานะ|KPI|performance)/i,
      problem: 'ข้อมูลสำคัญกระจายอยู่หลายจุด ทำให้ทีมเห็นภาพรวมช้า',
      outcome: 'เห็นสถานะล่าสุดในหน้าเดียว และรู้ทันทีว่าควรจัดการอะไรต่อ',
    },
    {
      test: /(วิเคราะห์|ตรวจจับ|ความเสี่ยง|anomaly|แนวโน้ม|พยากรณ์|เปรียบเทียบ)/i,
      problem: 'ทีมต้องอ่านข้อมูลจำนวนมากก่อนจะเห็นสัญญาณที่ควรระวัง',
      outcome: 'มองเห็นโอกาส ปัญหา และความเสี่ยงได้เร็วขึ้นก่อนกระทบงานจริง',
    },
    {
      test: /(จัดลำดับ|เร่งด่วน|แจ้งเตือน|follow-up|สต็อกต่ำ)/i,
      problem: 'งานสำคัญปะปนกับงานทั่วไป ทำให้ทีมเลือกงานก่อนหลังได้ยาก',
      outcome: 'ลดเวลาคัดกรองงาน และช่วยให้ทีมลงมือกับเรื่องสำคัญก่อน',
    },
    {
      test: /(เอกสาร|อ่าน|หมวดหมู่|คำขอ|OCR)/i,
      problem: 'เอกสารและคำขอต้องใช้เวลาคัดแยก อ่านซ้ำ และส่งต่อหลายรอบ',
      outcome: 'อ่านใจความสำคัญเร็วขึ้น ส่งต่องานถูกทีม และลดงานซ้ำของคนทำงาน',
    },
    {
      test: /(บริการ|คำตอบ|สนทนา|คุณภาพ)/i,
      problem: 'ทีมบริการต้องตอบให้เร็ว แต่ยังต้องรักษาคุณภาพและบริบทของแต่ละเคส',
      outcome: 'ตอบกลับได้เร็วขึ้น ติดตามเคสค้างได้ครบ และรักษามาตรฐานบริการ',
    },
    {
      test: /(จอง|เวลา|ตาราง|หลังบ้าน)/i,
      problem: 'การจองและการจัดตารางผิดพลาดง่ายเมื่อข้อมูลไม่ได้เชื่อมกัน',
      outcome: 'ลูกค้าจองง่ายขึ้น ทีมหลังบ้านเห็นข้อมูลตรงกัน และลดงานประสานซ้ำ',
    },
    {
      test: /(ลูกค้า|pipeline|ขาย|กลุ่ม)/i,
      problem: 'ข้อมูลลูกค้าและงานขายแยกกัน ทำให้ทีมเห็นบริบทไม่ครบก่อนติดต่อ',
      outcome: 'ทีมขายโฟกัสลูกค้าที่สำคัญ ติดตามงานต่อได้แม่น และปิดงานเป็นระบบ',
    },
    {
      test: /(สินค้า|คลัง|Barcode|ตรวจนับ)/i,
      problem: 'ข้อมูลสต็อกคลาดเคลื่อนง่ายเมื่อการตรวจนับและการอัปเดตไม่อยู่ในระบบเดียว',
      outcome: 'เห็นจำนวนล่าสุด ลดสินค้าขาด และทำงานคลังได้เป็นขั้นตอนมากขึ้น',
    },
    {
      test: /(API|ข้อมูลจริง|ต่อยอด|อุปกรณ์)/i,
      problem: 'ระบบต้องเชื่อมข้อมูลจริงและรองรับการใช้งานหลายรูปแบบตั้งแต่วันแรก',
      outcome: 'ใช้งานได้ต่อเนื่องบนอุปกรณ์หลัก และขยายฟีเจอร์เพิ่มได้ง่าย',
    },
  ];

  const matched = patterns.find((pattern) => pattern.test.test(title)) ?? {
    problem: `${project.title} ต้องทำให้ ${title} เข้าใจง่ายและใช้ได้จริง`,
    outcome: 'ทีมเห็นสิ่งที่ต้องทำต่อชัดเจนขึ้น และทำงานได้เร็วกว่าเดิม',
  };

  return [
    { label: 'โจทย์', text: matched.problem },
    { label: 'ระบบช่วย', text: card.description },
    { label: 'ผลลัพธ์', text: matched.outcome },
  ];
}


export function getTechReason(project: Project) {
  if (project.slug.startsWith('ai-')) {
    return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อให้หน้าจอทำงานเร็ว เชื่อมต่อ API และประมวลผลข้อมูล AI ได้เป็นระบบ ตั้งแต่การดึงข้อมูล วิเคราะห์ผล ไปจนถึงส่ง insight ให้ทีมใช้งานจริง`;
  }

  return `โปรเจกต์นี้ใช้ ${project.stack.join(', ')} เพื่อสร้างเว็บแอปที่ดูแลง่าย เชื่อมต่อข้อมูลจริงได้ครบ และรองรับ workflow หลังบ้านที่ทีมต้องใช้งานต่อเนื่องทุกวัน`;
}

export function getDescriptionHighlightTerms(project: Project) {
  return Array.from(new Set([...project.highlights, ...descriptionHighlightTerms]))
    .filter((term) => project.description.includes(term))
    .sort((a, b) => b.length - a.length);
}

export function renderHighlightedDescription(project: Project, accent: string, description = project.description) {
  const terms = getDescriptionHighlightTerms(project);
  const nodes = [];
  let remaining = description;
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

export function getScreenImage(project: Project, key: ScreenImageKey, index: number) {
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

export function getProjectVisualImages(project: Project) {
  return Array.from(new Set([
    project.coverImageUrl,
    ...(project.galleryImageUrls ?? []),
    getScreenImage(project, 'desktop', 0),
    getScreenImage(project, 'mobile', 1),
    getScreenImage(project, 'mobile1', 2),
    getScreenImage(project, 'mobile2', 3),
    getScreenImage(project, 'mobile3', 4),
  ].filter(Boolean)));
}

export function getProjectVisualImage(project: Project, index: number) {
  const images = getProjectVisualImages(project);
  return images[index % images.length] ?? project.coverImageUrl;
}

export function getSystemPreviewItems(project: Project): SystemPreviewItem[] {
  const copy = systemPreviewCopyBySlug[project.slug] ?? defaultSystemPreviewCopy;
  const previewImages = getProjectVisualImages(project);

  return copy.map((item, index) => ({
    ...item,
    imageUrl: previewImages[index % previewImages.length] ?? project.coverImageUrl,
  }));
}

export function isAiProject(project: Project) {
  return project.slug.startsWith('ai-') || project.stack.some((item) => /AI|ML|OCR|Forecast|Document/i.test(item));
}

export function getAudienceCards(project: Project): DetailInfoCard[] {
  if (isAiProject(project)) {
    return [
      {
        title: 'เจ้าของธุรกิจ',
        description: 'เห็นภาพรวมงาน ความเสี่ยง และสิ่งที่ควรตัดสินใจก่อนโดยไม่ต้องไล่อ่านข้อมูลหลายหน้า',
      },
      {
        title: 'หัวหน้าทีม',
        description: 'ติดตามงานค้าง เคสสำคัญ และผลลัพธ์ของทีมได้ชัดขึ้น ทำให้จัดลำดับงานได้เร็ว',
      },
      {
        title: 'ทีมปฏิบัติการ',
        description: 'รู้ว่าต้องทำอะไรต่อจากหน้าจอเดียว ลดการค้นหาข้อมูลและลดงานประสานซ้ำ',
      },
      {
        title: 'ทีมดูแลลูกค้า',
        description: 'เข้าใจบริบทของแต่ละเคสเร็วขึ้น พร้อมข้อมูลช่วยตอบกลับและติดตามงานต่อได้ครบ',
      },
    ];
  }

  return [
    {
      title: 'เจ้าของธุรกิจ',
      description: 'ดูภาพรวมงานและสถานะระบบหลังบ้านได้ง่ายขึ้น เห็นจุดที่ต้องปรับปรุงหรือเร่งจัดการ',
    },
    {
      title: 'ทีมแอดมิน',
      description: 'จัดการข้อมูล คำขอ รายการ และสถานะงานจากระบบเดียว ลดการทำงานข้ามหลายเครื่องมือ',
    },
    {
      title: 'ทีมขายและบริการ',
      description: 'เห็นข้อมูลลูกค้าหรือรายการงานที่เกี่ยวข้องครบขึ้น ทำให้ติดตามและให้บริการได้ต่อเนื่อง',
    },
    {
      title: 'ทีมปฏิบัติการ',
      description: 'ทำงานตาม workflow ได้ชัดเจน ตั้งแต่รับเรื่อง ตรวจสอบ อัปเดตสถานะ ไปจนถึงส่งมอบ',
    },
  ];
}

export function getWorkflowSteps(project: Project): DetailFlowStep[] {
  if (isAiProject(project)) {
    return [
      {
        label: '01',
        title: 'รับข้อมูล',
        description: 'ดึงข้อมูลจาก API ฐานข้อมูล เอกสาร หรือระบบที่ทีมใช้อยู่เข้ามารวมใน workflow เดียว',
      },
      {
        label: '02',
        title: 'วิเคราะห์',
        description: 'ประมวลผลข้อมูลด้วยเงื่อนไขงานจริงและ logic ของระบบ เพื่อหาสัญญาณที่ควรให้ความสำคัญ',
      },
      {
        label: '03',
        title: 'แจ้งเตือน',
        description: 'แยกเคสเร่งด่วน ความผิดปกติ หรือโอกาสสำคัญให้ทีมเห็นก่อนงานทั่วไป',
      },
      {
        label: '04',
        title: 'สรุปผล',
        description: 'แสดงผลเป็นหน้าจอ รายงาน หรือรายการ action ที่ทีมสามารถนำไปใช้ตัดสินใจต่อได้ทันที',
      },
    ];
  }

  return [
    {
      label: '01',
      title: 'รับรายการ',
      description: 'เก็บข้อมูลจากผู้ใช้ ระบบหลังบ้าน หรือช่องทางที่เชื่อมต่อเข้ามาให้เป็นโครงสร้างเดียวกัน',
    },
    {
      label: '02',
      title: 'จัดการงาน',
      description: 'ให้ทีมตรวจสอบ แก้ไข อัปเดตสถานะ และมอบหมายงานผ่านหน้าจอที่ออกแบบตาม workflow จริง',
    },
    {
      label: '03',
      title: 'เชื่อมข้อมูล',
      description: 'ส่งต่อข้อมูลผ่าน API ฐานข้อมูล หรือบริการภายนอก เพื่อให้ระบบทำงานต่อกันได้ครบ',
    },
    {
      label: '04',
      title: 'ส่งมอบผลลัพธ์',
      description: 'แสดงสถานะ รายงาน และข้อมูลล่าสุดให้ทีมกับลูกค้าเห็นตรงกัน ลดการประสานงานซ้ำ',
    },
  ];
}

export function getConnectionItems(project: Project) {
  const defaults = isAiProject(project)
    ? ['API', 'Database', 'เอกสาร', 'แดชบอร์ด', 'LINE', 'ระบบหลังบ้านเดิม']
    : ['API', 'Database', 'Admin', 'CRM', 'POS', 'ระบบหลังบ้านเดิม'];

  return Array.from(new Set([...defaults, ...project.stack])).slice(0, 10);
}

export function getOutcomeCards(project: Project): DetailInfoCard[] {
  const baseOutcomes = isAiProject(project)
    ? [
        {
          title: 'เห็นปัญหาเร็วขึ้น',
          description: 'ระบบช่วยชี้สัญญาณสำคัญ ความเสี่ยง หรือเคสเร่งด่วนก่อนที่งานจะสะสมเป็นปัญหาใหญ่',
        },
        {
          title: 'ลดเวลาวิเคราะห์ข้อมูล',
          description: 'ข้อมูลที่เคยต้องเปิดหลายแหล่งถูกสรุปให้อ่านง่ายขึ้น ทำให้ทีมใช้เวลากับการตัดสินใจมากกว่าไล่หาไฟล์',
        },
        {
          title: 'ตัดสินใจจากข้อมูลจริง',
          description: 'ทุกหน้าจอออกแบบให้เชื่อมข้อมูลจริงและแสดงผลตาม workflow ที่ธุรกิจใช้งานอยู่',
        },
        {
          title: 'ต่อยอดระบบได้',
          description: 'โครงสร้างรองรับการเพิ่มโมเดล รายงาน หรือการเชื่อมต่อใหม่เมื่อธุรกิจต้องการขยายต่อ',
        },
      ]
    : [
        {
          title: 'ลดงานซ้ำของทีม',
          description: 'รวมงานและข้อมูลไว้ในระบบเดียว ทำให้ทีมไม่ต้องกรอกซ้ำหรือค้นหาสถานะจากหลายช่องทาง',
        },
        {
          title: 'ทำงานเร็วขึ้น',
          description: 'หน้าจอถูกออกแบบให้เข้าถึง action สำคัญได้เร็ว เหมาะกับงานที่ต้องใช้ซ้ำทุกวัน',
        },
        {
          title: 'ข้อมูลตรงกันทั้งทีม',
          description: 'สถานะ รายการ และประวัติการอัปเดตอยู่บนฐานข้อมูลเดียว ลดความคลาดเคลื่อนในการประสานงาน',
        },
        {
          title: 'พร้อมขยายต่อ',
          description: 'วางโครงสร้าง frontend, backend และ API ให้เพิ่มฟีเจอร์ใหม่ได้โดยไม่ต้องเริ่มระบบใหม่',
        },
      ];

  return baseOutcomes.map((outcome, index) => ({
    ...outcome,
    title: project.highlights[index] ?? outcome.title,
  }));
}
