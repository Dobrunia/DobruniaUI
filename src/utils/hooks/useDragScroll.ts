import { useCallback, useRef } from 'react';

/**
 * Хук для drag-scroll функциональности
 * @param ref - ссылка на DOM элемент
 */
export const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (ref.current) {
        isDragging.current = true;
        startX.current = e.pageX - ref.current.offsetLeft;
        scrollLeft.current = ref.current.scrollLeft;
        ref.current.style.cursor = 'grabbing';
      }
    },
    [ref]
  );

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = '';
  }, [ref]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (ref.current) ref.current.style.cursor = '';
  }, [ref]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = x - startX.current;
      ref.current.scrollLeft = scrollLeft.current - walk;
    },
    [ref]
  );

  return {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};
