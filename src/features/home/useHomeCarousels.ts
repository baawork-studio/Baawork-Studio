import { useCallback, useEffect, useRef, useState } from "react";
import { workCarouselEdgeTolerance } from "./homeContent";
import { scrollToAdjacentCarouselItem } from "../../hooks/useHorizontalDragScroll";
import { hover, palette } from "../../appTheme";

export function useShowcaseCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
    isScrollable: false,
  });

  const updateWorkCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const nextState = {
      canScrollPrev: carousel.scrollLeft > workCarouselEdgeTolerance,
      canScrollNext: carousel.scrollLeft < maxScrollLeft - workCarouselEdgeTolerance,
      isScrollable: maxScrollLeft > workCarouselEdgeTolerance,
    };

    setCarouselState((current) => {
      if (
        current.canScrollPrev === nextState.canScrollPrev &&
        current.canScrollNext === nextState.canScrollNext &&
        current.isScrollable === nextState.isScrollable
      ) {
        return current;
      }

      return nextState;
    });
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    carousel.scrollLeft = 0;
    updateWorkCarouselState();

    const handleScroll = () => {
      updateWorkCarouselState();
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateWorkCarouselState]);

  const scrollCards = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (direction === -1 && !carouselState.canScrollPrev) return;
    if (direction === 1 && !carouselState.canScrollNext) return;

    scrollToAdjacentCarouselItem(carousel, direction);
  };

  return { carouselRef, carouselState, scrollCards };
}

export function useWorkflowCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselState, setCarouselState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
    isScrollable: false,
  });

  const getWorkflowItems = useCallback((carousel: HTMLDivElement) => (
    Array.from(carousel.querySelectorAll<HTMLElement>('[data-workflow-card="true"]'))
  ), []);

  const getActiveWorkflowIndex = useCallback((carousel: HTMLDivElement, items: HTMLElement[]) => {
    if (!items.length) return 0;

    const firstOffset = items[0].offsetLeft;
    const viewportOffset = carousel.scrollLeft + firstOffset;

    return items.reduce((closestIndex, item, index) => (
      Math.abs(item.offsetLeft - viewportOffset) < Math.abs(items[closestIndex].offsetLeft - viewportOffset)
        ? index
        : closestIndex
    ), 0);
  }, []);

  const updateCarouselState = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const items = getWorkflowItems(carousel);
    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const activeIndex = getActiveWorkflowIndex(carousel, items);
    const nextState = {
      // The final trailing gutter is intentionally not a destination. Treat
      // the first and last workflow cards as the true carousel boundaries.
      canScrollPrev: activeIndex > 0,
      canScrollNext: activeIndex < items.length - 1,
      isScrollable: items.length > 1 && maxScrollLeft > 0,
    };

    setCarouselState((current) => {
      if (
        current.canScrollPrev === nextState.canScrollPrev &&
        current.canScrollNext === nextState.canScrollNext &&
        current.isScrollable === nextState.isScrollable
      ) {
        return current;
      }

      return nextState;
    });
  }, [getActiveWorkflowIndex, getWorkflowItems]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    carousel.scrollLeft = 0;
    updateCarouselState();

    const handleScroll = () => updateCarouselState();
    carousel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(carousel);

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateCarouselState]);

  const scrollCards = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const items = getWorkflowItems(carousel);
    if (!items.length) return;

    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const activeIndex = getActiveWorkflowIndex(carousel, items);
    const targetIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction));
    if (targetIndex === activeIndex) return;

    const firstOffset = items[0].offsetLeft;
    const targetLeft = Math.max(0, Math.min(maxScrollLeft, items[targetIndex].offsetLeft - firstOffset));

    carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
    setCarouselState({
      canScrollPrev: targetIndex > 0,
      canScrollNext: targetIndex < items.length - 1,
      isScrollable: items.length > 1 && maxScrollLeft > 0,
    });
  };

  return { carouselRef, carouselState, scrollCards };
}

export function carouselControlSx(enabled: boolean) {
  return {
    display: 'grid',
    placeItems: 'center',
    width: 48,
    height: 48,
    p: 0,
    border: 0,
    boxSizing: 'border-box',
    borderRadius: '50%',
    appearance: 'none',
    bgcolor: enabled ? '#D2D2D7' : '#E1E1E6',
    color: enabled ? '#4A4A4F' : '#9A9AA0',
    cursor: enabled ? 'pointer' : 'default',
    transition: hover.transition.control,
    '&:hover': {
      bgcolor: enabled ? palette.controlHover : palette.controlDisabled,
      color: enabled ? palette.controlTextHover : palette.controlTextDisabled,
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
    },
  };
}
