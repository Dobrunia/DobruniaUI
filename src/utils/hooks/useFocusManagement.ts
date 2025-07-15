import { useEffect, useRef } from 'react';

/**
 * Хук для управления фокусом при открытии/закрытии модального окна
 * @param isOpen - флаг открытия модального окна
 * @param modalRef - ссылка на модальное окно
 */
export const useFocusManagement = (
  isOpen: boolean,
  modalRef: React.RefObject<HTMLElement | null>
) => {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Сохраняем текущий фокус
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

      // Фокусируемся на модальном окне
      modalRef.current.focus();

      return () => {
        // Возвращаем фокус на предыдущий элемент
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen, modalRef]);
};
