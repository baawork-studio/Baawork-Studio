export type NavigationLink = {
  label: string;
  href: string;
  sectionId?: string;
};

export const primaryNavigation: NavigationLink[] = [
  { label: 'หน้าแรกของเรา', href: '/' },
  { label: 'ผลงานของเรา', href: '/', sectionId: 'work' },
  { label: 'เครื่องมือที่เราใช้', href: '/', sectionId: 'tools' },
  { label: 'บริการของเรา', href: '/services' },
];

export const mobileNavigation: NavigationLink[] = [
  ...primaryNavigation,
  { label: 'ปรึกษาเรา', href: '/consult' },
];

export const footerNavigation: NavigationLink[] = [
  { label: 'หน้าแรกของเรา', href: '/' },
  { label: 'ผลงานของเรา', href: '/', sectionId: 'work' },
  { label: 'เครื่องมือที่เราใช้', href: '/', sectionId: 'tools' },
  { label: 'บริการของเรา', href: '/services' },
  { label: 'กระบวนการทำงาน', href: '/', sectionId: 'workflow' },
  { label: 'ปรึกษา Baawork', href: '/consult' },
];

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/BAAWORK',
    color: '#1877F2',
    iconSrc: '/icons/facebook.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@baawork',
    color: '#FF0033',
    iconSrc: '/icons/youtube.svg',
  },
  {
    label: 'LINE',
    href: 'https://line.me/R/ti/p/@baawork',
    color: '#06C755',
    iconSrc: '/icons/line.svg',
  },
];
