import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Portal, Button } from '@DobruniaUI';

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

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

// Styled Components
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  animation: ${fadeIn} 0.2s ease-out;

  @media (prefers-contrast: high) {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Container = styled.div<{ $centered: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px;
  overflow-y: auto;

  ${({ $centered }) =>
    $centered &&
    `
    align-items: center;
    justify-content: center;
  `}
`;

const ModalWrapper = styled.div<{ $size: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          width: 100%;
          max-width: 400px;
        `;
      case 'medium':
        return `
          width: 100%;
          max-width: 600px;
        `;
      case 'large':
        return `
          width: 100%;
          max-width: 800px;
        `;
      case 'fullscreen':
        return `
          width: calc(100% - 32px);
          height: calc(100% - 32px);
        `;
      default:
        return `
          width: 100%;
          max-width: 600px;
        `;
    }
  }}
`;

const ModalContent = styled.div<{ $size: string }>`
  background: var(--c-bg-elevated);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  animation: ${slideIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  outline: none;
  width: 100%;

  @media (prefers-contrast: high) {
    border: 2px solid var(--c-border);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CloseButton = styled(Button)`
  position: relative;
  top: 22px;
  right: -26px;
  z-index: 10;
  background: var(--c-bg-elevated);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  align-self: flex-end;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text-primary);
  margin: 0;
  line-height: 1.4;
`;

const Content = styled.div<{ $hasHeader: boolean }>`
  padding: 24px;
  flex: 1;
  overflow-y: auto;

  ${({ $hasHeader }) =>
    !$hasHeader &&
    `
    padding-top: 24px;
  `}
`;

/**
 * Modal component - компонент модального окна
 * @param {boolean} isOpen - флаг открытия модального окна
 * @param {() => void} onClose - функция закрытия модального окна
 * @param {React.ReactNode} children - контент модального окна
 * @param {string} [title] - заголовок модального окна
 * @param {boolean} [closeOnBackdropClick] - закрывать модальное окно при клике на бэкдроп
 * @param {boolean} [closeOnEscape] - закрывать модальное окно при нажатии на Escape
 * @param {'small' | 'medium' | 'large' | 'fullscreen'} [size] - размер модального окна
 * @param {boolean} [centered] - центрировать модальное окно
 * @param {string} [className] - дополнительный CSS класс
 * @param {string} [backdropClassName] - дополнительный CSS класс для бэкдропа
 * @param {boolean} [showCloseButton] - показывать кнопку закрытия
 * @param {boolean} [closeable] - закрываемое модальное окно
 * @param {HTMLElement | string} [container] - контейнер для модального окна
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
      <Backdrop
        ref={backdropRef}
        className={backdropClassName}
        onMouseDown={handleMouseDown}
        onClick={handleBackdropClick}
        data-modal-backdrop
      >
        <Container $centered={centered}>
          <ModalWrapper $size={size}>
            {/* Close button above modal in top right */}
            {showCloseButton && closeable && (
              <CloseButton
                variant='close'
                shape='circle'
                onClick={handleCloseClick}
                aria-label='Закрыть модальное окно'
                type='button'
              />
            )}

            <ModalContent
              ref={modalRef}
              $size={size}
              className={className}
              role='dialog'
              aria-modal='true'
              aria-labelledby={title ? 'modal-title' : undefined}
              tabIndex={-1}
            >
              {title && (
                <Header>
                  <Title id='modal-title'>{title}</Title>
                </Header>
              )}
              <Content $hasHeader={!!title}>{children}</Content>
            </ModalContent>
          </ModalWrapper>
        </Container>
      </Backdrop>
    </Portal>
  );
};
