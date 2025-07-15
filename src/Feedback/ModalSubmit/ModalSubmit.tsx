import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Modal, Button } from '@DobruniaUI';

export interface ModalSubmitProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  submitVariant?: 'primary' | 'warning';
  isLoading?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  preventCloseOnSubmit?: boolean;
  className?: string;
}

// Styled Components
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid var(--c-border);
`;

// Мемоизированные подкомпоненты
const ModalActions = React.memo<{
  onClose: () => void;
  onSubmit: () => void;
  submitText: string;
  cancelText: string;
  submitVariant: 'primary' | 'warning';
  isLoading: boolean;
  disabled: boolean;
}>(({ onClose, onSubmit, submitText, cancelText, submitVariant, isLoading, disabled }) => (
  <Actions>
    <Button variant='secondary' onClick={onClose} disabled={isLoading} type='button'>
      {cancelText}
    </Button>

    <Button
      variant={submitVariant}
      onClick={onSubmit}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      type='button'
    >
      {submitText}
    </Button>
  </Actions>
));
ModalActions.displayName = 'ModalActions';

/**
 * ModalSubmit - модальное окно с кнопками подтверждения и отмены
 * @param isOpen 'boolean' - флаг открытия модального окна
 * @param onClose '() => void' - функция закрытия модального окна
 * @param onSubmit '() => void | Promise<void>' - функция отправки/подтверждения
 * @param title 'string' - заголовок модального окна
 * @param children 'React.ReactNode' - контент модального окна
 * @param submitText 'string' = 'Подтвердить' - текст кнопки подтверждения
 * @param cancelText 'string' = 'Отмена' - текст кнопки отмены
 * @param submitVariant 'primary' | 'warning' = 'primary' - вариант кнопки подтверждения
 * @param isLoading 'boolean' = false - флаг загрузки
 * @param disabled 'boolean' = false - блокировка кнопки подтверждения
 * @param size 'small' | 'medium' | 'large' = 'medium' - размер модального окна
 * @param preventCloseOnSubmit 'boolean' = false - не закрывать автоматически после submit
 * @param className 'string' - дополнительные CSS классы
 */
export const ModalSubmit = React.memo<ModalSubmitProps>(({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Подтвердить',
  cancelText = 'Отмена',
  submitVariant = 'primary',
  isLoading = false,
  disabled = false,
  size = 'medium',
  preventCloseOnSubmit = false,
  className,
}) => {
  // Стабилизируем обработчики
  const handleSubmit = useCallback(async () => {
    try {
      await onSubmit();
      if (!preventCloseOnSubmit) {
        onClose();
      }
    } catch (error) {
      console.error('Submit error:', error);
      // Не закрываем модал при ошибке
    }
  }, [onSubmit, preventCloseOnSubmit, onClose]);

  // Мемоизируем пропсы для модального окна
  const modalProps = useMemo(() => ({
    isOpen,
    onClose,
    title,
    size,
    showCloseButton: !isLoading,
    closeable: !isLoading,
    closeOnBackdropClick: !isLoading,
    closeOnEscape: !isLoading,
    className,
  }), [isOpen, onClose, title, size, isLoading, className]);

  // Мемоизируем пропсы для действий
  const actionsProps = useMemo(() => ({
    onClose,
    onSubmit: handleSubmit,
    submitText,
    cancelText,
    submitVariant,
    isLoading,
    disabled,
  }), [onClose, handleSubmit, submitText, cancelText, submitVariant, isLoading, disabled]);

  return (
    <Modal {...modalProps}>
      <Content>
        <div>{children}</div>
        <ModalActions {...actionsProps} />
      </Content>
    </Modal>
  );
});

ModalSubmit.displayName = 'ModalSubmit';
