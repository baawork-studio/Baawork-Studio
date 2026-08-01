import { useCallback, useRef } from 'react';
import type { DragEvent, PointerEvent } from 'react';

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  hasMoved: boolean;
} | null;

export function useHorizontalDragScroll() {
  const dragState = useRef<DragState>(null);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    // Keep touch gestures native so a finger swipe scrolls naturally on mobile.
    if (event.pointerType !== 'mouse' || event.button !== 0) return;

    const container = event.currentTarget;
    if (container.scrollWidth <= container.clientWidth) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
      hasMoved: false,
    };
    container.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const distance = event.clientX - state.startX;
    if (Math.abs(distance) < 3) return;

    state.hasMoved = true;
    event.preventDefault();
    event.currentTarget.scrollLeft = state.startScrollLeft - distance;
    event.currentTarget.style.cursor = 'grabbing';
  }, []);

  const endDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.cursor = '';
    dragState.current = null;
  }, []);

  const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onDragStart };
}

export function scrollToAdjacentCarouselItem(container: HTMLElement, direction: -1 | 1) {
  const items = Array.from(container.querySelectorAll<HTMLElement>('[data-carousel-item="true"]'));
  if (!items.length) return;

  const firstOffset = items[0].offsetLeft;
  const activeOffset = container.scrollLeft + firstOffset;
  const activeIndex = items.reduce((closestIndex, item, index) => (
    Math.abs(item.offsetLeft - activeOffset) < Math.abs(items[closestIndex].offsetLeft - activeOffset)
      ? index
      : closestIndex
  ), 0);
  const targetIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction));

  if (targetIndex === activeIndex) return;

  const targetLeft = Math.max(
    0,
    Math.min(container.scrollWidth - container.clientWidth, items[targetIndex].offsetLeft - firstOffset),
  );

  // Scroll only the carousel. scrollIntoView() can also shift the page itself
  // when a control is pressed repeatedly while its smooth scroll is in flight.
  container.scrollTo({ left: targetLeft, behavior: 'smooth' });
}
