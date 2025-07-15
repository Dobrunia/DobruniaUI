import { useCallback, useEffect } from 'react';

/**
 * Хук для обработки клика вне элемента
 * @param ref - ссылка на DOM элемент
 * @param handler - обработчик, вызываемый при клике вне элемента
 */
export const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  const stableHandler = useCallback(handler, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      stableHandler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, stableHandler]);
};
