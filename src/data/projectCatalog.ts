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
    subtitle: 'มองเห็นผลงานของเพจ และหาไอเดียเนื้อหาที่ควรทำต่อ',
    shortDescription: 'สรุปโพสต์ ความสนใจของผู้ติดตาม และจุดที่ควรพัฒนาให้เจ้าของเพจเห็นภาพได้ในที่เดียว',
    description: 'Linora ช่วยให้คนดูแลเพจ Facebook รู้ว่าอะไรทำงานได้ดี อะไรควรปรับ และควรสื่อสารเรื่องไหนต่อ โดยไม่ต้องไล่เปิดดูข้อมูลทีละส่วน',
    purposeParagraphs: [
      'เจ้าของเพจมักมีข้อมูลอยู่มาก แต่ยังตอบยากว่าโพสต์ไหนกำลังได้ผล หรือผู้ติดตามสนใจอะไรจริง ๆ Linora จึงรวบรวมภาพรวมของเพจ โพสต์ และการมีส่วนร่วมมาเล่าให้เข้าใจง่ายในหน้าเดียว',
      'เมื่อเห็นเรื่องที่เด่นและเรื่องที่ควรปรับชัดขึ้น ทีมสามารถเลือกหัวข้อ วางจังหวะการสื่อสาร และพัฒนาคอนเทนต์ต่อได้เร็วขึ้น โดยทำงานผ่าน LINE ที่คุ้นเคย',
    ],
    coverImageUrl: '/showcase/showcase-linora.png', detailImageUrl: '/project-details/linora.png',
    stack: ['React', 'TypeScript', 'MUI', 'Go', 'Vite', 'LINE', 'Meta', 'Facebook', 'PostgreSQL', 'Redis', 'DeepSeek'],
    highlights: ['เลือกเพจที่ต้องการติดตาม', 'เห็นภาพรวมของโพสต์และผู้ติดตาม', 'รับไอเดียเพื่อนำไปทำคอนเทนต์ต่อ'],
  }),
  project({
    slug: 'shadow-ceo-business-assistant', title: 'Shadow CEO วิเคราะห์เพจ Facebook',
    subtitle: 'ผู้ช่วยที่สรุปเรื่องสำคัญของธุรกิจให้เจ้าของเห็นทันเวลา',
    shortDescription: 'ช่วยรวบรวมเรื่องที่ต้องรู้ การแจ้งเตือน และงานที่ควรติดตามไว้ใน LINE',
    description: 'Shadow CEO ทำให้เจ้าของธุรกิจเห็นเรื่องสำคัญของวันได้เร็วขึ้น และใช้เวลาตัดสินใจกับสิ่งที่ต้องทำต่อมากกว่าการตามหาข้อมูล',
    purposeParagraphs: [
      'เมื่อข้อมูลและงานกระจายอยู่หลายคน หลายรายงาน เจ้าของธุรกิจอาจพลาดเรื่องสำคัญได้ง่าย Shadow CEO รวบรวมประเด็นที่ควรดูและสรุปให้เป็นภาษากระชับใน LINE',
      'จึงเปิดดูภาพรวมได้ทุกวัน รู้ว่างานไหนควรเร่งติดตาม และถามต่อได้ทันทีเมื่ออยากรู้รายละเอียด โดยไม่ต้องสลับไปมาระหว่างหลายช่องทาง',
    ],
    coverImageUrl: '/showcase/showcase-example-hand.png', detailImageUrl: '/project-details/example-hand.png', galleryImageUrls: ['/project-details/example-hand.png'], screenImageUrls: { mobile: '/project-details/example-hand.png' },
    stack: ['React', 'TypeScript', 'Vite', 'Go', 'PostgreSQL', 'LINE LIFF', 'Meta', 'Facebook', 'Gemini API'],
    highlights: ['สรุปเรื่องสำคัญในแต่ละวัน', 'แจ้งเตือนงานและโอกาสที่ไม่ควรพลาด', 'ถามต่อได้จากช่องทางเดียว'],
  }),
  project({
    slug: 'ceo-partner-ai-automation', title: 'CEO Partner วิเคราะห์เพจ Facebook',
    subtitle: 'รายงานธุรกิจรายวัน ที่ช่วยให้เห็นสิ่งสำคัญก่อนเริ่มวัน',
    shortDescription: 'สรุปผลงานของเพจและโฆษณาเป็นข้อคิดที่นำไปใช้ต่อได้ แล้วส่งให้เจ้าของธุรกิจทุกวันผ่าน LINE',
    description: 'CEO Partner เปลี่ยนตัวเลขและข้อมูลการสื่อสารของธุรกิจให้เป็นรายงานสั้น ๆ ที่อ่านแล้วรู้ว่าควรสนใจเรื่องไหนและควรทำอะไรต่อ',
    purposeParagraphs: [
      'แทนที่จะต้องเปิดดูตัวเลขจากหลายที่ ระบบสรุปสิ่งที่เกิดขึ้นในแต่ละวันให้พร้อมอ่าน ทั้งสิ่งที่กำลังไปได้ดี เรื่องที่ควรจับตา และข้อเสนอแนะสำหรับการสื่อสารกับลูกค้า',
      'เจ้าของธุรกิจจึงเริ่มวันด้วยภาพรวมที่เข้าใจง่าย และถามต่อเรื่องยอดขาย คอนเทนต์ หรือโอกาสในตลาดได้ทันทีจาก LINE',
    ],
    coverImageUrl: '/showcase/showcase-example-hand.png', detailImageUrl: '/project-details/example-hand.png', galleryImageUrls: ['/project-details/example-hand.png'], screenImageUrls: { mobile: '/project-details/example-hand.png' },
    stack: ['Node.js', 'PostgreSQL', 'Meta', 'Facebook', 'LINE', 'DeepSeek'],
    highlights: ['รับรายงานธุรกิจทุกวัน', 'เห็นเรื่องที่ควรให้ความสำคัญก่อน', 'ถามต่อจากข้อมูลล่าสุดได้ทันที'],
  }),
  project({
    slug: 'heylth-line-health-tracking', title: 'HEYLTH ดูแลสุขภาพร่วมกับเทรนเนอร์',
    subtitle: 'ดูแลสุขภาพร่วมกันระหว่างเทรนเนอร์และลูกค้า ผ่าน LINE',
    shortDescription: 'ช่วยติดตามเป้าหมายสุขภาพ คำตอบประจำสัปดาห์ และความเปลี่ยนแปลงของลูกค้าอย่างต่อเนื่อง',
    description: 'HEYLTH ทำให้เทรนเนอร์และลูกค้าติดตามสุขภาพร่วมกันได้ง่ายขึ้น ตั้งแต่เริ่มตั้งเป้าหมาย ดูความคืบหน้า ไปจนถึงรับคำแนะนำที่เหมาะกับแต่ละคน',
    purposeParagraphs: [
      'การดูแลสุขภาพต่อเนื่องมักสะดุดเมื่อข้อมูลอยู่คนละที่หรือผู้ใช้ลืมติดตาม HEYLTH จึงรวมการเริ่มต้นใช้งาน การตอบคำถาม และการดูความคืบหน้าไว้ใน LINE',
      'ลูกค้าเห็นภาพสุขภาพของตัวเองได้ชัดขึ้น ส่วนเทรนเนอร์เห็นคนที่ต้องดูแลเป็นพิเศษ พร้อมใช้ข้อมูลจริงช่วยวางแผนดูแลในรอบต่อไป',
    ],
    coverImageUrl: '/showcase/showcase-example.png', detailImageUrl: '/project-details/example.png', galleryImageUrls: ['/showcase/showcase-example.png'], screenImageUrls: { mobile: '/showcase/showcase-example.png' },
    stack: ['React', 'JavaScript', 'Vite', 'Node.js', 'LINE LIFF', 'PostgreSQL', 'Gemini API'],
    highlights: ['เริ่มดูแลสุขภาพได้จาก LINE', 'ติดตามคำตอบและความคืบหน้าเป็นรอบ', 'เห็นภาพสุขภาพที่เข้าใจง่ายสำหรับทั้งสองฝ่าย'],
  }),
  project({
    slug: 'car-sales-line-oa-template', title: 'เทมเพลตระบบค้นหาและเลือกซื้อรถผ่าน LINE',
    subtitle: 'จุดเริ่มต้นสำหรับสร้างประสบการณ์เลือกซื้อรถบนมือถือ',
    shortDescription: 'วางหน้าลูกค้าและพื้นที่จัดการงานขายไว้พร้อม เพื่อเริ่มต่อยอดระบบขายรถผ่าน LINE ได้เร็วขึ้น',
    description: 'เทมเพลตนี้ช่วยให้ธุรกิจเริ่มออกแบบประสบการณ์ค้นหาและเลือกซื้อรถบน LINE ได้เป็นระบบ ทั้งฝั่งลูกค้าและทีมขาย',
    purposeParagraphs: [
      'ลูกค้าควรเลือกดูรถและติดต่อทีมขายได้ง่ายจากมือถือ ขณะเดียวกันทีมต้องมีพื้นที่จัดการข้อมูลและดูแลลูกค้าเป็นระเบียบ เทมเพลตนี้จึงวางโครงของทั้งสองฝั่งไว้ให้เริ่มต่อยอดได้ทันที',
      'ธุรกิจสามารถนำไปปรับเป็นขั้นตอนค้นหา เปรียบเทียบรถ ส่งเรื่องให้ทีมขาย หรือติดตามลูกค้าในแบบที่เหมาะกับการทำงานจริงของตัวเอง',
    ],
    coverImageUrl: '/showcase/showcase-example.png', detailImageUrl: '/project-details/example.png', galleryImageUrls: ['/showcase/showcase-example.png'],
    stack: ['React', 'TypeScript', 'Vite', 'MUI', 'Go', 'PostgreSQL', 'Redis', 'LINE LIFF'],
    highlights: ['หน้าค้นหาและเลือกดูรถสำหรับลูกค้า', 'พื้นที่จัดการงานให้ทีมขาย', 'พร้อมปรับตามขั้นตอนของธุรกิจ'],
  }),
  project({
    slug: 'car-rental-line-oa-template', title: 'เทมเพลตระบบค้นหาและเช่ารถผ่าน LINE',
    subtitle: 'จุดเริ่มต้นสำหรับสร้างบริการเช่ารถบนมือถือ',
    shortDescription: 'วางประสบการณ์ค้นหาและเช่ารถสำหรับลูกค้า พร้อมพื้นที่จัดการสำหรับทีมงานไว้ในชุดเดียว',
    description: 'เทมเพลตนี้ช่วยให้ธุรกิจเช่ารถเริ่มสร้างบริการผ่าน LINE ได้อย่างเป็นระบบ ตั้งแต่หน้าลูกค้าไปจนถึงงานจัดการของทีม',
    purposeParagraphs: [
      'ลูกค้าต้องการค้นหารถและส่งความต้องการเช่าได้เร็ว ส่วนทีมงานต้องเห็นข้อมูลที่จำเป็นเพื่อดูแลการจองต่อ เทมเพลตนี้จึงแยกหน้าลูกค้าและพื้นที่ทำงานของทีมไว้อย่างชัดเจน',
      'สามารถนำไปต่อยอดเป็นการค้นหารถ ดูรายละเอียด เลือกช่วงเวลา รับคำขอ และจัดการสถานะการเช่าตามรูปแบบการทำงานของธุรกิจได้',
    ],
    coverImageUrl: '/showcase/showcase-example.png', detailImageUrl: '/project-details/example.png', galleryImageUrls: ['/showcase/showcase-example.png'],
    stack: ['React', 'TypeScript', 'Vite', 'MUI', 'Go', 'PostgreSQL', 'Redis', 'LINE LIFF'],
    highlights: ['ค้นหาและส่งคำขอเช่ารถจากมือถือ', 'ทีมงานติดตามและจัดการข้อมูลได้ง่าย', 'พร้อมต่อยอดเป็นบริการเช่ารถของธุรกิจ'],
  }),
  project({
    slug: 'rentflow-car-rental-platform', title: 'RentFlowCar ระบบบริหารธุรกิจรถเช่า',
    subtitle: 'ดูแลการเช่ารถตั้งแต่ลูกค้าเริ่มค้นหา จนถึงทีมงานจัดการงานหลังบ้าน',
    shortDescription: 'รวมการค้นหาและจองรถ การจัดการร้าน และการทำงานร่วมกับผู้ร่วมธุรกิจไว้ในที่เดียว',
    description: 'RentFlowCar ทำให้การเช่ารถเดินต่อเนื่องตั้งแต่ลูกค้าเลือกดูรถ ส่งคำขอ จนทีมงานและผู้ร่วมธุรกิจจัดการงานต่อได้จากข้อมูลชุดเดียวกัน',
    purposeParagraphs: [
      'ธุรกิจเช่ารถต้องดูแลลูกค้า รถ การจอง และคนทำงานหลายฝ่ายพร้อมกัน RentFlowCar จึงรวมขั้นตอนสำคัญไว้ให้ทุกฝ่ายเห็นสถานะเดียวกัน ลดการส่งต่อข้อมูลซ้ำและความคลาดเคลื่อน',
      'ลูกค้าค้นหาและจองรถได้สะดวกขึ้น ขณะที่ร้านและพาร์ทเนอร์รู้ว่างานไหนต้องทำต่อ ทำให้ตอบลูกค้าได้ไวและบริหารบริการได้มั่นใจขึ้น',
    ],
    coverImageUrl: '/showcase/showcase-rentflowcar.png', detailImageUrl: '/project-details/rentflowcar.png',
    stack: ['Next.js', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Go', 'PostgreSQL', 'Redis', 'Ollama'],
    highlights: ['ค้นหาและจองรถได้สะดวก', 'ร้านและพาร์ทเนอร์ทำงานจากข้อมูลเดียวกัน', 'ติดตามสถานะงานได้ตลอดเส้นทาง'],
  }),
  project({
    slug: 'service-booking-template', title: 'ระบบจองบริการออนไลน์',
    subtitle: 'ให้ลูกค้าจองเวลาง่าย และให้ทีมจัดการคิวได้ชัดเจน',
    shortDescription: 'ลูกค้าเลือกบริการและช่วงเวลาที่สะดวก ขณะที่ทีมเห็นคิวและรายละเอียดทั้งหมดในที่เดียว',
    description: 'ระบบจองบริการออนไลน์ช่วยลดความยุ่งยากของการนัดหมาย ให้ลูกค้าจองได้ด้วยตัวเองและทีมทำงานกับคิวที่อัปเดตเสมอ',
    purposeParagraphs: [
      'เมื่อการจองเข้ามาจากหลายช่องทาง ทีมงานมักต้องตอบซ้ำและเสี่ยงต่อการนัดชนกัน ระบบนี้จึงทำให้ลูกค้าเห็นบริการและเวลาว่างที่เลือกได้ชัดเจนตั้งแต่ต้น',
      'ฝั่งทีมงานดูรายการจอง สถานะ และรายละเอียดลูกค้าได้ในที่เดียว จึงยืนยันนัดหมาย ปรับคิว และดูแลแต่ละเคสได้เร็วขึ้น',
    ],
    coverImageUrl: '/showcase/showcase-service-booking.png', detailImageUrl: '/project-details/service-booking.png',
    stack: ['React', 'TypeScript', 'Vite', 'Go', 'PostgreSQL', 'Redis', 'WebSocket', 'LINE LIFF'],
    highlights: ['ลูกค้าเลือกบริการและเวลาที่สะดวก', 'ทีมเห็นคิวทั้งหมดได้ทันที', 'ลดความผิดพลาดจากการนัดหมายซ้ำ'],
  }),
  project({
    slug: 'line-membership-loyalty-platform', title: 'ระบบสมาชิกและสะสมแต้มบน LINE',
    subtitle: 'ให้ลูกค้าสมัคร สะสมแต้ม และรับสิทธิ์ได้ในช่องทางเดียว',
    shortDescription: 'ช่วยให้ร้านดูแลสมาชิกและสิทธิประโยชน์ได้ง่าย ขณะที่ลูกค้าเห็นแต้มและข้อเสนอของตัวเองได้ตลอดเวลา',
    description: 'ระบบสมาชิกบน LINE ทำให้การกลับมาซื้อซ้ำเป็นเรื่องง่ายขึ้น ด้วยประสบการณ์สมัครสมาชิก ดูแต้ม และรับสิทธิ์ที่ลูกค้าเข้าถึงได้ทันที',
    purposeParagraphs: [
      'ร้านค้าต้องการดูแลลูกค้าให้กลับมาใช้บริการ แต่การเก็บข้อมูลและจัดการสิทธิ์ด้วยมือทำให้ยุ่งยาก ระบบนี้จึงรวมการสมัครสมาชิก การสะสมแต้ม และสิทธิประโยชน์ไว้บน LINE',
      'ลูกค้าไม่ต้องติดตั้งแอปเพิ่ม เห็นข้อมูลของตัวเองได้ง่าย ส่วนร้านจัดการสมาชิกและออกข้อเสนอที่เหมาะกับการกลับมาใช้บริการได้ต่อเนื่อง',
    ],
    coverImageUrl: '/showcase/showcase-example.png', detailImageUrl: '/project-details/example.png',
    stack: ['React', 'TypeScript', 'Vite', 'Go', 'PostgreSQL', 'Redis', 'LINE'],
    highlights: ['สมัครและดูข้อมูลสมาชิกได้ง่าย', 'สะสมแต้มและรับสิทธิ์ใน LINE', 'ร้านดูแลลูกค้าได้ต่อเนื่องขึ้น'],
  }),
  project({
    slug: 'product-warranty-and-customer-platform', title: 'แพลตฟอร์มรับประกันสินค้าและดูแลลูกค้า',
    subtitle: 'เปลี่ยนงานหลังการขายให้ตรวจสอบง่ายและดูแลลูกค้าได้ต่อเนื่อง',
    shortDescription: 'ให้ลูกค้าตรวจสอบสินค้าและลงทะเบียนรับประกันได้เอง พร้อมช่วยทีมดูแลข้อมูลหลังการขายเป็นระบบ',
    description: 'ระบบนี้ทำให้ลูกค้าเริ่มต้นใช้สิทธิ์รับประกันได้ง่ายขึ้น และช่วยทีมงานติดตามข้อมูลเพื่อดูแลหลังการขายได้ครบกว่าเดิม',
    purposeParagraphs: [
      'หลังซื้อสินค้า ลูกค้ามักไม่แน่ใจว่าต้องลงทะเบียนหรือขอความช่วยเหลืออย่างไร ระบบนี้จึงทำให้ตรวจสอบสินค้า ลงทะเบียนรับประกัน และรับข้อมูลที่เกี่ยวข้องได้ด้วยตัวเองผ่าน LINE',
      'ทีมงานเห็นข้อมูลลูกค้า สินค้า และสถานะการรับประกันอยู่ในที่เดียว ลดงานตอบคำถามเดิม ๆ และทำให้สื่อสารดูแลลูกค้าได้ตรงจุดมากขึ้น',
    ],
    coverImageUrl: '/showcase/showcase-product-warranty.png', detailImageUrl: '/project-details/product-warranty.png',
    stack: ['React', 'TypeScript', 'Vite', 'Go', 'PostgreSQL', 'Redis', 'LINE'],
    highlights: ['ตรวจสอบสินค้าและลงทะเบียนได้เอง', 'เห็นข้อมูลรับประกันอย่างชัดเจน', 'ทีมดูแลหลังการขายได้รวดเร็วขึ้น'],
  }),
  project({
    slug: 'online-learning-platform-with-ai', title: 'แพลตฟอร์มเรียนออนไลน์พร้อม AI',
    subtitle: 'พื้นที่เรียนรู้ที่ช่วยให้ผู้เรียนไปต่อได้ และผู้สอนดูแลได้ทั่วถึง',
    shortDescription: 'รวมบทเรียน การติดตามความคืบหน้า และผู้ช่วยตอบคำถามไว้เพื่อให้การเรียนออนไลน์เข้าใจง่ายขึ้น',
    description: 'ระบบเรียนออนไลน์ช่วยให้ผู้เรียนเรียนต่อเนื่องขึ้น ขณะที่ผู้สอนและผู้ดูแลจัดการเนื้อหาและเห็นความคืบหน้าของผู้เรียนได้ชัดเจน',
    purposeParagraphs: [
      'การเรียนออนไลน์จะได้ผลเมื่อผู้เรียนรู้ว่าควรเรียนอะไรต่อและทบทวนได้ง่าย ระบบนี้จึงรวมบทเรียน ความคืบหน้า และคำตอบสำหรับคำถามเบื้องต้นไว้ในพื้นที่เดียว',
      'ผู้สอนจัดการเนื้อหาได้สะดวก เห็นภาพการเรียนรู้ของผู้เรียนชัดขึ้น และใช้เวลามากขึ้นกับการช่วยให้ผู้เรียนเข้าใจจริง',
    ],
    coverImageUrl: '/showcase/showcase-online-learning.png', detailImageUrl: '/project-details/online-learning.png',
    stack: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Gemini API', 'FFmpeg'],
    highlights: ['เรียนและทบทวนบทเรียนได้ง่าย', 'ผู้สอนจัดการเนื้อหาและติดตามผู้เรียนได้', 'มีผู้ช่วยตอบคำถามระหว่างเรียน'],
  }),
];
