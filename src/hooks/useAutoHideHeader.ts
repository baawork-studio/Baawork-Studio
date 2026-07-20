'use client';

import { useEffect, useRef, useState } from 'react';

export function useAutoHideHeader(enabled: boolean) {
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const hiddenRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      hiddenRef.current = false;
      setHidden(false);
      return;
    }

    let frameId: number | null = null;

    const updateHeader = () => {
      frameId = null;
      const currentScrollY = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
      const lastScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > lastScrollY + 6;
      const scrollingUp = currentScrollY < lastScrollY - 4;
      const nextHidden = currentScrollY > 80 && scrollingDown
        ? true
        : currentScrollY <= 40 || scrollingUp
          ? false
          : hiddenRef.current;

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden;
        setHidden(nextHidden);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateHeader);
    };

    lastScrollYRef.current = Math.max(window.scrollY, document.documentElement.scrollTop, 0);
    hiddenRef.current = false;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  return hidden;
}
