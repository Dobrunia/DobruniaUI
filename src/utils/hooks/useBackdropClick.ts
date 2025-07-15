import { useCallback, useRef } from 'react';

/**
 * Хук для обработки клика на backdrop модального окна
 * @param modalRef - ссылка на модальное окно
 * @param onClose - функция закрытия
 * @param enabled - флаг включения обработки
 */
export const useBackdropClick = (
  modalRef: React.RefObject<HTMLElement | null>,
  onClose: () => void,
  enabled: boolean
) => {
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    mouseDownTargetRef.current = event.target;
  }, []);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      // Проверяем, что mousedown и click произошли на одном и том же элементе
      // Это позволяет отличить реальный клик от окончания выделения текста
      if (
        enabled &&
        modalRef.current &&
        mouseDownTargetRef.current === event.target &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }

      // Сбрасываем target после обработки
      mouseDownTargetRef.current = null;
    },
    [enabled, modalRef, onClose]
  );

  return {
    handleMouseDown,
    handleBackdropClick,
  };
};
