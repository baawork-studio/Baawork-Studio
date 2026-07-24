export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  purposeParagraphs?: string[];
  coverImageUrl: string;
  galleryImageUrls: string[];
  detailImageUrl?: string;
  screenImageUrls?: Partial<Record<'desktop' | 'mobile' | 'mobile1' | 'mobile2' | 'mobile3', string>>;
  stack: string[];
  highlights: string[];
};

const project = (
  data: Omit<Project, 'galleryImageUrls'> & { galleryImageUrls?: string[] },
): Project => ({
  ...data,
  galleryImageUrls: data.galleryImageUrls ?? [data.coverImageUrl],
});

export const projectCatalog: Project[] = [
  project({
    slug: 'linora-facebook-page-analytics',
    title: 'Linora วิเคราะห์เพจ Facebook',
    subtitle: 'LIFF Web App สำหรับสรุปสุขภาพเพจและโอกาสพัฒนาคอนเทนต์',
    shortDescription: 'เว็บแอปบน LINE สำหรับวิเคราะห์โพสต์ คอมเมนต์ และการมีส่วนร่วมของเพจ Facebook',
    description: 'Linora ช่วยผู้ดูแลเพจ Facebook เห็นภาพรวมของเพจจากข้อมูลที่เลือกใช้งานจริง พร้อมคำแนะนำที่นำไปใช้พัฒนาคอนเทนต์ได้ทันที',
    coverImageUrl: '/showcase/showcase-linora.png',
    detailImageUrl: '/project-details/linora.png',
    stack: ['React', 'TypeScript', 'MUI', 'Go', 'PostgreSQL', 'OpenAI'],
    highlights: ['เลือกและเชื่อมต่อเพจ Facebook ที่ผู้ใช้ดูแล', 'สรุปสุขภาพเพจ โพสต์ และการมีส่วนร่วม', 'คำแนะนำสำหรับการวางแผนคอนเทนต์'],
  }),
  project({
    slug: 'shadow-ceo-business-assistant',
    title: 'Shadow CEO',
    subtitle: 'AI Business Assistant บน LINE สำหรับเจ้าของธุรกิจ',
    shortDescription: 'ผู้ช่วยบน LINE ที่สรุปข้อมูลสำคัญและช่วยติดตามงานของธุรกิจ',
    description: 'Shadow CEO ช่วยเจ้าของธุรกิจอ่านภาพรวมและประเด็นสำคัญจากข้อมูลที่เชื่อมต่อ โดยสื่อสารผ่าน LINE ในรูปแบบที่นำไปตัดสินใจต่อได้ง่าย',
    coverImageUrl: '/showcase/showcase-example.png',
    detailImageUrl: '/project-details/example.png',
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'LINE LIFF', 'OpenAI'],
    highlights: ['สรุปประเด็นธุรกิจผ่าน LINE', 'ติดตามงานและการแจ้งเตือนสำคัญ', 'ออกแบบสำหรับผู้บริหารที่ต้องการข้อมูลกระชับ'],
  }),
  project({
    slug: 'rentflow-car-rental-platform',
    title: 'RentFlowCar ระบบบริหารธุรกิจรถเช่า',
    subtitle: 'แพลตฟอร์มจัดการธุรกิจรถเช่าสำหรับลูกค้า ร้าน และพาร์ทเนอร์',
    shortDescription: 'รวมการค้นหาและจองรถ การจัดการร้าน และพาร์ทเนอร์ไว้ในระบบเดียว',
    description: 'RentFlowCar เชื่อมประสบการณ์ของลูกค้า ร้านเช่ารถ และพาร์ทเนอร์เข้าด้วยกัน ตั้งแต่การค้นหารถ จองรถ และจัดการงานหลังบ้าน',
    coverImageUrl: '/showcase/showcase-rentflowcar.png',
    detailImageUrl: '/project-details/rentflowcar.png',
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: ['หน้าค้นหาและจองรถสำหรับลูกค้า', 'ระบบจัดการร้านและพาร์ทเนอร์', 'ข้อมูลธุรกิจและการดำเนินงานในที่เดียว'],
  }),
  project({
    slug: 'service-booking-template',
    title: 'ระบบจองบริการออนไลน์',
    subtitle: 'ระบบจองบริการพร้อมแดชบอร์ดสำหรับผู้ดูแล',
    shortDescription: 'ให้ลูกค้าเลือกบริการและช่วงเวลาว่าง พร้อมให้ผู้ดูแลจัดการคิวจากที่เดียว',
    description: 'ระบบจองบริการออนไลน์ช่วยให้ลูกค้าจอง ยกเลิก หรือเลื่อนนัดได้ด้วยตนเอง และให้ผู้ดูแลบริหารบริการ รายการจอง และตารางเวลาได้จากแดชบอร์ด',
    coverImageUrl: '/showcase/showcase-service-booking.png',
    detailImageUrl: '/project-details/service-booking.png',
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'WebSocket', 'LINE LIFF'],
    highlights: ['จอง ยกเลิก และเลื่อนนัดได้ด้วยตนเอง', 'จัดการบริการ ช่วงเวลา และสถานะการจอง', 'แจ้งเตือนสถานะแบบเรียลไทม์'],
  }),
  project({
    slug: 'line-membership-loyalty-platform',
    title: 'ระบบสมาชิกและสะสมแต้มบน LINE',
    subtitle: 'แพลตฟอร์มสมาชิกสำหรับร้านค้าพร้อมสิทธิประโยชน์และการดูแลลูกค้า',
    shortDescription: 'ระบบสมาชิกบน LINE สำหรับสมัครสมาชิก สะสมแต้ม และรับสิทธิประโยชน์',
    description: 'แพลตฟอร์มช่วยร้านค้าดูแลสมาชิกผ่าน LINE ตั้งแต่การสมัคร ยืนยันตัวตน ตรวจสอบสิทธิ์ และสื่อสารกับลูกค้าอย่างต่อเนื่อง',
    coverImageUrl: '/showcase/showcase-example.png',
    detailImageUrl: '/project-details/example.png',
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'LINE LIFF', 'LINE Messaging API'],
    highlights: ['สมัครและยืนยันตัวตนผ่าน LINE', 'จัดการคะแนนและสิทธิประโยชน์', 'หลังบ้านสำหรับดูแลข้อมูลสมาชิก'],
  }),
  project({
    slug: 'product-warranty-and-customer-platform',
    title: 'แพลตฟอร์มรับประกันสินค้าและดูแลลูกค้า',
    subtitle: 'ระบบตรวจสอบสินค้า ลงทะเบียนรับประกัน และสื่อสารสิทธิพิเศษผ่าน LINE',
    shortDescription: 'ตรวจสอบ Serial Number ลงทะเบียนรับประกัน และดูแลลูกค้าผ่าน LINE',
    description: 'แพลตฟอร์มหลังการขายที่ช่วยให้ลูกค้าลงทะเบียนรับประกัน ตรวจสอบสินค้า และรับข้อมูลที่เกี่ยวข้องผ่าน LINE พร้อมระบบหลังบ้านสำหรับผู้ดูแล',
    coverImageUrl: '/showcase/showcase-product-warranty.png',
    detailImageUrl: '/project-details/product-warranty.png',
    stack: ['React', 'TypeScript', 'Go', 'Gin', 'PostgreSQL', 'LINE LIFF', 'LINE Messaging API'],
    highlights: ['ตรวจสอบ Serial Number และลงทะเบียนรับประกัน', 'แสดงข้อมูลสินค้าและสิทธิประโยชน์', 'หลังบ้านจัดการข้อมูลลูกค้าและการรับประกัน'],
  }),
  project({
    slug: 'online-learning-platform-with-ai',
    title: 'แพลตฟอร์มเรียนออนไลน์พร้อม AI',
    subtitle: 'ระบบคอร์สออนไลน์สำหรับผู้เรียน ผู้สอน และผู้ดูแล',
    shortDescription: 'พื้นที่เรียนรู้และจัดการคอร์สออนไลน์ พร้อม AI ช่วยสรุปบทเรียน',
    description: 'แพลตฟอร์มเรียนออนไลน์รวมพื้นที่สำหรับผู้เรียน ผู้สอน และผู้ดูแล พร้อมเครื่องมือ AI ที่ช่วยสรุปบทเรียน ตอบคำถาม และจัดการเนื้อหา',
    coverImageUrl: '/showcase/showcase-online-learning.png',
    detailImageUrl: '/project-details/online-learning.png',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'Gemini API'],
    highlights: ['พื้นที่ใช้งานแยกตามบทบาท', 'จัดการคอร์สและติดตามการเรียนรู้', 'AI ช่วยสรุปบทเรียนและตอบคำถาม'],
  }),
];
