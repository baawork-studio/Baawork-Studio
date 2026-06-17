import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { FaqPage } from '../../src/views/MarketingPages';

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย',
  description: 'คำถามที่พบบ่อยเกี่ยวกับการทำระบบเว็บแอป ระบบ AI หน้า admin API และการดูแลหลังส่งมอบกับ Baawork Studio',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'คำถามที่พบบ่อย | Baawork Studio',
    description: 'รวมคำตอบเกี่ยวกับบริการ ระยะเวลา การเชื่อม API หน้า admin และการดูแลระบบหลังส่งมอบ',
    url: '/faq',
  },
};

export default function Page() {
  return (
    <AppShell>
      <FaqPage />
    </AppShell>
  );
}
