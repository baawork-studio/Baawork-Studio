import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { WhyUsPage } from '../../src/views/WhyUsPage';

export const metadata: Metadata = {
  title: 'ทำไมต้องเรา',
  description:
    'เหตุผลที่ Baawork Studio ออกแบบและพัฒนาระบบเว็บแอป ระบบ AI และเครื่องมือหลังบ้านให้พร้อมใช้งานจริงกับธุรกิจ',
  alternates: {
    canonical: '/why-us',
  },
  openGraph: {
    title: 'ทำไมต้องเรา | Baawork Studio',
    description:
      'Baawork Studio วางระบบตั้งแต่ UX/UI, frontend, backend, API, database และ production เพื่อให้ทีมใช้งานจริงได้ต่อเนื่อง',
    url: '/why-us',
  },
};

export default function Page() {
  return (
    <AppShell>
      <WhyUsPage />
    </AppShell>
  );
}
