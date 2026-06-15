import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import '../src/styles.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://baawork-studio.up.railway.app';
const siteDescription =
  'Baawork Studio ออกแบบและพัฒนาระบบเว็บแอป ระบบ AI เครื่องมือหลังบ้าน และเวิร์กโฟลว์ที่เชื่อมต่อ API สำหรับใช้งานจริง';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Baawork Studio | รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
    template: '%s | Baawork Studio',
  },
  description: siteDescription,
  applicationName: 'Baawork Studio',
  authors: [{ name: 'Baawork Studio' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: siteUrl,
    siteName: 'Baawork Studio',
    title: 'Baawork Studio | รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
    description: siteDescription,
    images: [
      {
        url: '/baawork-logo.png',
        width: 1200,
        height: 1200,
        alt: 'Baawork Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baawork Studio | รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
    description: siteDescription,
    images: ['/baawork-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
