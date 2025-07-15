import { useCallback, useEffect } from 'react';

/**
 * Хук для обработки нажатия клавиши
 * @param key - клавиша для отслеживания
 * @param handler - обработчик, вызываемый при нажатии клавиши
 */
export const useKeyPress = (key: string, handler: () => void) => {
  const stableHandler = useCallback(handler, [handler]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        stableHandler();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [key, stableHandler]);
};
