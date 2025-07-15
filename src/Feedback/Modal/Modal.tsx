import React, { useRef, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Portal, Button } from '@DobruniaUI';
import {
  useModalEscape,
  useBodyScrollLock,
  useFocusManagement,
  useBackdropClick,
} from '../../utils/hooks';

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
  background: inherit;
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

// Мемоизированные подкомпоненты
const ModalHeader = React.memo<{ title: string }>(({ title }) => (
  <Header>
    <Title id='modal-title'>{title}</Title>
  </Header>
));
ModalHeader.displayName = 'ModalHeader';

const ModalCloseButton = React.memo<{ onClose: () => void }>(({ onClose }) => (
  <CloseButton
    variant='close'
    shape='circle'
    onClick={onClose}
    aria-label='Закрыть модальное окно'
    type='button'
  />
));
ModalCloseButton.displayName = 'ModalCloseButton';

/**
 * Modal - модальное окно с backdrop и управлением фокусом
 * @param isOpen 'boolean' - флаг открытия модального окна
 * @param onClose '() => void' - функция закрытия модального окна
 * @param children 'React.ReactNode' - контент модального окна
 * @param title 'string' - заголовок модального окна
 * @param closeOnBackdropClick 'boolean' = true - закрывать при клике на backdrop
 * @param closeOnEscape 'boolean' = true - закрывать при нажатии Escape
 * @param size 'small' | 'medium' | 'large' | 'fullscreen' = 'medium' - размер окна
 * @param centered 'boolean' = true - центрировать модальное окно
 * @param className 'string' - дополнительный CSS класс
 * @param backdropClassName 'string' - CSS класс для backdrop
 * @param showCloseButton 'boolean' = true - показывать кнопку закрытия
 * @param closeable 'boolean' = true - можно ли закрыть модальное окно
 * @param container 'HTMLElement | string' - контейнер для портала
 */
export const Modal = React.memo<ModalProps>(
  ({
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

    // Стабилизируем обработчики
    const handleCloseClick = useCallback(() => {
      if (closeable) {
        onClose();
      }
    }, [closeable, onClose]);

    // Используем кастомные хуки для DOM-взаимодействий
    useModalEscape(isOpen, onClose, closeOnEscape && closeable);
    useBodyScrollLock(isOpen);
    useFocusManagement(isOpen, modalRef);

    const backdropClickHandlers = useBackdropClick(
      modalRef,
      onClose,
      closeOnBackdropClick && closeable
    );

    // Мемоизируем вычисления
    const modalContent = useMemo(() => {
      if (!isOpen) return null;

      return (
        <Portal container={container}>
          <Backdrop
            className={backdropClassName}
            onMouseDown={backdropClickHandlers.handleMouseDown}
            onClick={backdropClickHandlers.handleBackdropClick}
            data-modal-backdrop
          >
            <Container $centered={centered}>
              <ModalWrapper $size={size}>
                {/* Close button above modal in top right */}
                {showCloseButton && closeable && <ModalCloseButton onClose={handleCloseClick} />}

                <ModalContent
                  ref={modalRef}
                  $size={size}
                  className={className}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby={title ? 'modal-title' : undefined}
                  tabIndex={-1}
                >
                  {title && <ModalHeader title={title} />}
                  <Content $hasHeader={!!title}>{children}</Content>
                </ModalContent>
              </ModalWrapper>
            </Container>
          </Backdrop>
        </Portal>
      );
    }, [
      isOpen,
      container,
      backdropClassName,
      backdropClickHandlers.handleMouseDown,
      backdropClickHandlers.handleBackdropClick,
      centered,
      size,
      showCloseButton,
      closeable,
      handleCloseClick,
      className,
      title,
      children,
    ]);

    return modalContent;
  }
);

Modal.displayName = 'Modal';
