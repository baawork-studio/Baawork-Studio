import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { ConsultPage } from '../../src/views/MarketingPages';

export const metadata: Metadata = {
  title: 'ปรึกษา Baawork',
  description: 'ปรึกษา Baawork Studio เพื่อวางแนวทางระบบเว็บแอป ระบบ AI ระบบหลังบ้าน และโปรเจกต์ดิจิทัลสำหรับธุรกิจ',
  alternates: {
    canonical: '/consult',
  },
  openGraph: {
    title: 'ปรึกษา Baawork - Baawork Studio',
    description: 'ส่งโจทย์ระบบหรือปัญหาทางธุรกิจมาให้ Baawork Studio ช่วยวางภาพรวมและขอบเขตงาน',
    url: '/consult',
  },
};

export default function Page() {
  return (
    <AppShell>
      <ConsultPage />
    </AppShell>
  );
}
