import React from 'react';
import { Modal, Button } from '@DobruniaUI';
import styles from './ModalSubmit.module.pcss';

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

/**
 * ModalSubmit - модальное окно для действий подтверждения и форм
 * @param isOpen - Флаг открытия модального окна
 * @param onClose - Функция закрытия модального окна
 * @param onSubmit - Функция отправки/подтверждения
 * @param title - Заголовок модального окна
 * @param children - Контент модального окна
 * @param submitText - Текст кнопки подтверждения
 * @param cancelText - Текст кнопки отмены
 * @param submitVariant - Вариант кнопки подтверждения
 * @param isLoading - Флаг загрузки
 * @param disabled - Флаг блокировки кнопки подтверждения
 * @param size - Размер модального окна
 * @param preventCloseOnSubmit - Не закрывать модал автоматически после submit
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
      <div className={styles.content}>
        <div className={styles.body}>{children}</div>

        <div className={styles.actions}>
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
        </div>
      </div>
    </Modal>
  );
};
