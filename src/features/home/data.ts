import carouselMobileImage from "../../assets/carousel-mobile.png";
import carouselMobileImageAlt from "../../assets/carousel-mobile-2.png";
import { palette } from "../../theme";
import type { ShowcaseCard } from "./types";

export const aiShowcaseCards: ShowcaseCard[] = [
  {
    id: 'ai-command-center',
    slug: 'ai-command-center',
    title: 'ศูนย์สั่งการ AI',
    shortDescription: 'ศูนย์วิเคราะห์งานแบบเรียลไทม์ที่สรุปสถานะ เคสเร่งด่วน และแนวโน้มความเสี่ยงให้ทีมตัดสินใจเร็วขึ้น',
    coverImageUrl: carouselMobileImageAlt.src,
    presentation: 'phoneAiDark',
  },
  {
    id: 'ai-sales-forecast',
    slug: 'ai-sales-forecast',
    title: 'ระบบคาดการณ์ยอดขาย',
    shortDescription: 'แดชบอร์ดคาดการณ์ยอดขายและพฤติกรรมลูกค้าด้วยโมเดล Machine Learning สำหรับทีมบริหาร',
    coverImageUrl: carouselMobileImage.src,
    presentation: 'phoneAiLight',
  },
  {
    id: 'ai-document-review',
    slug: 'ai-document-review',
    title: 'ระบบอ่านเอกสาร AI',
    shortDescription: 'ระบบช่วยอ่านเอกสาร สกัดใจความสำคัญ และจัดหมวดหมู่คำขอจากหน้าจอเดียว',
    coverImageUrl: carouselMobileImage.src,
    presentation: 'phoneAiLight',
  },
  {
    id: 'ai-service-agent',
    slug: 'ai-service-agent',
    title: 'ผู้ช่วยบริการอัตโนมัติ',
    shortDescription: 'ระบบผู้ช่วยตอบกลับอัตโนมัติที่ติดตามบทสนทนา งานค้าง และคุณภาพบริการของทีม',
    coverImageUrl: carouselMobileImageAlt.src,
    presentation: 'phoneAiDark',
  },
  {
    id: 'ai-devops-monitor',
    slug: 'ai-api-monitor',
    title: 'ระบบเฝ้าระวัง API',
    shortDescription: 'หน้าจอตรวจจับ anomaly ของระบบ API พร้อมแจ้งเตือนเหตุการณ์ผิดปกติก่อนกระทบผู้ใช้',
    coverImageUrl: carouselMobileImage.src,
    presentation: 'phoneAiLight',
  },
];

