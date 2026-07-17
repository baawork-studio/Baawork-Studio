import type { MouseEvent } from 'react';

const homeSectionKey = 'baawork-home-section';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function navigateToHomeSection(event: MouseEvent<HTMLElement>, sectionId: string) {
  event.preventDefault();

  const section = document.getElementById(sectionId);
  if (section) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    section.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    return;
  }

  window.sessionStorage.setItem(homeSectionKey, sectionId);
  window.location.assign('/');
}

export function restoreHomeSectionScroll() {
  const sectionId = window.sessionStorage.getItem(homeSectionKey);
  if (!sectionId) return;

  window.sessionStorage.removeItem(homeSectionKey);
  window.requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
}
