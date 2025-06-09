import React, { useEffect, useRef } from 'react';
import { Portal } from '@DobruniaUI';
import styles from './Modal.module.pcss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  centered?: boolean;
  className?: string;
  backdropClassName?: string;
  showCloseButton?: boolean;
  closeable?: boolean;
  container?: HTMLElement | string;
}

/**
 * Modal
 * @param isOpen - Флаг открытия модального окна
 * @param onClose - Функция закрытия модального окна
 * @param children - Контент модального окна
 * @param title - Заголовок модального окна
 * @param closeOnBackdropClick - Закрывать модальное окно при клике на бэкдроп
 * @param closeOnEscape - Закрывать модальное окно при нажатии на Escape
 * @param size - Размер модального окна
 * @param centered - Центрировать модальное окно
 * @param className - Классы модального окна
 * @param backdropClassName - Классы бэкдропа
 * @param showCloseButton - Показывать кнопку закрытия
 * @param closeable - Закрываемое модальное окно
 * @param container - Контейнер для модального окна
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'medium',
  centered = true,
  className,
  backdropClassName,
  showCloseButton = true,
  closeable = true,
  container,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  // Обработка клавиши Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape || !closeable) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, closeable, onClose]);

  // Блокировка скролла body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Фокус и возврат фокуса
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Сохраняем текущий фокус
      const previouslyFocusedElement = document.activeElement as HTMLElement;

      // Фокусируемся на модальном окне
      modalRef.current.focus();

      return () => {
        // Возвращаем фокус на предыдущий элемент
        if (previouslyFocusedElement) {
          previouslyFocusedElement.focus();
        }
      };
    }
  }, [isOpen]);

  const handleMouseDown = (event: React.MouseEvent) => {
    mouseDownTargetRef.current = event.target;
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    // Проверяем, что mousedown и click произошли на одном и том же элементе
    // Это позволяет отличить реальный клик от окончания выделения текста
    if (
      closeOnBackdropClick &&
      closeable &&
      modalRef.current &&
      mouseDownTargetRef.current === event.target &&
      !modalRef.current.contains(event.target as Node)
    ) {
      onClose();
    }

    // Сбрасываем target после обработки
    mouseDownTargetRef.current = null;
  };

  const handleCloseClick = () => {
    if (closeable) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal container={container}>
      <div
        ref={backdropRef}
        className={`${styles.backdrop} ${backdropClassName || ''}`}
        onMouseDown={handleMouseDown}
        onClick={handleBackdropClick}
        data-modal-backdrop
      >
        <div className={`${styles.container} ${centered ? styles.centered : ''}`}>
          <div
            ref={modalRef}
            className={`${styles.modal} ${styles[size]} ${className || ''}`}
            role='dialog'
            aria-modal='true'
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
          >
            {(title || (showCloseButton && closeable)) && (
              <div className={styles.header}>
                {title && (
                  <h2 id='modal-title' className={styles.title}>
                    {title}
                  </h2>
                )}
                {showCloseButton && closeable && (
                  <button
                    className={styles.closeButton}
                    onClick={handleCloseClick}
                    aria-label='Закрыть модальное окно'
                    type='button'
                  >
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18 6L6 18M6 6L18 18'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