export const webAppShowcaseCards: ShowcaseCard[] = [
  {
    id: 'operations-dashboard',
    slug: 'operations-dashboard',
    title: 'แดชบอร์ดควบคุมงาน',
    shortDescription: 'ระบบติดตามคำขอ สถานะงาน และการส่งมอบสำหรับทีมปฏิบัติการที่ต้องดูข้อมูลหลายมุมพร้อมกัน',
    coverImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'booking-platform',
    slug: 'booking-platform',
    title: 'ระบบจองบริการออนไลน์',
    shortDescription: 'เว็บแอปสำหรับเลือกบริการ ตรวจสอบเวลาว่าง และยืนยันการจองได้ทันทีจากทุกอุปกรณ์',
    coverImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'crm-workspace',
    slug: 'crm-workspace',
    title: 'พื้นที่ทำงาน CRM',
    shortDescription: 'ระบบจัดการลูกค้า งานขาย และประวัติการติดต่อในหน้าเดียวเพื่อให้ทีมทำงานต่อเนื่อง',
    coverImageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'inventory-control',
    slug: 'inventory-control',
    title: 'ระบบจัดการสต็อก',
    shortDescription: 'เว็บแอปสำหรับตรวจนับสินค้า อัปเดตสถานะ และดูคำเตือนเมื่อจำนวนคงเหลือต่ำกว่ากำหนด',
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'analytics-portal',
    slug: 'analytics-portal',
    title: 'พอร์ทัลวิเคราะห์ธุรกิจ',
    shortDescription: 'หน้ารายงานผู้บริหารที่รวมตัวเลขสำคัญ กราฟเปรียบเทียบ และ insight เพื่อใช้ตัดสินใจเร็วขึ้น',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
];

export const workCarouselGutter = 'clamp(24px, 6.27vw, 127.5px)';
export const workCarouselVerticalGap = '24px';
export const workCarouselEdgeTolerance = 24;

export const audienceGroups = [
  { mark: 'B2B', label: 'องค์กรเอกชน', accent: '#FF008C' },
  { mark: 'GOV', label: 'หน่วยงานภาครัฐ', accent: '#2563EB' },
  { mark: 'OPS', label: 'ทีมปฏิบัติการ', accent: '#0F9DA8' },
  { mark: 'SME', label: 'ธุรกิจเติบโต', accent: '#7C3AED' },
  { mark: 'RTL', label: 'ค้าปลีกและบริการ', accent: '#F15A24' },
  { mark: 'HQ', label: 'องค์กรหลายสาขา', accent: '#111827' },
] as const;

export const toolLogos = [
  { title: 'React', src: '/tools/react.svg', x: 8, y: 12, mobileX: 12, mobileY: 10, size: 92, mobileSize: 66, delay: 0.02 },
  { title: 'Next.js', src: '/tools/nextdotjs.svg', x: 27, y: 16, mobileX: 39, mobileY: 16, size: 118, mobileSize: 88, delay: 0.08 },
  { title: 'Tailwind CSS', src: '/tools/tailwindcss.svg', x: 45, y: 23, mobileX: 68, mobileY: 10, size: 82, mobileSize: 62, delay: 0.14 },
  { title: 'MUI', src: '/tools/mui.svg', x: 63, y: 14, mobileX: 84, mobileY: 30, size: 106, mobileSize: 74, delay: 0.2 },
  { title: 'Visual Studio Code', src: '/tools/visual-studio-code.svg', x: 80, y: 21, mobileX: 16, mobileY: 37, size: 90, mobileSize: 68, delay: 0.26 },
  { title: 'Go', src: '/tools/go-light.svg', x: 94, y: 9, mobileX: 44, mobileY: 31, size: 82, mobileSize: 62, delay: 0.32 },
  { title: 'Docker', src: '/tools/docker.svg', x: 10, y: 58, mobileX: 72, mobileY: 36, size: 98, mobileSize: 72, delay: 0.12 },
  { title: 'Redis', src: '/tools/redis.svg', x: 29, y: 69, mobileX: 92, mobileY: 58, size: 84, mobileSize: 60, delay: 0.18 },
  { title: 'Node.js', src: '/tools/nodedotjs.svg', x: 47, y: 54, mobileX: 11, mobileY: 66, size: 108, mobileSize: 76, delay: 0.24 },
  { title: 'TypeScript', src: '/tools/typescript.svg', x: 65, y: 69, mobileX: 40, mobileY: 70, size: 94, mobileSize: 66, delay: 0.3 },
  { title: 'PostgreSQL', src: '/tools/postgresql.svg', x: 81, y: 55, mobileX: 68, mobileY: 68, size: 106, mobileSize: 78, delay: 0.36 },
  { title: 'Vite', src: '/tools/vite.svg', x: 94, y: 73, mobileX: 85, mobileY: 83, size: 80, mobileSize: 60, delay: 0.42 },
] as const;

export const aiPhoneScreens = [
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

export const workflowPanels = [
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

export const resultCards = [
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

export const faqItems = [
  {
    question: 'เริ่มโปรเจกต์ต้องเตรียมอะไรบ้าง',
    answer:
      'เตรียมเป้าหมายของระบบ ผู้ใช้งานหลัก ตัวอย่างหน้าจอหรือระบบที่ชอบ และข้อมูลที่อยากให้ระบบเชื่อมต่อ ถ้ายังไม่ครบเราช่วยเรียบเรียงโจทย์ให้ชัดก่อนเริ่มได้',
  },
  {
    question: 'ใช้เวลาพัฒนานานแค่ไหน',
    answer:
      'ระยะเวลาขึ้นอยู่กับจำนวนหน้าจอ ความซับซ้อนของ workflow และการเชื่อมต่อ API โดยเริ่มจากการวาง scope ให้ชัด เพื่อให้รู้กรอบเวลาและสิ่งที่จะส่งมอบตั้งแต่ต้น',
  },
  {
    question: 'ทำระบบหลังบ้านให้ด้วยไหม',
    answer:
      'ทำได้ทั้งหน้าบ้าน หลังบ้าน ฐานข้อมูล API และหน้า admin สำหรับจัดการข้อมูลหรือ workflow ที่ทีมต้องใช้งานจริง',
  },
  {
    question: 'เชื่อมต่อ API หรือฐานข้อมูลเดิมได้ไหม',
    answer:
      'เชื่อมต่อได้ทั้ง API เดิม ฐานข้อมูล PostgreSQL และระบบ cache อย่าง Redis รวมถึงออกแบบ API ใหม่ให้รองรับการใช้งานต่อในอนาคต',
  },
  {
    question: 'หลังส่งมอบดูแลต่อได้ไหม',
    answer:
      'ดูแลต่อได้ตามขอบเขตที่ตกลงกัน เช่น ปรับแก้หน้าจอ เพิ่ม feature ตรวจปัญหา production และช่วยวางแผนการต่อยอดระบบรอบถัดไป',
  },
] as const;
