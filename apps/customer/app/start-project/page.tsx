import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { StartProjectPage } from '../../src/views/MarketingPages';

export const metadata: Metadata = {
  title: 'วิธีเริ่มโปรเจกต์',
  description: 'ขั้นตอนเริ่มโปรเจกต์กับ Baawork Studio ตั้งแต่คุยโจทย์ วางขอบเขต ออกแบบ UX/UI พัฒนา ทดสอบ และส่งมอบระบบ',
  alternates: {
    canonical: '/start-project',
  },
  openGraph: {
    title: 'วิธีเริ่มโปรเจกต์ | Baawork Studio',
    description: 'ดูขั้นตอนเริ่มทำระบบเว็บแอป ระบบ AI และระบบหลังบ้านกับ Baawork Studio ให้พร้อมใช้งานจริง',
    url: '/start-project',
  },
};

export default function Page() {
  return (
    <AppShell>
      <StartProjectPage />
    </AppShell>
  );
}
