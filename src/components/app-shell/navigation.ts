export type NavigationLink = {
  label: string;
  href: string;
  sectionId?: string;
};

export const primaryNavigation: NavigationLink[] = [
  { label: 'ผลงานของเรา', href: '/', sectionId: 'work' },
  { label: 'บริการของเรา', href: '/services' },
  { label: 'ทำไมต้องเรา', href: '/why-us' },
  { label: 'เริ่มโปรเจกต์กับเรา', href: '/start-project' },
];

export const mobileNavigation: NavigationLink[] = [
  ...primaryNavigation,
  { label: 'ปรึกษาเรา', href: '/consult' },
];

export const footerNavigation: NavigationLink[] = [
  { label: 'ผลงานของเรา', href: '/', sectionId: 'work' },
  { label: 'บริการของเรา', href: '/services' },
  { label: 'ทำไมต้องเรา', href: '/why-us' },
  { label: 'เริ่มโปรเจกต์กับเรา', href: '/start-project' },
  { label: 'กระบวนการทำงาน', href: '/', sectionId: 'workflow' },
  { label: 'ปรึกษา Baawork', href: '/consult' },
];

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/BAAWORK',
    color: '#1877F2',
    iconSrc: 'https://thesvg.org/icons/facebook/default.svg',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@baawork',
    color: '#FF0033',
    iconSrc: 'https://thesvg.org/icons/youtube/default.svg',
  },
  {
    label: 'LINE',
    href: 'https://line.me/R/ti/p/@baawork',
    color: '#06C755',
    iconSrc: 'https://thesvg.org/icons/line/default.svg',
  },
];
