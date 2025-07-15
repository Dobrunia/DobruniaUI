import { useEffect, useRef } from 'react';

// Глобальный стек открытых модальных окон
const modalStack: Array<() => void> = [];

/**
 * Хук для обработки клавиши Escape в модальных окнах
 * Управляет стеком модалок - закрывает только последнюю открытую
 * @param isOpen - флаг открытия модального окна
 * @param onClose - функция закрытия
 * @param enabled - флаг включения обработки Escape
 */
export const useModalEscape = (isOpen: boolean, onClose: () => void, enabled: boolean) => {
  const onCloseRef = useRef(onClose);
  const isRegisteredRef = useRef(false);

  // Обновляем ссылку на функцию закрытия
  onCloseRef.current = onClose;

  // Регистрируем/удаляем модальное окно из стека
  useEffect(() => {
    if (isOpen && enabled) {
      if (!isRegisteredRef.current) {
        modalStack.push(() => onCloseRef.current());
        isRegisteredRef.current = true;
      }
    } else {
      if (isRegisteredRef.current) {
        const index = modalStack.findIndex(() => onCloseRef.current);
        if (index !== -1) {
          modalStack.splice(index, 1);
        }
        isRegisteredRef.current = false;
      }
    }

    return () => {
      if (isRegisteredRef.current) {
        const index = modalStack.findIndex(() => onCloseRef.current);
        if (index !== -1) {
          modalStack.splice(index, 1);
        }
        isRegisteredRef.current = false;
      }
    };
  }, [isOpen, enabled]);

  // Глобальный обработчик Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalStack.length > 0) {
        event.preventDefault();
        const closeLastModal = modalStack[modalStack.length - 1];
        if (closeLastModal) {
          closeLastModal();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
};
