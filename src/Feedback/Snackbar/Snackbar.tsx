import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, DESIGN_TOKENS } from '@DobruniaUI';

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
