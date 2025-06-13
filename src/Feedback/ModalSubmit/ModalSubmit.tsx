import React from 'react';
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
  border-top: 1px solid var(--color-border);
`;

/**
 * ModalSubmit component - модальное окно для действий подтверждения и форм
 * @param {boolean} isOpen - флаг открытия модального окна
 * @param {() => void} onClose - функция закрытия модального окна
 * @param {() => void | Promise<void>} onSubmit - функция отправки/подтверждения
 * @param {string} title - заголовок модального окна
 * @param {React.ReactNode} children - контент модального окна
 * @param {string} [submitText] - текст кнопки подтверждения
 * @param {string} [cancelText] - текст кнопки отмены
 * @param {'primary' | 'warning'} [submitVariant] - вариант кнопки подтверждения
 * @param {boolean} [isLoading] - флаг загрузки
 * @param {boolean} [disabled] - флаг блокировки кнопки подтверждения
 * @param {'small' | 'medium' | 'large'} [size] - размер модального окна
 * @param {boolean} [preventCloseOnSubmit] - не закрывать модал автоматически после submit
 */
export const ModalSubmit: React.FC<ModalSubmitProps> = ({
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
}) => {
  const handleSubmit = async () => {
    try {
      await onSubmit();
      if (!preventCloseOnSubmit) {
        onClose();
      }
    } catch (error) {
      console.error('Submit error:', error);
      // Не закрываем модал при ошибке
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      showCloseButton={!isLoading}
      closeable={!isLoading}
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <Content>
        <div>{children}</div>

        <Actions>
          <Button variant='secondary' onClick={onClose} disabled={isLoading} type='button'>
            {cancelText}
          </Button>

          <Button
            variant={submitVariant}
            onClick={handleSubmit}
            disabled={disabled || isLoading}
            isLoading={isLoading}
            type='button'
          >
            {submitText}
          </Button>
        </Actions>
      </Content>
    </Modal>
  );
};
