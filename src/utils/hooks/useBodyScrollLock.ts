import { useEffect } from 'react';

/**
 * Хук для блокировки скролла body при открытии модального окна
 * @param isLocked - флаг блокировки скролла
 */
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isLocked]);
};
