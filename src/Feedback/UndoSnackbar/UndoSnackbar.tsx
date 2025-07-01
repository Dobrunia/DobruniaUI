import React from 'react';
import type { SnackbarOrigin } from '../Snackbar/Snackbar';
import { Button, Snackbar, DESIGN_TOKENS } from '@DobruniaUI';
import styled from 'styled-components';

export interface UndoSnackbarProps {
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
 * UndoSnackbar - уведомление с кнопкой отмены действия (автостекинг включен)
 * @param open 'boolean' - флаг видимости уведомления
 * @param message 'React.ReactNode' - содержимое уведомления
 * @param onClose '() => void' - функция закрытия уведомления
 * @param onUndo '() => void' - функция отмены действия
 * @param autoHideDuration 'number' = 6000 - время автоскрытия в мс (0 для отключения)
 * @param undoText 'string' = 'Отменить' - текст кнопки отмены
 * @param anchorOrigin 'SnackbarOrigin' = top-right - позиция уведомления
 * @param className 'string' - дополнительные CSS классы
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
