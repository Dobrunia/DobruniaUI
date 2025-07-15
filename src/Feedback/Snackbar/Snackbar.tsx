import React, { useState, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Button, DESIGN_TOKENS } from '@DobruniaUI';
import { useSnackbarStack, useAutoHide, type SnackbarOrigin } from '../../utils/hooks';

export interface SnackbarProps {
  open: boolean;
  message: React.ReactNode;
  onClose: () => void;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  action?: React.ReactNode;
  className?: string;
  enableStacking?: boolean; // Новый пропс для включения стекинга
}

const getPosition = (
  origin: SnackbarOrigin,
  stackIndex: number = 0,
  enableStacking: boolean = false
) => {
  let justify = 'center';
  if (origin.horizontal === 'left') justify = 'flex-start';
  if (origin.horizontal === 'right') justify = 'flex-end';

  const offset = enableStacking ? stackIndex * 72 : 0; // 56px высота + 16px отступ

  return css`
    ${origin.vertical}: ${32 + offset}px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: ${justify};
    pointer-events: none;
  `;
};

const SnackbarRoot = styled.div<{
  $origin: SnackbarOrigin;
  $open: boolean;
  $stackIndex: number;
  $enableStacking: boolean;
}>`
  position: fixed;
  z-index: ${({ $stackIndex, $enableStacking }) => 1400 + ($enableStacking ? $stackIndex : 0)};
  width: 100vw;
  transition: opacity 0.3s,
    transform 0.3s
      ${({ $enableStacking }) => ($enableStacking ? ', top 0.3s ease, bottom 0.3s ease' : '')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  ${({ $origin, $stackIndex, $enableStacking }) =>
    getPosition($origin, $stackIndex, $enableStacking)}
  pointer-events: none;
`;

const SnackbarContent = styled.div`
  min-width: 288px;
  max-width: 480px;
  background: var(--c-bg-elevated);
  color: var(--c-text-primary);
  border-radius: ${DESIGN_TOKENS.radius.medium};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  padding: 14px 24px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: ${DESIGN_TOKENS.fontSize.medium};
  pointer-events: auto;
`;

const SnackbarAction = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Мемоизированные подкомпоненты
const SnackbarMessage = React.memo<{ message: React.ReactNode }>(({ message }) => (
  <span>{message}</span>
));
SnackbarMessage.displayName = 'SnackbarMessage';

const SnackbarActions = React.memo<{
  action?: React.ReactNode;
  onClose: () => void;
}>(({ action, onClose }) => (
  <SnackbarAction>
    {action}
    <Button variant='close' onClick={onClose} />
  </SnackbarAction>
));
SnackbarActions.displayName = 'SnackbarActions';

/**
 * Snackbar - кратковременное уведомление с поддержкой стекинга и позиционирования
 * @param open 'boolean' - флаг видимости уведомления
 * @param message 'React.ReactNode' - содержимое уведомления
 * @param onClose '() => void' - функция закрытия уведомления
 * @param autoHideDuration 'number' = 4000 - время автоскрытия в мс (0 для отключения)
 * @param anchorOrigin 'SnackbarOrigin' = bottom-center - позиция уведомления
 * @param action 'React.ReactNode' - дополнительное действие (кнопка, ссылка)
 * @param className 'string' - дополнительные CSS классы
 * @param enableStacking 'boolean' = false - включить стекинг для позиции
 */
export const Snackbar = React.memo<SnackbarProps>(
  ({
    open,
    message,
    onClose,
    autoHideDuration = 4000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
    action,
    className,
    enableStacking = false,
  }) => {
    const [stackIndex, setStackIndex] = useState(0);

    // Стабилизируем обработчики
    const handleSetStackIndex = useCallback((index: number) => {
      setStackIndex(index);
    }, []);

    // Используем кастомные хуки
    useSnackbarStack(open, anchorOrigin, enableStacking, handleSetStackIndex);
    useAutoHide(open, autoHideDuration, onClose);

    // Мемоизируем пропсы для корневого элемента
    const rootProps = useMemo(
      () => ({
        $origin: anchorOrigin,
        $open: open,
        $stackIndex: stackIndex,
        $enableStacking: enableStacking,
      }),
      [anchorOrigin, open, stackIndex, enableStacking]
    );

    // Мемоизируем пропсы для действий
    const actionsProps = useMemo(
      () => ({
        action,
        onClose,
      }),
      [action, onClose]
    );

    return (
      <SnackbarRoot {...rootProps} className={className}>
        {open && (
          <SnackbarContent>
            <SnackbarMessage message={message} />
            <SnackbarActions {...actionsProps} />
          </SnackbarContent>
        )}
      </SnackbarRoot>
    );
  }
);

Snackbar.displayName = 'Snackbar';
