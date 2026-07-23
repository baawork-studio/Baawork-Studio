export type ShowcaseCard = {
  id?: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  presentation?: 'phoneAiLight' | 'phoneAiDark';
};

export type HeroCtaPhase = 'hidden' | 'seed' | 'open';

export type HomePageProps = {
  initialProjects?: import('../../data/projectCatalog').Project[];
};
