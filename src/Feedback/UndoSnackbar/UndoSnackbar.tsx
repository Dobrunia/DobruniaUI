import React from 'react';
import { Snackbar } from '../Snackbar/Snackbar';
import type { SnackbarOrigin } from '../Snackbar/Snackbar';
import { Button } from '@DobruniaUI';
import { DESIGN_TOKENS } from '../../styles/designTokens';
import styled from 'styled-components';

interface UndoSnackbarProps {
  open: boolean;
  message: React.ReactNode;
  onClose: () => void;
  onUndo: () => void;
  autoHideDuration?: number;
  undoText?: string;
  anchorOrigin?: SnackbarOrigin;
  className?: string;
}

const UndoButton = styled(Button)`
  color: var(--c-accent);
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${DESIGN_TOKENS.fontSize.small};
`;

/**
 * UndoSnackbar component - компонент для отображения уведомлений с возможностью отмены действий
 * Использует базовый Snackbar с включенным автоматическим стекингом
 * @param {boolean} open - флаг видимости уведомления
 * @param {React.ReactNode} message - содержимое уведомления
 * @param {() => void} onClose - функция закрытия уведомления
 * @param {() => void} onUndo - функция отмены действия
 * @param {number} [autoHideDuration=6000] - время автоматического закрытия в миллисекундах (0 для отключения)
 * @param {string} [undoText="Отменить"] - текст кнопки отмены
 * @param {SnackbarOrigin} [anchorOrigin={ vertical: 'top', horizontal: 'right' }] - позиция уведомления
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Базовое использование
 * <UndoSnackbar
 *   open={isOpen}
 *   message="Файл удален"
 *   onClose={() => setIsOpen(false)}
 *   onUndo={() => {
 *     // логика отмены удаления
 *     setIsOpen(false);
 *   }}
 * />
 *
 * // С кастомным текстом кнопки
 * <UndoSnackbar
 *   open={isOpen}
 *   message="3 элемента перемещены в корзину"
 *   onClose={() => setIsOpen(false)}
 *   onUndo={() => restoreItems()}
 *   undoText="Восстановить"
 * />
 *
 * // С увеличенным временем показа
 * <UndoSnackbar
 *   open={isOpen}
 *   message="Изменения сохранены"
 *   onClose={() => setIsOpen(false)}
 *   onUndo={() => revertChanges()}
 *   autoHideDuration={10000}
 * />
 */
export const UndoSnackbar: React.FC<UndoSnackbarProps> = ({
  open,
  message,
  onClose,
  onUndo,
  autoHideDuration = 6000,
  undoText = 'Отменить',
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  className,
}) => {
  const handleUndo = () => {
    onUndo();
    onClose();
  };

  return (
    <Snackbar
      open={open}
      message={message}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      enableStacking={true} // Включаем автоматический стекинг
      action={
        <UndoButton variant='ghost' onClick={handleUndo}>
          {undoText}
        </UndoButton>
      }
      className={className}
    />
  );
};
