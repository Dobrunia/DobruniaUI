import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@DobruniaUI';

export type SnackbarOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

interface SnackbarProps {
  open: boolean;
  message: React.ReactNode;
  onClose: () => void;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  action?: React.ReactNode;
  className?: string;
}

const getPosition = (origin: SnackbarOrigin) => {
  let justify = 'center';
  if (origin.horizontal === 'left') justify = 'flex-start';
  if (origin.horizontal === 'right') justify = 'flex-end';
  return css`
    ${origin.vertical}: 32px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: ${justify};
    pointer-events: none;
  `;
};

const SnackbarRoot = styled.div<{ $origin: SnackbarOrigin; $open: boolean }>`
  position: fixed;
  z-index: 1400;
  width: 100vw;
  transition: opacity 0.3s, transform 0.3s;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  ${({ $origin }) => getPosition($origin)}
  pointer-events: none;
`;

const SnackbarContent = styled.div`
  min-width: 288px;
  max-width: 480px;
  background: var(--color-surface);
  color: var(--text-body);
  border-radius: var(--radius-medium);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  padding: 14px 24px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: var(--font-size-medium);
  pointer-events: auto;
`;

const SnackbarAction = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/**
 * Snackbar component - компонент для отображения кратковременных уведомлений
 * @param {boolean} open - флаг видимости уведомления
 * @param {React.ReactNode} message - содержимое уведомления
 * @param {() => void} onClose - функция закрытия уведомления
 * @param {number} [autoHideDuration=4000] - время автоматического закрытия в миллисекундах (0 для отключения)
 * @param {SnackbarOrigin} [anchorOrigin={ vertical: 'bottom', horizontal: 'center' }] - позиция уведомления:
 *   - vertical: 'top' | 'bottom' - вертикальное положение
 *   - horizontal: 'left' | 'center' | 'right' - горизонтальное положение
 * @param {React.ReactNode} [action] - дополнительное действие (кнопка, ссылка и т.д.)
 * @param {string} [className] - дополнительные CSS классы
 *
 * @example
 * // Базовое использование
 * <Snackbar
 *   open={isOpen}
 *   message="Изменения сохранены"
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * // С дополнительным действием
 * <Snackbar
 *   open={isOpen}
 *   message="Файл загружен"
 *   onClose={() => setIsOpen(false)}
 *   action={<Button variant="ghost">Открыть</Button>}
 * />
 *
 * // С кастомной позицией
 * <Snackbar
 *   open={isOpen}
 *   message="Уведомление сверху"
 *   onClose={() => setIsOpen(false)}
 *   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
 * />
 *
 * // С увеличенным временем показа
 * <Snackbar
 *   open={isOpen}
 *   message="Длинное сообщение, требующее больше времени для прочтения"
 *   onClose={() => setIsOpen(false)}
 *   autoHideDuration={8000}
 * />
 *
 * // Без автоматического закрытия
 * <Snackbar
 *   open={isOpen}
 *   message="Требует действия пользователя"
 *   onClose={() => setIsOpen(false)}
 *   autoHideDuration={0}
 *   action={<Button variant="ghost">Подтвердить</Button>}
 * />
 */
export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  onClose,
  autoHideDuration = 4000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  action,
  className,
}) => {
  useEffect(() => {
    if (!open) return;
    if (!autoHideDuration) return;
    const timer = setTimeout(onClose, autoHideDuration);
    return () => clearTimeout(timer);
  }, [open, autoHideDuration, onClose]);

  return (
    <SnackbarRoot $origin={anchorOrigin} $open={open} className={className}>
      {open && (
        <SnackbarContent>
          <span>{message}</span>
          <SnackbarAction>
            {action}
            <Button variant="close" onClick={onClose} />
          </SnackbarAction>
        </SnackbarContent>
      )}
    </SnackbarRoot>
  );
};
