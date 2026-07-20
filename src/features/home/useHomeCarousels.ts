import { useCallback, useEffect, useRef, useState } from "react";
import { workCarouselEdgeTolerance } from "./homeContent";
import { scrollToAdjacentCarouselItem } from "../../hooks/useHorizontalDragScroll";

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

  const updateCarouselState = useCallback(() => {
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
    if (direction === -1 && !carouselState.canScrollPrev) return;
    if (direction === 1 && !carouselState.canScrollNext) return;

    scrollToAdjacentCarouselItem(carousel, direction);
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
    transition: 'background-color 180ms ease, color 180ms ease',
    '&:hover': {
      bgcolor: enabled ? '#B8B8BE' : '#E1E1E6',
      color: enabled ? '#1D1D1F' : '#9A9AA0',
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
