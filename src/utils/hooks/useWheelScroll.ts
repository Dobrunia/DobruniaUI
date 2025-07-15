import { useEffect } from 'react';

/**
 * Хук для обработки wheel событий для горизонтального скролла
 * @param ref - ссылка на DOM элемент
 */
export const useWheelScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 0.5;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [ref]);
};
