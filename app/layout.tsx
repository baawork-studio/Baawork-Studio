import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Thai, Roboto } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import '../src/styles.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://baawork-studio.up.railway.app';
const siteDescription =
  'Baawork Studio ออกแบบและพัฒนาระบบเว็บแอป ระบบ AI และประสบการณ์ดิจิทัลสำหรับใช้งานจริง';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Baawork Studio - รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
    template: '%s - Baawork Studio',
  },
  description: siteDescription,
  applicationName: 'Baawork Studio',
  authors: [{ name: 'Baawork Studio' }],
  icons: {
    icon: [{ url: '/baawork-logo.png', type: 'image/png' }],
    apple: [{ url: '/baawork-logo.png', type: 'image/png' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: siteUrl,
    siteName: 'Baawork Studio',
    title: 'Baawork Studio - รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
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
    title: 'Baawork Studio - รับออกแบบและพัฒนาระบบเว็บแอป ระบบ AI',
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
      <body className={`${roboto.variable} ${notoSansThai.variable}`}>
        <Script id="reset-initial-scroll" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; if (!window.location.hash) window.scrollTo(0, 0);`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
