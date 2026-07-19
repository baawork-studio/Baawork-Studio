import { useCallback, useRef } from 'react';
import type { DragEvent, PointerEvent } from 'react';

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
} | null;

export function useHorizontalDragScroll() {
  const dragState = useRef<DragState>(null);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const container = event.currentTarget;
    if (container.scrollWidth <= container.clientWidth) return;

    event.preventDefault();
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    };
    container.setPointerCapture(event.pointerId);
    container.style.cursor = 'grabbing';
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const distance = event.clientX - state.startX;
    if (Math.abs(distance) < 2) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = state.startScrollLeft - distance;
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
