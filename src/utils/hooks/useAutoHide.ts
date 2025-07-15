import { useEffect, useRef } from 'react';

/**
 * Хук для автоматического скрытия элемента через заданное время
 * @param isActive - флаг активности таймера
 * @param duration - длительность в мс (0 для отключения)
 * @param onHide - функция скрытия
 */
export const useAutoHide = (isActive: boolean, duration: number, onHide: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive || !duration) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setTimeout(onHide, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, duration, onHide]);
};
