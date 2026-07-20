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

const allProjects: Project[] = [
  {
    slug: 'linora-facebook-page-analytics',
    title: 'Linora วิเคราะห์เพจ Facebook',
    subtitle: 'LIFF Web App สำหรับสรุปสุขภาพเพจและโอกาสพัฒนาคอนเทนต์',
    shortDescription: 'เว็บแอปบน LINE สำหรับเชื่อมต่อเพจ Facebook วิเคราะห์โพสต์ คอมเมนต์ และการมีส่วนร่วม พร้อมคำแนะนำที่นำไปใช้พัฒนาเพจได้ทันที',
    description:
      'Linora คือเว็บแอปแบบ mobile-first ที่ใช้งานผ่าน LINE Official Account เพื่อช่วยผู้ดูแลเพจ Facebook เห็นภาพรวมของเพจจากข้อมูลที่เลือกใช้งานจริง ระบบสรุปคะแนนสุขภาพเพจ ผลงานของโพสต์ คอมเมนต์ที่สำคัญ ช่วงเวลาที่เหมาะกับการโพสต์ และคำแนะนำจาก AI โดยไม่โพสต์หรือตอบกลับแทนผู้ใช้โดยอัตโนมัติ',
    coverImageUrl: '/showcase/showcase-linora.png',
    galleryImageUrls: [
      '/showcase/showcase-linora.png',
      '/showcase/showcase-linora.png',
    ],
    detailImageUrl: '/project-details/linora.png',
    stack: ['React', 'TypeScript', 'MUI', 'Go', 'PostgreSQL', 'OpenAI'],
    highlights: ['เชื่อมต่อและเลือกเพจ Facebook ที่ผู้ใช้ดูแล', 'สรุปคะแนนสุขภาพ โพสต์ คอมเมนต์ และการมีส่วนร่วม', 'แนะนำคอนเทนต์และช่วงเวลาลงโพสต์จากข้อมูลจริง'],
  },
  {
    slug: 'shadow-ceo-business-assistant',
    title: 'Shadow CEO',
    subtitle: 'AI Business Assistant บน LINE สำหรับเจ้าของธุรกิจ',
    shortDescription: 'AI Business Assistant บน LINE ที่สรุปข้อมูลล่าสุด แจ้งเตือนโอกาสสำคัญ และตอบคำถามว่า วันนี้ธุรกิจควรทำอะไรต่อ',
    description:
      'Shadow CEO คือผู้ช่วยธุรกิจแบบ LINE-first ที่อ่านข้อมูลล่าสุดแทนเจ้าของธุรกิจ แล้วสรุปสิ่งสำคัญให้ตัดสินใจได้โดยไม่ต้องเปิดแดชบอร์ด ระบบส่ง Morning CEO Brief ทุกวัน ตอบคำถามเชิงธุรกิจผ่าน LINE แจ้งเตือนเมื่อพบความผิดปกติหรือโอกาสเร่งด่วน และสรุปรายงานประจำสัปดาห์จากข้อมูล Facebook Page ผ่าน Meta Graph API พร้อมใช้ข้อมูล snapshot ล่าสุดเป็น fallback เมื่อบริการภายนอกขัดข้องชั่วคราว',
    coverImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=82',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=82',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=82',
    ],
    stack: ['Go', 'LINE Messaging API', 'Meta Graph API', 'Gemini', 'JSON Storage'],
    highlights: ['สรุป Morning CEO Brief และ Weekly CEO Report ผ่าน LINE', 'ถาม AI เรื่องสถานการณ์ธุรกิจและรับคำแนะนำที่ทำต่อได้ทันที', 'Smart Alert จากข้อมูล Facebook Page พร้อม snapshot fallback'],
  },
  {
    slug: 'ai-document-review',
    title: 'ระบบอ่านเอกสาร AI',
    subtitle: 'เครื่องมือสกัดใจความและจัดหมวดหมู่เอกสาร',
    shortDescription: 'ระบบช่วยอ่านเอกสาร สกัดใจความสำคัญ และจัดหมวดหมู่คำขอจากหน้าจอเดียว',
    description:
      'ระบบอ่านเอกสาร AI ช่วยลดเวลาการตรวจเอกสารซ้ำๆ ด้วยการดึงข้อมูลสำคัญ สรุปเนื้อหา ตรวจสถานะ และส่งต่อรายการที่ต้องให้ทีมตรวจละเอียดต่อได้อย่างเป็นระบบ',
    coverImageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=82',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=82',
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=82',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'OCR', 'Document AI'],
    highlights: ['สกัดข้อมูลสำคัญจากเอกสาร', 'จัดหมวดหมู่คำขออัตโนมัติ', 'ลดงานตรวจเอกสารที่ซ้ำและใช้เวลานาน'],
  },
  {
    slug: 'ai-service-agent',
    title: 'ผู้ช่วยบริการอัตโนมัติ',
    subtitle: 'ระบบช่วยติดตามบทสนทนาและคุณภาพบริการ',
    shortDescription: 'ระบบผู้ช่วยตอบกลับอัตโนมัติที่ติดตามบทสนทนา งานค้าง และคุณภาพบริการของทีม',
    description:
      'ผู้ช่วยบริการอัตโนมัติช่วยอ่านบริบทบทสนทนา แนะนำคำตอบ ติดตามงานค้าง และสรุปคุณภาพการให้บริการ เพื่อให้ทีมตอบกลับเร็วขึ้นโดยยังคงมาตรฐานการสื่อสาร',
    coverImageUrl: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=82',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=82',
      'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=82',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Chat Workflow', 'AI Assistant'],
    highlights: ['แนะนำคำตอบจากบริบทจริง', 'ติดตามเคสที่ยังไม่ปิด', 'ช่วยรักษาคุณภาพการบริการของทีม'],
  },
  {
    slug: 'ai-api-monitor',
    title: 'ระบบเฝ้าระวัง API',
    subtitle: 'หน้าจอแจ้งเตือน anomaly และสุขภาพระบบ',
    shortDescription: 'หน้าจอตรวจจับ anomaly ของระบบ API พร้อมแจ้งเตือนเหตุการณ์ผิดปกติก่อนกระทบผู้ใช้',
    description:
      'ระบบเฝ้าระวัง API แสดงสุขภาพ service, latency, error rate และเหตุการณ์ผิดปกติ เพื่อให้ทีมรู้ปัญหาก่อนผู้ใช้ได้รับผลกระทบ และแก้ไขได้จากข้อมูลที่ชัดเจน',
    coverImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=82',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=82',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=82',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'MUI', 'Monitoring'],
    highlights: ['ตรวจจับ error และ latency ผิดปกติ', 'แจ้งเตือนก่อนกระทบผู้ใช้', 'ดูสุขภาพ API ได้จาก dashboard เดียว'],
  },
  {
    slug: 'rentflow-car-rental-platform',
    title: 'RentFlowCar ระบบบริหารธุรกิจรถเช่า',
    subtitle: 'แพลตฟอร์มจัดการธุรกิจรถเช่าสำหรับลูกค้า ร้าน และพาร์ทเนอร์',
    shortDescription: 'แพลตฟอร์มรถเช่าแบบครบวงจรที่รวมหน้าจองรถ ระบบบริหารร้าน และพอร์ทัลพาร์ทเนอร์ไว้ในระบบเดียว',
    description:
      'RentFlowCar คือแพลตฟอร์มบริหารธุรกิจรถเช่าแบบหลายบทบาท ครอบคลุมเว็บไซต์สำหรับลูกค้าค้นหาและจองรถ แดชบอร์ดสำหรับผู้ดูแล และพอร์ทัลสำหรับร้านหรือพาร์ทเนอร์ ระบบเชื่อมข้อมูลรถ การจอง การชำระเงิน และการดำเนินงานไว้ในที่เดียว พร้อม AI ที่ช่วยสรุปภาพรวมร้าน ระบุรถที่ควรเร่งปล่อยเช่า และจัดลำดับงานที่ต้องทำต่อ',
    coverImageUrl: '/showcase/showcase-rentflowcar.png',
    galleryImageUrls: [
      '/showcase/showcase-rentflowcar.png',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=82',
    ],
    detailImageUrl: '/project-details/rentflowcar.png',
    stack: ['Next.js', 'React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'Ollama'],
    highlights: ['จองรถและจัดการการชำระเงินจากระบบเดียว', 'แยกพื้นที่ใช้งานสำหรับลูกค้า ผู้ดูแล และพาร์ทเนอร์', 'AI สรุปข้อมูลรถ การจอง และโอกาสในการบริหารร้าน'],
  },
  {
    slug: 'service-booking-template',
    title: 'ระบบจองบริการออนไลน์',
    subtitle: 'ระบบจองบริการพร้อมแดชบอร์ดสำหรับผู้ดูแล',
    shortDescription: 'เทมเพลตระบบจองบริการที่ให้ลูกค้าเลือกบริการและช่วงเวลาว่าง พร้อมจัดการรายการจองแบบเรียลไทม์',
    description:
      'ระบบจองบริการออนไลน์คือระบบจองบริการแบบครบวงจร มีหน้าเว็บสำหรับลูกค้าเลือกบริการ ตรวจสอบช่วงเวลาว่าง จอง ยกเลิก หรือเลื่อนนัดได้ด้วยตนเอง และมีแดชบอร์ดสำหรับผู้ดูแลเพื่อจัดการบริการ รายการจอง ตารางเวลา และกติกาการจอง ระบบรองรับการแจ้งเตือนแบบเรียลไทม์ผ่าน WebSocket และ Web Push รวมถึงการเชื่อมต่อ LINE LIFF และ Rich Menu สำหรับประสบการณ์การจองบน LINE',
    purposeParagraphs: [
      'ระบบจองบริการออนไลน์คือระบบจองบริการแบบครบวงจร มีหน้าเว็บสำหรับลูกค้าเลือกบริการ ตรวจสอบช่วงเวลาว่าง จอง ยกเลิก หรือเลื่อนนัดได้ด้วยตนเอง',
      'และมีแดชบอร์ดสำหรับผู้ดูแลเพื่อจัดการบริการ รายการจอง ตารางเวลา และกติกาการจอง ระบบรองรับการแจ้งเตือนแบบเรียลไทม์ผ่าน WebSocket และ Web Push รวมถึงการเชื่อมต่อ LINE LIFF และ Rich Menu สำหรับประสบการณ์การจองบน LINE',
    ],
    coverImageUrl: '/showcase/showcase-service-booking.png',
    galleryImageUrls: [
      '/showcase/showcase-service-booking.png',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=82',
    ],
    detailImageUrl: '/project-details/service-booking.png',
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'WebSocket', 'LINE LIFF'],
    highlights: ['ลูกค้าจอง ยกเลิก และเลื่อนนัดได้ด้วยตนเอง', 'ผู้ดูแลจัดการบริการ ช่วงเวลา และสถานะการจอง', 'แจ้งเตือนรายการจองและอัปเดตสถานะแบบเรียลไทม์'],
  },
  {
    slug: 'line-membership-loyalty-platform',
    title: 'ระบบสมาชิกและสะสมแต้มบน LINE',
    subtitle: 'แพลตฟอร์มสมาชิกสำหรับร้านค้าพร้อมสิทธิประโยชน์และการดูแลลูกค้า',
    shortDescription: 'ระบบสมาชิกบน LINE สำหรับสมัครสมาชิก ยืนยันตัวตน สะสมแต้ม รับสิทธิพิเศษ และจัดการข้อมูลสมาชิกจากหลังบ้าน',
    description:
      'ระบบสมาชิกและสะสมแต้มบน LINE คือแพลตฟอร์มสำหรับร้านค้าหรือธุรกิจที่ต้องการดูแลสมาชิกผ่าน LINE อย่างเป็นระบบ ลูกค้าสมัครสมาชิก ยืนยันตัวตน ดูโปรไฟล์ รับโปรโมชัน และตรวจสอบกระเป๋าแต้มได้ผ่าน LIFF ขณะที่ผู้ดูแลจัดการใบสมัครสมาชิก อนุมัติข้อมูล ดูรายชื่อสมาชิก และส่งการแจ้งเตือนได้จากแดชบอร์ดเดียว ระบบเชื่อมต่อ LINE Messaging API, Rich Menu และ Web Push เพื่อให้การสื่อสารกับสมาชิกต่อเนื่อง',
    coverImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=82',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=82',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=82',
    ],
    stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Redis', 'LINE LIFF', 'LINE Messaging API'],
    highlights: ['สมัครสมาชิกและยืนยันตัวตนผ่าน LINE', 'กระเป๋าแต้มและสิทธิประโยชน์สำหรับสมาชิก', 'หลังบ้านจัดการใบสมัคร สมาชิก และการแจ้งเตือน'],
  },
  {
    slug: 'product-warranty-and-customer-platform',
    title: 'แพลตฟอร์มรับประกันสินค้าและดูแลลูกค้า',
    subtitle: 'ระบบตรวจสอบสินค้า ลงทะเบียนรับประกัน และสื่อสารสิทธิพิเศษผ่าน LINE',
    shortDescription: 'แพลตฟอร์มสำหรับตรวจ Serial Number ลงทะเบียนรับประกัน ดูข้อมูลสินค้า และส่งต่อโปรโมชันให้ลูกค้าผ่าน LINE',
    description:
      'แพลตฟอร์มรับประกันสินค้าและดูแลลูกค้ารวมประสบการณ์หลังการขายไว้บน LINE LIFF ให้ลูกค้าตรวจสอบ Serial Number และลงทะเบียนรับประกันสินค้าได้ด้วยตนเอง พร้อมเลือกดูข้อมูลผลิตภัณฑ์และโปรโมชันจากหน้าจอเดียว ฝั่งผู้ดูแลมีแดชบอร์ดจัดการ Serial Number รายการลงทะเบียนรับประกัน ข้อมูลลูกค้า ผลิตภัณฑ์ และโปรโมชัน โดยเชื่อมต่อผ่าน Go/Gin API เพื่อให้ข้อมูลทั้งระบบทำงานต่อเนื่อง',
    coverImageUrl: '/showcase/showcase-product-warranty.png',
    galleryImageUrls: [
      '/showcase/showcase-product-warranty.png',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=82',
    ],
    detailImageUrl: '/project-details/product-warranty.png',
    stack: ['React', 'TypeScript', 'Go', 'Gin', 'PostgreSQL', 'LINE LIFF', 'LINE Messaging API'],
    highlights: ['ตรวจสอบ Serial Number และลงทะเบียนรับประกันผ่าน LINE', 'แสดงข้อมูลผลิตภัณฑ์และโปรโมชันสำหรับลูกค้า', 'หลังบ้านจัดการสินค้า Serial Number การรับประกัน และข้อมูลลูกค้า'],
  },
  {
    slug: 'online-learning-platform-with-ai',
    title: 'แพลตฟอร์มเรียนออนไลน์พร้อม AI',
    subtitle: 'ระบบคอร์สออนไลน์สำหรับผู้เรียน ผู้สอน และผู้ดูแล',
    shortDescription: 'เว็บแอปจัดการคอร์สออนไลน์ที่แยกพื้นที่สำหรับผู้เรียน ผู้สอน และผู้ดูแล พร้อม AI ช่วยสรุปบทเรียนและสร้างแบบทดสอบ',
    description:
      'แพลตฟอร์มเรียนออนไลน์พร้อม AI เป็นเว็บแอปสำหรับจัดการคอร์สและการเรียนรู้แบบหลายบทบาท ผู้เรียนเข้าถึงคอร์สและแดชบอร์ดการเรียน ผู้สอนจัดการเนื้อหาและติดตามคอร์ส ขณะที่ผู้ดูแลดูภาพรวมทั้งระบบได้จากแดชบอร์ดกลาง ระบบเตรียม API สำหรับ AI เพื่อถอดบทเรียน สรุปเนื้อหา ตอบคำถามจากบทเรียน และสร้างแบบทดสอบ โดยเชื่อมต่อผู้ให้บริการภายนอก เช่น Gemini API ได้',
    coverImageUrl: '/showcase/showcase-online-learning.png',
    galleryImageUrls: [
      '/showcase/showcase-online-learning.png',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=82',
    ],
    detailImageUrl: '/project-details/online-learning.png',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'Gemini API'],
    highlights: ['พื้นที่เรียนรู้สำหรับผู้เรียน ผู้สอน และผู้ดูแล', 'จัดการคอร์สและดูแดชบอร์ดตามบทบาทผู้ใช้', 'AI สรุปบทเรียน ตอบคำถาม และสร้างแบบทดสอบ'],
  },
];

const publishedProjectSlugs = new Set([
  'linora-facebook-page-analytics',
  'shadow-ceo-business-assistant',
  'rentflow-car-rental-platform',
  'service-booking-template',
  'line-membership-loyalty-platform',
  'product-warranty-and-customer-platform',
  'online-learning-platform-with-ai',
]);

export const projectCatalog = allProjects.filter((project) => publishedProjectSlugs.has(project.slug));
