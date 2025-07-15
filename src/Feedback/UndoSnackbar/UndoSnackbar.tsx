import React, { useCallback, useMemo } from 'react';
import type { SnackbarOrigin } from '../../utils/hooks';
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

// Мемоизированный подкомпонент
const UndoAction = React.memo<{
  onUndo: () => void;
  undoText: string;
}>(({ onUndo, undoText }) => (
  <UndoButton variant='ghost' onClick={onUndo}>
    {undoText}
  </UndoButton>
));
UndoAction.displayName = 'UndoAction';

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
export const UndoSnackbar = React.memo<UndoSnackbarProps>(
  ({
    open,
    message,
    onClose,
    onUndo,
    autoHideDuration = 6000,
    undoText = 'Отменить',
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    className,
  }) => {
    // Стабилизируем обработчики
    const handleUndo = useCallback(() => {
      onUndo();
      onClose();
    }, [onUndo, onClose]);

    // Мемоизируем пропсы для Snackbar
    const snackbarProps = useMemo(
      () => ({
        open,
        message,
        onClose,
        autoHideDuration,
        anchorOrigin,
        enableStacking: true, // Включаем автоматический стекинг
        className,
      }),
      [open, message, onClose, autoHideDuration, anchorOrigin, className]
    );

    // Мемоизируем пропсы для действия
    const actionProps = useMemo(
      () => ({
        onUndo: handleUndo,
        undoText,
      }),
      [handleUndo, undoText]
    );

    return <Snackbar {...snackbarProps} action={<UndoAction {...actionProps} />} />;
  }
);

UndoSnackbar.displayName = 'UndoSnackbar';
