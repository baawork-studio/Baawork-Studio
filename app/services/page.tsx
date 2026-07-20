import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { ServicesPage } from '../../src/views/MarketingPageViews';

export const metadata: Metadata = {
  title: 'บริการ',
  description: 'บริการออกแบบและพัฒนาระบบเว็บแอป ระบบ AI ระบบหลังบ้าน API ฐานข้อมูล และ production โดย Baawork Studio',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'บริการ - Baawork Studio',
    description: 'Baawork Studio รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI ระบบหลังบ้าน และ API สำหรับธุรกิจที่ต้องใช้งานจริง',
    url: '/services',
  },
};

export default function Page() {
  return (
    <AppShell>
      <ServicesPage />
    </AppShell>
  );
}
