import type { Project } from "../../data/fallbackProjects";

export type ProjectDetailPageProps = {
  slug: string;
  initialProject?: Project;
};

const pageGutter = 'clamp(24px, 6.27vw, 127.5px)';
const detailCarouselVerticalGap = '24px';
const detailCarouselEdgeTolerance = 24;

export type MockupTemplate = 'macbook' | 'macbookMobile' | 'mobiles';
export type ScreenImageKey = 'desktop' | 'mobile' | 'mobile1' | 'mobile2' | 'mobile3';
export type ScreenSlot = {
  key: ScreenImageKey;
  left: string;
  top: string;
  width: string;
  height: string;
  mask: string;
};
export type CapabilityCard = {
  title: string;
  description: string;
};
export type CapabilityDetailRow = {
  label: string;
  text: string;
};
export type SystemPreviewCopy = {
  title: string;
  description: string;
  focus: string;
};
export type SystemPreviewItem = SystemPreviewCopy & {
  imageUrl: string;
};
export type DetailInfoCard = {
  title: string;
  description: string;
};
export type DetailFlowStep = DetailInfoCard & {
  label: string;
};
