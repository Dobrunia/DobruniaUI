import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@DobruniaUI';

export type SnackbarOrigin = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

// Глобальная система управления стеками Snackbar'ов по позициям
const snackbarStacks = new Map<
  string,
  Map<string, { order: number; setStackIndex: (index: number) => void }>
>();
let nextOrder = 0;

const getPositionKey = (origin: SnackbarOrigin) => `${origin.vertical}-${origin.horizontal}`;

const recalculateStackPositions = (positionKey: string) => {
  const stack = snackbarStacks.get(positionKey);
  if (!stack) return;

  // Сортируем по порядку появления и пересчитываем индексы
  const sortedEntries = Array.from(stack.entries()).sort((a, b) => a[1].order - b[1].order);
  sortedEntries.forEach(([, data], index) => {
    data.setStackIndex(index);
  });
};

interface SnackbarProps {
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
 * @param {boolean} [enableStacking=false] - включить автоматическое управление стекингом для данной позиции
 *
 * @example
 * // Базовое использование
 * <Snackbar
 *   open={isOpen}
 *   message="Изменения сохранены"
 *   onClose={() => setIsOpen(false)}
 * />
 *
 * // С включенным стекингом
 * <Snackbar
 *   open={isOpen}
 *   message="Файл загружен"
 *   onClose={() => setIsOpen(false)}
 *   enableStacking={true}
 *   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
  enableStacking = false,
}) => {
  const [stackIndex, setStackIndex] = useState(0);
  const [snackbarId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    if (!enableStacking) return;

    const positionKey = getPositionKey(anchorOrigin);

    if (open) {
      // Создаем стек для позиции если его нет
      if (!snackbarStacks.has(positionKey)) {
        snackbarStacks.set(positionKey, new Map());
      }

      // Регистрируем snackbar в стеке для данной позиции
      const stack = snackbarStacks.get(positionKey)!;
      const order = nextOrder++;
      stack.set(snackbarId, { order, setStackIndex });

      // Пересчитываем позиции для данного стека
      recalculateStackPositions(positionKey);
    } else {
      // Удаляем snackbar из стека
      const stack = snackbarStacks.get(positionKey);
      if (stack) {
        stack.delete(snackbarId);

        // Если стек пустой, удаляем его
        if (stack.size === 0) {
          snackbarStacks.delete(positionKey);
        } else {
          // Пересчитываем позиции для оставшихся snackbar'ов
          recalculateStackPositions(positionKey);
        }
      }
    }

    return () => {
      // Очистка при размонтировании
      const stack = snackbarStacks.get(positionKey);
      if (stack) {
        stack.delete(snackbarId);
        if (stack.size === 0) {
          snackbarStacks.delete(positionKey);
        } else {
          recalculateStackPositions(positionKey);
        }
      }
    };
  }, [open, snackbarId, enableStacking, anchorOrigin]);

  useEffect(() => {
    if (!open) return;
    if (!autoHideDuration) return;
    const timer = setTimeout(onClose, autoHideDuration);
    return () => clearTimeout(timer);
  }, [open, autoHideDuration, onClose]);

  return (
    <SnackbarRoot
      $origin={anchorOrigin}
      $open={open}
      $stackIndex={stackIndex}
      $enableStacking={enableStacking}
      className={className}
    >
      {open && (
        <SnackbarContent>
          <span>{message}</span>
          <SnackbarAction>
            {action}
            <Button variant='close' onClick={onClose} />
          </SnackbarAction>
        </SnackbarContent>
      )}
    </SnackbarRoot>
  );
};
