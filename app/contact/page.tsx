import type { Metadata } from 'next';
import { AppShell } from '../../src/components/AppShell';
import { ContactPage } from '../../src/views/MarketingPages';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อ Baawork Studio เพื่อคุยเรื่องระบบเว็บแอป ระบบ AI ระบบหลังบ้าน และโปรเจกต์ดิจิทัลสำหรับธุรกิจ',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'ติดต่อเรา - Baawork Studio',
    description: 'ติดต่อ Baawork Studio ผ่าน Facebook, YouTube และ LINE เพื่อเริ่มคุยโปรเจกต์ระบบเว็บแอปหรือระบบ AI',
    url: '/contact',
  },
};

export default function Page() {
  return (
    <AppShell>
      <ContactPage />
    </AppShell>
  );
}
