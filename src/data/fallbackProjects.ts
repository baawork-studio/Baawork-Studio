import type { Project } from '../api/projects';

export const fallbackProjects: Project[] = [
  {
    id: 'demo-1',
    slug: 'baawork-command-center',
    title: 'ศูนย์ควบคุมงาน Baawork',
    subtitle: 'แดชบอร์ดปฏิบัติการสำหรับทีมบริการ',
    shortDescription:
      'ระบบปฏิบัติการภายในที่ช่วยติดตามงาน คำขอ และสถานะการส่งมอบได้อย่างเป็นระเบียบ',
    description:
      'ศูนย์ควบคุมงาน Baawork รวมสถานะโปรเจกต์ คำขอบริการ และบริบทของงานปฏิบัติการไว้ในหน้าจอเดียวที่ใช้งานได้รวดเร็ว เหมาะกับทีมที่ต้องการเห็นภาพรวมชัดเจนโดยไม่ต้องเจอกับความซับซ้อนเกินจำเป็น',
    coverImageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['React', 'Go', 'PostgreSQL', 'Redis'],
    highlights: [
      'เห็นสถานะงานปฏิบัติการได้ชัดเจน',
      'เวิร์กโฟลว์จัดการเคสที่เหมาะกับงานประจำวัน',
      'อินเทอร์เฟซตอบสนองดีสำหรับการใช้งานซ้ำทุกวัน',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    slug: 'studio-booking-flow',
    title: 'ระบบจองบริการสตูดิโอ',
    subtitle: 'ขั้นตอนการจองสำหรับบริการงานสร้างสรรค์',
    shortDescription:
      'ประสบการณ์จองบริการที่เลือกง่าย เข้าใจเร็ว และยืนยันได้ทันที',
    description:
      'ระบบจองนี้ออกแบบเพื่อลดความยุ่งยากตั้งแต่การเลือกบริการไปจนถึงการยืนยันรายการ หน้าตายังคงให้ความรู้สึกพรีเมียม แต่ใช้งานได้จริงสำหรับงานธุรกิจประจำวัน',
    coverImageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    galleryImageUrls: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    ],
    stack: ['Vite', 'MUI', 'Axios', 'Gin'],
    highlights: [
      'เลือกบริการได้ง่าย',
      'นำเสนอด้วยภาพเป็นหลัก',
      'เผยแพร่ข้อมูลผ่าน API ได้รวดเร็ว',
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
